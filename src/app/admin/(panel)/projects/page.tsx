import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { SubmitButton, ConfirmButton } from "@/components/admin/FormButtons";
import ImageUpload from "@/components/admin/ImageUpload";
import {
  createProject,
  updateProject,
  deleteProject,
  moveProject,
  togglePublish,
  uploadProjectCover,
  addProjectImage,
  updateImageAlt,
  deleteProjectImage,
  moveProjectImage,
} from "./actions";

type ProjectRow = {
  id: string;
  name: string;
  category: string;
  summary: string;
  location: string;
  scope: string;
  key_stats: unknown;
  body: string;
  cover_image_url: string | null;
  is_published: boolean;
  sort_order: number;
};

type ImageRow = {
  id: string;
  project_id: string;
  image_url: string;
  alt: string;
  sort_order: number;
};

const MAX = 9;
const fieldClass =
  "mt-1.5 block w-full rounded-sm border-ink/15 text-ink shadow-xs focus:border-blueprint focus:ring-blueprint";
const labelClass = "font-heading text-sm font-medium text-ink";
const saveClass =
  "mt-4 rounded-sm bg-blueprint px-5 py-2.5 font-heading text-sm font-medium text-white hover:bg-blueprint-dark disabled:opacity-60";
const ctrlClass =
  "rounded-sm border border-ink/15 px-2.5 py-1 text-ink-500 hover:bg-sand-light disabled:opacity-30";

const statHints = ["120 acres", "450 lots", "Platted 2023", "18 months"];

function Fields({ project }: { project?: ProjectRow }) {
  const stats = Array.isArray(project?.key_stats)
    ? (project?.key_stats as string[])
    : [];
  return (
    <div className="grid gap-4">
      <label className="block">
        <span className={labelClass}>
          Category{" "}
          <span className="font-normal text-ink-400">(the card label)</span>
        </span>
        <input
          name="category"
          required
          maxLength={24}
          defaultValue={project?.category ?? ""}
          className={fieldClass}
        />
      </label>
      <label className="block">
        <span className={labelClass}>
          Short description{" "}
          <span className="font-normal text-ink-400">(max 160 characters)</span>
        </span>
        <textarea
          name="summary"
          rows={2}
          maxLength={160}
          defaultValue={project?.summary ?? ""}
          className={fieldClass}
        />
      </label>
      <label className="block">
        <span className={labelClass}>
          Location{" "}
          <span className="font-normal text-ink-400">(e.g. Aledo, TX)</span>
        </span>
        <input
          name="location"
          maxLength={40}
          defaultValue={project?.location ?? ""}
          className={fieldClass}
        />
      </label>

      <div className="mt-1 border-t border-ink/10 pt-4">
        <p className="font-heading text-xs font-semibold uppercase tracking-wider text-ink-400">
          Project page — used once 3+ projects are published
        </p>
      </div>

      <label className="block">
        <span className={labelClass}>
          Project title{" "}
          <span className="font-normal text-ink-400">
            (optional — defaults to the category)
          </span>
        </span>
        <input
          name="name"
          maxLength={60}
          defaultValue={project?.name ?? ""}
          className={fieldClass}
        />
      </label>
      <label className="block">
        <span className={labelClass}>
          Scope / services{" "}
          <span className="font-normal text-ink-400">(max 120)</span>
        </span>
        <input
          name="scope"
          maxLength={120}
          defaultValue={project?.scope ?? ""}
          className={fieldClass}
        />
      </label>
      <div>
        <span className={labelClass}>
          Key stats{" "}
          <span className="font-normal text-ink-400">
            (up to 4 — shown as badges)
          </span>
        </span>
        <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <input
              key={i}
              name={`stat_${i}`}
              maxLength={24}
              defaultValue={stats[i] ?? ""}
              placeholder={`e.g. ${statHints[i]}`}
              className="block w-full rounded-sm border-ink/15 text-ink shadow-xs focus:border-blueprint focus:ring-blueprint"
            />
          ))}
        </div>
      </div>
      <label className="block">
        <span className={labelClass}>
          Project page text{" "}
          <span className="font-normal text-ink-400">
            (paragraphs — leave a blank line between them)
          </span>
        </span>
        <textarea
          name="body"
          rows={5}
          defaultValue={project?.body ?? ""}
          className={fieldClass}
        />
      </label>
    </div>
  );
}

export default async function ProjectsAdmin() {
  const supabase = await createClient();
  const [{ data: projData }, { data: imgData }] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase
      .from("project_images")
      .select("*")
      .order("sort_order", { ascending: true }),
  ]);
  const projects = (projData ?? []) as ProjectRow[];
  const images = (imgData ?? []) as ImageRow[];

  return (
    <div>
      <Link
        href="/admin"
        className="font-heading text-sm font-medium text-blueprint hover:text-blueprint-dark"
      >
        ← Dashboard
      </Link>

      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-ink">
        Projects
      </h1>
      <div className="mt-4 h-0.5 w-16 bg-amber" />
      <p className="mt-4 max-w-2xl text-ink-500">
        Your portfolio. The top published projects show on the home page; use
        the arrows to choose their order. New projects start as a draft (hidden)
        until you publish them. Up to nine — pick your best work.
      </p>

      <div className="mt-8 space-y-6">
        {projects.map((p, i) => {
          const gallery = images.filter((im) => im.project_id === p.id);
          return (
          <article
            key={p.id}
            className="rounded-lg border border-ink/10 bg-sand-light/50 p-6"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="font-heading text-xs font-semibold uppercase tracking-wider text-ink-400">
                  #{i + 1}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    p.is_published
                      ? "bg-blueprint-50 text-blueprint"
                      : "bg-sand text-ink-500"
                  }`}
                >
                  {p.is_published ? "Published" : "Draft"}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <form action={moveProject}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="dir" value="up" />
                  <button
                    type="submit"
                    disabled={i === 0}
                    aria-label="Move up"
                    className={ctrlClass}
                  >
                    ↑
                  </button>
                </form>
                <form action={moveProject}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="dir" value="down" />
                  <button
                    type="submit"
                    disabled={i === projects.length - 1}
                    aria-label="Move down"
                    className={ctrlClass}
                  >
                    ↓
                  </button>
                </form>
                <form action={togglePublish}>
                  <input type="hidden" name="id" value={p.id} />
                  <button
                    type="submit"
                    className="rounded-sm border border-blueprint/30 px-3 py-1 font-heading text-sm font-medium text-blueprint hover:bg-blueprint-50"
                  >
                    {p.is_published ? "Unpublish" : "Publish"}
                  </button>
                </form>
                <form action={deleteProject}>
                  <input type="hidden" name="id" value={p.id} />
                  <ConfirmButton
                    message={`Delete "${p.category}"? This can't be undone.`}
                    className="rounded-sm border border-maroon/30 px-3 py-1 font-heading text-sm font-medium text-maroon hover:bg-maroon/5"
                  >
                    Delete
                  </ConfirmButton>
                </form>
              </div>
            </div>

            <ImageUpload
              action={uploadProjectCover}
              hiddenFields={{ id: p.id }}
              label="Cover photo"
              currentUrl={p.cover_image_url ?? "/IMG_0854.jpg"}
            />

            <form action={updateProject} className="mt-4">
              <input type="hidden" name="id" value={p.id} />
              <Fields project={p} />
              <SubmitButton className={saveClass}>Save details</SubmitButton>
            </form>

            <div className="mt-5 border-t border-ink/10 pt-5">
              <p className="font-heading text-sm font-medium text-ink">
                Photo gallery
              </p>
              <p className="mt-0.5 text-xs text-ink-400">
                Shown on the project page. Up to 4 sit inline; 5+ become a grid
                with a lightbox.
              </p>

              {gallery.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {gallery.map((im, gi) => (
                    <li
                      key={im.id}
                      className="flex flex-wrap items-center gap-2 rounded-sm bg-white p-2"
                    >
                      <div className="relative h-14 w-20 flex-none overflow-hidden rounded-sm border border-ink/10">
                        <Image
                          src={im.image_url}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <form
                        action={updateImageAlt}
                        className="flex flex-1 items-center gap-2"
                      >
                        <input type="hidden" name="id" value={im.id} />
                        <input
                          name="alt"
                          defaultValue={im.alt}
                          maxLength={120}
                          placeholder="Describe the photo (accessibility + SEO)"
                          className="min-w-40 flex-1 rounded-sm border-ink/15 text-sm text-ink shadow-xs focus:border-blueprint focus:ring-blueprint"
                        />
                        <SubmitButton className="rounded-sm border border-ink/15 px-3 py-1.5 font-heading text-sm font-medium text-ink hover:bg-sand-light">
                          Save
                        </SubmitButton>
                      </form>
                      <div className="flex items-center gap-1">
                        <form action={moveProjectImage}>
                          <input type="hidden" name="id" value={im.id} />
                          <input type="hidden" name="dir" value="up" />
                          <button
                            type="submit"
                            disabled={gi === 0}
                            aria-label="Move up"
                            className={ctrlClass}
                          >
                            ↑
                          </button>
                        </form>
                        <form action={moveProjectImage}>
                          <input type="hidden" name="id" value={im.id} />
                          <input type="hidden" name="dir" value="down" />
                          <button
                            type="submit"
                            disabled={gi === gallery.length - 1}
                            aria-label="Move down"
                            className={ctrlClass}
                          >
                            ↓
                          </button>
                        </form>
                        <form action={deleteProjectImage}>
                          <input type="hidden" name="id" value={im.id} />
                          <ConfirmButton
                            message="Remove this photo?"
                            className="rounded-sm border border-maroon/30 px-2.5 py-1 font-heading text-sm font-medium text-maroon hover:bg-maroon/5"
                          >
                            ✕
                          </ConfirmButton>
                        </form>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <form
                action={addProjectImage}
                className="mt-3 flex flex-wrap items-center gap-2"
              >
                <input type="hidden" name="project_id" value={p.id} />
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  required
                  className="text-sm text-ink-500 file:mr-3 file:rounded-sm file:border-0 file:bg-blueprint file:px-4 file:py-2 file:font-heading file:text-sm file:font-medium file:text-white hover:file:bg-blueprint-dark"
                />
                <SubmitButton
                  pendingText="Uploading…"
                  className="rounded-sm bg-blueprint px-4 py-2 font-heading text-sm font-medium text-white hover:bg-blueprint-dark disabled:opacity-60"
                >
                  Add photo
                </SubmitButton>
              </form>
            </div>
          </article>
          );
        })}
      </div>

      {projects.length < MAX ? (
        <div className="mt-8 rounded-lg border border-dashed border-blueprint/30 bg-blueprint-50/40 p-6">
          <h2 className="font-heading text-lg font-semibold text-ink">
            Add a project
          </h2>
          <p className="mt-1 text-sm text-ink-500">
            It starts as a draft. Add a cover photo after saving.
          </p>
          <form action={createProject} className="mt-4">
            <Fields />
            <SubmitButton pendingText="Adding…" className={saveClass}>
              Add project
            </SubmitButton>
          </form>
        </div>
      ) : (
        <p className="mt-8 text-sm text-ink-400">
          You&apos;re at the maximum of nine projects — remove one to add
          another. A tight, curated set always shows better than a long list.
        </p>
      )}
    </div>
  );
}
