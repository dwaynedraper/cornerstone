import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const groups = [
  {
    heading: "Home page",
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
          "The service cards — Civil, Structural, Surveying, and the rest. These also appear on the Services page.",
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
    heading: "About page",
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
        Pick what you'd like to change — each card says exactly what's inside.
        Edits save straight to the live site and appear within a few seconds.
      </p>

      <div className="mt-10 space-y-10">
        {groups.map((group) => (
          <section key={group.heading}>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-blueprint">
              {group.heading}
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {group.items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group rounded-lg border border-ink/10 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blueprint/40 hover:shadow-md"
                >
                  <h3 className="font-heading text-lg font-semibold text-ink group-hover:text-blueprint">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-ink-500">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-block font-heading text-sm font-medium text-blueprint">
                    Edit →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
