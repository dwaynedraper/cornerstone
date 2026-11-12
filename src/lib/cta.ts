/**
 * The calls to action we count. Shared by the click tracker, the API route
 * and the admin dashboard, so the names always match.
 */
export const CTA_LABELS = {
  nav_contact: "Nav Contact button",
  phone: "Phone call link",
  email: "Email link",
  contact_form: "Contact form sent",
  contact_button: "Other Contact buttons",
} as const;

export type CtaKey = keyof typeof CTA_LABELS;

export const CTA_KEYS = Object.keys(CTA_LABELS) as CtaKey[];

export function isCta(v: unknown): v is CtaKey {
  return typeof v === "string" && v in CTA_LABELS;
}

/** Where on the page the action happened. */
export const PLACEMENT_LABELS: Record<string, string> = {
  header: "Header",
  footer: "Footer",
  hero: "Home hero",
  "cta-band": "Call-to-action band",
  "contact-page": "Contact page",
  form: "Contact form",
  page: "Page body",
};
