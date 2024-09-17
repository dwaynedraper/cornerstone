import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { Montserrat } from "next/font/google";

const mont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Hero() {
  return (
    <div className={`relative bg-gray-900 ${mont.className}`}>
      {/* Decorative image and overlay */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <img
          alt=""
          src="https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="h-full w-full object-cover object-bottom"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gray-900 opacity-50"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
        <span className="text-2xl tracking-tight text-white lg:text-3xl">
          Welcome to
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
          Cornerstone
        </h1>
        <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
          Engineering & Surveying
        </h1>
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
