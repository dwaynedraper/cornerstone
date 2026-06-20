"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin, slugify } from "@/lib/admin";

const ICONS = ["builders", "oneFirm", "local", "national"] as const;

function cleanIcon(value: FormDataEntryValue | null) {
  const v = String(value ?? "");
  return (ICONS as readonly string[]).includes(v) ? v : "builders";
}

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin/why");
}

export async function createWhy(formData: FormData) {
  const supabase = await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;

  const { data: last } = await supabase
    .from("why_points")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextOrder = ((last?.sort_order as number | undefined) ?? 0) + 1;

  await supabase.from("why_points").insert({
    slug: slugify(title),
    icon: cleanIcon(formData.get("icon")),
    title,
    description: String(formData.get("description") ?? "").trim(),
    sort_order: nextOrder,
  });
  refresh();
}

export async function updateWhy(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase
    .from("why_points")
    .update({
      icon: cleanIcon(formData.get("icon")),
      title: String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
    })
    .eq("id", id);
  refresh();
}

export async function deleteWhy(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await supabase.from("why_points").delete().eq("id", id);
  refresh();
}

export async function moveWhy(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const dir = String(formData.get("dir") ?? "");
  if (!id || (dir !== "up" && dir !== "down")) return;

  const { data } = await supabase
    .from("why_points")
    .select("id,sort_order")
    .order("sort_order", { ascending: true });
  if (!data) return;
  const list = data as { id: string; sort_order: number }[];

  const idx = list.findIndex((r) => r.id === id);
  const swapIdx = dir === "up" ? idx - 1 : idx + 1;
  if (idx < 0 || swapIdx < 0 || swapIdx >= list.length) return;

  const current = list[idx];
  const neighbor = list[swapIdx];
  await supabase
    .from("why_points")
    .update({ sort_order: neighbor.sort_order })
    .eq("id", current.id);
  await supabase
    .from("why_points")
    .update({ sort_order: current.sort_order })
    .eq("id", neighbor.id);
  refresh();
}
