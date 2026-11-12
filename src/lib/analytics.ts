import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export type AnalyticsSummary = {
  daily: { day: string; visitors: number; pageviews: number }[];
  visitors: number;
  pageviews: number;
  texas: number;
  usa: number;
  top_pages: { path: string; views: number }[];
  top_sources: { source: string; visitors: number }[];
};

export type AnalyticsReport = {
  from: string;
  to: string;
  current: AnalyticsSummary;
  previous: AnalyticsSummary;
  today: number;
  /** Set when the counter can't be read (table or function missing). */
  setupProblem?: string;
};

const EMPTY: AnalyticsSummary = {
  daily: [],
  visitors: 0,
  pageviews: 0,
  texas: 0,
  usa: 0,
  top_pages: [],
  top_sources: [],
};

/** YYYY-MM-DD in Texas time, offset by `deltaDays`. */
export function chicagoDate(deltaDays = 0): string {
  const d = new Date(Date.now() + deltaDays * 86_400_000);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(d);
}

async function summary(
  sb: SupabaseClient,
  from: string,
  to: string,
): Promise<{ data: AnalyticsSummary; error?: string }> {
  const { data, error } = await sb.rpc("analytics_summary", { p_from: from, p_to: to });
  if (error) return { data: EMPTY, error: error.message };
  return { data: { ...EMPTY, ...((data ?? {}) as AnalyticsSummary) } };
}

/**
 * Last `days` days (ending today, Texas time) plus the period before it for
 * comparison. Works with the signed-in admin's client (RLS lets admins read)
 * or the service-role client (weekly email).
 */
export async function getAnalyticsReport(sb: SupabaseClient, days = 30): Promise<AnalyticsReport | null> {
  try {
    const to = chicagoDate(0);
    const from = chicagoDate(-(days - 1));
    const prevTo = chicagoDate(-days);
    const prevFrom = chicagoDate(-(days * 2 - 1));
    const [cur, prev] = await Promise.all([
      summary(sb, from, to),
      summary(sb, prevFrom, prevTo),
    ]);
    const current = cur.data;
    const previous = prev.data;
    const today = current.daily.find((d) => d.day === to)?.visitors ?? 0;
    return { from, to, current, previous, today, setupProblem: cur.error };
  } catch {
    return null;
  }
}

/** "+12%" / "−8%" / "new" / "no change". */
export function changeLabel(now: number, before: number): string {
  if (before === 0) return now > 0 ? "new" : "no change";
  const pct = Math.round(((now - before) / before) * 100);
  if (pct === 0) return "no change";
  return `${pct > 0 ? "+" : "−"}${Math.abs(pct)}%`;
}

export function pct(part: number, whole: number): string {
  return whole ? `${Math.round((part / whole) * 100)}%` : "0%";
}

/* ------------------------------------------------------------------
   Actions (calls to action)
   ------------------------------------------------------------------ */

export type ActionsSummary = {
  daily: { day: string; actions: number }[];
  actions: number;
  people: number;
  by_cta: { cta: string; actions: number }[];
  by_place: { cta: string; placement: string; path: string; actions: number }[];
};

export type ActionsReport = {
  current: ActionsSummary;
  previousActions: number;
  today: number;
  setupProblem?: string;
};

const EMPTY_ACTIONS: ActionsSummary = { daily: [], actions: 0, people: 0, by_cta: [], by_place: [] };

async function actionsSummary(sb: SupabaseClient, from: string, to: string, cta: string | null) {
  const { data, error } = await sb.rpc("cta_summary", { p_from: from, p_to: to, p_cta: cta });
  if (error) return { data: EMPTY_ACTIONS, error: error.message };
  return { data: { ...EMPTY_ACTIONS, ...((data ?? {}) as ActionsSummary) } };
}

/** Last `days` days of actions, optionally for one call to action. */
export async function getActionsReport(
  sb: SupabaseClient,
  days = 30,
  cta: string | null = null,
): Promise<ActionsReport | null> {
  try {
    const to = chicagoDate(0);
    const from = chicagoDate(-(days - 1));
    const [cur, prev] = await Promise.all([
      actionsSummary(sb, from, to, cta),
      actionsSummary(sb, chicagoDate(-(days * 2 - 1)), chicagoDate(-days), cta),
    ]);
    const today = cur.data.daily.find((d) => d.day === to)?.actions ?? 0;
    return { current: cur.data, previousActions: prev.data.actions, today, setupProblem: cur.error };
  } catch {
    return null;
  }
}
