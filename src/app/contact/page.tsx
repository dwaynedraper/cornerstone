import type { Metadata } from "next";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, ORG_ID } from "@/lib/schema";
import { getSiteCopy } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import GridReveal from "@/components/GridReveal";
import Contours from "@/components/Contours";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Cornerstone Engineering & Surveying in Arlington, TX. Reach a member of our team for information, quotes, or to learn more about our civil engineering and land surveying services. Call +1 817-940-6027.",
  path: "/contact",
});

export const revalidate = 300;

export default async function Contact() {
  const copy = await getSiteCopy();
  return (
    <div>
      <JsonLd data={breadcrumbSchema([{ name: "Contact Us", path: "/contact" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Us",
          url: new URL("/contact", "https://www.cornerstoneengineeringandsurveying.com").toString(),
          about: { "@id": ORG_ID },
        }}
      />

      <section className="relative isolate overflow-hidden bg-paper">
        <div aria-hidden className="absolute inset-0 blueprint-grid" />
        <GridReveal />
        <div className="relative mx-auto max-w-4xl px-6 py-16 sm:py-20 lg:px-8">
          <p className="eyebrow text-blueprint">
            Reach Out
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Get in touch
          </h1>
          {copy.contactIntro && (
            <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-500">
              {copy.contactIntro}
            </p>
          )}
        </div>
      </section>

      <section data-cta-zone="contact-page" className="relative isolate overflow-hidden bg-sand-light py-16 sm:py-24">
        <Contours variant="a" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-ink">
                Cornerstone
              </h2>

              <div className="mt-8 space-y-5">
                <a
                  href={`mailto:${copy.contactEmail}`}
                  className="reg-ticks flex items-center gap-4 rounded-md border border-ink/10 bg-white p-5 transition-colors hover:border-blueprint/40"
                >
                  <EnvelopeIcon className="h-6 w-6 flex-none text-blueprint" aria-hidden />
                  <span className="sr-only">Email</span>
                  <span className="font-heading text-lg font-semibold text-ink">
                    {copy.contactEmail}
                  </span>
                </a>

                <a
                  href={`tel:${copy.contactPhone}`}
                  className="reg-ticks flex items-center gap-4 rounded-md border border-ink/10 bg-white p-5 transition-colors hover:border-blueprint/40"
                >
                  <PhoneIcon className="h-6 w-6 flex-none text-blueprint" aria-hidden />
                  <span className="sr-only">Phone number</span>
                  <span className="font-heading text-lg font-semibold text-ink">
                    {copy.contactPhoneDisplay}
                  </span>
                </a>

                <div className="reg-ticks flex items-start gap-4 rounded-md border border-ink/10 bg-white p-5">
                  <MapPinIcon className="mt-0.5 h-6 w-6 flex-none text-blueprint" aria-hidden />
                  <span className="sr-only">Address</span>
                  <address className="font-heading text-lg font-semibold not-italic text-ink">
                    {copy.address.street}
                    <br />
                    {copy.address.city}, {copy.address.state} {copy.address.zip}
                  </address>
                </div>
              </div>
            </div>

            <div className="relative">
              <div aria-hidden className="section-hatch" />
              <div className="relative rounded-lg border border-ink/10 bg-white p-8 shadow-xs">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
