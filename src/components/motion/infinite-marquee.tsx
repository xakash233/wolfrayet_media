"use client";

import { cn } from "@/lib/utils";

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  direction?: "forward" | "reverse";
  className?: string;
  trackClassName?: string;
  /** Duplicate count — 2 is enough for -50% seamless loop */
  duplicates?: number;
}

export function InfiniteMarquee({
  children,
  direction = "forward",
  className,
  trackClassName,
  duplicates = 2,
}: InfiniteMarqueeProps) {
  const items = Array.from({ length: duplicates }, (_, i) => (
    <div
      key={i}
      className={cn("flex shrink-0 items-center gap-8", trackClassName)}
      aria-hidden={i > 0 ? true : undefined}
    >
      {children}
    </div>
  ));

  return (
    <div className={cn("marquee-row overflow-hidden", className)}>
      <div
        className={cn(
          "marquee-track flex w-max items-center gap-8",
          direction === "forward"
            ? "marquee-track-forward"
            : "marquee-track-reverse"
        )}
      >
        {items}
      </div>
    </div>
  );
}
