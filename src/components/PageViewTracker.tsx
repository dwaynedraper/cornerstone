"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Sends one tiny "page viewed" ping per page. Honors Do Not Track and
 * Global Privacy Control: if the browser asks not to be tracked, nothing is sent.
 */
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
    if (nav.doNotTrack === "1" || nav.globalPrivacyControl) return;

    const payload = JSON.stringify({ path: pathname, ref: document.referrer });
    if (nav.sendBeacon) {
      nav.sendBeacon("/api/hit", new Blob([payload], { type: "text/plain" }));
    } else {
      fetch("/api/hit", { method: "POST", body: payload, keepalive: true }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
