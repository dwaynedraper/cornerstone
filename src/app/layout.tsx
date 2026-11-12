import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteChrome from "@/components/SiteChrome";
import MotionProvider from "@/components/motion/MotionProvider";
import { site } from "@/data/site";
import { getSiteCopy, isWorkEnabled } from "@/lib/content";
import { HOME_TITLE, HOME_DESCRIPTION } from "@/lib/seo";
import { organizationSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";

// Fonts are self-hosted (no request to Google at build or run time).
// Red Hat Display for headings, Red Hat Text for body. Both are variable fonts.
const redHatText = localFont({
  src: "./fonts/RedHatText-Variable.woff2",
  variable: "--ff-body",
  weight: "300 700",
  display: "swap",
});

const redHatDisplay = localFont({
  src: "./fonts/RedHatDisplay-Variable.woff2",
  variable: "--ff-heading",
  weight: "300 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: HOME_TITLE,
    template: "%s | Cornerstone Engineering & Surveying",
  },
  description: HOME_DESCRIPTION,
  applicationName: site.name,
  category: "Engineering",
  keywords: [
    "civil engineering Arlington TX",
    "land surveying Arlington TX",
    "civil engineer Fort Worth",
    "land surveyor Dallas Fort Worth",
    "DFW civil engineering firm",
    "boundary survey Texas",
    "topographic survey",
    "construction layout",
    "site development engineering",
    "North Texas land surveyor",
  ],
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // Paste the codes from Google Search Console / Bing Webmaster into Vercel env vars.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [workEnabled, copy] = await Promise.all([isWorkEnabled(), getSiteCopy()]);
  return (
    // Font variables live on <html> so the Tailwind theme tokens defined on
    // :root (--font-heading, --font-body) can resolve them.
    <html lang="en" className={`${redHatText.variable} ${redHatDisplay.variable}`}>
      <body
        className="bg-paper font-body text-ink"
      >
        <JsonLd data={organizationSchema(copy)} />
        <MotionProvider>
          <SiteChrome header={<Header showWork={workEnabled} />} footer={<Footer />}>
            {children}
          </SiteChrome>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
