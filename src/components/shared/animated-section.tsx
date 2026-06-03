"use client";

import { motion } from "framer-motion";
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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        compact
          ? "px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14"
          : "section-padding",
        className
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </motion.section>
  );
}
