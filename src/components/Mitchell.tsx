import {
  AcademicCapIcon,
  LinkIcon,
} from "@heroicons/react/20/solid";

export default function Mitchell() {
  return (
    <div className="relative isolate overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-12 sm:py-16 lg:px-0 my-12">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-surface">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>
      </div>

      {/* ─── Header row ─── */}
      <div className="mx-auto max-w-7xl lg:px-8 mb-10">
        <p className="text-sm font-heading font-semibold uppercase tracking-widest text-gold-600">
          Founder, PE
        </p>
        <h2 className="mt-2 text-pretty text-4xl font-heading font-bold tracking-tight text-navy sm:text-5xl">
          Mitchell Lenamond
        </h2>
        <p className="mt-4 text-xl/8 text-gray-600">
          Licensed Professional Engineer
        </p>
        <div className="mt-4 w-16 h-1 bg-gradient-to-r from-heritage via-gold to-heritage rounded-full" />
      </div>

      {/* ─── Two-column layout: bio on left, credentials on right ─── */}
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Bio paragraphs */}
          <div className="text-base/7 text-gray-600">
            <p>
              Mitchell K. Lenamond, P.E., is a highly experienced professional
              engineer with over two decades of expertise in structural and
              civil engineering. His experience includes roles such as Vice
              President of Engineering, where he oversaw a team of 180+
              professionals across multiple office locations, managing
              engineering, surveying, and architectural projects. His
              leadership extends to client relations, project planning,
              budgeting, and regulatory compliance, ensuring that each project
              meets the highest standards of quality and efficiency.
            </p>
            <br />
            <p>
              Mitchell&apos;s extensive engineering background includes
              designing commercial and residential structures, specializing in
              foundation and framing systems, wind load analysis, and
              infrastructure projects such as highway bridges and culverts.
              His civil engineering expertise encompasses site feasibility
              studies, zoning coordination, grading, drainage, and utility
              planning. Additionally, he is well-versed in forensic
              inspections, providing structural assessments, foundation
              deflection analysis, and expert witness testimony.
            </p>
            <p className="mt-8 text-gray-600 italic border-l-4 border-gold pl-4">
              With a reputation for precision and excellence, Mitchell remains
              dedicated to delivering innovative, reliable engineering
              solutions that drive success for clients and communities alike.
            </p>
          </div>

          {/* Right: Credentials & Affiliations */}
          <div className="bg-surface rounded-xl p-8 border border-gray-100">
            <h3 className="text-lg font-heading font-bold text-navy mb-1">
              Credentials & Affiliations
            </h3>
            <div className="w-12 h-1 bg-gold rounded-full mb-6" />

            <ul role="list" className="space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <AcademicCapIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-gold"
                />
                <span>
                  <strong className="font-semibold text-navy">
                    Texas A&M University
                  </strong>{" "}
                  A <em>Texas A&M University</em> graduate, Mitchell holds
                  licensure in multiple states, including Texas, Oklahoma,
                  Louisiana, Arkansas, Colorado, and beyond. He is also an
                  appointed engineer for Windstorm Inspections by the{" "}
                  <em>Texas Department of Insurance</em>.
                </span>
              </li>
              <li className="flex gap-x-3">
                <LinkIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-gold"
                />
                <span>
                  <strong className="font-semibold text-navy">
                    Professional Affiliations.
                  </strong>{" "}
                  Mitch&apos;s professional affiliations include{" "}
                  <em>American Society of Civil Engineers</em>, the{" "}
                  <em>American Institute of Steel Construction</em>, and the{" "}
                  <em>Dallas Builders Association</em>.
                </span>
              </li>
              {/* <li className="flex gap-x-3">
                <ServerIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-indigo-600"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Database backups.
                  </strong>{" "}
                  Ac tincidunt sapien vehicula erat auctor pellentesque
                  rhoncus. Et magna sit morbi lobortis.
                </span>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
