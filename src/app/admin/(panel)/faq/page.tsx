import { createClient } from "@/lib/supabase/server";
import { SubmitButton, ConfirmButton } from "@/components/admin/FormButtons";
import AdminPage from "@/components/admin/AdminPage";
import { createFaq, updateFaq, deleteFaq, moveFaq } from "./actions";

type FaqRow = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_published: boolean;
};

const fieldClass =
  "mt-1.5 block w-full rounded-sm border-ink/15 text-ink shadow-xs focus:border-blueprint focus:ring-blueprint";
const labelClass = "font-heading text-sm font-medium text-ink";
const saveClass =
  "mt-5 rounded-sm bg-blueprint px-5 py-2.5 font-heading text-sm font-medium text-white hover:bg-blueprint-dark disabled:opacity-60";

function Fields({ faq }: { faq?: FaqRow }) {
  return (
    <div className="grid gap-4">
      <label className="block">
        <span className={labelClass}>Question</span>
        <input
          name="question"
          required
          defaultValue={faq?.question ?? ""}
          className={fieldClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Answer</span>
        <textarea
          name="answer"
          rows={4}
          required
          defaultValue={faq?.answer ?? ""}
          className={fieldClass}
        />
      </label>
    </div>
  );
}

export default async function FaqAdmin() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true });
  const faqs = (data ?? []) as FaqRow[];

  return (
    <AdminPage
      title="FAQ"
      description="Questions and answers on the home page. These also power the FAQ results Google can show. Edit and Save, reorder, or add a new one below."
      accent="blueprint"
    >
      <div className="space-y-5">
        {faqs.map((f, i) => (
          <article
            key={f.id}
            className="rounded-lg border border-ink/10 bg-white p-6 shadow-xs"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="font-heading text-xs font-semibold uppercase tracking-wider text-ink-400">
                #{i + 1}
              </span>
              <div className="flex items-center gap-1.5">
                <form action={moveFaq}>
                  <input type="hidden" name="id" value={f.id} />
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
                <form action={moveFaq}>
                  <input type="hidden" name="id" value={f.id} />
                  <input type="hidden" name="dir" value="down" />
                  <button
                    type="submit"
                    disabled={i === faqs.length - 1}
                    aria-label="Move down"
                    className="rounded-sm border border-ink/15 px-2.5 py-1 text-ink-500 hover:bg-sand-light disabled:opacity-30"
                  >
                    ↓
                  </button>
                </form>
                <form action={deleteFaq}>
                  <input type="hidden" name="id" value={f.id} />
                  <ConfirmButton
                    message={`Delete this question? This can't be undone.`}
                    className="rounded-sm border border-maroon/30 px-3 py-1 font-heading text-sm font-medium text-maroon hover:bg-maroon/5"
                  >
                    Delete
                  </ConfirmButton>
                </form>
              </div>
            </div>

            <form action={updateFaq}>
              <input type="hidden" name="id" value={f.id} />
              <Fields faq={f} />
              <SubmitButton className={saveClass}>Save changes</SubmitButton>
            </form>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-dashed border-blueprint/30 bg-blueprint-50/40 p-6">
        <h2 className="font-heading text-lg font-semibold text-ink">
          Add a question
        </h2>
        <form action={createFaq} className="mt-4">
          <Fields />
          <SubmitButton pendingText="Adding…" className={saveClass}>
            Add question
          </SubmitButton>
        </form>
      </div>
    </AdminPage>
  );
}
