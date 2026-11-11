import "server-only";
import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import {
  services as fallbackServices,
  servicesPage as fallbackServicesPage,
  type Service,
} from "@/data/services";
import {
  teamGroups as fallbackTeam,
  type TeamGroup,
  type TeamMember,
} from "@/data/team";
import { whyPoints as fallbackWhy, type WhyPoint } from "@/data/why";
import { faqs as fallbackFaqs, type Faq } from "@/data/faqs";
import { SETTING_DEFAULTS } from "@/lib/settings-fields";

/**
 * Server-side content layer. Every getter reads from Supabase. On an ERROR
 * (env not set, Supabase down, offline build) it falls back to the approved
 * content in `src/data/*`, so the site always renders. An EMPTY result is
 * respected: if every FAQ is unpublished, the FAQ section simply hides.
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
    const fallback = page === "services" ? fallbackServicesPage : fallbackServices;
    if (error || !data) return fallback;
    return (data as ServiceRow[]).map((r) => ({
      id: r.slug,
      name: r.name,
      icon: r.icon as Service["icon"],
      summary: r.summary,
      detail: r.detail,
    }));
  } catch {
    return page === "services" ? fallbackServicesPage : fallbackServices;
  }
});

export const getWhyPoints = cache(async (): Promise<WhyPoint[]> => {
  try {
    const { data, error } = await createPublicClient()
      .from("why_points")
      .select("slug,icon,title,description")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });
    if (error || !data) return fallbackWhy;
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
    if (error || !data) return fallbackFaqs;
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
 * Resolved site copy. Each field is the database value when set, otherwise the
 * approved default from `settings-fields.ts`. An empty result means "hidden".
 */
export type SiteCopy = {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubhead: string;
  heroCtaLabel: string;
  statYears: string;
  statStates: string;
  servicesIntro: string;
  whyClosing: string;
  ctaHeading: string;
  ctaBody: string;
  aboutHeading: string;
  aboutSubhead: string;
  aboutIntro1: string;
  aboutIntro2: string;
  aboutIntro3: string;
  aboutCallout: string;
  founderName: string;
  founderTitle: string;
  founderBio1: string;
  founderBio2: string;
  founderQuote: string;
  contactIntro: string;
  contactPhone: string;
  contactPhoneDisplay: string;
  contactEmail: string;
  address: { street: string; city: string; state: string; zip: string };
  addressDisplay: string;
  footerTagline: string;
  servicesPageHeading: string;
  servicesPageIntro: string;
};

export const getSiteCopy = cache(async (): Promise<SiteCopy> => {
  const s = await getSettings();
  // A stored value wins, even an empty one, so admins can hide optional text.
  // Required fields (headline, name, contact details) fall back when blank.
  const pick = (key: string, required = false) => {
    const v = s[key];
    if (v === undefined) return SETTING_DEFAULTS[key] ?? "";
    if (required && !v.trim()) return SETTING_DEFAULTS[key] ?? "";
    return v.trim();
  };

  const address = {
    street: pick("address_street", true),
    city: pick("address_city", true),
    state: pick("address_state", true),
    zip: pick("address_zip", true),
  };

  return {
    heroEyebrow: pick("hero_eyebrow"),
    heroHeadline: pick("hero_headline", true),
    heroSubhead: pick("hero_subhead"),
    heroCtaLabel: pick("hero_cta_label"),
    statYears: pick("stat_years"),
    statStates: pick("stat_states"),
    servicesIntro: pick("services_intro"),
    whyClosing: pick("why_closing"),
    ctaHeading: pick("cta_heading"),
    ctaBody: pick("cta_body"),
    aboutHeading: pick("about_heading", true),
    aboutSubhead: pick("about_subhead"),
    aboutIntro1: pick("about_intro_1"),
    aboutIntro2: pick("about_intro_2"),
    aboutIntro3: pick("about_intro_3"),
    aboutCallout: pick("about_callout"),
    founderName: pick("founder_name", true),
    founderTitle: pick("founder_title"),
    founderBio1: pick("founder_bio_1"),
    founderBio2: pick("founder_bio_2"),
    founderQuote: pick("founder_quote"),
    contactIntro: pick("contact_intro"),
    contactPhone: pick("contact_phone", true),
    contactPhoneDisplay: pick("contact_phone_display", true),
    contactEmail: pick("contact_email", true),
    address,
    addressDisplay: `${address.street}, ${address.city}, ${address.state} ${address.zip}`,
    footerTagline: pick("footer_tagline"),
    servicesPageHeading: pick("services_page_heading", true),
    servicesPageIntro: pick("services_page_intro"),
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
