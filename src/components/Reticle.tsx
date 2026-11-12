/**
 * Instrument crosshair brackets that frame an icon when its card is hovered,
 * like sighting through a total station. Place inside a `relative` icon box,
 * inside a card that has the `group` class.
 */
export default function Reticle() {
  return (
    <span aria-hidden className="reticle">
      <svg viewBox="0 0 62 62" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M2 14V2h12M48 2h12v12M60 48v12H48M14 60H2V48" />
        <path d="M31 0v6M31 56v6M0 31h6M56 31h6" strokeWidth="1" />
      </svg>
    </span>
  );
}
