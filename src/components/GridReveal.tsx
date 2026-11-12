"use client";

import { useEffect, useRef } from "react";

/**
 * Lights up the blueprint grid near the cursor, like a lamp over a drafting
 * table. Drop it inside any positioned section (relative/isolate). It listens
 * on its parent, does nothing on touch screens, and is purely decorative.
 */
export default function GridReveal({ tone = "light" }: { tone?: "light" | "dark" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
      el.style.opacity = "1";
    };
    const leave = () => {
      el.style.opacity = "0";
    };

    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`grid-reveal ${tone === "dark" ? "grid-reveal-dark" : "grid-reveal-light"} pointer-events-none absolute inset-0`}
    />
  );
}
