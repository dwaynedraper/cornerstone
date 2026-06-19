import type { Metadata } from "next";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Cornerstone Engineering & Surveying about your North Texas land development or homebuilding project. Call (817) 940-6027 or send us your project details.",
};

export default function Contact() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-paper">
        <div aria-hidden className="absolute inset-0 blueprint-grid" />
        <div className="relative mx-auto max-w-4xl px-6 py-16 sm:py-20 lg:px-8">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-blueprint">
            Get in touch
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Let&apos;s talk about your project
          </h1>
          <div className="mt-5 h-0.5 w-16 bg-amber" />
          <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-500">
            Tell us about your site and timeline, and we&apos;ll help you take it
            from raw land to build-ready lots. The fastest way to reach us is a
            phone call.
          </p>
        </div>
      </section>

      <section className="bg-sand-light py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Phone-first contact details */}
            <div>
              <h2 className="font-heading text-2xl font-semibold text-ink">
                Prefer to talk it through?
              </h2>
              <p className="mt-3 text-ink-500">
                Give us a call — you&apos;ll get a real person who knows the work.
              </p>

              <div className="mt-8 space-y-5">
                <a
                  href={`tel:${site.phone}`}
                  className="flex items-center gap-4 rounded-md border border-ink/10 bg-white p-5 transition-colors hover:border-blueprint/40"
                >
                  <PhoneIcon className="h-6 w-6 flex-none text-blueprint" aria-hidden />
                  <span>
                    <span className="block text-sm text-ink-500">Call us</span>
                    <span className="block font-heading text-lg font-semibold text-ink">
                      {site.phoneDisplay}
                    </span>
                  </span>
                </a>

                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-4 rounded-md border border-ink/10 bg-white p-5 transition-colors hover:border-blueprint/40"
                >
                  <EnvelopeIcon className="h-6 w-6 flex-none text-blueprint" aria-hidden />
                  <span>
                    <span className="block text-sm text-ink-500">Email us</span>
                    <span className="block font-heading text-lg font-semibold text-ink">
                      {site.email}
                    </span>
                  </span>
                </a>

                <div className="flex items-center gap-4 rounded-md border border-ink/10 bg-white p-5">
                  <MapPinIcon className="h-6 w-6 flex-none text-blueprint" aria-hidden />
                  <span>
                    <span className="block text-sm text-ink-500">Service area</span>
                    <span className="block font-heading text-lg font-semibold text-ink">
                      North Texas &amp; nationwide (15+ states)
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Inline form */}
            <div className="rounded-lg border border-ink/10 bg-white p-8 shadow-xs">
              <h2 className="font-heading text-2xl font-semibold text-ink">
                Send us your project
              </h2>
              <p className="mt-2 text-ink-500">
                A few details and we&apos;ll get right back to you about scope and
                timeline.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
