import Image from "next/image";
import { site } from "@/data/site";
import { getSiteCopy } from "@/lib/content";

export default async function Footer() {
  const copy = await getSiteCopy();
  return (
    <footer aria-labelledby="footer-heading" className="bg-ink text-gray-300">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="h-0.5 bg-amber" />
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9" />
              <span className="font-heading text-lg font-semibold tracking-wide text-white">
                Cornerstone
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
              Civil engineering and land surveying for residential development
              across North Texas. Licensed in 15+ states.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={`tel:${copy.contactPhone}`} className="transition-colors hover:text-white">
                  {copy.contactPhoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${copy.contactEmail}`} className="transition-colors hover:text-white">
                  {copy.contactEmail}
                </a>
              </li>
              <li className="text-gray-400">{copy.addressDisplay}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-white">Licensing</h3>
            <ul className="mt-4 space-y-1.5 text-sm text-gray-400">
              <li>Engineering Firm Reg. {site.engineeringReg}</li>
              <li>Surveying Firm Reg. {site.surveyingReg}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Cornerstone Engineering &amp;
            Surveying
          </p>
          <p>
            Texas Board of Professional Engineers &amp; Land Surveyors ·{" "}
            <a
              href="https://pels.texas.gov"
              className="transition-colors hover:text-white"
            >
              pels.texas.gov
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
