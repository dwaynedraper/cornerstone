import type { Metadata } from "next";
import { site } from "@/data/site";

// The share-card image comes from src/app/opengraph-image.jpg (and
// twitter-image.jpg). Next.js adds it to every page automatically.

/**
 * Per-page metadata with a canonical URL, Open Graph and X/Twitter cards.
 * Titles get " | Cornerstone Engineering & Surveying" from the root template.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
    },
  };
}

export const HOME_TITLE =
  "Civil Engineering & Land Surveying in DFW | Cornerstone Engineering & Surveying";

export const HOME_DESCRIPTION =
  "Civil engineering and land surveying in Arlington, TX, serving Dallas-Fort Worth. Led by a licensed professional engineer with more than 25 years of experience. Call +1 817-940-6027.";

