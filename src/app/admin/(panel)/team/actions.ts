"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin, slugify } from "@/lib/admin";

function refresh() {
  revalidatePath("/about");
  revalidatePath("/admin/team");
}

async function swapOrder(
  table: "team_groups" | "team_members",
  list: { id: string; sort_order: number }[],
  id: string,
  dir: string,
  supabase: Awaited<ReturnType<typeof requireAdmin>>,
) {
  const idx = list.findIndex((r) => r.id === id);
  const swapIdx = dir === "up" ? idx - 1 : idx + 1;
  if (idx < 0 || swapIdx < 0 || swapIdx >= list.length) return;
  const current = list[idx];
  const neighbor = list[swapIdx];
  await supabase
    .from(table)
    .update({ sort_order: neighbor.sort_order })
    .eq("id", current.id);
  await supabase
    .from(table)
    .update({ sort_order: current.sort_order })
    .eq("id", neighbor.id);
}

/* ───────── Groups ───────── */

export async function createGroup(formData: FormData) {
  const supabase = await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const { data: last } = await supabase
    .from("team_groups")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextOrder = ((last?.sort_order as number | undefined) ?? 0) + 1;

  await supabase
    .from("team_groups")
    .insert({ slug: slugify(name), name, sort_order: nextOrder });
  refresh();
}

export async function updateGroup(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!id || !name) return;
  await supabase.from("team_groups").update({ name }).eq("id", id);
  refresh();
}

export async function deleteGroup(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  // Members are removed automatically (ON DELETE CASCADE).
  await supabase.from("team_groups").delete().eq("id", id);
  refresh();
}

export async function moveGroup(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const dir = String(formData.get("dir") ?? "");
  if (!id || (dir !== "up" && dir !== "down")) return;

  const { data } = await supabase
    .from("team_groups")
    .select("id,sort_order")
    .order("sort_order", { ascending: true });
  if (!data) return;
  await swapOrder(
    "team_groups",
    data as { id: string; sort_order: number }[],
    id,
    dir,
    supabase,
  );
  refresh();
}

/* ───────── Members ───────── */

export async function createMember(formData: FormData) {
  const supabase = await requireAdmin();
  const groupId = String(formData.get("group_id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!groupId || !name) return;

  const { data: last } = await supabase
    .from("team_members")
    .select("sort_order")
    .eq("group_id", groupId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextOrder = ((last?.sort_order as number | undefined) ?? 0) + 1;

  await supabase.from("team_members").insert({
    group_id: groupId,
    name,
    role: String(formData.get("role") ?? "").trim(),
    sort_order: nextOrder,
  });
  refresh();
}

export async function updateMember(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await supabase
    .from("team_members")
    .update({
      name: String(formData.get("name") ?? "").trim(),
      role: String(formData.get("role") ?? "").trim(),
    })
    .eq("id", id);
  refresh();
}

export async function deleteMember(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await supabase.from("team_members").delete().eq("id", id);
  refresh();
}

export async function moveMember(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const dir = String(formData.get("dir") ?? "");
  if (!id || (dir !== "up" && dir !== "down")) return;

  const { data: me } = await supabase
    .from("team_members")
    .select("group_id")
    .eq("id", id)
    .maybeSingle();
  if (!me) return;
  const groupId = (me as { group_id: string }).group_id;

  const { data } = await supabase
    .from("team_members")
    .select("id,sort_order")
    .eq("group_id", groupId)
    .order("sort_order", { ascending: true });
  if (!data) return;
  await swapOrder(
    "team_members",
    data as { id: string; sort_order: number }[],
    id,
    dir,
    supabase,
  );
  refresh();
}
