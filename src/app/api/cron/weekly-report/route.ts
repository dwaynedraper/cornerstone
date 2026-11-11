import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { chicagoDate, changeLabel, pct, type AnalyticsSummary } from "@/lib/analytics";
import { getResend, EMAIL_FROM } from "@/lib/email";
import { site } from "@/data/site";

/**
 * Monday-morning visitor email (scheduled in vercel.json). Vercel calls this
 * with `Authorization: Bearer $CRON_SECRET`. Each admin can switch it off
 * under My account. Also prunes raw page views older than 25 months.
 */
export const dynamic = "force-dynamic";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });

function emailHtml(cur: AnalyticsSummary, prev: AnalyticsSummary, from: string, to: string) {
  const row = (label: string, value: string, note = "") =>
    `<tr><td style="padding:10px 0;border-top:1px solid #e6e2db;color:#5b6168">${label}</td><td style="padding:10px 0;border-top:1px solid #e6e2db;text-align:right;font-weight:600;color:#23272C">${value}</td><td style="padding:10px 0 10px 12px;border-top:1px solid #e6e2db;color:#8a8f96;font-size:13px">${note}</td></tr>`;
  const pages = cur.top_pages
    .map((p) => `<li style="margin:4px 0">${esc(p.path === "/" ? "Home" : p.path)}: ${p.views} views</li>`)
    .join("");
  return `<!doctype html><html><body style="margin:0;background:#FBFAF8;font-family:Inter,Arial,sans-serif">
<div style="max-width:560px;margin:0 auto;padding:32px 24px">
  <p style="margin:0;color:#1B5390;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600">Weekly visitor report</p>
  <h1 style="margin:8px 0 4px;color:#23272C;font-size:24px">${esc(site.name)}</h1>
  <p style="margin:0 0 20px;color:#5b6168">${fmt(from)} to ${fmt(to)}</p>
  <table style="width:100%;border-collapse:collapse;font-size:15px">
    ${row("Visitors", String(cur.visitors), `${changeLabel(cur.visitors, prev.visitors)} vs the week before`)}
    ${row("From Texas", String(cur.texas), `${pct(cur.texas, cur.visitors)} of visitors`)}
    ${row("From the USA", String(cur.usa), `${pct(cur.usa, cur.visitors)} of visitors`)}
    ${row("Page views", String(cur.pageviews))}
  </table>
  ${pages ? `<p style="margin:24px 0 6px;color:#23272C;font-weight:600">Most viewed pages</p><ul style="margin:0;padding-left:18px;color:#5b6168">${pages}</ul>` : ""}
  <p style="margin:28px 0 0"><a href="${site.url}/admin" style="background:#1B5390;color:#fff;text-decoration:none;padding:10px 18px;border-radius:3px;font-size:14px">Open the dashboard</a></p>
  <p style="margin:28px 0 0;color:#8a8f96;font-size:12px">Private, cookie-free counts. To stop these emails, sign in and open My account.</p>
</div></body></html>`;
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const resend = getResend();
  if (!resend) return NextResponse.json({ error: "RESEND_API_KEY not set" }, { status: 500 });

  const sb = createAdminClient();
  // Last full week: the 7 days before today (Texas time).
  const from = chicagoDate(-7);
  const to = chicagoDate(-1);
  const [cur, prev] = await Promise.all([
    sb.rpc("analytics_summary", { p_from: from, p_to: to }),
    sb.rpc("analytics_summary", { p_from: chicagoDate(-14), p_to: chicagoDate(-8) }),
  ]);
  if (cur.error || prev.error) return NextResponse.json({ error: "Analytics query failed" }, { status: 500 });

  // Everyone who can sign in gets it, unless they turned it off.
  const [{ data: users }, { data: prefs }] = await Promise.all([
    sb.auth.admin.listUsers({ perPage: 100 }),
    sb.from("admin_profiles").select("user_id,weekly_report"),
  ]);
  const off = new Set(
    ((prefs ?? []) as { user_id: string; weekly_report: boolean }[])
      .filter((p) => !p.weekly_report)
      .map((p) => p.user_id),
  );
  const recipients = users.users.filter((u) => u.email && !off.has(u.id)).map((u) => u.email!);

  const html = emailHtml(cur.data as AnalyticsSummary, prev.data as AnalyticsSummary, from, to);
  let sent = 0;
  for (const to_ of recipients) {
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: to_,
      subject: `Website visitors last week: ${(cur.data as AnalyticsSummary).visitors}`,
      html,
    });
    if (!error) sent++;
  }

  // Keep raw counts for about two years, then drop them.
  await sb.from("page_views").delete().lt("day", chicagoDate(-760));

  return NextResponse.json({ ok: true, sent, recipients: recipients.length });
}
