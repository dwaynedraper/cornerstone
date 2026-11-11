import "server-only";
import { Resend } from "resend";

/**
 * Shared Resend client, created on first use.
 *
 * Creating it at module load crashes `next build` whenever RESEND_API_KEY
 * isn't set (Next imports route files while collecting page data). Building
 * it lazily keeps builds and preview deploys working without the key.
 */
let client: Resend | null = null;

export function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  client ??= new Resend(process.env.RESEND_API_KEY);
  return client;
}

/** Must be an address on a domain verified in Resend. */
export const EMAIL_FROM =
  process.env.CONTACT_FROM || "Cornerstone Website <onboarding@resend.dev>";
