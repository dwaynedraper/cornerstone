import { AcademicCapIcon, LinkIcon } from "@heroicons/react/20/solid";

export default function Mitchell() {
  return (
    <div className="relative isolate my-12 overflow-hidden rounded-lg border border-ink/10 bg-white px-6 py-12 shadow-xs sm:py-16 lg:px-12">
      <div className="mx-auto mb-10 max-w-7xl">
        <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-blueprint">
          Founder, P.E.
        </p>
        <h2 className="mt-2 text-pretty font-heading text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Mitchell Lenamond
        </h2>
        <p className="mt-3 text-xl leading-8 text-ink-500">
          Licensed Professional Engineer
        </p>
        <div className="mt-4 h-0.5 w-16 bg-amber" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-base leading-7 text-ink-500">
            <p>
              Mitchell K. Lenamond, P.E., is a highly experienced professional
              engineer with over two decades of expertise in structural and
              civil engineering. His experience includes roles such as Vice
              President of Engineering, where he oversaw a team of 180+
              professionals across multiple office locations, managing
              engineering, surveying, and architectural projects. His leadership
              extends to client relations, project planning, budgeting, and
              regulatory compliance, ensuring that each project meets the highest
              standards of quality and efficiency.
            </p>
            <p className="mt-6">
              Mitchell&apos;s extensive engineering background includes designing
              commercial and residential structures, specializing in foundation
              and framing systems, wind load analysis, and infrastructure
              projects such as highway bridges and culverts. His civil
              engineering expertise encompasses site feasibility studies, zoning
              coordination, grading, drainage, and utility planning.
              Additionally, he is well-versed in forensic inspections, providing
              structural assessments, foundation deflection analysis, and expert
              witness testimony.
            </p>
            <p className="mt-8 border-l-2 border-blueprint pl-4 italic text-ink-500">
              With a reputation for precision and excellence, Mitchell remains
              dedicated to delivering innovative, reliable engineering solutions
              that drive success for clients and communities alike.
            </p>
          </div>

          <div className="rounded-lg border border-ink/10 bg-sand-light p-8">
            <h3 className="mb-1 font-heading text-lg font-semibold text-ink">
              Credentials &amp; Affiliations
            </h3>
            <div className="mb-6 h-0.5 w-12 bg-amber" />

            <ul role="list" className="space-y-8 text-ink-500">
              <li className="flex gap-x-3">
                <AcademicCapIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-blueprint"
                />
                <span>
                  <strong className="font-semibold text-ink">
                    Texas A&amp;M University
                  </strong>{" "}
                  graduate. Mitchell holds licensure in multiple states,
                  including Texas, Oklahoma, Louisiana, Arkansas, Colorado, and
                  beyond. He is also an appointed engineer for Windstorm
                  Inspections by the <em>Texas Department of Insurance</em>.
                </span>
              </li>
              <li className="flex gap-x-3">
                <LinkIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-blueprint"
                />
                <span>
                  <strong className="font-semibold text-ink">
                    Professional affiliations.
                  </strong>{" "}
                  Member of the <em>American Society of Civil Engineers</em>, the{" "}
                  <em>American Institute of Steel Construction</em>, and the{" "}
                  <em>Dallas Builders Association</em>.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
