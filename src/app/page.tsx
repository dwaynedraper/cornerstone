import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import WhyChooseUs from "@/components/WhyChooseUs";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import { site } from "@/data/site";
import {
  getServices,
  getWhyPoints,
  getFaqs,
  getSiteCopy,
  getMedia,
  getFeaturedProjects,
} from "@/lib/content";

// Statically rendered, refreshed every 5 min — and on demand when an admin
// saves (the admin will call revalidatePath("/")).
export const revalidate = 300;

export default async function Home() {
  const [services, whyPoints, faqs, copy, heroImage, featured] =
    await Promise.all([
      getServices(),
      getWhyPoints(),
      getFaqs(),
      getSiteCopy(),
      getMedia("hero"),
      getFeaturedProjects(3),
    ]);

  const statItems = [
    { value: copy.statYears, label: "Years of experience" },
    { value: copy.statStates, label: "States licensed" },
    { value: "North TX", label: "Home base" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "5000 S Collins St, Suite 209",
      addressLocality: "Arlington",
      addressRegion: "TX",
      postalCode: "76018",
      addressCountry: "US",
    },
    description:
      "Civil engineering and land surveying for residential developers and homebuilders. Based in Arlington, TX — surveying across Texas, civil and structural engineering nationwide.",
    areaServed: [
      { "@type": "State", name: "Texas" },
      { "@type": "Country", name: "United States" },
    ],
    knowsAbout: [
      "Civil Engineering",
      "Structural Engineering",
      "Land Surveying",
      "Residential Subdivision Design",
      "Platting",
      "Land Development",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero
        eyebrow={copy.heroEyebrow}
        headline={copy.heroHeadline}
        subhead={copy.heroSubhead}
        statYears={copy.statYears}
        statStates={copy.statStates}
        phone={copy.contactPhone}
        phoneDisplay={copy.contactPhoneDisplay}
        imageSrc={heroImage ?? undefined}
      />

      {/* Credentials / stats band */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-y-4 px-6 py-6 lg:flex-row lg:justify-between lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {statItems.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="font-heading text-2xl font-semibold text-ink">
                  {s.value}
                </span>
                <span className="text-sm text-ink-500">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="font-heading text-xs uppercase tracking-wider text-ink-400">
            Engineering {site.engineeringReg} &nbsp;·&nbsp; Surveying{" "}
            {site.surveyingReg}
          </p>
        </div>
      </section>

      <Services services={services} intro={copy.servicesIntro} />
      <Projects projects={featured ?? undefined} />
      <WhyChooseUs points={whyPoints} />
      <Faq faqs={faqs} />
      <Cta />
    </>
  );
}
