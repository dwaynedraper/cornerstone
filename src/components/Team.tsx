import Mitchell from "@/components/Mitchell";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/data/site";
import { teamGroups as defaultTeamGroups, type TeamGroup } from "@/data/team";
import { getSiteCopy } from "@/lib/content";
import GridReveal from "@/components/GridReveal";
import Contours from "@/components/Contours";

interface TeamProps {
  /** Roster to render. Defaults to the data in `src/data/team.ts`. */
  groups?: TeamGroup[];
}

export default async function Team({ groups = defaultTeamGroups }: TeamProps) {
  const copy = await getSiteCopy();
  return (
    <div>
      {/* ─── About header ─── */}
      <section className="relative isolate overflow-hidden bg-paper">
        <div aria-hidden className="absolute inset-0 blueprint-grid" />
        <GridReveal />
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:py-24 lg:px-8">
          <p className="eyebrow text-blueprint">
            Our Team
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {copy.aboutHeading}
          </h1>
          {copy.aboutSubhead && (
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-ink-500">
              {copy.aboutSubhead}
            </p>
          )}
        </div>
      </section>

      {/* ─── Two-column intro ─── */}
      <section className="relative isolate overflow-hidden bg-sand-light py-16 sm:py-24">
        <Contours variant="b" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {copy.aboutIntro1 && (
              <div className="border-l-2 border-blueprint pl-8">
                <p className="text-lg leading-8 text-ink-500">{copy.aboutIntro1}</p>
              </div>
            )}
            {copy.aboutIntro2 && (
              <div className="border-l-2 border-blueprint pl-8">
                <p className="text-lg leading-8 text-ink-500">{copy.aboutIntro2}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Learning paragraph + highlighted callout ─── */}
      {(copy.aboutIntro3 || copy.aboutCallout) && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-16 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              {copy.aboutIntro3 && (
                <p className="text-lg leading-8 text-ink-500">{copy.aboutIntro3}</p>
              )}
              {copy.aboutCallout && (
                <div className="relative overflow-hidden rounded-md border border-blueprint/20 bg-paper p-8">
                  <div aria-hidden className="absolute inset-0 blueprint-grid" />
                  <p className="relative text-center font-heading text-xl font-semibold italic leading-8 text-ink">
                    {copy.aboutCallout}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

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
              <p className="eyebrow text-blueprint">
                The People
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Our Team
              </h2>
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
                  /* Fixed-width badge slots: every badge is the same size in every
                     group, so a small group's badges never stretch wider than others
                     (wider would read as more senior). */
                  className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6"
                >
                  {group.members.map((person, i) => {
                    const initials = person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("");
                    return (
                      <Reveal key={person.id} delay={i * 0.05}>
                        <li className="group h-full overflow-hidden rounded-md border border-ink/10 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
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
          <p className="eyebrow text-blueprint">
            Credentials
          </p>
          <h2 className="mt-2 font-heading text-xl font-semibold tracking-tight text-ink">
            Licensing
          </h2>

          <div className="mb-10 mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="reg-ticks rounded-md border border-ink/10 bg-white p-6 shadow-xs">
              <p className="font-heading text-sm font-semibold text-ink">
                Engineering
              </p>
              <p className="mt-1 text-ink-500">
                Firm Registration Number: {site.engineeringReg}
              </p>
            </div>
            <div className="reg-ticks rounded-md border border-ink/10 bg-white p-6 shadow-xs">
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
              https://pels.texas.gov
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
