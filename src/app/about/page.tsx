import type { Metadata } from "next";
import Team from "@/components/Team";
import JsonLd from "@/components/JsonLd";
import { getSiteCopy, getTeamGroups } from "@/lib/content";
import { breadcrumbSchema, founderSchema, ORG_ID } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us and Our Team",
  description:
    "Meet the licensed professional engineers and registered professional land surveyors at Cornerstone Engineering & Surveying, led by founder Mitchell K. Lenamond, P.E. Civil, structural, and survey teams in Arlington, TX.",
  path: "/about",
});

export const revalidate = 300;

export default async function About() {
  const [groups, copy] = await Promise.all([getTeamGroups(), getSiteCopy()]);
  const people = groups.flatMap((g) =>
    g.members.map((m) => ({
      "@type": "Person",
      name: m.name,
      jobTitle: m.role,
      worksFor: { "@id": ORG_ID },
    })),
  );
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "About Us", path: "/about" }])} />
      <JsonLd data={founderSchema(copy)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Us",
          about: { "@id": ORG_ID },
          mainEntity: { "@type": "ItemList", name: "Our Team", itemListElement: people },
        }}
      />
      <Team groups={groups} />
    </>
  );
}
