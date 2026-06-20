"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin/faq");
}

export async function createFaq(formData: FormData) {
  const supabase = await requireAdmin();
  const question = String(formData.get("question") ?? "").trim();
  if (!question) return;

  const { data: last } = await supabase
    .from("faqs")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextOrder = ((last?.sort_order as number | undefined) ?? 0) + 1;

  await supabase.from("faqs").insert({
    question,
    answer: String(formData.get("answer") ?? "").trim(),
    sort_order: nextOrder,
  });
  refresh();
}

export async function updateFaq(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase
    .from("faqs")
    .update({
      question: String(formData.get("question") ?? "").trim(),
      answer: String(formData.get("answer") ?? "").trim(),
    })
    .eq("id", id);
  refresh();
}

export async function deleteFaq(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await supabase.from("faqs").delete().eq("id", id);
  refresh();
}

export async function moveFaq(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const dir = String(formData.get("dir") ?? "");
  if (!id || (dir !== "up" && dir !== "down")) return;

  const { data } = await supabase
    .from("faqs")
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
    .from("faqs")
    .update({ sort_order: neighbor.sort_order })
    .eq("id", current.id);
  await supabase
    .from("faqs")
    .update({ sort_order: current.sort_order })
    .eq("id", neighbor.id);
  refresh();
}
