/** "Why choose us" value props, framed for residential developers and builders. */
export interface WhyPoint {
  id: string;
  icon: "builders" | "oneFirm" | "local" | "national";
  title: string;
  description: string;
}

export const whyPoints: WhyPoint[] = [
  {
    id: "built-for-builders",
    icon: "builders",
    title: "Built for builders",
    description:
      "We understand production schedules. We deliver lots that are ready when your crews are, and we keep the pipeline moving.",
  },
  {
    id: "one-firm",
    icon: "oneFirm",
    title: "Two disciplines, one firm",
    description:
      "Engineering and surveying under one roof means tighter coordination, fewer handoffs, and one point of accountability.",
  },
  {
    id: "north-texas",
    icon: "local",
    title: "North Texas know-how",
    description:
      "We know the jurisdictions, reviewers, and requirements across North Texas — so plats and permits move faster.",
  },
  {
    id: "licensed-nationwide",
    icon: "national",
    title: "Licensed nationwide",
    description:
      "Most of our work is North Texas, but we're licensed in 15+ states for builders and developers who need us beyond the metroplex.",
  },
];
