import "server-only";

/**
 * The owner (Mitch) is set by the OWNER_EMAIL environment variable in Vercel.
 * Only the owner can add or remove admins. Everyone else who can sign in is
 * an admin: they can edit the site and see analytics, but can't grant access.
 * Comma-separate OWNER_EMAIL to name more than one owner.
 */
export function isOwner(email: string | null | undefined): boolean {
  if (!email) return false;
  const owners = (process.env.OWNER_EMAIL ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return owners.includes(email.toLowerCase());
}
