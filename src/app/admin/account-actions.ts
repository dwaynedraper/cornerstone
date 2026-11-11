"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { isOwner } from "@/lib/roles";

/** Turn my weekly visitor email on or off. */
export async function setWeeklyReport(formData: FormData) {
  const supabase = await requireAdmin();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const on = String(formData.get("on") ?? "") === "true";
  await supabase
    .from("admin_profiles")
    .upsert({ user_id: user.id, email: user.email ?? "", weekly_report: on }, { onConflict: "user_id" });
  revalidatePath("/admin/account");
}

export type FormState = { ok?: string; error?: string };

/** Change my own password. */
export async function changePassword(_: FormState, formData: FormData): Promise<FormState> {
  const supabase = await requireAdmin();
  const password = String(formData.get("password") ?? "");
  if (password.length < 10) return { error: "Use at least 10 characters." };
  const { error } = await supabase.auth.updateUser({ password });
  return error ? { error: "Couldn't change the password. Try again." } : { ok: "Password updated." };
}

async function requireOwner() {
  const supabase = await requireAdmin();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !isOwner(user.email)) throw new Error("Only the owner can manage people.");
  return user;
}

/** Owner only: give someone admin access with a temporary password. */
export async function addPerson(_: FormState, formData: FormData): Promise<FormState> {
  try {
    await requireOwner();
  } catch {
    return { error: "Only the owner can add people." };
  }
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: "Enter a valid email address." };
  if (password.length < 10) return { error: "The temporary password needs at least 10 characters." };

  const { data, error } = await createAdminClient().auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error || !data.user) return { error: error?.message ?? "Couldn't add that person." };

  await createAdminClient()
    .from("admin_profiles")
    .upsert({ user_id: data.user.id, email, weekly_report: false }, { onConflict: "user_id" });
  revalidatePath("/admin/people");
  return { ok: `${email} can now sign in. Share the temporary password privately and ask them to change it under My account.` };
}

/** Owner only: remove someone's access. Owners can't be removed here. */
export async function removePerson(formData: FormData) {
  const me = await requireOwner();
  const id = String(formData.get("id") ?? "");
  if (!id || id === me.id) return;
  const admin = createAdminClient();
  const { data } = await admin.auth.admin.getUserById(id);
  if (!data.user || isOwner(data.user.email)) return;
  await admin.auth.admin.deleteUser(id);
  revalidatePath("/admin/people");
}
