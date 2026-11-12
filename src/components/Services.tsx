"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { MdDesignServices } from "react-icons/md";
import { PiBlueprint } from "react-icons/pi";
import { FaChartGantt, FaBuildingColumns } from "react-icons/fa6";
import { GiEarthAmerica } from "react-icons/gi";
import type { IconType } from "react-icons";
import Reveal from "@/components/motion/Reveal";
import { balancedCols } from "@/lib/grid";
import { services as defaultServices, type Service } from "@/data/services";
import Reticle from "@/components/Reticle";
import GridReveal from "@/components/GridReveal";

const ICONS: Record<Service["icon"], IconType> = {
  civil: MdDesignServices,
  structural: FaBuildingColumns,
  survey: PiBlueprint,
  management: FaChartGantt,
  sustainable: GiEarthAmerica,
};

/**
 * The grid uses twice as many tracks as cards per row, and each card spans 2.
 * That lets a short last row sit centered. Column counts come from
 * balancedCols(), so the last row is never a single card.
 */
const LG_TRACKS: Record<number, string> = {
  1: "lg:grid-cols-2",
  2: "lg:grid-cols-4",
  3: "lg:grid-cols-6",
  4: "lg:grid-cols-8",
};
const LG_START: Record<number, string> = {
  2: "lg:col-start-2",
  3: "lg:col-start-3",
  4: "lg:col-start-4",
};

function placement(index: number, total: number, cols: number): string {
  const c: string[] = [];
  // Tablet: 2 per row. An odd last card is centered.
  const smOrphan = total % 2 === 1 && index === total - 1;
  if (smOrphan) c.push("sm:col-start-2");
  // Desktop: center the short last row by offsetting its first card.
  const rem = total % cols;
  const firstOfLastRow = total - rem;
  if (rem > 0 && index === firstOfLastRow) {
    c.push(LG_START[cols - rem + 1] ?? "");
  } else if (smOrphan) {
    c.push("lg:col-start-auto");
  }
  return c.join(" ");
}

function ServiceCard({
  service,
  index,
  total,
  cols,
}: {
  service: Service;
  index: number;
  total: number;
  cols: number;
}) {
  const [open, setOpen] = useState(false);
  const Icon = ICONS[service.icon];

  return (
    <Reveal
      delay={index * 0.08}
      className={`col-span-1 h-full sm:col-span-2 ${placement(index, total, cols)}`}
    >
      <div className="reg-ticks group flex h-full flex-col rounded-md border border-ink/10 bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-blueprint/40 hover:shadow-[0_12px_28px_-18px_rgba(18,58,102,0.35)]">
        <div className="flex items-center justify-between">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-sm bg-blueprint-50 text-blueprint">
            <Icon className="h-6 w-6" aria-hidden />
            <Reticle />
          </div>
          <span aria-hidden className="figure-num">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="mt-5 font-heading text-lg font-semibold text-ink">
          {service.name}
        </h3>
        <p className="mt-2 text-[15px] leading-7 text-ink-500">
          {service.summary}
        </p>

        {service.detail && (
        <>
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
        </>
        )}
      </div>
    </Reveal>
  );
}

export default function Services({
  services = defaultServices,
  intro = "",
}: {
  /** Service cards to render. Defaults to the seed data in `src/data/services.ts`. */
  services?: Service[];
  /** Intro paragraph under the heading. */
  intro?: string;
}) {
  const cols = balancedCols(services.length);
  return (
    <section
      id="services"
      className="relative isolate scroll-mt-24 overflow-hidden bg-paper py-20 sm:py-28"
    >
      {/* Blueprint grid motif, carried over from the hero */}
      <div aria-hidden className="absolute inset-0 blueprint-grid-strong" />
      <GridReveal />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div>
            <p className="eyebrow text-blueprint">
              What We Do
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Our Services
            </h2>
            {intro && (
              <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-500">
                {intro}
              </p>
            )}
          </div>
        </Reveal>

        <div
          className={`mt-12 grid grid-cols-1 gap-6 sm:auto-rows-[1fr] sm:grid-cols-4 ${LG_TRACKS[cols]}`}
        >
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              total={services.length}
              cols={cols}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
