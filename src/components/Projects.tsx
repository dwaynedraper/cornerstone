import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

type ProjectItem = {
  id: string;
  src: string;
  alt: string;
  label: string;
  caption: string;
};

const defaultProjects: ProjectItem[] = [
  {
    id: "seed-subdivision",
    src: "/subdivision.jpg",
    alt: "Residential subdivision under construction in North Texas",
    label: "Residential Subdivision",
    caption: "Site design through build-ready lots",
  },
  {
    id: "seed-civil",
    src: "/engineer.jpg",
    alt: "Civil engineering site and construction plans",
    label: "Civil & Site Design",
    caption: "Grading, drainage, and construction plans",
  },
  {
    id: "seed-survey",
    src: "/IMG_0854.jpg",
    alt: "Aerial view of a land development project",
    label: "Land & Boundary Survey",
    caption: "Boundary, topographic, and platting",
  },
];

export default function Projects({
  projects = defaultProjects,
}: {
  /** Cards to show. Defaults to the seed set in this file. */
  projects?: ProjectItem[];
}) {
  return (
    <section className="bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-amber">
              Selected work
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Built across North Texas
            </h2>
            <div className="mt-4 h-0.5 w-16 bg-amber" />
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <figure className="group relative overflow-hidden rounded-md border border-white/10">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/20 to-transparent" />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-heading text-base font-semibold text-white">
                    {p.label}
                  </p>
                  <p className="mt-0.5 text-sm text-gray-300">{p.caption}</p>
                </figcaption>
                <span aria-hidden className="absolute left-0 top-0 h-1 w-12 bg-amber" />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
