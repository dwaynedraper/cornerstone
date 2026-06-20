import Team from "@/components/Team";
import { Metadata } from 'next';
import { getTeamGroups } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the licensed engineers and surveyors behind Cornerstone — a North Texas civil engineering and land surveying firm serving residential developers and homebuilders.",
  alternates: { canonical: "/about" },
};

export const revalidate = 300;

export default async function About() {
  const groups = await getTeamGroups();
  return <Team groups={groups} />;
}
