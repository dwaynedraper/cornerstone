"use client";

import { m, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Starting vertical offset in px. */
  y?: number;
};

/**
 * Fade + rise into view, once. Uses the `useInView` hook so it works under
 * LazyMotion's `domAnimation` bundle. Content is always in the DOM (SEO-safe).
 */
export default function Reveal({ children, className, delay = 0, y = 18 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <m.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
