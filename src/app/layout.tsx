import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Cornerstone Engineering and Surveying",
  description:
    "Cornerstone Engineering and Surveying provides expert civil engineering, project management, sustainable design, and land surveying services tailored to your needs.",
  openGraph: {
    title: "Cornerstone Engineering and Surveying",
    description:
      "Cornerstone Engineering and Surveying provides expert civil engineering, project management, sustainable design, and land surveying services tailored to your needs.",
    url: "https://www.cornerstoneengineeringandsurveying.com",
    siteName: "Cornerstone Engineering and Surveying",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-body`}>
        <div className="bg-white text-gray-800 min-h-screen">
          <Header />
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
