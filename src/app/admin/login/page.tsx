"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("That email and password didn't match. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand-light px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-blueprint">
            Cornerstone
          </p>
          <h1 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-ink">
            Website Admin
          </h1>
          <div className="mx-auto mt-4 h-0.5 w-12 bg-amber" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-ink/10 bg-white p-8 shadow-xs"
        >
          <label className="block">
            <span className="font-heading text-sm font-medium text-ink">
              Email
            </span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 block w-full rounded-sm border-ink/15 text-ink shadow-xs focus:border-blueprint focus:ring-blueprint"
            />
          </label>

          <label className="mt-5 block">
            <span className="font-heading text-sm font-medium text-ink">
              Password
            </span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 block w-full rounded-sm border-ink/15 text-ink shadow-xs focus:border-blueprint focus:ring-blueprint"
            />
          </label>

          {error && (
            <p className="mt-4 rounded-sm bg-maroon/5 px-3 py-2 text-sm text-maroon">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-sm bg-blueprint px-5 py-2.5 font-heading text-sm font-medium text-white transition-colors duration-200 hover:bg-blueprint-dark disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-ink-400">
          Access is by invitation only. Contact your site administrator if you
          need an account.
        </p>
      </div>
    </div>
  );
}
