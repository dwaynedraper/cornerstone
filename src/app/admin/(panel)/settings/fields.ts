export type SettingField = {
  key: string;
  label: string;
  hint?: string;
  multiline?: boolean;
};

export type SettingGroup = {
  title: string;
  fields: SettingField[];
};

/** Single source of truth for the editable copy/contact fields. The editor
 *  renders these; the save action saves exactly these keys. */
export const SETTINGS_GROUPS: SettingGroup[] = [
  {
    title: "Contact",
    fields: [
      { key: "contact_phone_display", label: "Phone (as shown on the site)" },
      {
        key: "contact_phone",
        label: "Phone (tap-to-call)",
        hint: "Digits with country code, e.g. +18179406027",
      },
      { key: "contact_email", label: "Email" },
      { key: "address_street", label: "Street address" },
      { key: "address_city", label: "City" },
      { key: "address_state", label: "State" },
      { key: "address_zip", label: "ZIP" },
    ],
  },
  {
    title: "Home page",
    fields: [
      {
        key: "hero_eyebrow",
        label: "Hero eyebrow",
        hint: "Small line above the name",
      },
      { key: "hero_headline", label: "Hero headline" },
      { key: "hero_subhead", label: "Hero sub-headline", multiline: true },
      { key: "stat_years", label: "Stat — years", hint: "e.g. 25+" },
      { key: "stat_states", label: "Stat — states", hint: "e.g. 15+" },
      {
        key: "services_intro",
        label: "Services section intro",
        multiline: true,
      },
    ],
  },
  {
    title: "About page",
    fields: [
      { key: "about_heading", label: "Heading" },
      { key: "about_subhead", label: "Sub-heading", multiline: true },
      { key: "about_intro_1", label: "Intro paragraph 1", multiline: true },
      { key: "about_intro_2", label: "Intro paragraph 2", multiline: true },
    ],
  },
  {
    title: "Founder",
    fields: [
      { key: "founder_name", label: "Name" },
      { key: "founder_title", label: "Title" },
      { key: "founder_bio_1", label: "Bio paragraph 1", multiline: true },
      { key: "founder_bio_2", label: "Bio paragraph 2", multiline: true },
      { key: "founder_quote", label: "Closing quote", multiline: true },
    ],
  },
];

export const SETTINGS_KEYS: string[] = SETTINGS_GROUPS.flatMap((g) =>
  g.fields.map((f) => f.key),
);
