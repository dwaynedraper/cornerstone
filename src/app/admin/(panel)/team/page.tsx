import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SubmitButton, ConfirmButton } from "@/components/admin/FormButtons";
import {
  createGroup,
  updateGroup,
  deleteGroup,
  moveGroup,
  createMember,
  updateMember,
  deleteMember,
  moveMember,
} from "./actions";

type GroupRow = { id: string; name: string; sort_order: number };
type MemberRow = {
  id: string;
  group_id: string;
  name: string;
  role: string;
  sort_order: number;
};

const fieldClass =
  "mt-1.5 block w-full rounded-sm border-ink/15 text-ink shadow-xs focus:border-blueprint focus:ring-blueprint";
const labelClass = "font-heading text-sm font-medium text-ink";
const saveClass =
  "rounded-sm bg-blueprint px-4 py-2 font-heading text-sm font-medium text-white hover:bg-blueprint-dark disabled:opacity-60";
const ctrlClass =
  "rounded-sm border border-ink/15 px-2.5 py-1 text-ink-500 hover:bg-sand-light disabled:opacity-30";
const deleteClass =
  "rounded-sm border border-maroon/30 px-3 py-1 font-heading text-sm font-medium text-maroon hover:bg-maroon/5";

export default async function TeamAdmin() {
  const supabase = await createClient();
  const [{ data: groupData }, { data: memberData }] = await Promise.all([
    supabase.from("team_groups").select("*").order("sort_order", { ascending: true }),
    supabase
      .from("team_members")
      .select("*")
      .order("sort_order", { ascending: true }),
  ]);
  const groups = (groupData ?? []) as GroupRow[];
  const members = (memberData ?? []) as MemberRow[];

  return (
    <div>
      <Link
        href="/admin"
        className="font-heading text-sm font-medium text-blueprint hover:text-blueprint-dark"
      >
        ← Dashboard
      </Link>

      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-ink">
        Team
      </h1>
      <div className="mt-4 h-0.5 w-16 bg-amber" />
      <p className="mt-4 max-w-2xl text-ink-500">
        People are organized into groups (the headings on the About page). Edit
        a person and Save, reorder with the arrows, or add people and groups
        below.
      </p>

      <div className="mt-8 space-y-6">
        {groups.map((g, gi) => {
          const groupMembers = members.filter((m) => m.group_id === g.id);
          return (
            <section
              key={g.id}
              className="rounded-lg border border-ink/10 bg-white p-6 shadow-xs"
            >
              {/* Group header */}
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink/10 pb-4">
                <form action={updateGroup} className="flex items-end gap-2">
                  <input type="hidden" name="id" value={g.id} />
                  <label className="block">
                    <span className={labelClass}>Group name</span>
                    <input
                      name="name"
                      required
                      defaultValue={g.name}
                      className={`${fieldClass} w-56`}
                    />
                  </label>
                  <SubmitButton className={saveClass}>Rename</SubmitButton>
                </form>

                <div className="flex items-center gap-1.5">
                  <form action={moveGroup}>
                    <input type="hidden" name="id" value={g.id} />
                    <input type="hidden" name="dir" value="up" />
                    <button
                      type="submit"
                      disabled={gi === 0}
                      aria-label="Move group up"
                      className={ctrlClass}
                    >
                      ↑
                    </button>
                  </form>
                  <form action={moveGroup}>
                    <input type="hidden" name="id" value={g.id} />
                    <input type="hidden" name="dir" value="down" />
                    <button
                      type="submit"
                      disabled={gi === groups.length - 1}
                      aria-label="Move group down"
                      className={ctrlClass}
                    >
                      ↓
                    </button>
                  </form>
                  <form action={deleteGroup}>
                    <input type="hidden" name="id" value={g.id} />
                    <ConfirmButton
                      message={`Delete the "${g.name}" group and everyone in it? This can't be undone.`}
                      className={deleteClass}
                    >
                      Delete group
                    </ConfirmButton>
                  </form>
                </div>
              </div>

              {/* Members */}
              <ul className="mt-4 space-y-3">
                {groupMembers.map((m, mi) => (
                  <li
                    key={m.id}
                    className="flex flex-wrap items-end gap-2 rounded-sm bg-sand-light/60 p-3"
                  >
                    <form
                      action={updateMember}
                      className="flex flex-1 flex-wrap items-end gap-2"
                    >
                      <input type="hidden" name="id" value={m.id} />
                      <label className="block min-w-40 flex-1">
                        <span className={labelClass}>Name</span>
                        <input
                          name="name"
                          required
                          defaultValue={m.name}
                          className={fieldClass}
                        />
                      </label>
                      <label className="block min-w-40 flex-1">
                        <span className={labelClass}>Role</span>
                        <input
                          name="role"
                          defaultValue={m.role}
                          className={fieldClass}
                        />
                      </label>
                      <SubmitButton className={saveClass}>Save</SubmitButton>
                    </form>

                    <div className="flex items-center gap-1.5">
                      <form action={moveMember}>
                        <input type="hidden" name="id" value={m.id} />
                        <input type="hidden" name="dir" value="up" />
                        <button
                          type="submit"
                          disabled={mi === 0}
                          aria-label="Move person up"
                          className={ctrlClass}
                        >
                          ↑
                        </button>
                      </form>
                      <form action={moveMember}>
                        <input type="hidden" name="id" value={m.id} />
                        <input type="hidden" name="dir" value="down" />
                        <button
                          type="submit"
                          disabled={mi === groupMembers.length - 1}
                          aria-label="Move person down"
                          className={ctrlClass}
                        >
                          ↓
                        </button>
                      </form>
                      <form action={deleteMember}>
                        <input type="hidden" name="id" value={m.id} />
                        <ConfirmButton
                          message={`Remove ${m.name}? This can't be undone.`}
                          className={deleteClass}
                        >
                          Delete
                        </ConfirmButton>
                      </form>
                    </div>
                  </li>
                ))}
                {groupMembers.length === 0 && (
                  <li className="text-sm text-ink-400">
                    No people in this group yet.
                  </li>
                )}
              </ul>

              {/* Add member */}
              <form
                action={createMember}
                className="mt-4 flex flex-wrap items-end gap-2 border-t border-ink/10 pt-4"
              >
                <input type="hidden" name="group_id" value={g.id} />
                <label className="block min-w-40 flex-1">
                  <span className={labelClass}>Name</span>
                  <input
                    name="name"
                    required
                    placeholder="Full name"
                    className={fieldClass}
                  />
                </label>
                <label className="block min-w-40 flex-1">
                  <span className={labelClass}>Role</span>
                  <input
                    name="role"
                    placeholder="e.g. P.E."
                    className={fieldClass}
                  />
                </label>
                <SubmitButton pendingText="Adding…" className={saveClass}>
                  Add person
                </SubmitButton>
              </form>
            </section>
          );
        })}
      </div>

      {/* Add group */}
      <div className="mt-8 rounded-lg border border-dashed border-blueprint/30 bg-blueprint-50/40 p-6">
        <h2 className="font-heading text-lg font-semibold text-ink">
          Add a group
        </h2>
        <form
          action={createGroup}
          className="mt-4 flex flex-wrap items-end gap-2"
        >
          <label className="block min-w-40 flex-1">
            <span className={labelClass}>Group name</span>
            <input
              name="name"
              required
              placeholder="e.g. Survey Team"
              className={fieldClass}
            />
          </label>
          <SubmitButton pendingText="Adding…" className={saveClass}>
            Add group
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
