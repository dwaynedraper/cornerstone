import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SubmitButton } from "@/components/admin/FormButtons";
import { saveSettings } from "./actions";
import { SETTINGS_GROUPS } from "./fields";

const fieldClass =
  "mt-1.5 block w-full rounded-sm border-ink/15 text-ink shadow-xs focus:border-blueprint focus:ring-blueprint";
const labelClass = "font-heading text-sm font-medium text-ink";

export default async function SettingsAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("key,value");
  const values = new Map<string, string>(
    ((data ?? []) as { key: string; value: string }[]).map((r) => [
      r.key,
      r.value,
    ]),
  );

  return (
    <div>
      <Link
        href="/admin"
        className="font-heading text-sm font-medium text-blueprint hover:text-blueprint-dark"
      >
        ← Dashboard
      </Link>

      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-ink">
        Site text &amp; contact
      </h1>
      <div className="mt-4 h-0.5 w-16 bg-amber" />
      <p className="mt-4 max-w-2xl text-ink-500">
        Wording and contact details used across the site. Make your changes and
        press Save once at the bottom — everything updates together.
      </p>

      <form action={saveSettings} className="mt-8 space-y-6">
        {SETTINGS_GROUPS.map((group) => (
          <fieldset
            key={group.title}
            className="rounded-lg border border-ink/10 bg-white p-6 shadow-xs"
          >
            <legend className="px-2 font-heading text-base font-semibold text-blueprint">
              {group.title}
            </legend>
            <div className="grid gap-4">
              {group.fields.map((f) => (
                <label key={f.key} className="block">
                  <span className={labelClass}>
                    {f.label}
                    {f.hint && (
                      <span className="font-normal text-ink-400"> — {f.hint}</span>
                    )}
                  </span>
                  {f.multiline ? (
                    <textarea
                      name={f.key}
                      rows={3}
                      defaultValue={values.get(f.key) ?? ""}
                      className={fieldClass}
                    />
                  ) : (
                    <input
                      name={f.key}
                      defaultValue={values.get(f.key) ?? ""}
                      className={fieldClass}
                    />
                  )}
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        <div className="sticky bottom-4 flex justify-end">
          <SubmitButton
            pendingText="Saving…"
            className="rounded-sm bg-blueprint px-6 py-3 font-heading text-sm font-medium text-white shadow-md hover:bg-blueprint-dark disabled:opacity-60"
          >
            Save all changes
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
