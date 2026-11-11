"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";

/** Tables whose rows can be switched between live and draft. */
const TABLES = {
  services: ["/", "/services", "/admin/services", "/admin/services-page"],
  why_points: ["/", "/admin/why"],
  faqs: ["/", "/admin/faq"],
} as const;

type Table = keyof typeof TABLES;

/**
 * Publish or unpublish one row. Publishing a suggested item makes it a normal
 * live item (it stops being labeled "Suggested").
 */
export async function setPublished(formData: FormData) {
  const supabase = await requireAdmin();
  const table = String(formData.get("table") ?? "") as Table;
  const id = String(formData.get("id") ?? "");
  const publish = String(formData.get("publish") ?? "") === "true";
  if (!(table in TABLES) || !id) return;

  await supabase
    .from(table)
    .update(publish ? { is_published: true, is_suggestion: false } : { is_published: false })
    .eq("id", id);

  for (const path of TABLES[table]) revalidatePath(path);
}
