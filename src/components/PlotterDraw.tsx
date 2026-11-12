"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TARGETS = ".eyebrow:not(.is-drawn), .plot-line:not(.is-drawn), .plot-top:not(.is-drawn)";

/**
 * Pen-plotter effect. Accent lines (eyebrow rules, amber bars, card top lines)
 * draw themselves left to right as they scroll into view.
 *
 * A tiny inline script in the root layout adds `plot-ready` to <html> before
 * first paint, only when the visitor hasn't asked for reduced motion. Without
 * that class every line is simply shown, so nothing depends on this running.
 */
export default function PlotterDraw() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("plot-ready")) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(TARGETS));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-drawn"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-drawn");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.2 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
