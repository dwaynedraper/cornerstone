"use client";

import { m } from "framer-motion";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { site } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-paper">
      {/* subtle full-bleed blueprint wash */}
      <div aria-hidden className="absolute inset-0 blueprint-grid" />
      <div
        aria-hidden
        className="absolute right-[7%] top-28 hidden h-28 w-48 border border-blueprint/15 lg:block"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="max-w-2xl">
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-blueprint sm:text-sm"
          >
            Civil Engineering + Land Surveying &nbsp;·&nbsp; North Texas
          </m.p>

          <m.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="mt-5 font-heading text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-6xl"
          >
            Build-ready lots, on your schedule.
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
            className="mt-6 max-w-xl text-lg leading-8 text-ink-500"
          >
            We take raw land to recorded, build-ready lots — and keep your
            pipeline moving for the next phase.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="/contact"
              className="rounded-sm bg-blueprint px-7 py-3 font-heading text-sm font-medium text-white transition-colors duration-200 hover:bg-blueprint-dark"
            >
              Get a quote
            </a>
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center gap-2 rounded-sm border border-ink px-6 py-3 font-heading text-sm font-medium text-ink transition-colors duration-200 hover:bg-ink/5"
            >
              <PhoneIcon className="h-4 w-4 text-blueprint" aria-hidden />
              {site.phoneDisplay}
            </a>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36, ease: EASE }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-ink-500"
          >
            <span className="border-l-2 border-amber pl-3">25+ years</span>
            <span className="border-l-2 border-amber pl-3">Licensed in 15+ states</span>
            <span className="border-l-2 border-amber pl-3">North Texas</span>
          </m.div>
        </div>
      </div>
    </section>
  );
}
