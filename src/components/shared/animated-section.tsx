"use client";

import { motion } from "framer-motion";
import { SSR_SAFE_INITIAL, VIEWPORT_ONCE } from "@/lib/motion-safe";
import { sectionTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  compact?: boolean;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  id,
  compact = false,
}: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      initial={SSR_SAFE_INITIAL}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={sectionTransition(delay)}
      className={cn(
        compact
          ? "px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8"
          : "section-padding",
        className
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </motion.section>
  );
}
