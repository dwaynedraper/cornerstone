"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin, slugify } from "@/lib/admin";
import { toOptimizedWebp } from "@/lib/images";

const MAX_PROJECTS = 9;

function refresh() {
  revalidatePath("/");
  revalidatePath("/work", "layout"); // /work index + every /work/[slug]
  revalidatePath("/admin/projects");
}

function collectStats(formData: FormData): string[] {
  return [0, 1, 2, 3]
    .map((i) => String(formData.get(`stat_${i}`) ?? "").trim())
    .filter(Boolean);
}

export async function createProject(formData: FormData) {
  const supabase = await requireAdmin();
  const category = String(formData.get("category") ?? "").trim();
  if (!category) return;

  // Quietly cap at 9 — forces curation to the best work.
  const { count } = await supabase
    .from("projects")
    .select("id", { count: "exact", head: true });
  if ((count ?? 0) >= MAX_PROJECTS) return;

  const { data: last } = await supabase
    .from("projects")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextOrder = ((last?.sort_order as number | undefined) ?? 0) + 1;

  await supabase.from("projects").insert({
    slug: slugify(category),
    name: String(formData.get("name") ?? "").trim(),
    category,
    summary: String(formData.get("summary") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    scope: String(formData.get("scope") ?? "").trim(),
    key_stats: collectStats(formData),
    body: String(formData.get("body") ?? "").trim(),
    sort_order: nextOrder,
    is_published: false, // start as a draft
  });
  refresh();
}

export async function updateProject(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await supabase
    .from("projects")
    .update({
      name: String(formData.get("name") ?? "").trim(),
      category: String(formData.get("category") ?? "").trim(),
      summary: String(formData.get("summary") ?? "").trim(),
      location: String(formData.get("location") ?? "").trim(),
      scope: String(formData.get("scope") ?? "").trim(),
      key_stats: collectStats(formData),
      body: String(formData.get("body") ?? "").trim(),
    })
    .eq("id", id);
  refresh();
}

export async function deleteProject(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await supabase.from("projects").delete().eq("id", id);
  refresh();
}

export async function togglePublish(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const { data } = await supabase
    .from("projects")
    .select("is_published")
    .eq("id", id)
    .maybeSingle();
  if (!data) return;
  await supabase
    .from("projects")
    .update({ is_published: !(data as { is_published: boolean }).is_published })
    .eq("id", id);
  refresh();
}

export async function moveProject(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const dir = String(formData.get("dir") ?? "");
  if (!id || (dir !== "up" && dir !== "down")) return;

  const { data } = await supabase
    .from("projects")
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
    .from("projects")
    .update({ sort_order: neighbor.sort_order })
    .eq("id", current.id);
  await supabase
    .from("projects")
    .update({ sort_order: current.sort_order })
    .eq("id", neighbor.id);
  refresh();
}

export async function addProjectImage(formData: FormData) {
  const supabase = await requireAdmin();
  const projectId = String(formData.get("project_id") ?? "");
  if (!projectId) return;

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return;

  const bytes = await toOptimizedWebp(file);
  const path = `projects/${projectId}/gallery-${Date.now()}.webp`;
  const { error } = await supabase.storage
    .from("media")
    .upload(path, bytes, { contentType: "image/webp" });
  if (error) return;

  const { data: pub } = supabase.storage.from("media").getPublicUrl(path);
  const { data: last } = await supabase
    .from("project_images")
    .select("sort_order")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextOrder = ((last?.sort_order as number | undefined) ?? 0) + 1;

  await supabase.from("project_images").insert({
    project_id: projectId,
    image_url: pub.publicUrl,
    alt: "",
    sort_order: nextOrder,
  });
  refresh();
}

export async function updateImageAlt(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await supabase
    .from("project_images")
    .update({ alt: String(formData.get("alt") ?? "").trim() })
    .eq("id", id);
  refresh();
}

export async function deleteProjectImage(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await supabase.from("project_images").delete().eq("id", id);
  refresh();
}

export async function moveProjectImage(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const dir = String(formData.get("dir") ?? "");
  if (!id || (dir !== "up" && dir !== "down")) return;

  const { data: me } = await supabase
    .from("project_images")
    .select("project_id")
    .eq("id", id)
    .maybeSingle();
  if (!me) return;
  const projectId = (me as { project_id: string }).project_id;

  const { data } = await supabase
    .from("project_images")
    .select("id,sort_order")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });
  if (!data) return;
  const list = data as { id: string; sort_order: number }[];

  const idx = list.findIndex((r) => r.id === id);
  const swapIdx = dir === "up" ? idx - 1 : idx + 1;
  if (idx < 0 || swapIdx < 0 || swapIdx >= list.length) return;

  const current = list[idx];
  const neighbor = list[swapIdx];
  await supabase
    .from("project_images")
    .update({ sort_order: neighbor.sort_order })
    .eq("id", current.id);
  await supabase
    .from("project_images")
    .update({ sort_order: current.sort_order })
    .eq("id", neighbor.id);
  refresh();
}

export async function uploadProjectCover(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return;

  const bytes = await toOptimizedWebp(file);
  const path = `projects/${id}-${Date.now()}.webp`;
  const { error } = await supabase.storage
    .from("media")
    .upload(path, bytes, { contentType: "image/webp" });
  if (error) return;

  const { data: pub } = supabase.storage.from("media").getPublicUrl(path);
  await supabase
    .from("projects")
    .update({ cover_image_url: pub.publicUrl })
    .eq("id", id);
  refresh();
}
