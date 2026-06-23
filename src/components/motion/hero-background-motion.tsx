"use client";

import { motion } from "framer-motion";
import { useHydrationSafeReducedMotion } from "@/lib/motion/use-hydration-safe-reduced-motion";

export function HeroBackgroundMotion({
  children,
}: {
  children: React.ReactNode;
}) {
  const reducedMotion = useHydrationSafeReducedMotion();

  if (reducedMotion) {
    return <div className="absolute inset-0 h-full w-full">{children}</div>;
  }

  return (
    <motion.div
      className="absolute inset-0 h-full w-full"
      initial={false}
      animate={{ scale: [1, 1.06, 1], x: [0, -12, 0] }}
      transition={{
        duration: 24,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
