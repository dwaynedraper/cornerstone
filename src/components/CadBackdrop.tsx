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
        {/* ── Data / curve table (top-left) ── */}
        <rect x="240" y="70" width="250" height="92" />
        <path d="M240 102 L490 102" />
        <path d="M240 132 L490 132" />
        <path d="M330 70 L330 162" />
        <path d="M410 70 L410 162" />

        {/* ── Topographic contour lines (left → center) ── */}
        <path d="M-40 178 C 180 138, 380 216, 560 170 S 760 132, 880 184" />
        <path d="M-40 230 C 180 192, 380 270, 560 224 S 760 178, 880 234" />
        <path d="M-40 288 C 200 250, 420 324, 620 278 S 820 232, 940 290" />
        <path d="M-40 348 C 200 312, 420 386, 620 338 S 820 294, 940 352" />

        {/* ── Detail callout bubble + leader + crosshair (center) ── */}
        <circle cx="680" cy="250" r="46" />
        <path d="M656 250 L704 250 M680 226 L680 274" />
        <path d="M712 218 L848 152" />

        {/* ── Parcel boundary (right) ── */}
        <path d="M860 70 L1380 120 L1350 520 L840 480 Z" />
        {/* lot divisions */}
        <path d="M952 84 L930 488" />
        <path d="M1038 92 L1018 494" />
        <path d="M1124 100 L1106 500" />
        <path d="M1210 108 L1194 506" />
        <path d="M1296 116 L1284 512" />
        <path d="M850 232 L1366 270" />
        <path d="M846 352 L1356 392" />

        {/* ── Curved street + cul-de-sac ── */}
        <path d="M840 414 C 1010 354, 1150 418, 1256 358" />
        <circle cx="1291" cy="348" r="34" />
        <circle cx="1291" cy="348" r="7" />

        {/* ── Building setback (dashed) + footprint ── */}
        <rect x="1026" y="150" width="78" height="104" strokeDasharray="6 6" />
        <rect x="1042" y="178" width="44" height="54" />

        {/* ── Dimension line under the parcel ── */}
        <path d="M860 560 L1350 560" />
        <path d="M860 548 L860 572" />
        <path d="M1350 548 L1350 572" />
        <path d="M872 553 L860 560 L872 567" />
        <path d="M1338 553 L1350 560 L1338 567" />

        {/* ── Survey centerline with station ticks (bottom-center) ── */}
        <path d="M40 562 L770 472" strokeDasharray="14 9" />
        <path d="M150 549 L146 536" />
        <path d="M270 535 L266 522" />
        <path d="M390 521 L386 508" />
        <path d="M510 506 L506 493" />
        <path d="M630 491 L626 478" />

        {/* ── Compass rose (bottom-left) ── */}
        <circle cx="150" cy="430" r="44" />
        <circle cx="150" cy="430" r="10" />
        <path d="M150 380 L150 480 M100 430 L200 430" />
        <path d="M150 386 L142 414 L158 414 Z" />
        <text
          x="150"
          y="372"
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
