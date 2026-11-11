"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { toOptimizedWebp } from "@/lib/images";

/** Named image slots Mitch can replace. */
const SLOTS = ["hero"] as const;

export async function uploadMedia(formData: FormData) {
  const slot = String(formData.get("slot") ?? "");
  if (!(SLOTS as readonly string[]).includes(slot)) return;

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return;

  const supabase = await requireAdmin();

  // Compress → WebP, then store under a unique name (so caches don't serve a stale copy).
  const bytes = await toOptimizedWebp(file);
  const path = `${slot}-${Date.now()}.webp`;

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(path, bytes, { contentType: "image/webp", upsert: false });
  if (uploadError) return;

  const { data: pub } = supabase.storage.from("media").getPublicUrl(path);

  await supabase
    .from("media")
    .upsert({ slot, image_url: pub.publicUrl }, { onConflict: "slot" });

  revalidatePath("/");
  revalidatePath("/admin/media");
}
