import Hero from "@/components/Hero";
import Services from "@/components/Services";
import PhotoBand from "@/components/PhotoBand";
import Projects from "@/components/Projects";
import WhyChooseUs from "@/components/WhyChooseUs";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import JsonLd from "@/components/JsonLd";
import { site } from "@/data/site";
import { serviceListSchema } from "@/lib/schema";
import {
  getServices,
  getWhyPoints,
  getFaqs,
  getSiteCopy,
  getMedia,
  getPublishedProjects,
} from "@/lib/content";

// Statically rendered, refreshed every 5 min, and on demand when an admin saves.
export const revalidate = 300;

export default async function Home() {
  const [services, whyPoints, faqs, copy, heroImage, published] =
    await Promise.all([
      getServices(),
      getWhyPoints(),
      getFaqs(),
      getSiteCopy(),
      getMedia("hero"),
      getPublishedProjects(),
    ]);

  const workEnabled = published.length >= 3;

  return (
    <>
      <JsonLd data={serviceListSchema(services, "/")} />

      <Hero
        eyebrow={copy.heroEyebrow}
        headline={copy.heroHeadline}
        subhead={copy.heroSubhead}
        ctaLabel={copy.heroCtaLabel}
        phone={copy.contactPhone}
        phoneDisplay={copy.contactPhoneDisplay}
        imageSrc={heroImage ?? undefined}
      />

      {/* Stats band. Hidden until the admin sets the stats. */}
      {copy.statYears && (
        <section className="border-b border-ink/10 bg-paper">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-y-4 px-6 py-6 lg:flex-row lg:justify-between lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {[
                { value: copy.statYears, label: "Years of experience" },
                ...(copy.statStates
                  ? [{ value: copy.statStates, label: "States licensed" }]
                  : []),
                { value: "North TX", label: "Home base" },
              ].map((s) => (
                <div key={s.label} className="flex items-baseline gap-2">
                  <span className="font-heading text-2xl font-semibold text-ink">
                    {s.value}
                  </span>
                  <span className="text-sm text-ink-500">{s.label}</span>
                </div>
              ))}
            </div>
            <p className="font-heading text-xs uppercase tracking-wider text-ink-500">
              Engineering {site.engineeringReg} &nbsp;·&nbsp; Surveying{" "}
              {site.surveyingReg}
            </p>
          </div>
        </section>
      )}

      <Services services={services} intro={copy.servicesIntro} />

      <PhotoBand
        src="/subdivision.jpg"
        alt="Residential subdivision under construction in North Texas, with graded lots and new streets"
      />

      {published.length > 0 && (
        <Projects projects={published.slice(0, 3)} workEnabled={workEnabled} />
      )}

      <WhyChooseUs points={whyPoints} closing={copy.whyClosing} />

      <PhotoBand
        src="/engineer.jpg"
        alt="Cornerstone civil engineer drafting a site plan in AutoCAD"
      />

      <Faq faqs={faqs} />
      <Cta />
    </>
  );
}
