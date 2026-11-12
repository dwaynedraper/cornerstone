/**
 * North arrow and scale bar, the two marks every plan sheet carries.
 * Decorative only, sized small for the hero corner.
 */
export default function NorthScale({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-end gap-5 text-white/75 ${className}`}>
      <svg width="150" height="26" viewBox="0 0 150 26" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="1" y="12" width="148" height="6" />
        <rect x="1" y="12" width="37" height="6" fill="currentColor" fillOpacity=".85" />
        <rect x="75" y="12" width="37" height="6" fill="currentColor" fillOpacity=".85" />
        <path d="M1 8v4M38 8v4M75 8v4M112 8v4M149 8v4" />
      </svg>
      <svg width="30" height="50" viewBox="0 0 30 50" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M15 14 L23 44 L15 38 L7 44 Z" fill="currentColor" fillOpacity=".18" />
        <path d="M15 14 L15 38 L7 44 Z" fill="currentColor" />
        <text
          x="15"
          y="10"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="10"
          fontWeight="600"
          style={{ fontFamily: "var(--ff-body), sans-serif" }}
        >
          N
        </text>
      </svg>
    </div>
  );
}
