import { NextResponse, type NextRequest } from "next/server";
import { recordCta, shouldCount } from "@/lib/track";
import { isCta, PLACEMENT_LABELS } from "@/lib/cta";

/**
 * Counts clicks on calls to action (Nav Contact button, phone and email
 * links). Same privacy rules as the page-view counter: no cookies, no IP
 * stored, a hash that changes daily. The contact form is counted on the
 * server when a message actually sends (see /api/contact).
 */
export async function POST(req: NextRequest) {
  if (!shouldCount(req)) return new NextResponse(null, { status: 204 });

  let body: { cta?: string; placement?: string; path?: string } = {};
  try {
    body = JSON.parse(await req.text());
  } catch {
    return new NextResponse(null, { status: 204 });
  }
  // The form is only counted server-side, on a successful send.
  if (!isCta(body.cta) || body.cta === "contact_form") {
    return new NextResponse(null, { status: 204 });
  }

  const path = String(body.path ?? "/").split("?")[0].slice(0, 200);
  if (!path.startsWith("/") || path.startsWith("/admin")) return new NextResponse(null, { status: 204 });
  const placement = body.placement && body.placement in PLACEMENT_LABELS ? body.placement : "page";

  await recordCta(req, body.cta, placement, path);
  return new NextResponse(null, { status: 204 });
}
