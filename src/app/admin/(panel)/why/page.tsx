import { createClient } from "@/lib/supabase/server";
import { SubmitButton, ConfirmButton } from "@/components/admin/FormButtons";
import AdminPage from "@/components/admin/AdminPage";
import { createWhy, updateWhy, deleteWhy, moveWhy } from "./actions";

type WhyRow = {
  id: string;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
  is_published: boolean;
};

const ICON_OPTIONS = [
  { value: "builders", label: "Hard hat — built for builders" },
  { value: "oneFirm", label: "Layers — one firm" },
  { value: "local", label: "Map pin — local" },
  { value: "national", label: "Globe — nationwide" },
];

const fieldClass =
  "mt-1.5 block w-full rounded-sm border-ink/15 text-ink shadow-xs focus:border-blueprint focus:ring-blueprint";
const labelClass = "font-heading text-sm font-medium text-ink";
const saveClass =
  "mt-5 rounded-sm bg-blueprint px-5 py-2.5 font-heading text-sm font-medium text-white hover:bg-blueprint-dark disabled:opacity-60";

function Fields({ point }: { point?: WhyRow }) {
  return (
    <div className="grid gap-4">
      <label className="block">
        <span className={labelClass}>Icon</span>
        <select
          name="icon"
          defaultValue={point?.icon ?? "builders"}
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
        <span className={labelClass}>Title</span>
        <input
          name="title"
          required
          defaultValue={point?.title ?? ""}
          className={fieldClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Description</span>
        <textarea
          name="description"
          rows={3}
          required
          defaultValue={point?.description ?? ""}
          className={fieldClass}
        />
      </label>
    </div>
  );
}

export default async function WhyAdmin() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("why_points")
    .select("*")
    .order("sort_order", { ascending: true });
  const points = (data ?? []) as WhyRow[];

  return (
    <AdminPage
      title="Why choose us"
      description="The value points on the home page. Edit and Save, reorder with the arrows, or add a new one below."
      accent="blueprint"
    >
      <div className="space-y-5">
        {points.map((p, i) => (
          <article
            key={p.id}
            className="rounded-lg border border-ink/10 bg-white p-6 shadow-xs"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="font-heading text-xs font-semibold uppercase tracking-wider text-ink-400">
                #{i + 1}
              </span>
              <div className="flex items-center gap-1.5">
                <form action={moveWhy}>
                  <input type="hidden" name="id" value={p.id} />
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
                <form action={moveWhy}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="dir" value="down" />
                  <button
                    type="submit"
                    disabled={i === points.length - 1}
                    aria-label="Move down"
                    className="rounded-sm border border-ink/15 px-2.5 py-1 text-ink-500 hover:bg-sand-light disabled:opacity-30"
                  >
                    ↓
                  </button>
                </form>
                <form action={deleteWhy}>
                  <input type="hidden" name="id" value={p.id} />
                  <ConfirmButton
                    message={`Delete "${p.title}"? This can't be undone.`}
                    className="rounded-sm border border-maroon/30 px-3 py-1 font-heading text-sm font-medium text-maroon hover:bg-maroon/5"
                  >
                    Delete
                  </ConfirmButton>
                </form>
              </div>
            </div>

            <form action={updateWhy}>
              <input type="hidden" name="id" value={p.id} />
              <Fields point={p} />
              <SubmitButton className={saveClass}>Save changes</SubmitButton>
            </form>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-dashed border-blueprint/30 bg-blueprint-50/40 p-6">
        <h2 className="font-heading text-lg font-semibold text-ink">
          Add a point
        </h2>
        <form action={createWhy} className="mt-4">
          <Fields />
          <SubmitButton pendingText="Adding…" className={saveClass}>
            Add point
          </SubmitButton>
        </form>
      </div>
    </AdminPage>
  );
}
