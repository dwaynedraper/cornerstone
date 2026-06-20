import Link from "next/link";
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
} from "./actions";

type ProjectRow = {
  id: string;
  category: string;
  summary: string;
  location: string;
  cover_image_url: string | null;
  is_published: boolean;
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

function Fields({ project }: { project?: ProjectRow }) {
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
    </div>
  );
}

export default async function ProjectsAdmin() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  const projects = (data ?? []) as ProjectRow[];

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
        {projects.map((p, i) => (
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
          </article>
        ))}
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
