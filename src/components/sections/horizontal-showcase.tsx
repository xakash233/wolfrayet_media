"use client";

import { useEffect, useRef } from "react";
import { useHydrationSafeReducedMotion } from "@/lib/motion/use-hydration-safe-reduced-motion";
import { gsap } from "@/lib/motion/lenis-gsap";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { features } from "@/data/stats";
import { cn } from "@/lib/utils";

const SHOWCASE = features.slice(0, 6);

export function HorizontalShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useHydrationSafeReducedMotion();
  const { ready } = useLenis();

  useEffect(() => {
    if (reducedMotion || !ready || !sectionRef.current || !trackRef.current) {
      return;
    }

    const section = sectionRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const getScroll = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [ready, reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="section-padding bg-muted/20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">Why brands choose us</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SHOWCASE.map((item) => (
              <div
                key={item.id}
                className="card-premium-hover rounded-2xl border border-border/60 bg-card p-6"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Why brands choose us"
      className="relative overflow-hidden bg-muted/20"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      <div className="flex h-[100svh] min-h-[520px] flex-col justify-center py-12">
        <div className="mb-10 px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Our approach
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">
            Scroll to explore what sets us apart
          </h2>
        </div>
        <div ref={trackRef} className="flex w-max gap-6 px-4 sm:px-6 lg:px-8">
          {SHOWCASE.map((item, i) => (
            <article
              key={item.id}
              className={cn(
                "card-premium-hover flex w-[min(85vw,380px)] shrink-0 flex-col rounded-2xl border border-border/60 bg-card p-8 shadow-lg",
                i % 2 === 1 && "mt-8"
              )}
            >
              <span className="text-4xl font-bold text-primary/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
