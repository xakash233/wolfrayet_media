"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  compact?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  compact = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        compact ? "mb-5 max-w-3xl" : "mb-6 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <ScrollReveal index={0} duration={1.2}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
        </ScrollReveal>
      )}
      <ScrollReveal index={1} duration={1.35}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </ScrollReveal>
      {description && (
        <ScrollReveal index={2} duration={1.25}>
          <p
            className={cn(
              "mt-4 text-muted-foreground",
              compact ? "text-sm leading-relaxed sm:text-base" : "text-lg"
            )}
          >
            {description}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}
