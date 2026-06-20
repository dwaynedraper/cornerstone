import { createClient } from "@supabase/supabase-js";

/**
 * Anonymous, read-only Supabase client for PUBLIC content.
 *
 * No user session, no cookies — so it stays compatible with static rendering.
 * Row-Level Security limits it to published rows (see supabase/schema.sql).
 * Used only by the server-side content layer in `src/lib/content.ts`.
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
