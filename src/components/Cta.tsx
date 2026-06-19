import Reveal from "@/components/motion/Reveal";
import { site } from "@/data/site";

export default function Cta() {
  return (
    <section className="relative isolate overflow-hidden bg-blueprint-dark py-20 sm:py-24">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 40px)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <Reveal>
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Have a tract of land or a project in the pipeline?
            </h2>
            <div className="mx-auto mt-5 h-0.5 w-24 bg-amber" />
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blueprint-100">
              Tell us about your site and timeline. We&apos;ll help you take it
              from raw land to build-ready lots.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/contact"
                className="rounded-sm bg-amber px-8 py-3 font-heading text-sm font-medium text-amber-text transition-colors duration-200 hover:bg-amber-dark"
              >
                Get a quote
              </a>
              <a
                href={`tel:${site.phone}`}
                className="rounded-sm border border-white/40 px-8 py-3 font-heading text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10"
              >
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
