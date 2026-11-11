/** Approved "Why Choose Us?" points, exactly as they read on the live site. */
export interface WhyPoint {
  id: string;
  icon:
    | "expertise"
    | "innovation"
    | "client"
    | "sustainable"
    | "builders"
    | "oneFirm"
    | "local"
    | "national";
  title: string;
  description: string;
}

export const whyPoints: WhyPoint[] = [
  {
    id: "expertise",
    icon: "expertise",
    title: "Expertise",
    description:
      "Our team's diverse skill set allows us to tackle complex challenges across various sectors.",
  },
  {
    id: "innovation",
    icon: "innovation",
    title: "Innovation",
    description:
      "Utilizing state-of-the-art equipment and techniques, we provide accurate and reliable surveying services for boundary determination, topographic mapping, and construction layout.",
  },
  {
    id: "client-centric",
    icon: "client",
    title: "Client-Centric Approach",
    description:
      "We prioritize clear communication and collaboration, tailoring our services to meet your specific needs.",
  },
  {
    id: "sustainable-design",
    icon: "sustainable",
    title: "Sustainable Design",
    description:
      "Our commitment to environmental stewardship is reflected in our sustainable development practices.",
  },
];
