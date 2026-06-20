"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { MdDesignServices } from "react-icons/md";
import { PiBlueprint } from "react-icons/pi";
import { FaChartGantt, FaBuildingColumns } from "react-icons/fa6";
import { GiEarthAmerica } from "react-icons/gi";
import type { IconType } from "react-icons";
import Reveal from "@/components/motion/Reveal";
import { services as defaultServices, type Service } from "@/data/services";

const ICONS: Record<Service["icon"], IconType> = {
  civil: MdDesignServices,
  structural: FaBuildingColumns,
  survey: PiBlueprint,
  management: FaChartGantt,
  sustainable: GiEarthAmerica,
};

/**
 * Centers an incomplete final row. The grid is 6 cols (3 cards) at lg and
 * 4 cols (2 cards) at sm; cards span 2. When the last row isn't full, we give
 * the orphan card(s) an explicit column start so the row sits centered.
 * Works for any card count, so adding a 6th service (3/3) just falls through.
 */
function centerLastRow(index: number, total: number): string {
  const c: string[] = [];

  // lg — 3 per row
  const lgRem = total % 3;
  if (lgRem === 2) {
    if (index === total - 2) c.push("lg:col-start-2");
    if (index === total - 1) c.push("lg:col-start-4");
  } else if (lgRem === 1 && index === total - 1) {
    c.push("lg:col-start-3");
  }

  // sm — 2 per row
  if (total % 2 === 1 && index === total - 1) c.push("sm:col-start-2");

  return c.join(" ");
}

function ServiceCard({
  service,
  index,
  total,
}: {
  service: Service;
  index: number;
  total: number;
}) {
  const [open, setOpen] = useState(false);
  const Icon = ICONS[service.icon];

  return (
    <Reveal
      delay={index * 0.08}
      className={`col-span-1 h-full sm:col-span-2 ${centerLastRow(index, total)}`}
    >
      <div className="flex h-full flex-col rounded-md border border-ink/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blueprint/40 hover:shadow-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-blueprint-50 text-blueprint">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <h3 className="mt-5 font-heading text-lg font-semibold text-ink">
          {service.name}
        </h3>
        <p className="mt-2 text-[15px] leading-7 text-ink-500">
          {service.summary}
        </p>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-4 inline-flex items-center gap-1.5 self-start font-heading text-sm font-medium text-blueprint transition-colors hover:text-blueprint-dark"
        >
          {open ? "Show less" : "Read more"}
          <ChevronDownIcon
            className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>

        <div
          className={`grid transition-all duration-300 ease-out ${
            open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="text-[15px] leading-7 text-ink-500">{service.detail}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Services({
  services = defaultServices,
  intro = "For more than 25 years, Cornerstone has helped North Texas developers and homebuilders turn raw land into build-ready residential lots — engineering and surveying, under one roof.",
}: {
  /** Service cards to render. Defaults to the seed data in `src/data/services.ts`. */
  services?: Service[];
  /** Intro paragraph under the heading. */
  intro?: string;
}) {
  return (
    <section
      id="services"
      className="relative isolate scroll-mt-24 overflow-hidden bg-paper py-20 sm:py-28"
    >
      {/* Blueprint grid motif, carried over from the hero */}
      <div aria-hidden className="absolute inset-0 blueprint-grid-strong" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-blueprint">
              What we do
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Our services
            </h2>
            <div className="mt-4 h-0.5 w-16 bg-amber" />
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-500">
              For more than 25 years, Cornerstone has helped North Texas
              developers and homebuilders turn raw land into build-ready
              residential lots — engineering and surveying, under one roof.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:auto-rows-[1fr] sm:grid-cols-4 lg:grid-cols-6">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              total={services.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
