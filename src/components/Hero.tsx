"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { PhoneIcon } from "@heroicons/react/24/outline";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero({
  eyebrow = "Civil Engineering + Land Surveying · North Texas",
  headline = "Cornerstone Engineering & Surveying",
  subhead = "We take raw land to recorded, build-ready lots — and keep your pipeline moving for the next phase.",
  statYears = "25+",
  statStates = "15+",
  phone = "+18179406027",
  phoneDisplay = "(817) 940-6027",
}: {
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  statYears?: string;
  statStates?: string;
  phone?: string;
  phoneDisplay?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* Full-bleed project photo */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/IMG_0854.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      {/* Dark wash for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-ink via-ink/75 to-ink/45"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-32 sm:py-44 lg:px-8 lg:py-52">
        <div className="max-w-3xl">
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-amber sm:text-sm"
          >
            {eyebrow}
          </m.p>

          <m.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="mt-5 font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl"
          >
            {headline}
          </m.h1>

          <m.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            style={{ transformOrigin: "left" }}
            className="mt-8 h-1 w-24 bg-amber"
          />

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
            className="mt-6 max-w-xl text-lg leading-8 text-gray-200"
          >
            {subhead}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="/contact"
              className="rounded-sm bg-blueprint px-7 py-3 font-heading text-sm font-medium text-white transition-colors duration-200 hover:bg-blueprint-light"
            >
              Get a quote
            </a>
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 rounded-sm border border-white/40 px-6 py-3 font-heading text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10"
            >
              <PhoneIcon className="h-4 w-4 text-amber" aria-hidden />
              {phoneDisplay}
            </a>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-gray-200"
          >
            <span className="border-l-2 border-amber pl-3">{statYears} years</span>
            <span className="border-l-2 border-amber pl-3">
              Licensed in {statStates} states
            </span>
            <span className="border-l-2 border-amber pl-3">North Texas</span>
          </m.div>
        </div>
      </div>
    </section>
  );
}
