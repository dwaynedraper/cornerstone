"use client";

import { useActionState } from "react";
import type { FormState } from "@/app/admin/account-actions";

/** Small form that shows a success or error line after submitting. */
export default function ActionForm({
  action,
  children,
  submitLabel,
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  children: React.ReactNode;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <form action={formAction} className="space-y-4">
      {children}
      <button
        type="submit"
        disabled={pending}
        className="rounded-sm bg-blueprint px-5 py-2.5 font-heading text-sm font-medium text-white hover:bg-blueprint-dark disabled:opacity-60"
      >
        {pending ? "Working…" : submitLabel}
      </button>
      {state.ok && <p className="text-sm text-emerald-700">{state.ok}</p>}
      {state.error && <p className="text-sm text-maroon">{state.error}</p>}
    </form>
  );
}
