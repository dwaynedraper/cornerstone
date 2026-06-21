import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SubmitButton, ConfirmButton } from "@/components/admin/FormButtons";
import {
  createService,
  updateService,
  deleteService,
  moveService,
} from "@/app/admin/services-actions";

type ServiceRow = {
  id: string;
  name: string;
  icon: string;
  summary: string;
  detail: string;
  sort_order: number;
  is_published: boolean;
};

const ICON_OPTIONS = [
  { value: "civil", label: "Civil / site design" },
  { value: "structural", label: "Structural" },
  { value: "survey", label: "Surveying" },
  { value: "management", label: "Project management" },
  { value: "sustainable", label: "Sustainable design" },
];

const fieldClass =
  "mt-1.5 block w-full rounded-sm border-ink/15 text-ink shadow-xs focus:border-blueprint focus:ring-blueprint";
const labelClass = "font-heading text-sm font-medium text-ink";
const saveClass =
  "mt-5 rounded-sm bg-blueprint px-5 py-2.5 font-heading text-sm font-medium text-white hover:bg-blueprint-dark disabled:opacity-60";

function Fields({ service }: { service?: ServiceRow }) {
  return (
    <div className="grid gap-4">
      <label className="block">
        <span className={labelClass}>Name</span>
        <input
          name="name"
          required
          defaultValue={service?.name ?? ""}
          className={fieldClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Icon</span>
        <select
          name="icon"
          defaultValue={service?.icon ?? "civil"}
          className={fieldClass}
        >
          {ICON_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className={labelClass}>
          Short summary{" "}
          <span className="font-normal text-ink-400">(always visible)</span>
        </span>
        <textarea
          name="summary"
          rows={2}
          required
          defaultValue={service?.summary ?? ""}
          className={fieldClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>
          Details{" "}
          <span className="font-normal text-ink-400">
            (the longer description)
          </span>
        </span>
        <textarea
          name="detail"
          rows={4}
          required
          defaultValue={service?.detail ?? ""}
          className={fieldClass}
        />
      </label>
    </div>
  );
}

/** Service-list editor for one page ("home" or "services"). */
export default async function ServicesEditor({
  page,
  title,
  description,
}: {
  page: string;
  title: string;
  description: string;
}) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("page", page)
    .order("sort_order", { ascending: true });
  const services = (data ?? []) as ServiceRow[];

  return (
    <div>
      <Link
        href="/admin"
        className="font-heading text-sm font-medium text-blueprint hover:text-blueprint-dark"
      >
        ← Dashboard
      </Link>

      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-ink">
        {title}
      </h1>
      <div className="mt-4 h-0.5 w-16 bg-amber" />
      <p className="mt-4 max-w-2xl text-ink-500">{description}</p>

      <div className="mt-8 space-y-5">
        {services.map((s, i) => (
          <article
            key={s.id}
            className="rounded-lg border border-ink/10 bg-white p-6 shadow-xs"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="font-heading text-xs font-semibold uppercase tracking-wider text-ink-400">
                #{i + 1}
              </span>
              <div className="flex items-center gap-1.5">
                <form action={moveService}>
                  <input type="hidden" name="id" value={s.id} />
                  <input type="hidden" name="dir" value="up" />
                  <button
                    type="submit"
                    disabled={i === 0}
                    aria-label="Move up"
                    className="rounded-sm border border-ink/15 px-2.5 py-1 text-ink-500 hover:bg-sand-light disabled:opacity-30"
                  >
                    ↑
                  </button>
                </form>
                <form action={moveService}>
                  <input type="hidden" name="id" value={s.id} />
                  <input type="hidden" name="dir" value="down" />
                  <button
                    type="submit"
                    disabled={i === services.length - 1}
                    aria-label="Move down"
                    className="rounded-sm border border-ink/15 px-2.5 py-1 text-ink-500 hover:bg-sand-light disabled:opacity-30"
                  >
                    ↓
                  </button>
                </form>
                <form action={deleteService}>
                  <input type="hidden" name="id" value={s.id} />
                  <ConfirmButton
                    message={`Delete "${s.name}"? This can't be undone.`}
                    className="rounded-sm border border-maroon/30 px-3 py-1 font-heading text-sm font-medium text-maroon hover:bg-maroon/5"
                  >
                    Delete
                  </ConfirmButton>
                </form>
              </div>
            </div>

            <form action={updateService}>
              <input type="hidden" name="id" value={s.id} />
              <Fields service={s} />
              <SubmitButton className={saveClass}>Save changes</SubmitButton>
            </form>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-dashed border-blueprint/30 bg-blueprint-50/40 p-6">
        <h2 className="font-heading text-lg font-semibold text-ink">
          Add a service
        </h2>
        <form action={createService} className="mt-4">
          <input type="hidden" name="page" value={page} />
          <Fields />
          <SubmitButton pendingText="Adding…" className={saveClass}>
            Add service
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
