import Link from "next/link";
import { changeLabel, pct, type AnalyticsReport } from "@/lib/analytics";

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

/** Daily visitors, one bar per day. Hover a bar for the exact count. */
function DailyBars({ daily }: { daily: AnalyticsReport["current"]["daily"] }) {
  const W = 720;
  const H = 160;
  const PAD_B = 22;
  const max = Math.max(1, ...daily.map((d) => d.visitors));
  const slot = W / Math.max(1, daily.length);
  const barW = Math.max(2, Math.min(18, slot - 2)); // 2px gap between bars
  const mid = daily[Math.floor((daily.length - 1) / 2)];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-44 w-full" role="img" aria-label="Visitors per day">
      {/* recessive baseline + max gridline */}
      <line x1={0} x2={W} y1={H - PAD_B} y2={H - PAD_B} stroke="currentColor" className="text-ink/15" />
      <line x1={0} x2={W} y1={8} y2={8} stroke="currentColor" strokeDasharray="3 4" className="text-ink/10" />
      <text x={W} y={6} textAnchor="end" className="fill-ink-500 text-[11px]">
        {max} visitors
      </text>
      {daily.map((d, i) => {
        const h = d.visitors ? Math.max(3, ((H - PAD_B - 12) * d.visitors) / max) : 0;
        const x = i * slot + (slot - barW) / 2;
        const y = H - PAD_B - h;
        return (
          <g key={d.day}>
            {/* hit target taller than the bar */}
            <rect x={i * slot} y={0} width={slot} height={H - PAD_B} fill="transparent">
              <title>{`${fmtDay(d.day, { weekday: "short", month: "short", day: "numeric" })}: ${d.visitors} visitors, ${d.pageviews} page views`}</title>
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

export default function AnalyticsPanel({ report, range }: { report: AnalyticsReport | null; range: number }) {
  const c = report?.current;
  const hasData = !!c && c.pageviews > 0;

  return (
    <section className="mb-10 overflow-hidden rounded-lg border border-ink/10 bg-white shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 bg-blueprint-50/60 px-6 py-4">
        <div>
          <h2 className="font-heading text-lg font-semibold text-ink">Website visitors</h2>
          <p className="text-sm text-ink-500">
            Private, cookie-free counts. No personal data is collected.
          </p>
        </div>
        <nav className="flex gap-1" aria-label="Date range">
          {RANGES.map((r) => (
            <Link
              key={r}
              href={`/admin?range=${r}`}
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

      {!hasData ? (
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
            <DailyBars daily={c!.daily} />
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
