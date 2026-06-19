import Team from "@/components/Team";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the licensed engineers and surveyors behind Cornerstone — a North Texas civil engineering and land surveying firm serving residential developers and homebuilders.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return <Team />;
}
