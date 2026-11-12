import "server-only";
import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Shared pieces of the privacy-first counters (page views and actions).
 * No cookies are set, no IP address is stored, and the visitor hash changes
 * every day so it can't follow anyone over time.
 */

export const BOT =
  /bot|crawl|spider|slurp|preview|monitor|lighthouse|headless|curl|wget|python|axios|node-fetch|vercel/i;

/** Today's date on Texas time, so "today" matches what Mitch sees. */
export function chicagoDay(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(new Date());
}

/** False for preview deploys, bots, and signed-in admins. */
export function shouldCount(req: Request | NextRequest): boolean {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") return false;
  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || BOT.test(ua)) return false;
  const cookie = req.headers.get("cookie") ?? "";
  // Supabase auth cookies look like sb-<project>-auth-token
  if (/(?:^|;\s*)sb-[^=;]*auth-token/.test(cookie)) return false;
  return true;
}

/** Daily-rotating, one-way visitor hash. */
export function visitorHash(req: Request | NextRequest, day: string): string {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  const ua = req.headers.get("user-agent") ?? "";
  const salt = process.env.ANALYTICS_SALT ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return createHash("sha256").update(`${salt}|${day}|${ip}|${ua}`).digest("hex").slice(0, 32);
}

/** Country and state from Vercel's network headers. */
export function geo(req: Request | NextRequest) {
  const country = req.headers.get("x-vercel-ip-country");
  const region = req.headers.get("x-vercel-ip-country-region");
  return {
    country: country ? country.slice(0, 2) : null,
    region: region ? region.slice(0, 10) : null,
  };
}

/** Saves one call-to-action event. Never throws: analytics must not break the site. */
export async function recordCta(
  req: Request,
  cta: string,
  placement: string,
  path: string,
) {
  const day = chicagoDay();
  try {
    const { error } = await createAdminClient()
      .from("cta_events")
      .insert({ day, cta, placement, path, visitor_hash: visitorHash(req, day), ...geo(req) });
    if (error) console.error("[analytics] action not saved:", error.message);
  } catch (err) {
    console.error("[analytics] action not saved:", err instanceof Error ? err.message : err);
  }
}
