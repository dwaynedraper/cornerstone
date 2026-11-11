import { site } from "@/data/site";
import type { Service } from "@/data/services";
import type { SiteCopy } from "@/lib/content";

/**
 * schema.org builders. Every fact here is either visible on the site or is
 * plain business data (name, phone, address, license numbers). Nothing claims
 * content that isn't on the page, which keeps the markup within Google's rules.
 */

const url = (path = "/") => new URL(path, site.url).toString();

export const ORG_ID = url("/#organization");
export const WEBSITE_ID = url("/#website");
export const FOUNDER_ID = url("/about#mitchell-lenamond");

/** The firm. Rendered once per page from the root layout. */
export function organizationSchema(copy: SiteCopy) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": ORG_ID,
        name: site.name,
        alternateName: [site.shortName, "Cornerstone Engineering and Surveying", "CES"],
        url: url("/"),
        logo: {
          "@type": "ImageObject",
          url: url("/logo.png"),
          width: 1080,
          height: 1080,
        },
        image: [url("/IMG_0854.jpg"), url("/subdivision.jpg"), url("/engineer.jpg")],
        description:
          "Civil engineering and land surveying firm. Licensed professional engineers and registered professional land surveyors providing civil engineering, land surveying, project management, and sustainable design.",
        telephone: copy.contactPhone,
        email: copy.contactEmail,
        address: {
          "@type": "PostalAddress",
          streetAddress: copy.address.street,
          addressLocality: copy.address.city,
          addressRegion: copy.address.state,
          postalCode: copy.address.zip,
          addressCountry: "US",
        },
        areaServed: [
          { "@type": "City", name: "Arlington, TX" },
          { "@type": "City", name: "Fort Worth, TX" },
          { "@type": "City", name: "Dallas, TX" },
          { "@type": "Place", name: "Dallas-Fort Worth Metroplex" },
          { "@type": "State", name: "Texas" },
          { "@type": "Country", name: "United States" },
        ],
        knowsAbout: [
          "Civil Engineering",
          "Land Surveying",
          "Boundary Surveys",
          "Topographic Mapping",
          "Construction Layout",
          "Site Development",
          "Infrastructure Design",
          "Environmental Compliance",
          "Project Management",
          "Sustainable Design",
          "Structural Engineering",
        ],
        identifier: [
          {
            "@type": "PropertyValue",
            name: "Texas Engineering Firm Registration",
            value: site.engineeringReg,
          },
          {
            "@type": "PropertyValue",
            name: "Texas Surveying Firm Registration",
            value: site.surveyingReg,
          },
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Engineering Firm Registration",
            identifier: site.engineeringReg,
            recognizedBy: {
              "@type": "GovernmentOrganization",
              name: "Texas Board of Professional Engineers and Land Surveyors",
              url: "https://pels.texas.gov",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Surveying Firm Registration",
            identifier: site.surveyingReg,
            recognizedBy: {
              "@type": "GovernmentOrganization",
              name: "Texas Board of Professional Engineers and Land Surveyors",
              url: "https://pels.texas.gov",
            },
          },
        ],
        founder: { "@id": FOUNDER_ID },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: copy.contactPhone,
          email: copy.contactEmail,
          areaServed: "US",
          availableLanguage: "English",
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: url("/"),
        name: site.name,
        publisher: { "@id": ORG_ID },
        inLanguage: "en-US",
      },
    ],
  };
}

/** The services shown on a page, each tied to the firm. */
export function serviceListSchema(services: Service[], path: string) {
  if (!services.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": url(`${path}#services`),
    name: "Our Services",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        serviceType: s.name,
        description: [s.summary, s.detail].filter(Boolean).join(" "),
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "State", name: "Texas" },
      },
    })),
  };
}

/** Mitchell Lenamond, built only from his visible bio and credentials. */
export function founderSchema(copy: SiteCopy) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: copy.founderName,
    alternateName: ["Mitchell K. Lenamond", "Mitch Lenamond"],
    honorificSuffix: "P.E.",
    jobTitle: "Founder and CEO",
    description: copy.founderBio1,
    worksFor: { "@id": ORG_ID },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Texas A&M University" },
    memberOf: [
      { "@type": "Organization", name: "American Society of Civil Engineers" },
      { "@type": "Organization", name: "American Institute of Steel Construction" },
      { "@type": "Organization", name: "Dallas Builders Association" },
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Engineer license",
      name: "Licensed Professional Engineer (P.E.)",
    },
    knowsAbout: [
      "Structural Engineering",
      "Civil Engineering",
      "Foundation and Framing Systems",
      "Wind Load Analysis",
      "Forensic Inspections",
      "Expert Witness Testimony",
    ],
  };
}

/** Home > Page breadcrumb trail. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: url(it.path),
    })),
  };
}
