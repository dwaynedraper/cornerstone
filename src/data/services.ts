/**
 * Home-page services. `summary` shows inline (always visible, indexable);
 * `detail` is the deeper, keyword-rich copy revealed on "expand".
 * `icon` is a key mapped to an icon component in the Services component.
 */
export interface Service {
  id: string;
  name: string;
  icon: "civil" | "structural" | "survey" | "management" | "sustainable";
  summary: string;
  detail: string;
}

export const services: Service[] = [
  {
    id: "civil-engineering",
    name: "Civil Engineering",
    icon: "civil",
    summary:
      "Site and subdivision design that turns raw North Texas acreage into build-ready residential lots.",
    detail:
      "Our civil engineers handle the full scope of residential land development — grading and drainage, water and sanitary sewer design, paving and street layout, stormwater management, and full construction plans. We design subdivisions that move smoothly from concept through city and county approval to a build-ready site, so your homebuilders can start vertical construction on schedule.",
  },
  {
    id: "structural-engineering",
    name: "Structural Engineering",
    icon: "structural",
    summary:
      "Foundation, framing, and load design that keeps what you build standing strong — across Texas and beyond.",
    detail:
      "Our structural engineers handle the systems that hold a project up — foundations and slabs, wood and steel framing, and wind and load analysis designed and stamped to code. From single homes to larger structures, and licensed in 15+ states, we back builders and developers well beyond North Texas.",
  },
  {
    id: "land-surveying",
    name: "Land Surveying",
    icon: "survey",
    summary:
      "Accurate boundary, topographic, and construction surveys — plus the platting that gets your lots recorded.",
    detail:
      "Using current GPS and robotic equipment, our registered professional land surveyors deliver boundary surveys, topographic surveys, ALTA/NSPS land title surveys, and construction staking. We also prepare and process the subdivision plats that turn a tract of land into recorded, sellable residential lots.",
  },
  {
    id: "project-management",
    name: "Project Management",
    icon: "management",
    summary:
      "One team guiding your project from raw land through entitlements to a finished, recorded subdivision.",
    detail:
      "We manage the moving parts most developers would rather not chase — coordinating with city and county jurisdictions, navigating entitlements and permitting, and keeping engineering, surveying, and construction in step. The result is fewer surprises, predictable timelines, and lots delivered when your builders need them.",
  },
  {
    id: "sustainable-design",
    name: "Sustainable Design",
    icon: "sustainable",
    summary:
      "Responsible drainage, grading, and land-use practices that protect the site and satisfy reviewers.",
    detail:
      "Smart, sustainable site design is more than good stewardship — it clears reviews faster and protects your investment. We design for effective stormwater management, erosion control, and responsible land use that meets current regulatory standards across the jurisdictions where we work.",
  },
];
