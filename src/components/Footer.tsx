import Image from "next/image";
import { site } from "@/data/site";
import { getSiteCopy } from "@/lib/content";

/** Small label at the top of each title block cell. */
function Label({ children }: { children: string }) {
  return (
    <p className="mb-2 font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-amber/85">
      {children}
    </p>
  );
}

/**
 * Footer laid out like the title block on an engineering drawing: a ruled
 * box of labeled cells, with the copyright and sheet number on the bottom row.
 * Same details as before (firm, office, contact, registration numbers).
 */
export default async function Footer() {
  const copy = await getSiteCopy();
  const cell = "border-white/15 px-5 py-5";
  return (
    <footer aria-labelledby="footer-heading" className="bg-ink text-gray-300">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="plot-line h-0.5 bg-amber" />
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid border border-white/25 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.2fr_1fr_1.5fr]">
          {/* Firm */}
          <div className={`${cell} border-b sm:border-r lg:border-b-0`}>
            <Label>Firm</Label>
            <div className="flex items-center gap-3">
              {/* The maroon mark disappears on the dark footer, so it sits on a
                  light tile, the same treatment as the share image. */}
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-md bg-paper ring-1 ring-white/10">
                <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9" />
              </span>
              <span className="font-heading text-lg font-semibold text-white">Cornerstone</span>
            </div>
            {copy.footerTagline && (
              <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">{copy.footerTagline}</p>
            )}
          </div>

          {/* Office */}
          <div className={`${cell} border-b lg:border-b-0 lg:border-r`}>
            <Label>Office</Label>
            <address className="text-sm not-italic leading-6 text-gray-200">
              {copy.address.street}
              <br />
              {copy.address.city}, {copy.address.state} {copy.address.zip}
            </address>
          </div>

          {/* Contact */}
          <div className={`${cell} border-b sm:border-b-0 sm:border-r`}>
            <Label>Contact Us</Label>
            <ul className="space-y-1 text-sm leading-6 text-gray-200">
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
            </ul>
          </div>

          {/* Registration */}
          <div className={cell}>
            <Label>Registration</Label>
            <ul className="space-y-1 text-sm leading-6 text-gray-400">
              <li>
                Engineering Firm Registration Number:{" "}
                <span className="whitespace-nowrap">{site.engineeringReg}</span>
              </li>
              <li>
                Surveying Firm Registration Number:{" "}
                <span className="whitespace-nowrap">{site.surveyingReg}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip of the title block */}
        <div className="flex flex-col gap-1 border border-t-0 border-white/25 px-5 py-2.5 text-[11px] uppercase tracking-[0.1em] text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>{`© ${new Date().getFullYear()} Cornerstone Engineering & Surveying`}</p>
          <p aria-hidden>Sheet 1 of 1</p>
        </div>
      </div>
    </footer>
  );
}
