"use client";

import { useEffect } from "react";

/**
 * Counts clicks on calls to action with one listener for the whole site, so
 * new phone or email links are picked up automatically.
 *
 *   data-cta="nav_contact"   explicit name (the header Contact Us buttons)
 *   href="tel:..."           phone
 *   href="mailto:..."        email
 *   href="/contact"          other Contact buttons
 *
 * Placement comes from the nearest data-cta-zone, else header or footer.
 * Honors Do Not Track and Global Privacy Control. The contact form is
 * counted on the server when a message actually sends.
 */
export default function CtaTracker() {
  useEffect(() => {
    const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
    if (nav.doNotTrack === "1" || nav.globalPrivacyControl) return;

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a, [data-cta]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const cta =
        a.getAttribute("data-cta") ??
        (href.startsWith("tel:")
          ? "phone"
          : href.startsWith("mailto:")
            ? "email"
            : href === "/contact"
              ? "contact_button"
              : null);
      if (!cta) return;

      const zone = a.closest("[data-cta-zone]")?.getAttribute("data-cta-zone");
      const placement = zone ?? (a.closest("footer") ? "footer" : a.closest("header") ? "header" : "page");
      const payload = JSON.stringify({ cta, placement, path: window.location.pathname });

      // sendBeacon survives the page unloading (tel: and mailto: hand off to another app).
      if (nav.sendBeacon) {
        nav.sendBeacon("/api/event", new Blob([payload], { type: "text/plain" }));
      } else {
        fetch("/api/event", { method: "POST", body: payload, keepalive: true }).catch(() => {});
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
