import { FaHardHat, FaLayerGroup, FaMapMarkedAlt, FaGlobeAmericas } from "react-icons/fa";
import type { IconType } from "react-icons";
import Reveal from "@/components/motion/Reveal";
import CadBackdrop from "@/components/CadBackdrop";
import { whyPoints as defaultWhyPoints, type WhyPoint } from "@/data/why";

const ICONS: Record<WhyPoint["icon"], IconType> = {
  builders: FaHardHat,
  oneFirm: FaLayerGroup,
  local: FaMapMarkedAlt,
  national: FaGlobeAmericas,
};

export default function WhyChooseUs({
  points = defaultWhyPoints,
}: {
  /** Value props to render. Defaults to the seed data in `src/data/why.ts`. */
  points?: WhyPoint[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-paper py-20 sm:py-28">
      <CadBackdrop className="text-blueprint opacity-10" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-blueprint">
              Our advantage
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Why developers choose Cornerstone
            </h2>
            <div className="mt-4 h-0.5 w-16 bg-amber" />
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:auto-rows-[1fr] sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point, i) => {
            const Icon = ICONS[point.icon];
            return (
              <Reveal key={point.id} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-md border border-ink/10 bg-sand-light p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-blueprint-50 text-blueprint">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-ink-500">
                    {point.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
