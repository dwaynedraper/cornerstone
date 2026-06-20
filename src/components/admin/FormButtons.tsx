"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

/** Submit button that shows a pending state while its form's action runs. */
export function SubmitButton({
  children,
  className,
  pendingText = "Saving…",
}: {
  children: ReactNode;
  className?: string;
  pendingText?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingText : children}
    </button>
  );
}

/** Submit button that asks for confirmation first (e.g. deletes). */
export function ConfirmButton({
  children,
  className,
  message,
}: {
  children: ReactNode;
  className?: string;
  message: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
      className={className}
    >
      {pending ? "…" : children}
    </button>
  );
}
