"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { PhoneIcon } from "@heroicons/react/24/outline";
import GridReveal from "@/components/GridReveal";
import NorthScale from "@/components/NorthScale";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Home page hero. Text comes from the admin ("Home text"). Optional pieces
 * (eyebrow, sentence, buttons) hide when left blank, which is how the approved
 * live wording renders today.
 */
export default function Hero({
  eyebrow = "Welcome to",
  headline = "Cornerstone Engineering & Surveying",
  subhead = "",
  ctaLabel = "",
  phone = "+18179406027",
  phoneDisplay = "+1 817-940-6027",
  imageSrc = "/IMG_0854.jpg",
}: {
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  /** Hero button text. Empty hides both hero buttons. */
  ctaLabel?: string;
  phone?: string;
  phoneDisplay?: string;
  imageSrc?: string;
}) {
  return (
    <section data-cta-zone="hero" className="relative isolate overflow-hidden bg-ink">
      {/* Full-bleed project photo */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src={imageSrc}
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
      {/* Faint drafting grid, brighter near the cursor */}
      <div aria-hidden className="hero-grid absolute inset-0" />
      <GridReveal tone="dark" />

      <div className="relative mx-auto max-w-7xl px-6 py-32 sm:py-44 lg:px-8 lg:py-52">
        <div className="max-w-3xl">
          {eyebrow && (
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="eyebrow text-amber"
          >
            {eyebrow}
          </m.p>
          )}

          <m.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="mt-5 font-heading font-semibold leading-[1.05] tracking-tight text-white"
            // Scales with the screen so "Engineering & Surveying" always fits on
            // one line: about 28px on a phone, capped at 60px on desktop.
            style={{ fontSize: "clamp(1.5rem, calc((100vw - 3rem) / 11.8), 3.75rem)" }}
          >
            <HeadlineLines text={headline} />
          </m.h1>

          <m.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            style={{ transformOrigin: "left" }}
            className="mt-8 h-1 w-24 bg-amber"
          />

          {subhead && (
          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
            className="mt-6 max-w-xl text-lg leading-8 text-gray-200"
          >
            {subhead}
          </m.p>
          )}

          {ctaLabel && (
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
              {ctaLabel}
            </a>
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 rounded-sm border border-white/40 px-6 py-3 font-heading text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10"
            >
              <PhoneIcon className="h-4 w-4 text-amber" aria-hidden />
              {phoneDisplay}
            </a>
          </m.div>
          )}
        </div>
      </div>
      <NorthScale className="absolute bottom-8 right-6 hidden md:flex lg:right-10" />
    </section>
  );
}

/**
 * Puts the first word on its own line and keeps the rest together:
 * "Cornerstone" / "Engineering & Surveying". The h1 font size scales with the
 * screen width so the second line always fits.
 */
function HeadlineLines({ text }: { text: string }) {
  const space = text.indexOf(" ");
  if (space === -1) return <>{text}</>;
  return (
    <>
      <span className="block">{text.slice(0, space)}</span>
      <span className="block whitespace-nowrap">{text.slice(space + 1)}</span>
    </>
  );
}
