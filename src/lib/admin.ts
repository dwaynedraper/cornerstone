import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Returns a Supabase client carrying the signed-in admin's session, after
 * verifying they're logged in. If not, bounces to the login page. Writes made
 * with this client run under RLS as that user (no service-role key needed).
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

/** Make a unique, URL-safe slug from a label (slug columns are unique/not-null). */
export function slugify(input: string) {
  const base = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return `${base || "item"}-${Math.random().toString(36).slice(2, 7)}`;
}
