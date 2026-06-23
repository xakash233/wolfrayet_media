"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useHydrationSafeReducedMotion } from "@/lib/motion/use-hydration-safe-reduced-motion";

/**
 * Subtle enter fade — avoids full opacity:0 blank-page flash on navigation.
 */
export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reducedMotion = useHydrationSafeReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0.94 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
