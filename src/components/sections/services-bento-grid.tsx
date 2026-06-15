"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { serviceImageUrl } from "@/lib/images";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import type { ServiceCategory } from "@/types";
import { cn } from "@/lib/utils";

interface ServicesBentoGridProps {
  categories: ServiceCategory[];
  itCategory: ServiceCategory;
}

function displayTitle(title: string): string {
  const short = title.replace(/\s*\([^)]*\)\s*/g, "").trim();
  if (short.length <= 36) return short;
  return short.split(/[,&]/)[0]?.trim() ?? short;
}

const PREVIEW_COUNT = 6;

function ServiceMarqueeCard({ category }: { category: ServiceCategory }) {
  const [hovered, setHovered] = useState(false);
  const previewItems = category.items.slice(0, PREVIEW_COUNT);
  const hasMore = category.items.length > PREVIEW_COUNT;

  return (
    <article
      className="group relative w-[min(82vw,280px)] shrink-0 snap-start sm:w-[320px] lg:w-[360px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          "relative flex h-[35vh] min-h-[250px] max-h-[400px] flex-col overflow-hidden rounded-[1.5rem] bg-muted",
          "transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-black/25"
        )}
      >
        <Image
          src={serviceImageUrl(category.id, 760, 920)}
          alt={category.title}
          fill
          className={cn(
            "object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            hovered ? "scale-110 blur-[2px]" : "scale-100 blur-0"
          )}
          sizes="360px"
        />

        <div
          className={cn(
            "absolute inset-0 transition-colors duration-500",
            hovered
              ? "bg-black/75"
              : "bg-gradient-to-t from-black/90 via-black/50 to-black/30"
          )}
        />

        <div className="relative z-10 flex h-full flex-col p-4 sm:p-5 lg:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold leading-tight text-white sm:text-xl lg:text-2xl">
              {displayTitle(category.title)}
            </h3>
            <span className="shrink-0 text-xs font-medium text-white/60 sm:text-sm">
              /{category.items.length} services
            </span>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {previewItems.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[10px] text-white/95 sm:px-3 sm:py-1.5 sm:text-xs"
                >
                  {item}
                </span>
              ))}
            </div>
            {hasMore && (
              <Link
                href={`/services#${category.id}-detail`}
                className="inline-flex w-fit items-center gap-1.5 text-[11px] font-medium text-white transition-opacity hover:opacity-80 sm:text-sm"
              >
                See More
                <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({
  categories,
  direction,
}: {
  categories: ServiceCategory[];
  direction: "forward" | "reverse";
}) {
  const looped = [...categories, ...categories];

  return (
    <div className="marquee-row overflow-hidden">
      <div
        className={cn(
          "marquee-track flex w-max gap-4 py-1",
          direction === "forward"
            ? "marquee-track-forward"
            : "marquee-track-reverse"
        )}
      >
        {looped.map((category, index) => (
          <ServiceMarqueeCard key={`${category.id}-${index}`} category={category} />
        ))}
      </div>
    </div>
  );
}

function ScrollableRow({ categories }: { categories: ServiceCategory[] }) {
  return (
    <div
      className="flex gap-4 overflow-x-auto overscroll-x-contain py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      data-lenis-prevent
    >
      {categories.map((category) => (
        <ServiceMarqueeCard key={category.id} category={category} />
      ))}
    </div>
  );
}

export function ServicesBentoGrid({
  categories,
  itCategory,
}: ServicesBentoGridProps) {
  const reduceMotion = useReducedMotion();

  const allCategories = [...categories, itCategory];
  const rowA = allCategories.filter((_, i) => i % 2 === 0);
  const rowB = allCategories.filter((_, i) => i % 2 === 1);

  return (
    <section className="space-y-8">
      <ScrollReveal index={0} duration={1.4} className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          What We Offer
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Our services
        </h2>
      </ScrollReveal>

      <div className="py-6 sm:py-10">
        <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 space-y-4">
          {reduceMotion ? (
            <>
              <ScrollableRow categories={rowA} />
              <ScrollableRow categories={rowB} />
            </>
          ) : (
            <>
              <MarqueeRow categories={rowA} direction="forward" />
              <MarqueeRow categories={rowB} direction="reverse" />
            </>
          )}
        </div>
      </div>

      <ScrollReveal
        index={2}
        duration={1.3}
        className="flex flex-col items-center gap-4 pt-4"
      >
        <Link
          href="/services#full-catalog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          Explore all services
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </ScrollReveal>
    </section>
  );
}
