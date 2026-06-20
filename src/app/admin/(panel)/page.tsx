import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const sections = [
  {
    name: "Services",
    href: "/admin/services",
    description: "The service cards on the home and services pages.",
    ready: true,
  },
  {
    name: "Photos",
    href: "/admin/media",
    description: "Swap the hero photo (more slots arrive with projects).",
    ready: true,
  },
  {
    name: "Projects",
    href: "/admin/projects",
    description: "Your portfolio cards (full project pages coming next).",
    ready: true,
  },
  {
    name: "Team",
    href: "/admin/team",
    description: "People and groups on the About page.",
    ready: true,
  },
  {
    name: "Why Choose Us",
    href: "/admin/why",
    description: "The value points on the home page.",
    ready: true,
  },
  {
    name: "FAQ",
    href: "/admin/faq",
    description: "Questions and answers on the home page.",
    ready: true,
  },
  {
    name: "Site text & contact",
    href: "/admin/settings",
    description: "Headline, intro copy, founder bio, phone, and address.",
    ready: true,
  },
];

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-blueprint">
        Dashboard
      </p>
      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-ink">
        Edit your website
      </h1>
      <div className="mt-4 h-0.5 w-16 bg-amber" />
      <p className="mt-5 max-w-2xl text-ink-500">
        {user?.email ? `Signed in as ${user.email}. ` : ""}
        Pick a section to update. Changes save straight to the live site and
        appear within a few seconds.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {sections.map((s) =>
          s.ready && s.href ? (
            <Link
              key={s.name}
              href={s.href}
              className="group rounded-lg border border-ink/10 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blueprint/40 hover:shadow-md"
            >
              <h2 className="font-heading text-lg font-semibold text-ink group-hover:text-blueprint">
                {s.name}
              </h2>
              <p className="mt-1.5 text-sm leading-6 text-ink-500">
                {s.description}
              </p>
              <span className="mt-4 inline-block font-heading text-sm font-medium text-blueprint">
                Edit →
              </span>
            </Link>
          ) : (
            <div
              key={s.name}
              className="rounded-lg border border-dashed border-ink/15 bg-white/50 p-6"
            >
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-lg font-semibold text-ink-400">
                  {s.name}
                </h2>
                <span className="rounded-full bg-sand px-2 py-0.5 text-[11px] font-medium text-ink-500">
                  Coming soon
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-6 text-ink-400">
                {s.description}
              </p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
