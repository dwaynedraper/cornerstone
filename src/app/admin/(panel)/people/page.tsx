import AdminPage from "@/components/admin/AdminPage";
import ActionForm from "@/components/admin/ActionForm";
import { ConfirmButton } from "@/components/admin/FormButtons";
import { requireAdmin } from "@/lib/admin";
import { isOwner } from "@/lib/roles";
import { createAdminClient } from "@/lib/supabase/admin";
import { addPerson, removePerson } from "@/app/admin/account-actions";

const fieldClass =
  "mt-1.5 block w-full max-w-sm rounded-sm border-ink/15 text-ink shadow-xs focus:border-blueprint focus:ring-blueprint";

export default async function PeoplePage() {
  const supabase = await requireAdmin();
  const { data: { user } } = await supabase.auth.getUser();
  const owner = isOwner(user?.email);

  let people: { id: string; email: string; lastSignIn: string | null }[] = [];
  let loadError = false;
  try {
    const { data } = await createAdminClient().auth.admin.listUsers({ perPage: 100 });
    people = data.users.map((u) => ({ id: u.id, email: u.email ?? "", lastSignIn: u.last_sign_in_at ?? null }));
  } catch {
    loadError = true;
  }

  return (
    <AdminPage
      title="People with access"
      description="Everyone who can sign in to this admin. Only the owner can add or remove people."
      accent="neutral"
    >
      <div className="space-y-6">
        <section className="rounded-lg border border-ink/10 bg-white p-6 shadow-xs">
          {loadError ? (
            <p className="text-sm text-maroon">The people list needs the SUPABASE_SERVICE_ROLE_KEY setting in Vercel.</p>
          ) : (
            <ul className="divide-y divide-ink/10">
              {people.map((p) => (
                <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-heading font-semibold text-ink">{p.email}</p>
                    <p className="text-xs text-ink-500">
                      {isOwner(p.email) ? "Owner" : "Admin"}
                      {p.lastSignIn ? ` · last signed in ${new Date(p.lastSignIn).toLocaleDateString("en-US")}` : " · hasn't signed in yet"}
                    </p>
                  </div>
                  {owner && !isOwner(p.email) && p.id !== user?.id && (
                    <form action={removePerson}>
                      <input type="hidden" name="id" value={p.id} />
                      <ConfirmButton
                        message={`Remove ${p.email}? They will no longer be able to sign in.`}
                        className="rounded-sm border border-maroon/30 px-3 py-1 font-heading text-sm font-medium text-maroon hover:bg-maroon/5"
                      >
                        Remove access
                      </ConfirmButton>
                    </form>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {owner ? (
          <section className="rounded-lg border border-dashed border-blueprint/30 bg-blueprint-50/40 p-6">
            <h2 className="font-heading text-lg font-semibold text-ink">Add a person</h2>
            <p className="mt-1 max-w-xl text-sm text-ink-500">
              Give them a temporary password and share it privately. They can change it under My account after signing in.
            </p>
            <div className="mt-4">
              <ActionForm action={addPerson} submitLabel="Give access">
                <label className="block">
                  <span className="font-heading text-sm font-medium text-ink">Email</span>
                  <input name="email" type="email" required className={fieldClass} />
                </label>
                <label className="block">
                  <span className="font-heading text-sm font-medium text-ink">Temporary password (10+ characters)</span>
                  <input name="password" type="text" required minLength={10} autoComplete="off" className={fieldClass} />
                </label>
              </ActionForm>
            </div>
          </section>
        ) : (
          <p className="text-sm text-ink-500">Need to add someone? Ask the owner to add them here.</p>
        )}
      </div>
    </AdminPage>
  );
}
