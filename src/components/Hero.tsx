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

export default function Hero() {
  return (
    <div className="relative bg-gray-900 h-screen">
      {/* Decorative image and overlay */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1610079874911-4487134bc8b9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="h-full w-full object-cover object-bottom"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gray-900 opacity-50"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
        <h1 className="text-5xl font-bold tracking-tight text-white lg:text-7xl">
          Cornerstone
        </h1>
        <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
          Engineering & Surveying
        </h1>
        <p className="mt-8 text-xl text-white">
          Precision and Expertise: Building Your Foundations Across Texas with
          ​Cornerstone Engineering & Surveying
        </p>
        <a
          href="/contact"
          className="mt-8 inline-block rounded-md text-white bg-[#651212] px-8 py-3 text-base font-medium hover:bg-[rgb(120,38,38)] hover:text-white"
        >
          Book Today!
        </a>
      </div>
    </div>
  );
}
