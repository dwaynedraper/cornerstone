"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { SETTINGS_KEYS } from "./fields";

export async function saveSettings(formData: FormData) {
  const supabase = await requireAdmin();

  const rows = SETTINGS_KEYS.map((key) => ({
    key,
    value: String(formData.get(key) ?? "").trim(),
  }));

  await supabase.from("site_settings").upsert(rows, { onConflict: "key" });

  // This copy shows across the whole site, so refresh every public route.
  for (const path of ["/", "/about", "/services", "/contact", "/admin/settings"]) {
    revalidatePath(path);
  }
}
