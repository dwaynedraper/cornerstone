"use client";

/**
 * Helpers under a text field. Fills the field in the browser. Nothing is saved
 * until "Save all changes" is pressed, so it's safe to try a suggestion.
 */
function fill(name: string, text: string) {
  const el = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(
    `[name="${name}"]`,
  );
  if (!el) return;
  el.value = text;
  el.focus();
}

export default function WordingHelpers({
  name,
  current,
  original,
  suggested,
}: {
  name: string;
  current: string;
  original: string;
  suggested?: string;
}) {
  const showSuggestion = !!suggested && current !== suggested;
  const showRestore = current !== original;
  if (!showSuggestion && !showRestore) return null;

  return (
    <div className="mt-2 space-y-2">
      {showSuggestion && (
        <div className="rounded-sm border border-amber/50 bg-amber-50 p-3 text-sm">
          <p className="font-heading text-xs font-semibold uppercase tracking-wider text-amber-text">
            Suggested wording
          </p>
          <p className="mt-1 text-ink">{suggested}</p>
          <button
            type="button"
            onClick={() => fill(name, suggested!)}
            className="mt-2 rounded-sm border border-amber-dark/40 bg-white px-3 py-1 font-heading text-xs font-medium text-amber-text hover:bg-amber-100"
          >
            Use this wording
          </button>
        </div>
      )}
      {showRestore && (
        <button
          type="button"
          onClick={() => fill(name, original)}
          className="font-heading text-xs font-medium text-blueprint underline-offset-2 hover:underline"
        >
          {original ? "Restore the original wording" : "Clear (hide this on the site)"}
        </button>
      )}
    </div>
  );
}
