import "server-only";
import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import { services as fallbackServices, type Service } from "@/data/services";
import {
  teamGroups as fallbackTeam,
  type TeamGroup,
  type TeamMember,
} from "@/data/team";
import { whyPoints as fallbackWhy, type WhyPoint } from "@/data/why";
import { faqs as fallbackFaqs, type Faq } from "@/data/faqs";
import { site } from "@/data/site";

/**
 * Server-side content layer. Every getter reads from Supabase and, on ANY
 * error or empty result, falls back to the seed data in `src/data/*`. That
 * means the site always renders — before env is set, if Supabase is down, or
 * during an offline build — and switches to live DB content seamlessly.
 *
 * `cache()` dedupes calls within a single request. Pages set `revalidate`, and
 * the admin will call `revalidatePath` on save so edits appear within seconds.
 */

type ServiceRow = {
  slug: string;
  name: string;
  icon: string;
  summary: string;
  detail: string;
};

type WhyRow = {
  slug: string;
  icon: string;
  title: string;
  description: string;
};

type FaqRow = { question: string; answer: string };

type GroupRow = { id: string; slug: string; name: string };

type MemberRow = {
  id: string;
  group_id: string;
  name: string;
  role: string;
  image_url: string | null;
  bio: string | null;
};

type SettingRow = { key: string; value: string };

export const getServices = cache(
  async (page: string = "home"): Promise<Service[]> => {
    try {
      const { data, error } = await createPublicClient()
        .from("services")
        .select("slug,name,icon,summary,detail")
        .eq("is_published", true)
        .eq("page", page)
        .order("sort_order", { ascending: true });
    if (error || !data?.length) return fallbackServices;
    return (data as ServiceRow[]).map((r) => ({
      id: r.slug,
      name: r.name,
      icon: r.icon as Service["icon"],
      summary: r.summary,
      detail: r.detail,
    }));
  } catch {
    return fallbackServices;
  }
});

export const getWhyPoints = cache(async (): Promise<WhyPoint[]> => {
  try {
    const { data, error } = await createPublicClient()
      .from("why_points")
      .select("slug,icon,title,description")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return fallbackWhy;
    return (data as WhyRow[]).map((r) => ({
      id: r.slug,
      icon: r.icon as WhyPoint["icon"],
      title: r.title,
      description: r.description,
    }));
  } catch {
    return fallbackWhy;
  }
});

export const getFaqs = cache(async (): Promise<Faq[]> => {
  try {
    const { data, error } = await createPublicClient()
      .from("faqs")
      .select("question,answer")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return fallbackFaqs;
    return (data as FaqRow[]).map((r) => ({
      question: r.question,
      answer: r.answer,
    }));
  } catch {
    return fallbackFaqs;
  }
});

export const getTeamGroups = cache(async (): Promise<TeamGroup[]> => {
  try {
    const sb = createPublicClient();
    const { data: groups, error } = await sb
      .from("team_groups")
      .select("id,slug,name")
      .order("sort_order", { ascending: true });
    if (error || !groups?.length) return fallbackTeam;

    const { data: members, error: mErr } = await sb
      .from("team_members")
      .select("id,group_id,name,role,image_url,bio")
      .order("sort_order", { ascending: true });
    if (mErr) return fallbackTeam;

    const memberRows = (members ?? []) as MemberRow[];
    return (groups as GroupRow[]).map((g) => ({
      id: g.slug,
      name: g.name,
      members: memberRows
        .filter((m) => m.group_id === g.id)
        .map<TeamMember>((m) => ({
          id: m.id,
          name: m.name,
          role: m.role,
          imageUrl: m.image_url ?? undefined,
          bio: m.bio ?? undefined,
        })),
    }));
  } catch {
    return fallbackTeam;
  }
});

export type SiteSettings = Record<string, string>;

export const getSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const { data, error } = await createPublicClient()
      .from("site_settings")
      .select("key,value");
    if (error || !data?.length) return {};
    return Object.fromEntries(
      (data as SettingRow[]).map((r) => [r.key, r.value]),
    );
  } catch {
    return {};
  }
});

/**
 * Resolved site copy: every field is the DB value if set, otherwise the exact
 * current default — so the pages look identical when nothing has been edited.
 * Server-only; used by Hero/Services/Team/Mitchell/Footer/contact.
 */
export type SiteCopy = {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubhead: string;
  statYears: string;
  statStates: string;
  servicesIntro: string;
  aboutHeading: string;
  aboutSubhead: string;
  aboutIntro1: string;
  aboutIntro2: string;
  founderName: string;
  founderTitle: string;
  founderBio1: string;
  founderBio2: string;
  founderQuote: string;
  contactPhone: string;
  contactPhoneDisplay: string;
  contactEmail: string;
  addressDisplay: string;
  servicesPageHeading: string;
  servicesPageIntro: string;
};

export const getSiteCopy = cache(async (): Promise<SiteCopy> => {
  const s = await getSettings();
  const pick = (key: string, fallback: string) => {
    const v = s[key];
    return v && v.trim() ? v : fallback;
  };

  const street = pick("address_street", site.address.street);
  const city = pick("address_city", site.address.city);
  const state = pick("address_state", site.address.state);
  const zip = pick("address_zip", site.address.zip);

  return {
    heroEyebrow: pick(
      "hero_eyebrow",
      "Civil Engineering + Land Surveying · North Texas",
    ),
    heroHeadline: pick("hero_headline", site.name),
    heroSubhead: pick(
      "hero_subhead",
      "We take raw land to recorded, build-ready lots — and keep your pipeline moving for the next phase.",
    ),
    statYears: pick("stat_years", site.yearsExperience),
    statStates: pick("stat_states", "15+"),
    servicesIntro: pick(
      "services_intro",
      "For more than 25 years, Cornerstone has helped North Texas developers and homebuilders turn raw land into build-ready residential lots — engineering and surveying, under one roof.",
    ),
    aboutHeading: pick("about_heading", "The people behind your projects"),
    aboutSubhead: pick(
      "about_subhead",
      "A licensed, hands-on team of engineers and surveyors who know North Texas land development — and how to keep a builder's pipeline moving.",
    ),
    aboutIntro1: pick(
      "about_intro_1",
      "From seasoned engineers with decades of expertise to sharp young talent bringing fresh perspective, every member of our team plays a role in delivering build-ready results. We pride ourselves on a collaborative approach — combining individual strengths to tackle complex sites and drive projects to completion.",
    ),
    aboutIntro2: pick(
      "about_intro_2",
      "Our engineers and surveyors aren't just technically proficient; they're problem-solvers who thrive on turning raw land into reality. Whether it's designing infrastructure, running precise surveys, or shepherding a plat through approval, the team brings precision and attention to every project.",
    ),
    founderName: pick("founder_name", "Mitchell Lenamond"),
    founderTitle: pick("founder_title", "Licensed Professional Engineer"),
    founderBio1: pick(
      "founder_bio_1",
      "Mitchell K. Lenamond, P.E., is a highly experienced professional engineer with over two decades of expertise in structural and civil engineering. His experience includes roles such as Vice President of Engineering, where he oversaw a team of 180+ professionals across multiple office locations, managing engineering, surveying, and architectural projects. His leadership extends to client relations, project planning, budgeting, and regulatory compliance, ensuring that each project meets the highest standards of quality and efficiency.",
    ),
    founderBio2: pick(
      "founder_bio_2",
      "Mitchell's extensive engineering background includes designing commercial and residential structures, specializing in foundation and framing systems, wind load analysis, and infrastructure projects such as highway bridges and culverts. His civil engineering expertise encompasses site feasibility studies, zoning coordination, grading, drainage, and utility planning. Additionally, he is well-versed in forensic inspections, providing structural assessments, foundation deflection analysis, and expert witness testimony.",
    ),
    founderQuote: pick(
      "founder_quote",
      "With a reputation for precision and excellence, Mitchell remains dedicated to delivering innovative, reliable engineering solutions that drive success for clients and communities alike.",
    ),
    contactPhone: pick("contact_phone", site.phone),
    contactPhoneDisplay: pick("contact_phone_display", site.phoneDisplay),
    contactEmail: pick("contact_email", site.email),
    addressDisplay: `${street}, ${city}, ${state} ${zip}`,
    servicesPageHeading: pick(
      "services_page_heading",
      "Engineering and surveying for North Texas development",
    ),
    servicesPageIntro: pick(
      "services_page_intro",
      "From raw land to recorded, build-ready lots, we handle the engineering and surveying that keeps residential development moving — under one roof.",
    ),
  };
});

/** Current image URL for a named slot (e.g. "hero"), or null if none set yet.
 *  Callers fall back to the bundled image in /public. */
export const getMedia = cache(async (slot: string): Promise<string | null> => {
  try {
    const { data, error } = await createPublicClient()
      .from("media")
      .select("image_url")
      .eq("slot", slot)
      .maybeSingle();
    if (error || !data) return null;
    return (data as { image_url: string }).image_url;
  } catch {
    return null;
  }
});

export type ProjectCard = {
  id: string;
  slug: string;
  src: string;
  alt: string;
  label: string;
  caption: string;
};

type ProjectListRow = {
  id: string;
  slug: string;
  category: string;
  summary: string;
  cover_image_url: string | null;
};

/** All published projects, ordered. Empty array on error/none. */
export const getPublishedProjects = cache(async (): Promise<ProjectCard[]> => {
  try {
    const { data, error } = await createPublicClient()
      .from("projects")
      .select("id,slug,category,summary,cover_image_url")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });
    if (error || !data) return [];
    return (data as ProjectListRow[]).map((r) => ({
      id: r.id,
      slug: r.slug,
      src: r.cover_image_url ?? "/IMG_0854.jpg",
      alt: r.category,
      label: r.category,
      caption: r.summary,
    }));
  } catch {
    return [];
  }
});

/** Cards become clickable sub-pages once there are 3+ published projects. */
export const isWorkEnabled = cache(async (): Promise<boolean> => {
  return (await getPublishedProjects()).length >= 3;
});

export type ProjectFull = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  location: string;
  scope: string;
  keyStats: string[];
  body: string;
  coverUrl: string | null;
  gallery: { url: string; alt: string }[];
};

type ProjectFullRow = {
  slug: string;
  name: string | null;
  category: string;
  summary: string;
  location: string;
  scope: string;
  key_stats: unknown;
  body: string;
  cover_image_url: string | null;
  project_images:
    | { image_url: string; alt: string | null; sort_order: number }[]
    | null;
};

export const getProjectBySlug = cache(
  async (slug: string): Promise<ProjectFull | null> => {
    try {
      const { data, error } = await createPublicClient()
        .from("projects")
        .select(
          "slug,name,category,summary,location,scope,key_stats,body,cover_image_url,project_images(image_url,alt,sort_order)",
        )
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      if (error || !data) return null;
      const r = data as ProjectFullRow;
      return {
        slug: r.slug,
        name: r.name ?? "",
        category: r.category ?? "",
        summary: r.summary ?? "",
        location: r.location ?? "",
        scope: r.scope ?? "",
        keyStats: Array.isArray(r.key_stats) ? (r.key_stats as string[]) : [],
        body: r.body ?? "",
        coverUrl: r.cover_image_url ?? null,
        gallery: (r.project_images ?? [])
          .slice()
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((im) => ({ url: im.image_url, alt: im.alt ?? "" })),
      };
    } catch {
      return null;
    }
  },
);
