/**
 * Every piece of editable page text, organized by the page it appears on.
 *
 * `default`   = the wording approved and live on the site today. Used when the
 *               database has no value. An empty default means "hidden until set".
 * `suggested` = proposed wording from the June 2026 redesign. Never shown on the
 *               site by itself. The admin shows it beside the field with a
 *               "Use this wording" button, so Mitch can adopt it in one click.
 */

export type SettingField = {
  key: string;
  label: string;
  hint?: string;
  multiline?: boolean;
  default: string;
  suggested?: string;
};

export type SettingGroup = {
  title: string;
  fields: SettingField[];
};

const NAME = "Cornerstone Engineering & Surveying";

export const HOME_TEXT: SettingGroup[] = [
  {
    title: "Hero (top of the home page)",
    fields: [
      {
        key: "hero_eyebrow",
        label: "Small line above the name",
        default: "Welcome to",
        suggested: "Civil Engineering + Land Surveying · North Texas",
      },
      { key: "hero_headline", label: "Headline", default: NAME },
      {
        key: "hero_subhead",
        label: "Sentence under the headline",
        hint: "Leave blank to hide",
        multiline: true,
        default: "",
        suggested:
          "We take raw land to recorded, build-ready lots, and keep your pipeline moving for the next phase.",
      },
      {
        key: "hero_cta_label",
        label: "Hero button text",
        hint: "Leave blank to hide the hero buttons. When set, a call button appears beside it.",
        default: "",
        suggested: "Get a quote",
      },
    ],
  },
  {
    title: "Intro and stats",
    fields: [
      {
        key: "services_intro",
        label: "Intro paragraph above Our Services",
        multiline: true,
        default:
          "Our founder and CEO brings more than 25 years of engineering experience to every project. At Cornerstone Engineering & Surveying, we pair modern design techniques with time-tested principles, and our licensed professional engineers and registered professional land surveyors are dedicated to delivering innovative, sustainable, and cost-effective solutions for our clients.",
        suggested:
          "With more than 25 years of experience, Cornerstone helps North Texas developers and homebuilders turn raw land into build-ready residential lots, with engineering and surveying under one roof.",
      },
      {
        key: "stat_years",
        label: "Stats bar: years",
        hint: "Leave blank to hide the stats bar",
        default: "25+",
      },
      {
        key: "stat_states",
        label: "Stats bar: states licensed",
        default: "15+",
      },
    ],
  },
  {
    title: "Why Choose Us closing",
    fields: [
      {
        key: "why_closing",
        label: "Paragraph under the Why Choose Us points",
        hint: "Leave blank to hide",
        multiline: true,
        default:
          "Whether you're planning a small residential development or a large-scale infrastructure project, Cornerstone Engineering & Surveying has the knowledge, skills, and dedication to bring your vision to life. Contact us today to discuss how we can help you achieve your project goals.",
      },
    ],
  },
  {
    title: "Call-to-action band (bottom of home and Services pages)",
    fields: [
      {
        key: "cta_heading",
        label: "Band heading",
        hint: "Leave blank to hide the band",
        default: "",
        suggested: "Have a tract of land or a project in the pipeline?",
      },
      {
        key: "cta_body",
        label: "Band text",
        multiline: true,
        default: "",
        suggested:
          "Tell us about your site and timeline. We'll help you take it from raw land to build-ready lots.",
      },
    ],
  },
];

export const ABOUT_TEXT: SettingGroup[] = [
  {
    title: "About page",
    fields: [
      { key: "about_heading", label: "Heading", default: "About Us", suggested: "The people behind your projects" },
      {
        key: "about_subhead",
        label: "Paragraph under the heading",
        multiline: true,
        default:
          "At the heart of our success lies a diverse and talented group of professionals dedicated to excellence in civil engineering and surveying. Our team brings together a wealth of experience, innovative thinking, and a commitment to precision that sets us apart in the industry.",
        suggested:
          "A licensed, hands-on team of engineers and surveyors who know North Texas land development, and how to keep a builder's pipeline moving.",
      },
      {
        key: "about_intro_1",
        label: "Left column paragraph",
        multiline: true,
        default:
          "From seasoned engineers with decades of expertise to bright young talents bringing fresh perspectives, each member of our team plays a crucial role in delivering outstanding results for our clients. We pride ourselves on our collaborative approach, combining our individual strengths to tackle complex challenges and drive projects to successful completion.",
        suggested:
          "From seasoned engineers with decades of expertise to sharp young talent bringing fresh perspective, every member of our team plays a role in delivering build-ready results. We pride ourselves on a collaborative approach, combining individual strengths to tackle complex sites and drive projects to completion.",
      },
      {
        key: "about_intro_2",
        label: "Right column paragraph",
        multiline: true,
        default:
          "Our engineers and surveyors are not just technically proficient; they are passionate problem-solvers who thrive on turning vision into reality. Whether it's designing sustainable infrastructure, conducting precise land surveys, or developing cutting-edge solutions for urban development, our team approaches each project with enthusiasm and meticulous attention to detail.",
        suggested:
          "Our engineers and surveyors aren't just technically proficient. They're problem-solvers who thrive on turning raw land into reality. Whether it's designing infrastructure, running precise surveys, or shepherding a plat through approval, the team brings precision and attention to every project.",
      },
      {
        key: "about_intro_3",
        label: "Learning paragraph",
        hint: "Leave blank to hide",
        multiline: true,
        default:
          "We believe in continuous learning and stay at the forefront of industry advancements, ensuring that we bring the latest technologies and methodologies to every project. Our commitment to professional development means that when you work with us, you're partnering with a team that's always evolving and improving.",
      },
      {
        key: "about_callout",
        label: "Highlighted callout",
        hint: "Leave blank to hide",
        multiline: true,
        default:
          "Get to know the individuals who make our company a leader in civil engineering and surveying. Each team member below brings unique skills and experiences that contribute to our collective success and your project's triumph.",
      },
    ],
  },
  {
    title: "Founder",
    fields: [
      { key: "founder_name", label: "Name", default: "Mitchell Lenamond" },
      { key: "founder_title", label: "Title", default: "Licensed Professional Engineer" },
      {
        key: "founder_bio_1",
        label: "Bio paragraph 1",
        multiline: true,
        default:
          "Mitchell K. Lenamond, P.E., is a highly experienced professional engineer with over two decades of expertise in structural and civil engineering. His experience includes roles such as Vice President of Engineering, where he oversaw a team of 180+ professionals across multiple office locations, managing engineering, surveying, and architectural projects. His leadership extends to client relations, project planning, budgeting, and regulatory compliance, ensuring that each project meets the highest standards of quality and efficiency.",
      },
      {
        key: "founder_bio_2",
        label: "Bio paragraph 2",
        multiline: true,
        default:
          "Mitchell's extensive engineering background includes designing commercial and residential structures, specializing in foundation and framing systems, wind load analysis, and infrastructure projects such as highway bridges and culverts. His civil engineering expertise encompasses site feasibility studies, zoning coordination, grading, drainage, and utility planning. Additionally, he is well-versed in forensic inspections, providing structural assessments, foundation deflection analysis, and expert witness testimony.",
      },
      {
        key: "founder_quote",
        label: "Closing line",
        multiline: true,
        default:
          "With a reputation for precision and excellence, Mitchell remains dedicated to delivering innovative, reliable engineering solutions that drive success for clients and communities alike.",
      },
    ],
  },
];

export const SERVICES_PAGE_TEXT: SettingGroup[] = [
  {
    title: "Services page",
    fields: [
      {
        key: "services_page_heading",
        label: "Heading",
        default: "Comprehensive Civil Engineering and Surveying Services",
        suggested: "Engineering and surveying for North Texas development",
      },
      {
        key: "services_page_intro",
        label: "Intro paragraph",
        multiline: true,
        default:
          "From precise land surveys to complex infrastructure design, our team of experienced professionals delivers innovative solutions tailored to your project's unique needs. We combine cutting-edge technology with decades of expertise to ensure your project's success.",
        suggested:
          "From raw land to recorded, build-ready lots, we handle the engineering and surveying that keeps residential development moving, all under one roof.",
      },
    ],
  },
];

export const CONTACT_FIELDS: SettingGroup[] = [
  {
    title: "Contact page",
    fields: [
      {
        key: "contact_intro",
        label: "Intro paragraph",
        multiline: true,
        default:
          "Reach out to a member of our team for information, quotes, or to learn more about our services.",
      },
    ],
  },
  {
    title: "Contact details (used across the whole site)",
    fields: [
      { key: "contact_phone_display", label: "Phone (as shown on the site)", default: "+1 817-940-6027" },
      {
        key: "contact_phone",
        label: "Phone (tap-to-call)",
        hint: "Digits with country code, e.g. +18179406027",
        default: "+18179406027",
      },
      { key: "contact_email", label: "Email", default: "info@cesinbox.com" },
      { key: "address_street", label: "Street address", default: "5000 S Collins St, Suite 209" },
      { key: "address_city", label: "City", default: "Arlington" },
      { key: "address_state", label: "State", default: "TX" },
      { key: "address_zip", label: "ZIP", default: "76018" },
      {
        key: "footer_tagline",
        label: "Footer tagline",
        hint: "Leave blank to hide",
        multiline: true,
        default: "",
        suggested:
          "Civil engineering and land surveying for residential development across North Texas. Licensed in 15+ states.",
      },
    ],
  },
];

export const ALL_GROUPS: SettingGroup[] = [
  ...HOME_TEXT,
  ...ABOUT_TEXT,
  ...SERVICES_PAGE_TEXT,
  ...CONTACT_FIELDS,
];

export const ALL_FIELDS: SettingField[] = ALL_GROUPS.flatMap((g) => g.fields);

export const SETTINGS_KEYS: string[] = ALL_FIELDS.map((f) => f.key);

/** key → approved default wording. */
export const SETTING_DEFAULTS: Record<string, string> = Object.fromEntries(
  ALL_FIELDS.map((f) => [f.key, f.default]),
);
