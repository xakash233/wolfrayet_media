"use client";

import { InfiniteMarquee } from "@/components/motion/infinite-marquee";

const PHRASES = [
  "SEO",
  "PPC",
  "Social Media",
  "Web Development",
  "Branding",
  "Content Marketing",
  "Analytics",
  "Growth Strategy",
  "Local SEO",
  "Conversion Optimization",
] as const;

export function TextMarqueeBand() {
  return (
    <section
      aria-label="Services highlight"
      className="border-y border-border/40 bg-muted/30 py-6 sm:py-8"
    >
      <InfiniteMarquee direction="forward" trackClassName="gap-12 px-6">
        {PHRASES.map((phrase) => (
          <span
            key={phrase}
            className="whitespace-nowrap text-2xl font-bold tracking-tight text-foreground/80 sm:text-3xl md:text-4xl"
          >
            {phrase}
            <span className="mx-8 text-primary" aria-hidden>
              •
            </span>
          </span>
        ))}
      </InfiniteMarquee>
    </section>
  );
}
