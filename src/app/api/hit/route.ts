import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Privacy-first page-view counter.
 *
 * What we keep per view: the day, the page path, the country and state
 * (from Vercel's network-level geo headers), the referring website, and a
 * visitor hash. The hash mixes a secret, today's date, the IP and the browser
 * string, so it changes every day and can't be traced back to a person. The
 * IP address itself is never stored. No cookies, no fingerprinting scripts,
 * nothing shared with a third party.
 */

const BOT = /bot|crawl|spider|slurp|preview|monitor|lighthouse|headless|curl|wget|python|axios|node-fetch|vercel/i;

function chicagoDay(): string {
  // Count days on Texas time, so "today" matches what Mitch sees.
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(new Date());
}

export async function POST(req: NextRequest) {
  // Only count real production traffic.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return new NextResponse(null, { status: 204 });
  }
  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || BOT.test(ua)) return new NextResponse(null, { status: 204 });

  // Skip signed-in admins so Dean and Mitch don't inflate the numbers.
  if (req.cookies.getAll().some((c) => c.name.startsWith("sb-") && c.name.includes("auth-token"))) {
    return new NextResponse(null, { status: 204 });
  }

  let body: { path?: string; ref?: string } = {};
  try {
    body = JSON.parse(await req.text());
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  const path = String(body.path ?? "/").split("?")[0].slice(0, 200);
  if (!path.startsWith("/") || path.startsWith("/admin") || path.startsWith("/api")) {
    return new NextResponse(null, { status: 204 });
  }

  let referrerHost: string | null = null;
  try {
    const host = body.ref ? new URL(body.ref).hostname.replace(/^www\./, "") : "";
    if (host && !host.endsWith("cornerstoneengineeringandsurveying.com")) referrerHost = host.slice(0, 100);
  } catch {
    /* ignore malformed referrers */
  }

  const day = chicagoDay();
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  const salt = process.env.ANALYTICS_SALT ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const visitorHash = createHash("sha256").update(`${salt}|${day}|${ip}|${ua}`).digest("hex").slice(0, 32);

  const country = req.headers.get("x-vercel-ip-country");
  const region = req.headers.get("x-vercel-ip-country-region");

  try {
    await createAdminClient().from("page_views").insert({
      day,
      path,
      country: country ? country.slice(0, 2) : null,
      region: region ? region.slice(0, 10) : null,
      referrer_host: referrerHost,
      visitor_hash: visitorHash,
    });
  } catch {
    /* analytics must never break the site */
  }
  return new NextResponse(null, { status: 204 });
}
