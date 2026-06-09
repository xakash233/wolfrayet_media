"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
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
    <ScrollReveal
      as="section"
      id={id}
      index={delay}
      duration={1.5}
      className={cn(
        compact
          ? "px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8"
          : "section-padding",
        className
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </ScrollReveal>
  );
}
