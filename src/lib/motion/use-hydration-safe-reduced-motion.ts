"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Framer Motion reads `prefers-reduced-motion` on the client's first paint but
 * not during SSR, which branches markup differently and triggers hydration errors.
 * Defer reduced-motion layout changes until after mount.
 */
export function useHydrationSafeReducedMotion(): boolean {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return false;
  return reducedMotion === true;
}
