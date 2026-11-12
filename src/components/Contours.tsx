/**
 * Faint topographic contour lines, the language of a topo survey.
 * The paths are computed once at build time from fixed numbers, so every
 * render is identical (no random values, no hydration mismatch).
 */
function hill(cx: number, cy: number, rings: number, base: number, step: number, seed: number) {
  const paths: { d: string; index: boolean }[] = [];
  for (let k = 0; k < rings; k++) {
    const R = base + k * step;
    let d = "";
    for (let a = 0; a <= 64; a++) {
      const t = (a / 64) * Math.PI * 2;
      const wob =
        1 +
        0.12 * Math.sin(3 * t + seed + k * 0.35) +
        0.07 * Math.sin(5 * t - seed * 1.7 + k * 0.2) +
        0.04 * Math.cos(7 * t + k * 0.5);
      const x = cx + Math.cos(t) * R * 1.35 * wob;
      const y = cy + Math.sin(t) * R * 0.85 * wob;
      d += `${a ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    // Every fifth line is an index contour, drawn slightly heavier.
    paths.push({ d: `${d}Z`, index: k % 5 === 4 });
  }
  return paths;
}

const VARIANTS = {
  a: [hill(980, 160, 16, 18, 26, 1.2), hill(170, 690, 14, 20, 28, 4.1)],
  b: [hill(220, 140, 15, 16, 27, 2.6), hill(1040, 660, 16, 18, 26, 0.7)],
};

export default function Contours({
  variant = "a",
  className = "",
}: {
  /** Two hill layouts so neighbouring sections don't look copied. */
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  const hills = VARIANTS[variant];
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 ${className}`}>
      <svg
        className="h-full w-full text-[#1a64c8] opacity-[0.13]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="currentColor"
      >
        {hills.flat().map((p, i) => (
          <path key={i} d={p.d} strokeWidth={p.index ? 1.6 : 0.9} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
    </div>
  );
}
