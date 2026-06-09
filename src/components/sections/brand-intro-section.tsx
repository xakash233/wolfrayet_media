"use client";

import { Logo } from "@/components/shared/logo";
import { AnimatedSectionImage } from "@/components/shared/animated-section-image";
import { SITE_CONFIG } from "@/lib/constants";
import { HERO_IMAGES, SECTION_IMAGES } from "@/lib/images";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { cn } from "@/lib/utils";

interface BrandIntroSectionProps {
  id?: string;
  fullScreen?: boolean;
}

export function BrandIntroSection({
  id = "intro",
  fullScreen = false,
}: BrandIntroSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden",
        fullScreen
          ? "flex min-h-[100svh] items-center justify-center"
          : "scroll-mt-24 border-y border-border/50 py-5 sm:py-6 lg:py-8"
      )}
    >
      {fullScreen ? (
        <div className="absolute inset-0 z-0 min-h-[100svh] w-full" aria-hidden>
          <AnimatedSectionImage
            src={HERO_IMAGES.default}
            alt="Digital marketing partnership"
            fill
            priority
            className="h-full w-full"
            imageClassName="h-full w-full object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 bg-hero-glow bg-mesh-dark" />
        </div>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background" />
          <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-40" />
        </>
      )}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid w-full items-center gap-8",
            !fullScreen && "lg:grid-cols-2 lg:gap-12"
          )}
        >
          {!fullScreen && (
            <ScrollReveal index={0} duration={1.5} className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/60 shadow-xl lg:aspect-[5/4]">
              <AnimatedSectionImage
                src={SECTION_IMAGES.intro}
                alt="Business growth and digital partnership"
                fill
                className="h-full w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          )}

          <ScrollReveal
            index={fullScreen ? 0 : 1}
            duration={1.55}
            className={cn(
              "w-full rounded-3xl border text-center shadow-2xl backdrop-blur-md",
              fullScreen
                ? "mx-auto max-w-4xl border-white/10 bg-black/45 p-8 sm:p-12 lg:p-16"
                : "border-border bg-card/90 dark:border-white/10 dark:bg-black/55 p-6 sm:p-8 lg:p-10 lg:text-left"
            )}
          >
            <div className={cn("flex justify-center", !fullScreen && "lg:justify-start")}>
              <Logo
                href="/"
                size="lg"
                imageClassName={cn(
                  "h-14 sm:h-16 md:h-[4.5rem] w-auto",
                  fullScreen && "sm:h-[4.75rem] md:h-24"
                )}
              />
            </div>

            <h2
              className={cn(
                "hero-title mx-auto mt-8 max-w-5xl uppercase tracking-wide text-balance",
                fullScreen ? "text-white" : "text-foreground lg:mx-0"
              )}
            >
              {SITE_CONFIG.heroHeadline}
            </h2>

            <p
              className={cn(
                "hero-subtitle mx-auto mt-8 w-full max-w-4xl text-balance",
                fullScreen ? "text-white/90" : "text-muted-foreground lg:mx-0"
              )}
            >
              {SITE_CONFIG.heroDescription}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
