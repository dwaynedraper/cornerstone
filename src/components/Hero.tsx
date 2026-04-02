import { Montserrat } from "next/font/google";
import Image from "next/image";

const mont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Hero() {
  return (
    <div className={`relative bg-navy ${mont.className}`}>
      {/* Decorative image and overlay */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <Image
          alt="Cornerstone Engineering & Surveying project background"
          src="/IMG_0854.jpg"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>
      {/* Rich gradient overlay for cinematic depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-navy/30"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-36 text-center sm:py-64 lg:px-0">
        <span className="text-lg tracking-[0.25em] uppercase text-gold-200 lg:text-xl font-heading font-medium">
          Welcome to
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white lg:text-7xl text-center flex flex-col gap-1">
          <span>Cornerstone</span>
          <span>Engineering & Surveying</span>
        </h1>
        {/* Decorative accent line */}
        <div className="mt-8 w-48 h-1 bg-gradient-to-r from-heritage via-gold to-heritage rounded-full" />
        {/* <p className="mt-8 text-xl text-white font-semibold bg-black/40 rounded-lg p-8">
          At Cornerstone Engineering & Surveying, we bring over 25 years of
          expertise to every project, blending modern design techniques with
          time-tested engineering and surveying principles. Our team of licensed
          professional engineers and registered professional land surveyors is
          dedicated to delivering innovative, sustainable, and cost-effective
          solutions for our clients.
        </p> */}
        {/* <a
          href="tel:+18179406027"
          className="mt-8 text-xl inline-block rounded-md font-bold uppercase text-white bg-[#651212] px-8 py-3 hover:bg-[rgb(120,38,38)] hover:text-white"
        >
          Call Today!
        </a> */}
      </div>
    </div>
  );
}
