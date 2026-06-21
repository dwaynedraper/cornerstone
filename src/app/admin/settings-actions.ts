"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { SETTINGS_KEYS } from "@/lib/settings-fields";

export async function saveSettings(formData: FormData) {
  const supabase = await requireAdmin();

  // Only save the fields that were actually on the submitted form, so a
  // page-specific editor never wipes the keys it doesn't show.
  const rows = SETTINGS_KEYS.filter((key) => formData.has(key)).map((key) => ({
    key,
    value: String(formData.get(key) ?? "").trim(),
  }));
  if (rows.length === 0) return;

  await supabase.from("site_settings").upsert(rows, { onConflict: "key" });

  // This copy shows across the site, so refresh every public route.
  for (const path of ["/", "/about", "/services", "/contact"]) {
    revalidatePath(path);
  }
}
