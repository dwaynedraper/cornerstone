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
              {/* The maroon mark disappears on the dark footer, so it sits on a
                  light tile, the same treatment as the share image. */}
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-paper ring-1 ring-white/10">
                <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9" />
              </span>
              <span className="font-heading text-lg font-semibold tracking-wide text-white">
                Cornerstone
              </span>
            </div>
            {copy.footerTagline && (
              <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
                {copy.footerTagline}
              </p>
            )}
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-white">Contact Us</h3>
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
              <li className="text-gray-400">
                <address className="not-italic">
                  {copy.address.street}
                  <br />
                  {copy.address.city}, {copy.address.state} {copy.address.zip}
                </address>
              </li>
            </ul>
          </div>

          <div>
            <ul className="space-y-1.5 text-sm text-gray-400">
              <li>Engineering Firm Registration Number: {site.engineeringReg}</li>
              <li>Surveying Firm Registration Number: {site.surveyingReg}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {`© ${new Date().getFullYear()} Cornerstone Engineering & Surveying`}
          </p>

        </div>
      </div>
    </footer>
  );
}
