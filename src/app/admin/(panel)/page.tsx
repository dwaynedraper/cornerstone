import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const accents: Record<string, { bar: string; bg: string }> = {
  blueprint: { bar: "bg-blueprint", bg: "bg-blueprint-50" },
  amber: { bar: "bg-amber", bg: "bg-amber-50" },
  neutral: { bar: "bg-ink/40", bg: "bg-sand" },
};

const groups = [
  {
    heading: "Home page",
    subtitle: "The first thing visitors see",
    accent: "blueprint",
    items: [
      {
        name: "Home text",
        href: "/admin/home-text",
        description:
          "The headline and sub-text in the hero, the 25+ years / 15+ states stats bar, and the intro line above the services.",
      },
      {
        name: "Hero photo",
        href: "/admin/media",
        description:
          "The full-width background photo at the very top of the home page.",
      },
      {
        name: "Services",
        href: "/admin/services",
        description:
          "The service cards in the 'Our services' block on the home page.",
      },
      {
        name: "Why choose us",
        href: "/admin/why",
        description:
          "The four value points under 'Why developers choose Cornerstone.'",
      },
      {
        name: "FAQ",
        href: "/admin/faq",
        description:
          "The questions and answers near the bottom of the home page (these also power Google's FAQ results).",
      },
    ],
  },
  {
    heading: "Services page",
    subtitle: "Your dedicated /services page",
    accent: "amber",
    items: [
      {
        name: "Services page text",
        href: "/admin/services-page-text",
        description:
          "The heading and intro paragraph at the top of the /services page.",
      },
      {
        name: "Services list",
        href: "/admin/services-page",
        description:
          "The services shown on the /services page — its own list, separate from the home-page block.",
      },
    ],
  },
  {
    heading: "About page",
    subtitle: "Your team and story",
    accent: "blueprint",
    items: [
      {
        name: "About text",
        href: "/admin/about-text",
        description:
          "The About heading, the two intro paragraphs, and Mitchell's founder bio.",
      },
      {
        name: "Team",
        href: "/admin/team",
        description:
          "The people and the groups they belong to — Leadership, Civil, Survey, and so on. Add, edit, and reorder.",
      },
    ],
  },
  {
    heading: "Work",
    subtitle: "Your portfolio",
    accent: "amber",
    items: [
      {
        name: "Projects",
        href: "/admin/projects",
        description:
          "Your portfolio — the project cards, the full project pages, and each project's photo gallery.",
      },
    ],
  },
  {
    heading: "Across the whole site",
    subtitle: "Shows on every page",
    accent: "neutral",
    items: [
      {
        name: "Contact info",
        href: "/admin/contact",
        description:
          "Phone, email, and office address. Used in the footer on every page and on the contact page.",
      },
    ],
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
        Each block below is a page of your site. The cards say exactly what's
        inside, and edits go live within a few seconds.
      </p>

      <div className="mt-10 space-y-8">
        {groups.map((group) => {
          const accent = accents[group.accent];
          return (
            <section
              key={group.heading}
              className="relative overflow-hidden rounded-xl border border-ink/10 shadow-xs"
            >
              {/* full-height colored spine */}
              <div
                aria-hidden
                className={`absolute inset-y-0 left-0 w-1.5 ${accent.bar}`}
              />
              <div className={`${accent.bg} px-6 py-4 pl-7`}>
                <h2 className="font-heading text-lg font-semibold text-ink">
                  {group.heading}
                </h2>
                <p className="text-xs font-medium text-ink-500">
                  {group.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 bg-white p-6 pl-7 sm:grid-cols-2">
                {group.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group rounded-lg border border-ink/10 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blueprint/40 hover:shadow-md"
                  >
                    <h3 className="font-heading text-base font-semibold text-ink group-hover:text-blueprint">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-ink-500">
                      {item.description}
                    </p>
                    <span className="mt-3 inline-block font-heading text-sm font-medium text-blueprint">
                      Edit →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
