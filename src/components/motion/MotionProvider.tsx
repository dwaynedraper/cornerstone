"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * App-wide motion setup.
 * - LazyMotion + `domAnimation` keeps the initial bundle tiny (~5kb); features
 *   load on demand. Use the lightweight `m` components everywhere (not `motion`).
 * - MotionConfig reducedMotion="user" honors the OS "reduce motion" setting.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
