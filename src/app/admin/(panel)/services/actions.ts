"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const ICONS = [
  "civil",
  "structural",
  "survey",
  "management",
  "sustainable",
] as const;

function slugify(input: string) {
  const base = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return `${base || "service"}-${Math.random().toString(36).slice(2, 7)}`;
}

function cleanIcon(value: FormDataEntryValue | null) {
  const v = String(value ?? "");
  return (ICONS as readonly string[]).includes(v) ? v : "civil";
}

/** Verify the caller is signed in; bounce to login if not. Returns a client
 *  carrying their session, so writes run under RLS as that user. */
async function requireClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

/** Refresh every page that renders services so edits show up immediately. */
function refresh() {
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/services");
}

export async function createService(formData: FormData) {
  const supabase = await requireClient();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const { data: last } = await supabase
    .from("services")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextOrder = ((last?.sort_order as number | undefined) ?? 0) + 1;

  await supabase.from("services").insert({
    slug: slugify(name),
    name,
    icon: cleanIcon(formData.get("icon")),
    summary: String(formData.get("summary") ?? "").trim(),
    detail: String(formData.get("detail") ?? "").trim(),
    sort_order: nextOrder,
  });
  refresh();
}

export async function updateService(formData: FormData) {
  const supabase = await requireClient();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase
    .from("services")
    .update({
      name: String(formData.get("name") ?? "").trim(),
      icon: cleanIcon(formData.get("icon")),
      summary: String(formData.get("summary") ?? "").trim(),
      detail: String(formData.get("detail") ?? "").trim(),
    })
    .eq("id", id);
  refresh();
}

export async function deleteService(formData: FormData) {
  const supabase = await requireClient();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await supabase.from("services").delete().eq("id", id);
  refresh();
}

export async function moveService(formData: FormData) {
  const supabase = await requireClient();
  const id = String(formData.get("id") ?? "");
  const dir = String(formData.get("dir") ?? "");
  if (!id || (dir !== "up" && dir !== "down")) return;

  const { data } = await supabase
    .from("services")
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
    .from("services")
    .update({ sort_order: neighbor.sort_order })
    .eq("id", current.id);
  await supabase
    .from("services")
    .update({ sort_order: current.sort_order })
    .eq("id", neighbor.id);
  refresh();
}
