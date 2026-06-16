import Mitchell from "@/components/Mitchell";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/data/site";
import { teamGroups as defaultTeamGroups, type TeamGroup } from "@/data/team";

interface TeamProps {
  /** Roster to render. Defaults to the data in `src/data/team.ts`. */
  groups?: TeamGroup[];
}

export default function Team({ groups = defaultTeamGroups }: TeamProps) {
  return (
    <div>
      {/* ─── About header ─── */}
      <section className="relative isolate overflow-hidden bg-paper">
        <div aria-hidden className="absolute inset-0 bg-blueprint-grid" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:py-24 lg:px-8">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-blueprint">
            Our team
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            The people behind your projects
          </h1>
          <div className="mx-auto mt-5 h-0.5 w-16 bg-amber" />
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-ink-500">
            A licensed, hands-on team of engineers and surveyors who know North
            Texas land development — and how to keep a builder&apos;s pipeline
            moving.
          </p>
        </div>
      </section>

      {/* ─── Two-column intro ─── */}
      <section className="bg-sand-light py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="border-l-2 border-blueprint pl-8">
              <p className="text-lg leading-8 text-ink-500">
                From seasoned engineers with decades of expertise to sharp young
                talent bringing fresh perspective, every member of our team plays
                a role in delivering build-ready results. We pride ourselves on a
                collaborative approach — combining individual strengths to tackle
                complex sites and drive projects to completion.
              </p>
            </div>
            <div className="border-l-2 border-blueprint pl-8">
              <p className="text-lg leading-8 text-ink-500">
                Our engineers and surveyors aren&apos;t just technically
                proficient; they&apos;re problem-solvers who thrive on turning
                raw land into reality. Whether it&apos;s designing infrastructure,
                running precise surveys, or shepherding a plat through approval,
                the team brings precision and attention to every project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Founder ─── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <Mitchell />
        </div>
      </section>

      {/* ─── Roster by category ─── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-14">
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-blueprint">
                The people
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Our team
              </h2>
              <div className="mt-4 h-0.5 w-16 bg-amber" />
            </div>
          </Reveal>

          <div className="space-y-14">
            {groups.map((group) => (
              <section key={group.id}>
                <div className="mb-8 flex items-center gap-4">
                  <div className="h-7 w-1 bg-blueprint" />
                  <h3 className="font-heading text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                    {group.name}
                  </h3>
                  <div className="h-px flex-1 bg-ink/10" />
                </div>

                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                >
                  {group.members.map((person, i) => {
                    const initials = person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("");
                    return (
                      <Reveal key={person.id} delay={i * 0.05}>
                        <li className="group h-full overflow-hidden rounded-md border border-ink/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                          <div className="h-1 bg-amber" />
                          <div className="p-6 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-ink font-heading text-xl font-semibold text-white ring-2 ring-blueprint/20 transition-all duration-300 group-hover:ring-blueprint/50">
                              {initials}
                            </div>
                            <p className="font-heading text-base font-semibold tracking-tight text-ink">
                              {person.name}
                            </p>
                            <p className="text-sm leading-6 text-ink-500">
                              {person.role}
                            </p>
                          </div>
                        </li>
                      </Reveal>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Licensing ─── */}
      <section className="bg-sand-light py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-blueprint">
            Credentials
          </p>
          <h2 className="mt-2 font-heading text-xl font-semibold tracking-tight text-ink">
            Licensing
          </h2>
          <div className="mt-4 h-0.5 w-12 bg-amber" />

          <div className="mb-10 mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-md border border-ink/10 bg-white p-6 shadow-sm">
              <p className="font-heading text-sm font-semibold text-ink">
                Engineering
              </p>
              <p className="mt-1 text-ink-500">
                Firm Registration Number: {site.engineeringReg}
              </p>
            </div>
            <div className="rounded-md border border-ink/10 bg-white p-6 shadow-sm">
              <p className="font-heading text-sm font-semibold text-ink">
                Surveying
              </p>
              <p className="mt-1 text-ink-500">
                Firm Registration Number: {site.surveyingReg}
              </p>
            </div>
          </div>

          <p className="text-sm leading-6 text-ink-500">
            Texas Board of Professional Engineers &amp; Land Surveyors
            <br />
            1917 S I-35 Frontage Road, Austin, TX 78741 | (512) 440-7723
          </p>
          <p className="mt-3 font-semibold text-blueprint">
            <a
              href="https://pels.texas.gov"
              className="transition-colors hover:text-blueprint-dark"
            >
              pels.texas.gov
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
