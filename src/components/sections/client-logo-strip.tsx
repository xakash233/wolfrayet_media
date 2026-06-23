"use client";

import { InfiniteMarquee } from "@/components/motion/infinite-marquee";
import { clientLogos } from "@/data/stats";

export function ClientLogoStrip() {
  return (
    <section aria-label="Trusted by clients" className="py-8 sm:py-10">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Trusted by growing brands
      </p>
      <InfiniteMarquee direction="reverse" trackClassName="gap-6 px-4">
        {clientLogos.map((client) => (
          <div
            key={client.id}
            className="flex h-14 min-w-[140px] items-center justify-center rounded-xl border border-border/60 bg-card/50 px-6 shadow-sm transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
          >
            <span className="whitespace-nowrap text-sm font-semibold text-foreground/90 sm:text-base">
              {client.name}
            </span>
          </div>
        ))}
      </InfiniteMarquee>
    </section>
  );
}
