/**
 * Subtle CAD / site-plan line drawing for use as a full-bleed section backdrop.
 * Drop it as the first child of a `relative isolate overflow-hidden` section and
 * keep the section's real content in a `relative` wrapper so it sits on top.
 *
 * Color comes from `currentColor`, opacity from the wrapper — so a section can
 * tint it by setting `text-blueprint` (light bg) or `text-white` (dark bg) and
 * an opacity utility. Strokes stay hairline-thin at any size.
 */
export default function CadBackdrop({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 600"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* parcel boundary */}
        <path d="M860 70 L1380 120 L1350 520 L840 480 Z" />
        {/* lot divisions */}
        <path d="M980 88 L958 492" />
        <path d="M1100 100 L1082 500" />
        <path d="M1220 112 L1208 508" />
        <path d="M850 290 L1365 325" />
        {/* curved street + cul-de-sac */}
        <path d="M840 400 C 1010 340, 1150 405, 1260 345" />
        <circle cx="1292" cy="336" r="36" />
        {/* building setback (dashed) + footprint */}
        <rect x="1010" y="140" width="82" height="110" strokeDasharray="7 7" />
        <rect x="1028" y="170" width="46" height="58" />
        {/* dimension line with extension lines + arrowheads */}
        <path d="M860 560 L1350 560" />
        <path d="M860 548 L860 572" />
        <path d="M1350 548 L1350 572" />
        <path d="M872 553 L860 560 L872 567" />
        <path d="M1338 553 L1350 560 L1338 567" />
        <path d="M860 500 L860 575" />
        <path d="M1350 500 L1350 575" />
        {/* north arrow */}
        <path d="M170 500 L170 446" />
        <path d="M161 459 L170 446 L179 459" />
        <text
          x="170"
          y="432"
          textAnchor="middle"
          fontSize="22"
          fontFamily="var(--font-heading), sans-serif"
          fill="currentColor"
          stroke="none"
        >
          N
        </text>
      </svg>
    </div>
  );
}
