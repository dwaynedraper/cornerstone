import type { Metadata } from "next";
import { MdDesignServices } from "react-icons/md";
import { PiBlueprint } from "react-icons/pi";
import { FaChartGantt } from "react-icons/fa6";
import { GiEarthAmerica } from "react-icons/gi";
import type { IconType } from "react-icons";
import Reveal from "@/components/motion/Reveal";
import Cta from "@/components/Cta";
import { services, type Service } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Civil engineering, land surveying, project management, and sustainable design for residential land development and homebuilders across North Texas.",
};

const ICONS: Record<Service["icon"], IconType> = {
  civil: MdDesignServices,
  survey: PiBlueprint,
  management: FaChartGantt,
  sustainable: GiEarthAmerica,
};

export default function ServicesPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-paper">
        <div aria-hidden className="absolute inset-0 bg-blueprint-grid" />
        <div className="relative mx-auto max-w-4xl px-6 py-16 sm:py-20 lg:px-8">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-blueprint">
            What we do
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Engineering and surveying for North Texas development
          </h1>
          <div className="mt-5 h-0.5 w-16 bg-amber" />
          <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-500">
            From raw land to recorded, build-ready lots, we handle the
            engineering and surveying that keeps residential development moving —
            under one roof.
          </p>
        </div>
      </section>

      <section className="bg-sand-light py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((service, i) => {
              const Icon = ICONS[service.icon];
              return (
                <Reveal key={service.id} delay={i * 0.08} className="h-full">
                  <div className="flex h-full gap-5 rounded-md border border-ink/10 bg-white p-8">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded bg-blueprint-50 text-blueprint">
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                    <div>
                      <h2 className="font-heading text-xl font-semibold text-ink">
                        {service.name}
                      </h2>
                      <p className="mt-2 text-[15px] font-medium leading-7 text-ink">
                        {service.summary}
                      </p>
                      <p className="mt-3 text-[15px] leading-7 text-ink-500">
                        {service.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Cta />
    </div>
  );
}
