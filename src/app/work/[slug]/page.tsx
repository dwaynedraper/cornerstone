import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  getProjectBySlug,
  getPublishedProjects,
  isWorkEnabled,
} from "@/lib/content";
import Cta from "@/components/Cta";
import ProjectGallery from "@/components/ProjectGallery";

export const revalidate = 300;

export async function generateStaticParams() {
  if (!(await isWorkEnabled())) return [];
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) return {};
  const title = p.name || p.category;
  return {
    title,
    description:
      p.summary ||
      `${title}${p.location ? ` in ${p.location}` : ""} — a Cornerstone Engineering & Surveying project.`,
    alternates: { canonical: `/work/${p.slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Sub-pages only exist once 3+ projects are published.
  if (!(await isWorkEnabled())) notFound();
  const p = await getProjectBySlug(slug);
  if (!p) notFound();

  const title = p.name || p.category;
  const showEyebrow = Boolean(p.name && p.category);
  const paragraphs = p.body
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink">
        {p.coverUrl && (
          <div aria-hidden className="absolute inset-0">
            <Image
              src={p.coverUrl}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/80 to-ink/55" />
          </div>
        )}
        <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8">
          <Link
            href="/work"
            className="font-heading text-sm font-medium text-amber transition-colors hover:text-amber-dark"
          >
            ← All work
          </Link>
          {showEyebrow && (
            <p className="mt-6 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-amber">
              {p.category}
            </p>
          )}
          <h1 className="mt-3 font-heading text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {p.location && (
            <p className="mt-3 text-lg text-gray-200">{p.location}</p>
          )}
          <div className="mt-6 h-1 w-24 bg-amber" />
          {p.summary && (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200">
              {p.summary}
            </p>
          )}
          {p.keyStats.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-gray-200">
              {p.keyStats.map((s, i) => (
                <span key={i} className="border-l-2 border-amber pl-3">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      {(p.scope || paragraphs.length > 0) && (
        <section className="bg-paper py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            {p.scope && (
              <p className="mb-8">
                <span className="font-heading text-sm font-semibold uppercase tracking-[0.15em] text-blueprint">
                  Scope
                </span>
                <span className="mt-1 block text-ink-500">{p.scope}</span>
              </p>
            )}
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className={`text-lg leading-8 text-ink-500 ${i > 0 ? "mt-6" : ""}`}
              >
                {para}
              </p>
            ))}
          </div>
        </section>
      )}

      {p.gallery.length > 0 && (
        <section className="bg-sand-light py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <p className="mb-8 font-heading text-sm font-semibold uppercase tracking-[0.15em] text-blueprint">
              Gallery
            </p>
            <ProjectGallery images={p.gallery} />
          </div>
        </section>
      )}

      <Cta />
    </div>
  );
}
