import Link from "next/link";
import { signOut } from "@/app/admin/actions";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-sand-light">
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-8">
            <Link
              href="/admin"
              className="font-heading text-lg font-semibold tracking-tight text-ink"
            >
              Cornerstone{" "}
              <span className="font-medium text-blueprint">Admin</span>
            </Link>
            <nav className="hidden gap-6 sm:flex">
              {[
                { href: "/admin", label: "Dashboard" },
                { href: "/admin/services", label: "Services" },
                { href: "/admin/team", label: "Team" },
                { href: "/admin/why", label: "Why" },
                { href: "/admin/faq", label: "FAQ" },
                { href: "/admin/settings", label: "Site text" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-heading text-sm font-medium text-ink-500 transition-colors hover:text-blueprint"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <form action={signOut}>
            <button
              type="submit"
              className="rounded-sm border border-ink/15 px-4 py-2 font-heading text-sm font-medium text-ink transition-colors hover:bg-sand-light"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
