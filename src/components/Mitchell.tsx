import { AcademicCapIcon, LinkIcon } from "@heroicons/react/20/solid";
import { getSiteCopy } from "@/lib/content";

export default async function Mitchell() {
  const copy = await getSiteCopy();
  return (
    <div className="relative isolate my-12 overflow-hidden rounded-lg border border-ink/10 bg-white px-6 py-12 shadow-xs sm:py-16 lg:px-12">
      <div className="mx-auto mb-10 max-w-7xl">
        <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-blueprint">
          Founder, P.E.
        </p>
        <h2 className="mt-2 text-pretty font-heading text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {copy.founderName}
        </h2>
        <p className="mt-3 text-xl leading-8 text-ink-500">
          {copy.founderTitle}
        </p>
        <div className="mt-4 h-0.5 w-16 bg-amber" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-base leading-7 text-ink-500">
            <p>{copy.founderBio1}</p>
            <p className="mt-6">{copy.founderBio2}</p>
            <p className="mt-8 border-l-2 border-blueprint pl-4 italic text-ink-500">
              {copy.founderQuote}
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
