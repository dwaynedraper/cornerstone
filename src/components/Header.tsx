"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "HOME", href: "/" },
  { name: "SERVICES", href: "/services" },
  { name: "ABOUT US", href: "/about" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;

    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        // At or near the top — always show
        setVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up — show
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down — hide
        setVisible(false);
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (e.clientY <= 100) {
      setVisible(true);
    }
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
      {/* Invisible hover zone — catches mouse even when header is translated off-screen */}
      <div
        className="fixed top-0 left-0 right-0 h-[100px] z-40"
        onMouseEnter={() => setVisible(true)}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-transform duration-300 ease-in-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">
                Cornerstone Engineering and Surveying
              </span>
              <img alt="Cornerstone Engineering and Surveying logo" src={"/logo.png"} className="h-20" />
            </a>
            <a href="/" className="flex justify-center">
              <span className="text-heritage self-center ml-4 text-xl font-heading font-semibold">
                Cornerstone
              </span>{" "}
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-navy"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-heading font-semibold leading-6 text-navy tracking-wide transition-colors duration-200 hover:text-gold-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="/contact"
              className="px-8 py-2.5 bg-heritage font-heading font-semibold text-sm leading-6 text-white rounded-md uppercase tracking-wider transition-colors duration-200 hover:bg-heritage-light"
            >
              Contact Us
            </a>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex justify-center">
                <span className="sr-only">Cornerstone Engineering and Surveying</span>
                <img alt="Cornerstone Engineering and Surveying logo" src="/logo.png" className="h-8 w-auto" />
                <span className="text-heritage self-center ml-4 text-xl font-heading font-semibold">
                  Cornerstone
                </span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-navy"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-heading font-semibold leading-7 text-heritage hover:bg-surface"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="/contact"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-heading font-semibold leading-7 bg-heritage text-white hover:bg-heritage-light"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Spacer to prevent content from jumping under the fixed header */}
      <div className="h-20" />
    </>
  );
}
