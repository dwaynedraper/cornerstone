"use client";

import { useCallback, useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export type TourStep = {
  /** CSS selector to spotlight. Omit for a centered intro/outro step. */
  selector?: string;
  title: string;
  text: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
};

/**
 * Runs a guided walkthrough once per browser (remembered in localStorage),
 * and leaves a persistent "?" button to replay it anytime.
 */
export default function Tour({
  tourId,
  steps,
}: {
  tourId: string;
  steps: TourStep[];
}) {
  const run = useCallback(() => {
    const d = driver({
      showProgress: true,
      allowClose: true,
      nextBtnText: "Next",
      prevBtnText: "Back",
      doneBtnText: "Got it",
      popoverClass: "cornerstone-tour",
      steps: steps.map((s) => ({
        element: s.selector,
        popover: {
          title: s.title,
          description: s.text,
          side: s.side ?? "bottom",
          align: s.align ?? "start",
        },
      })),
    });
    d.drive();
  }, [steps]);

  useEffect(() => {
    const key = `cs-tour-${tourId}`;
    let seen = true;
    try {
      seen = !!localStorage.getItem(key);
      if (!seen) localStorage.setItem(key, "1");
    } catch {
      seen = true;
    }
    if (seen) return;
    const t = setTimeout(run, 500); // let the page paint first
    return () => clearTimeout(t);
  }, [tourId, run]);

  return (
    <button
      type="button"
      onClick={run}
      data-tour="help"
      aria-label="Show the walkthrough"
      title="Show the walkthrough"
      className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-blueprint font-heading text-lg font-semibold text-white shadow-lg transition-colors hover:bg-blueprint-dark"
    >
      ?
    </button>
  );
}
