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

async function summary(sb: SupabaseClient, from: string, to: string): Promise<AnalyticsSummary> {
  const { data, error } = await sb.rpc("analytics_summary", { p_from: from, p_to: to });
  if (error || !data) return EMPTY;
  return { ...EMPTY, ...(data as AnalyticsSummary) };
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
    const [current, previous] = await Promise.all([
      summary(sb, from, to),
      summary(sb, prevFrom, prevTo),
    ]);
    const today = current.daily.find((d) => d.day === to)?.visitors ?? 0;
    return { from, to, current, previous, today };
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
