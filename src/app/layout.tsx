import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cornerstone Engineering and Surveying",
  description:
    "Cornerstone Engineering and Surveying provides expert civil engineering, project management, sustainable design, and land surveying services tailored to your needs.",
  openGraph: {
    title: "Cornerstone Engineering and Surveying",
    description:
      "Cornerstone Engineering and Surveying provides expert civil engineering, project management, sustainable design, and land surveying services tailored to your needs.",
    url: "https://www.cornerstoneengineeringandsurveying.com", // Adjust to the actual domain later
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
      <body className={inter.className}>
        <div className="bg-white text-black min-h-screen">
          <Header />

          {children}
        </div>
      </body>
    </html>
  );
}
