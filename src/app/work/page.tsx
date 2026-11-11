import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getPublishedProjects } from "@/lib/content";
import Reveal from "@/components/motion/Reveal";
import Cta from "@/components/Cta";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Selected residential land development, civil engineering, and surveying projects by Cornerstone across North Texas.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const projects = await getPublishedProjects();
  // The work section only exists once there are 3+ published projects.
  if (projects.length < 3) notFound();

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-paper">
        <div aria-hidden className="absolute inset-0 blueprint-grid-strong" />
        <div className="relative mx-auto max-w-4xl px-6 py-16 sm:py-20 lg:px-8">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-blueprint">
            Selected work
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Built across North Texas
          </h1>
          <div className="mt-5 h-0.5 w-16 bg-amber" />
          <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-500">
            A look at the residential developments, site work, and surveys behind
            Cornerstone — raw land taken to recorded, build-ready lots.
          </p>
        </div>
      </section>

      <section className="bg-ink py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <Link href={`/work/${p.slug}`} className="group block">
                  <figure className="relative overflow-hidden rounded-md border border-white/10">
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
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-1 w-12 bg-amber"
                    />
                  </figure>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </div>
  );
}
