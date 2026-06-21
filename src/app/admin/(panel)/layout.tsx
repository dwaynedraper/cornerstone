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
          <Link
            href="/admin"
            className="font-heading text-lg font-semibold tracking-tight text-ink"
          >
            Cornerstone <span className="font-medium text-blueprint">Admin</span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden font-heading text-sm font-medium text-ink-500 transition-colors hover:text-blueprint sm:inline"
            >
              View website ↗
            </a>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-sm border border-ink/15 px-4 py-2 font-heading text-sm font-medium text-ink transition-colors hover:bg-sand-light"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
