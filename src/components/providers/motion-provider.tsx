"use client";

import type { ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

/**
 * Motion stack:
 * - Lenis + GSAP ScrollTrigger → smooth scroll & scroll-driven sections
 * - Framer Motion → UI (menus, reveals, hovers) — used directly in components
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
