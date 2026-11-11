import Link from "next/link";
import type { ReactNode } from "react";

/** Shared accent colors for the admin dashboard + editor pages. */
export const accents: Record<string, { bar: string; bg: string }> = {
  blueprint: { bar: "bg-blueprint", bg: "bg-blueprint-50" },
  amber: { bar: "bg-amber", bg: "bg-amber-50" },
  neutral: { bar: "bg-ink/40", bg: "bg-sand" },
};

/**
 * Wraps an editor page in the same panel treatment as the dashboard cards:
 * a back link, a tinted title bar, a full-height colored spine on the left,
 * and a white body for the form/list.
 */
export default function AdminPage({
  title,
  description,
  accent = "blueprint",
  children,
}: {
  title: string;
  description?: string;
  accent?: string;
  children: ReactNode;
}) {
  const a = accents[accent] ?? accents.blueprint;

  return (
    <div>
      <Link
        href="/admin"
        className="font-heading text-sm font-medium text-blueprint hover:text-blueprint-dark"
      >
        ← Dashboard
      </Link>

      <section className="relative mt-3 overflow-hidden rounded-xl border border-ink/10 shadow-xs">
        <div
          aria-hidden
          className={`absolute inset-y-0 left-0 w-1.5 ${a.bar}`}
        />
        <div className={`${a.bg} px-6 py-5 pl-7`}>
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-ink">
            {title}
          </h1>
          {description && (
            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-ink-500">
              {description}
            </p>
          )}
        </div>
        <div className="bg-white p-6 pl-7">{children}</div>
      </section>
    </div>
  );
}
