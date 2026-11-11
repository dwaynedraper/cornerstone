import { SubmitButton } from "@/components/admin/FormButtons";
import { setPublished } from "@/app/admin/publish-actions";

/**
 * Live / Draft / Suggested label plus a one-click Publish or Hide button.
 * "Suggested" items are proposed wording from the 2026 redesign. They stay
 * off the website until someone publishes them.
 */
export default function StatusBar({
  table,
  id,
  isPublished,
  isSuggestion,
}: {
  table: "services" | "why_points" | "faqs";
  id: string;
  isPublished: boolean;
  isSuggestion?: boolean;
}) {
  const label = isPublished ? "Live on site" : isSuggestion ? "Suggested wording" : "Draft (hidden)";
  const tone = isPublished
    ? "border-emerald-600/30 bg-emerald-50 text-emerald-800"
    : isSuggestion
      ? "border-amber/60 bg-amber-50 text-amber-text"
      : "border-ink/15 bg-sand-light text-ink-500";

  return (
    <div className="flex items-center gap-2">
      <span className={`rounded-full border px-2.5 py-0.5 font-heading text-xs font-semibold ${tone}`}>
        {label}
      </span>
      <form action={setPublished}>
        <input type="hidden" name="table" value={table} />
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="publish" value={isPublished ? "false" : "true"} />
        <SubmitButton
          pendingText="…"
          className="rounded-sm border border-blueprint/30 px-3 py-1 font-heading text-sm font-medium text-blueprint hover:bg-blueprint-50 disabled:opacity-60"
        >
          {isPublished ? "Hide" : "Publish"}
        </SubmitButton>
      </form>
    </div>
  );
}
