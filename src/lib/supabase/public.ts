import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Anonymous, read-only Supabase client for PUBLIC content.
 *
 * No user session, no cookies, so it stays compatible with static rendering.
 * Row-Level Security limits it to published rows (see supabase/schema.sql).
 * Used only by the server-side content layer in `src/lib/content.ts`.
 *
 * Every request has a time limit. If Supabase is slow or down, the request is
 * cancelled and the content layer falls back to the approved built-in text,
 * so a visitor never waits on the database.
 */
const TIMEOUT_MS = 3000;

function timedFetch(input: RequestInfo | URL, init?: RequestInit) {
  const started = Date.now();
  return fetch(input, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) }).finally(() => {
    if (process.env.NODE_ENV === "development") {
      const ms = Date.now() - started;
      const path = String(input instanceof Request ? input.url : input).split("/rest/v1/")[1]?.split("?")[0];
      // Dev-only: shows in the terminal running `npm run dev`.
      console.log(`[supabase] ${path ?? "request"} ${ms}ms${ms >= TIMEOUT_MS ? " (TIMED OUT, using built-in text)" : ""}`);
    }
  });
}

let client: SupabaseClient | null = null;

export function createPublicClient(): SupabaseClient {
  client ??= createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: timedFetch },
    },
  );
  return client;
}
