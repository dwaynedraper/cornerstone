import AdminPage from "@/components/admin/AdminPage";
import ActionForm from "@/components/admin/ActionForm";
import { SubmitButton } from "@/components/admin/FormButtons";
import { requireAdmin } from "@/lib/admin";
import { isOwner } from "@/lib/roles";
import { changePassword, setWeeklyReport } from "@/app/admin/account-actions";

const fieldClass =
  "mt-1.5 block w-full max-w-sm rounded-sm border-ink/15 text-ink shadow-xs focus:border-blueprint focus:ring-blueprint";

export default async function AccountPage() {
  const supabase = await requireAdmin();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("weekly_report")
    .eq("user_id", user!.id)
    .maybeSingle();
  // Default is ON for everyone until they turn it off.
  const weekly = profile ? (profile as { weekly_report: boolean }).weekly_report : true;

  return (
    <AdminPage title="My account" description="Your sign-in, password, and email preferences." accent="neutral">
      <div className="space-y-6">
        <section className="rounded-lg border border-ink/10 bg-white p-6 shadow-xs">
          <h2 className="font-heading text-base font-semibold text-ink">Signed in as</h2>
          <p className="mt-1 text-ink-500">
            {user?.email} · {isOwner(user?.email) ? "Owner (can add and remove people)" : "Admin"}
          </p>
        </section>

        <section className="rounded-lg border border-ink/10 bg-white p-6 shadow-xs">
          <h2 className="font-heading text-base font-semibold text-ink">Weekly visitor email</h2>
          <p className="mt-1 max-w-xl text-sm text-ink-500">
            Every Monday morning: visitors last week, how many were from Texas and the USA, and the most viewed pages.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span
              className={`rounded-full border px-2.5 py-0.5 font-heading text-xs font-semibold ${
                weekly ? "border-emerald-600/30 bg-emerald-50 text-emerald-800" : "border-ink/15 bg-sand-light text-ink-500"
              }`}
            >
              {weekly ? "On" : "Off"}
            </span>
            <form action={setWeeklyReport}>
              <input type="hidden" name="on" value={weekly ? "false" : "true"} />
              <SubmitButton
                pendingText="…"
                className="rounded-sm border border-blueprint/30 px-4 py-1.5 font-heading text-sm font-medium text-blueprint hover:bg-blueprint-50 disabled:opacity-60"
              >
                {weekly ? "Turn off" : "Turn on"}
              </SubmitButton>
            </form>
          </div>
        </section>

        <section className="rounded-lg border border-ink/10 bg-white p-6 shadow-xs">
          <h2 className="font-heading text-base font-semibold text-ink">Change password</h2>
          <div className="mt-4">
            <ActionForm action={changePassword} submitLabel="Update password">
              <label className="block">
                <span className="font-heading text-sm font-medium text-ink">New password (10+ characters)</span>
                <input name="password" type="password" autoComplete="new-password" required minLength={10} className={fieldClass} />
              </label>
            </ActionForm>
          </div>
        </section>
      </div>
    </AdminPage>
  );
}
