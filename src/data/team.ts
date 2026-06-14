/**
 * Team roster — single source of truth for the About page.
 *
 * This is intentionally separated from the UI so the roster can be edited
 * without touching component code. When the admin dashboard lands, it can
 * supply this same `TeamGroup[]` shape from an API/CMS and the UI won't change.
 *
 * To add someone: add a `TeamMember` to the right group's `members` array.
 * To add a section: add a new `TeamGroup`. `id` just needs to be unique.
 */

export interface TeamMember {
  /** Stable unique id (not derived from name) — used for React keys and future edits. */
  id: string;
  name: string;
  role: string;
  /** Optional future: headshot URL. UI falls back to initials when absent. */
  imageUrl?: string;
  /** Optional future: short individual bio. */
  bio?: string;
}

export interface TeamGroup {
  /** Stable unique id — used for React keys and future edits. */
  id: string;
  /** Section heading shown on the page, e.g. "Civil Team". */
  name: string;
  members: TeamMember[];
}

export const teamGroups: TeamGroup[] = [
  {
    id: "executive-leadership",
    name: "Executive Leadership",
    members: [
      { id: "mitch-lenamond", name: "Mitch Lenamond, P.E.", role: "Founder and CEO" },
      { id: "bailey-lenamond", name: "Bailey Lenamond", role: "Chief Operating Officer" },
    ],
  },
  {
    id: "administration",
    name: "Administration",
    members: [
      { id: "mallory-draper", name: "Mallory Draper", role: "Operations Manager" },
      { id: "katie-holmes", name: "Katie Holmes", role: "Coordinator" },
    ],
  },
  {
    id: "civil-team",
    name: "Civil Team",
    members: [
      { id: "jason-lenamond", name: "Jason Lenamond", role: "P.E." },
      { id: "eric-chavez", name: "Eric Chavez", role: "E.I.T." },
      { id: "tj-gonzales", name: "Tj Gonzales", role: "E.I.T." },
    ],
  },
  {
    id: "structural-team",
    name: "Structural Team",
    members: [
      { id: "chris-pool", name: "Chris Pool", role: "Regional Structural Manager" },
      { id: "jeremy-barnes", name: "Jeremy Barnes", role: "Senior Designer" },
    ],
  },
  {
    id: "survey-team",
    name: "Survey Team",
    members: [
      { id: "jacob-holmes", name: "Jacob Holmes", role: "R.P.L.S." },
      { id: "dayhibe-montilva", name: "Dayhibe Montilva", role: "Senior Survey Technician" },
      { id: "eddie-okala", name: "Eddie Okala", role: "Party Chief" },
      { id: "ryan-korinek", name: "Ryan Korinek", role: "Party Chief" },
    ],
  },
];
