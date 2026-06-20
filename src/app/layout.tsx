import type { Metadata } from "next";
import { Inter, Libre_Franklin } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteChrome from "@/components/SiteChrome";
import MotionProvider from "@/components/motion/MotionProvider";
import { site } from "@/data/site";
import { isWorkEnabled } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--ff-body",
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--ff-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const description =
  "Civil engineering and land surveying for residential developers and homebuilders across North Texas. Subdivision design, platting, and surveying from a firm with 25+ years of experience, licensed in 15+ states.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Cornerstone Engineering & Surveying | North Texas Civil Engineering & Land Surveying",
    template: "%s | Cornerstone Engineering & Surveying",
  },
  description,
  keywords: [
    "civil engineering North Texas",
    "land surveying North Texas",
    "residential land development",
    "subdivision design",
    "platting",
    "land surveyor for homebuilders",
    "Fort Worth civil engineer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cornerstone Engineering & Surveying",
    description,
    url: "/",
    siteName: "Cornerstone Engineering & Surveying",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cornerstone Engineering & Surveying",
    description,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const workEnabled = await isWorkEnabled();
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${libreFranklin.variable} bg-paper font-body text-ink`}
      >
        <MotionProvider>
          <SiteChrome header={<Header showWork={workEnabled} />} footer={<Footer />}>
            {children}
          </SiteChrome>
        </MotionProvider>
      </body>
    </html>
  );
}
