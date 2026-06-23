"use client";

import type { ReactNode } from "react";
import { PageLoader } from "@/components/motion/page-loader";
import { ScrollTriggerRefresh } from "@/components/motion/scroll-trigger-refresh";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

/**
 * Motion stack:
 * - Lenis + GSAP ScrollTrigger → smooth scroll & scroll-driven sections
 * - Framer Motion → UI (menus, reveals, hovers) — used directly in components
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <PageLoader />
      <ScrollTriggerRefresh />
      {children}
    </SmoothScrollProvider>
  );
}
