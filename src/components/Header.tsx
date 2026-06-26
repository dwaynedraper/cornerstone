"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header({ showWork = false }: { showWork?: boolean }) {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    ...(showWork ? [{ name: "Work", href: "/work" }] : []),
    { name: "About", href: "/about" },
  ];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 10) setVisible(true);
      else if (currentScrollY < lastScrollY.current) setVisible(true);
      else if (currentScrollY > lastScrollY.current) setVisible(false);
      lastScrollY.current = currentScrollY;
      ticking.current = false;
    });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (e.clientY <= 100) setVisible(true);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleScroll, handleMouseMove]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b border-ink/10 bg-paper/95 shadow-xs backdrop-blur-sm transition-transform duration-300 ease-in-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8"
        >
          <a href="/" className="flex items-center gap-3">
            <span className="sr-only">Cornerstone Engineering and Surveying</span>
            <Image
              src="/logo.png"
              alt="Cornerstone Engineering and Surveying logo"
              width={44}
              height={44}
              className="h-11 w-11"
              priority
            />
            <span className="font-heading text-lg font-semibold tracking-wide text-maroon">
              Cornerstone
            </span>
          </a>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-ink"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-x-10">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative font-heading text-sm font-medium text-ink transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-blueprint after:transition-all after:duration-300 hover:text-blueprint hover:after:w-full"
              >
                {item.name}
              </a>
            ))}
            <a
              href="/contact"
              className="rounded-sm bg-blueprint px-5 py-2.5 font-heading text-sm font-medium text-white transition-colors duration-200 hover:bg-blueprint-dark"
            >
              Get a quote
            </a>
          </div>
        </nav>

        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-paper px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-ink/10">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-2">
                <span className="sr-only">Cornerstone Engineering and Surveying</span>
                <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9" />
                <span className="font-heading text-lg font-semibold tracking-wide text-maroon">
                  Cornerstone
                </span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-ink"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-8 flow-root">
              <div className="-my-6 divide-y divide-ink/10">
                <div className="space-y-1 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-md px-3 py-2 font-heading text-base font-medium text-ink hover:bg-sand-light"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="/contact"
                    className="-mx-3 block rounded-md bg-blueprint px-3 py-2.5 text-center font-heading text-base font-medium text-white hover:bg-blueprint-dark"
                  >
                    Get a quote
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Spacer so content clears the fixed header */}
      <div className="h-[68px]" />
    </>
  );
}
