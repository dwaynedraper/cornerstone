import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Privileged Supabase client using the SERVICE-ROLE (secret) key.
 *
 * ⚠️ This BYPASSES Row-Level Security. It is server-only (the `server-only`
 * import makes the build fail if this file is ever pulled into client code),
 * and must only be used AFTER verifying the caller is a logged-in admin.
 * The secret key lives in SUPABASE_SERVICE_ROLE_KEY (server env / Vercel only).
 */
export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
