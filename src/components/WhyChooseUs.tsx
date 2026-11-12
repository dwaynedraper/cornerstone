import {
  FaHardHat,
  FaLayerGroup,
  FaMapMarkedAlt,
  FaGlobeAmericas,
  FaAward,
  FaLightbulb,
  FaHandshake,
  FaLeaf,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import Reveal from "@/components/motion/Reveal";
import { balancedCols, LG_COLS } from "@/lib/grid";
import Contours from "@/components/Contours";
import Reticle from "@/components/Reticle";
import { whyPoints as defaultWhyPoints, type WhyPoint } from "@/data/why";

const ICONS: Record<WhyPoint["icon"], IconType> = {
  expertise: FaAward,
  innovation: FaLightbulb,
  client: FaHandshake,
  sustainable: FaLeaf,
  builders: FaHardHat,
  oneFirm: FaLayerGroup,
  local: FaMapMarkedAlt,
  national: FaGlobeAmericas,
};

export default function WhyChooseUs({
  points = defaultWhyPoints,
  closing = "",
}: {
  /** Value props to render. Defaults to the approved data in `src/data/why.ts`. */
  points?: WhyPoint[];
  /** Closing paragraph under the cards. Empty hides it. */
  closing?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-paper py-20 sm:py-28">
      <Contours variant="a" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div>
            <p className="eyebrow text-blueprint">
              Our Advantage
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Why Choose Us?
            </h2>
          </div>
        </Reveal>

        <div
          className={`mt-12 grid grid-cols-1 gap-6 sm:auto-rows-[1fr] sm:grid-cols-2 ${LG_COLS[balancedCols(points.length)]}`}
        >
          {points.map((point, i) => {
            const Icon = ICONS[point.icon] ?? FaAward;
            return (
              <Reveal key={point.id} delay={i * 0.08} className="h-full">
                <div className="reg-ticks plot-top group flex h-full flex-col rounded-md border border-ink/10 border-t-2 bg-sand-light p-7">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-sm bg-blueprint-50 text-blueprint">
                    <Icon className="h-6 w-6" aria-hidden />
                    <Reticle />
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

        {closing && (
          <Reveal>
            <p className="mx-auto mt-16 max-w-4xl text-center font-heading text-xl font-medium leading-9 text-ink">
              {closing}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
