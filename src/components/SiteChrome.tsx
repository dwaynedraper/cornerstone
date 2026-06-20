"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Renders the public site chrome (Header / Footer) for normal pages, and gets
 * out of the way on `/admin` routes — which provide their own chrome. Header
 * and Footer are passed in as slots so this stays a thin client wrapper while
 * the pages themselves remain server-rendered (and statically cacheable).
 */
export default function SiteChrome({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      {header}
      <main className="flex-1">{children}</main>
      {footer}
    </div>
  );
}
