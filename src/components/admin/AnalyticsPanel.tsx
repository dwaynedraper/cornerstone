import Link from "next/link";
import { changeLabel, pct, type ActionsReport, type AnalyticsReport } from "@/lib/analytics";
import { CTA_KEYS, CTA_LABELS, PLACEMENT_LABELS, type CtaKey } from "@/lib/cta";

const RANGES = [7, 30, 90] as const;

const fmtDay = (iso: string, opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", opts);

function Tile({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-md border border-ink/10 bg-white p-4">
      <p className="font-heading text-xs font-medium uppercase tracking-wider text-ink-500">{label}</p>
      <p className="mt-1 font-heading text-3xl font-semibold text-ink">{value}</p>
      {note && <p className="mt-0.5 text-xs text-ink-500">{note}</p>}
    </div>
  );
}

type BarPoint = { day: string; value: number; tip: string };

/** One bar per day. Hover a bar for the exact count. */
function DailyBars({ points: daily, unit }: { points: BarPoint[]; unit: string }) {
  const W = 720;
  const H = 160;
  const PAD_B = 22;
  const max = Math.max(1, ...daily.map((d) => d.value));
  const slot = W / Math.max(1, daily.length);
  const barW = Math.max(2, Math.min(18, slot - 2)); // 2px gap between bars
  const mid = daily[Math.floor((daily.length - 1) / 2)];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-44 w-full" role="img" aria-label={`${unit} per day`}>
      {/* recessive baseline + max gridline */}
      <line x1={0} x2={W} y1={H - PAD_B} y2={H - PAD_B} stroke="currentColor" className="text-ink/15" />
      <line x1={0} x2={W} y1={8} y2={8} stroke="currentColor" strokeDasharray="3 4" className="text-ink/10" />
      <text x={W} y={6} textAnchor="end" className="fill-ink-500 text-[11px]">
        {max} {unit}
      </text>
      {daily.map((d, i) => {
        const h = d.value ? Math.max(3, ((H - PAD_B - 12) * d.value) / max) : 0;
        const x = i * slot + (slot - barW) / 2;
        const y = H - PAD_B - h;
        return (
          <g key={d.day}>
            {/* hit target taller than the bar */}
            <rect x={i * slot} y={0} width={slot} height={H - PAD_B} fill="transparent">
              <title>{`${fmtDay(d.day, { weekday: "short", month: "short", day: "numeric" })}: ${d.tip}`}</title>
            </rect>
            {h > 0 && (
              <path
                d={`M${x},${y + h} V${y + 3} Q${x},${y} ${x + 3},${y} H${x + barW - 3} Q${x + barW},${y} ${x + barW},${y + 3} V${y + h} Z`}
                className="pointer-events-none fill-blueprint"
              />
            )}
          </g>
        );
      })}
      {daily.length > 0 && (
        <>
          <text x={0} y={H - 6} className="fill-ink-500 text-[11px]">{fmtDay(daily[0].day)}</text>
          {mid && <text x={W / 2} y={H - 6} textAnchor="middle" className="fill-ink-500 text-[11px]">{fmtDay(mid.day)}</text>}
          <text x={W} y={H - 6} textAnchor="end" className="fill-ink-500 text-[11px]">{fmtDay(daily[daily.length - 1].day)}</text>
        </>
      )}
    </svg>
  );
}

function href(range: number, view: "visitors" | "actions", cta: CtaKey | null) {
  const q = new URLSearchParams({ range: String(range) });
  if (view === "actions") q.set("view", "actions");
  if (view === "actions" && cta) q.set("cta", cta);
  return `/admin?${q.toString()}`;
}

export default function AnalyticsPanel({
  report,
  range,
  view = "visitors",
  actions = null,
  cta = null,
}: {
  report: AnalyticsReport | null;
  range: number;
  view?: "visitors" | "actions";
  actions?: ActionsReport | null;
  cta?: CtaKey | null;
}) {
  const c = report?.current;
  const hasData = !!c && c.pageviews > 0;

  return (
    <section className="mb-10 overflow-hidden rounded-lg border border-ink/10 bg-white shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 bg-blueprint-50/60 px-6 py-4">
        <div>
          <h2 className="font-heading text-lg font-semibold text-ink">
            {view === "actions" ? "Actions taken" : "Website visitors"}
          </h2>
          <p className="text-sm text-ink-500">
            Private, cookie-free counts. No personal data is collected.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
        <nav className="flex rounded-md border border-ink/15 bg-white p-0.5" aria-label="What to show">
          {(["visitors", "actions"] as const).map((v) => (
            <Link
              key={v}
              href={href(range, v, cta)}
              aria-current={v === view ? "page" : undefined}
              className={`rounded-sm px-3 py-1.5 font-heading text-sm font-medium ${
                v === view ? "bg-ink text-white" : "text-ink-500 hover:text-ink"
              }`}
            >
              {v === "visitors" ? "Visitors" : "Actions"}
            </Link>
          ))}
        </nav>
        <nav className="flex gap-1" aria-label="Date range">
          {RANGES.map((r) => (
            <Link
              key={r}
              href={href(r, view, cta)}
              aria-current={r === range ? "page" : undefined}
              className={`rounded-sm px-3 py-1.5 font-heading text-sm font-medium ${
                r === range ? "bg-blueprint text-white" : "text-ink-500 hover:bg-white"
              }`}
            >
              {r} days
            </Link>
          ))}
        </nav>
        </div>
      </div>

      {view === "actions" ? (
        <ActionsBody actions={actions} range={range} cta={cta} visitors={c?.visitors ?? 0} />
      ) : report?.setupProblem ? (
        <div className="px-6 py-8">
          <p className="font-heading font-semibold text-ink">The visitor counter isn&apos;t set up yet.</p>
          <p className="mt-2 max-w-2xl text-ink-500">
            Visits aren&apos;t being saved, so these numbers can&apos;t be trusted. The database is
            missing its visitor table. Run <code className="rounded-sm bg-sand-light px-1">supabase/relaunch.sql</code>{" "}
            in the Supabase SQL Editor, and make sure <code className="rounded-sm bg-sand-light px-1">SUPABASE_SERVICE_ROLE_KEY</code>{" "}
            is set in Vercel.
          </p>
          <p className="mt-2 text-xs text-ink-400">Details: {report.setupProblem}</p>
        </div>
      ) : !hasData ? (
        <p className="px-6 py-8 text-ink-500">
          No visits recorded yet for this period. Numbers appear here as people visit the live site.
          Visits from signed-in admins are not counted.
        </p>
      ) : (
        <div className="space-y-6 p-6">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Tile label="Today" value={String(report!.today)} note="visitors so far" />
            <Tile
              label={`Last ${range} days`}
              value={String(c!.visitors)}
              note={`${changeLabel(c!.visitors, report!.previous.visitors)} vs the ${range} days before`}
            />
            <Tile label="From Texas" value={String(c!.texas)} note={`${pct(c!.texas, c!.visitors)} of visitors`} />
            <Tile label="From the USA" value={String(c!.usa)} note={`${pct(c!.usa, c!.visitors)} of visitors`} />
          </div>

          <div>
            <p className="mb-2 font-heading text-sm font-medium text-ink">Visitors per day</p>
            <DailyBars
              unit="visitors"
              points={c!.daily.map((d) => ({
                day: d.day,
                value: d.visitors,
                tip: `${d.visitors} visitors, ${d.pageviews} page views`,
              }))}
            />
            <details className="mt-2 text-sm">
              <summary className="cursor-pointer text-blueprint">See the daily numbers</summary>
              <table className="mt-2 w-full max-w-md text-left">
                <thead className="text-ink-500">
                  <tr><th className="py-1 font-medium">Day</th><th className="font-medium">Visitors</th><th className="font-medium">Page views</th></tr>
                </thead>
                <tbody>
                  {[...c!.daily].reverse().map((d) => (
                    <tr key={d.day} className="border-t border-ink/5">
                      <td className="py-1">{fmtDay(d.day, { weekday: "short", month: "short", day: "numeric" })}</td>
                      <td>{d.visitors}</td>
                      <td>{d.pageviews}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-2 font-heading text-sm font-medium text-ink">Most viewed pages</p>
              <ul className="divide-y divide-ink/5 text-sm">
                {c!.top_pages.map((p) => (
                  <li key={p.path} className="flex justify-between py-1.5">
                    <span className="text-ink">{p.path === "/" ? "Home" : p.path}</span>
                    <span className="text-ink-500">{p.views} views</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 font-heading text-sm font-medium text-ink">Where visitors came from</p>
              <ul className="divide-y divide-ink/5 text-sm">
                {c!.top_sources.map((s) => (
                  <li key={s.source} className="flex justify-between py-1.5">
                    <span className="text-ink">{s.source}</span>
                    <span className="text-ink-500">{s.visitors} visitors</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-xs text-ink-500">
            A visitor is one person on one day. Someone who visits on three different days counts three times.
          </p>
        </div>
      )}
    </section>
  );
}

/** The Actions view: calls to action across the site, with a filter. */
function ActionsBody({
  actions,
  range,
  cta,
  visitors,
}: {
  actions: ActionsReport | null;
  range: number;
  cta: CtaKey | null;
  visitors: number;
}) {
  if (!actions || actions.setupProblem) {
    return (
      <div className="px-6 py-8">
        <p className="font-heading font-semibold text-ink">The action counter isn&apos;t set up yet.</p>
        <p className="mt-2 max-w-2xl text-ink-500">
          Run <code className="rounded-sm bg-sand-light px-1">supabase/cta-events.sql</code> in the
          Supabase SQL Editor. Clicks start counting right after.
        </p>
        {actions?.setupProblem && <p className="mt-2 text-xs text-ink-400">Details: {actions.setupProblem}</p>}
      </div>
    );
  }

  const a = actions.current;
  const counts = new Map(a.by_cta.map((r) => [r.cta, r.actions]));
  const allTotal = a.by_cta.reduce((n, r) => n + r.actions, 0);
  // "Other Contact buttons" only shows once it has been clicked (those buttons are hidden today).
  const keys = CTA_KEYS.filter((k) => k !== "contact_button" || counts.get(k));
  const what = cta ? CTA_LABELS[cta] : "All actions";

  return (
    <div className="space-y-6 p-6">
      <nav className="flex flex-wrap gap-2" aria-label="Filter by call to action">
        {[null, ...keys].map((k) => {
          const active = k === cta;
          return (
            <Link
              key={k ?? "all"}
              href={href(range, "actions", k)}
              aria-current={active ? "page" : undefined}
              className={`rounded-full border px-3 py-1 text-sm ${
                active
                  ? "border-blueprint bg-blueprint text-white"
                  : "border-ink/15 text-ink-500 hover:border-blueprint/50 hover:text-ink"
              }`}
            >
              {k ? CTA_LABELS[k] : "All"}{" "}
              <span className={active ? "text-white/80" : "text-ink-400"}>{k ? (counts.get(k) ?? 0) : allTotal}</span>
            </Link>
          );
        })}
      </nav>

      {a.actions === 0 ? (
        <p className="py-4 text-ink-500">
          No {cta ? `"${CTA_LABELS[cta]}"` : ""} actions in the last {range} days yet. Clicks show up here
          a few seconds after they happen. Clicks from signed-in admins are not counted.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Tile label="Today" value={String(actions.today)} note={what.toLowerCase()} />
            <Tile
              label={`Last ${range} days`}
              value={String(a.actions)}
              note={`${changeLabel(a.actions, actions.previousActions)} vs the ${range} days before`}
            />
            <Tile label="People" value={String(a.people)} note="who took this action" />
            <Tile label="Action rate" value={pct(a.people, visitors)} note={`of ${visitors} visitors`} />
          </div>

          <div>
            <p className="mb-2 font-heading text-sm font-medium text-ink">{what} per day</p>
            <DailyBars
              unit="actions"
              points={a.daily.map((d) => ({ day: d.day, value: d.actions, tip: `${d.actions} actions` }))}
            />
          </div>

          <div>
            <p className="mb-2 font-heading text-sm font-medium text-ink">Where it happened</p>
            <ul className="divide-y divide-ink/5 text-sm">
              {a.by_place.map((r) => (
                <li key={`${r.cta}|${r.placement}|${r.path}`} className="flex justify-between gap-4 py-1.5">
                  <span className="text-ink">
                    {CTA_LABELS[r.cta as CtaKey] ?? r.cta}
                    <span className="text-ink-500">
                      {" "}
                      · {PLACEMENT_LABELS[r.placement] ?? r.placement} · {r.path === "/" ? "Home" : r.path}
                    </span>
                  </span>
                  <span className="whitespace-nowrap text-ink-500">{r.actions}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <p className="text-xs text-ink-500">
        Phone and email count a tap on the link. That opens the visitor&apos;s phone or email app, but
        we can&apos;t see whether the call or email went through. The contact form only counts messages
        that actually sent. Action rate is people who took an action divided by visitors in the same period.
      </p>
    </div>
  );
}
