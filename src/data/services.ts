/**
 * Approved service text, exactly as it reads on the live site.
 * Used only when the database can't be reached. The database is the source
 * of truth once the admin is set up.
 */
export interface Service {
  id: string;
  name: string;
  icon: "civil" | "structural" | "survey" | "management" | "sustainable";
  summary: string;
  /** Optional longer text. When empty, the card shows no "Read more". */
  detail: string;
}

/** Home page "Our Services". */
export const services: Service[] = [
  {
    id: "civil-engineering",
    name: "Civil Engineering",
    icon: "civil",
    summary:
      "From site development and infrastructure design to environmental compliance, we handle projects of all scales with precision and care",
    detail: "",
  },
  {
    id: "land-surveying",
    name: "Land Surveying",
    icon: "survey",
    summary:
      "Utilizing state-of-the-art equipment and techniques, we provide accurate and reliable surveying services for boundary determination, topographic mapping, and construction layout.",
    detail: "",
  },
  {
    id: "project-management",
    name: "Project Management",
    icon: "management",
    summary:
      "We oversee your project from concept to completion, ensuring seamless coordination and timely delivery",
    detail: "",
  },
  {
    id: "sustainable-design",
    name: "Sustainable Design",
    icon: "sustainable",
    summary:
      "Our commitment to environmental stewardship is reflected in our sustainable development practices.",
    detail: "",
  },
];

/** /services page list (same services, the live page ends every line with a period). */
export const servicesPage: Service[] = services.map((s) => ({
  ...s,
  id: `${s.id}-sp`,
  summary: s.summary.endsWith(".") ? s.summary : `${s.summary}.`,
}));
