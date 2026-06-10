"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedSectionImage } from "@/components/shared/animated-section-image";
import { HeroVideoBackground } from "@/components/sections/hero-video-background";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SITE_CONFIG } from "@/lib/constants";
import { HERO_IMAGES } from "@/lib/images";
import { HERO_VIDEO } from "@/lib/media";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { CmsHeroVideo } from "@/lib/cms/types";

interface HeroProps {
  title?: string;
  subtitle?: string;
  showCta?: boolean;
  compact?: boolean;
  showViewMore?: boolean;
  viewMoreHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  heroImage?: keyof typeof HERO_IMAGES;
  hideEyebrow?: boolean;
  videoIntro?: boolean;
  videoConfig?: CmsHeroVideo;
}

export function Hero({
  title = SITE_CONFIG.tagline,
  subtitle = SITE_CONFIG.description,
  showCta = true,
  compact = false,
  showViewMore = false,
  viewMoreHref = "/#intro",
  imageSrc,
  imageAlt = "Modern digital marketing and technology workspace",
  heroImage = "default",
  hideEyebrow = false,
  videoIntro = false,
  videoConfig,
}: HeroProps) {
  const backgroundSrc = imageSrc ?? HERO_IMAGES[heroImage];
  const reducedMotion = useReducedMotion();
  const isHomeTagline = title === SITE_CONFIG.tagline;
  const useVideoBlend = videoIntro && !reducedMotion;

  return (
    <section
      aria-label={compact ? "Page hero" : "Hero"}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 min-h-[100svh] w-full" aria-hidden>
        {videoIntro ? (
          <HeroVideoBackground
            className="min-h-[100svh] w-full"
            webm={videoConfig?.webm}
            mp4={videoConfig?.mp4 || HERO_VIDEO.mp4}
            poster={videoConfig?.poster || HERO_VIDEO.poster}
          />
        ) : (
          <AnimatedSectionImage
            src={backgroundSrc}
            alt={imageAlt}
            fill
            priority={!compact}
            imageClassName="object-cover object-center"
            sizes="100vw"
          />
        )}
        <div
          className={cn(
            "absolute inset-0",
            videoIntro ? "hero-video-scrim" : "bg-black/75"
          )}
        />
        {!videoIntro && (
          <div className="absolute inset-0 bg-hero-glow bg-mesh-dark" />
        )}
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-6xl px-4 text-center sm:px-6 lg:px-8",
          compact ? "py-28 sm:py-32" : "py-32 sm:py-36"
        )}
      >
        <div
          className={cn(
            useVideoBlend ? "hero-video-blend" : "hero-video-fallback text-white"
          )}
        >
          {!hideEyebrow && (
            <ScrollReveal
              index={0}
              duration={1.4}
              className={cn(
                "hero-eyebrow mb-5",
                videoIntro ? "text-white" : "text-primary"
              )}
            >
              {SITE_CONFIG.name}
            </ScrollReveal>
          )}

          <ScrollReveal
            index={hideEyebrow ? 0 : 1}
            duration={1.5}
            className={cn(
              "mx-auto max-w-6xl text-balance text-white",
              isHomeTagline ? "hero-title-home tracking-wide" : "hero-title"
            )}
            as="div"
          >
            <h1>
              {isHomeTagline ? (
                <>
                  {SITE_CONFIG.heroTaglineLines[0]}
                  <br />
                  {SITE_CONFIG.heroTaglineLines[1]}
                </>
              ) : (
                title
              )}
            </h1>
          </ScrollReveal>

          {subtitle && (
            <ScrollReveal
              index={hideEyebrow ? 1 : 2}
              duration={1.45}
              className={cn(
                "hero-subtitle mx-auto mt-6 max-w-3xl",
                videoIntro ? "text-white/95" : "text-white/90"
              )}
            >
              {subtitle}
            </ScrollReveal>
          )}
        </div>

        {showViewMore && (
          <ScrollReveal
            index={hideEyebrow ? 2 : 3}
            duration={1.35}
            className="mt-8"
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className={cn(
                "isolate border-2 px-8 text-base font-semibold transition-all",
                videoIntro
                  ? "border-white bg-white text-black hover:bg-white/90 hover:text-black"
                  : "border-white/40 bg-white/10 text-white hover:bg-white/20"
              )}
            >
              <Link href={viewMoreHref}>View More</Link>
            </Button>
          </ScrollReveal>
        )}

        {showCta && (
          <ScrollReveal
            index={hideEyebrow ? (showViewMore ? 3 : 2) : showViewMore ? 4 : 3}
            duration={1.5}
            className="relative z-20 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button asChild variant="premium" size="lg" className="group">
              <Link href="/contact">
                Get Started Today
                <ArrowRight
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link href="/services">Explore Services</Link>
            </Button>
          </ScrollReveal>
        )}
      </div>

      {!compact && (
        <ScrollReveal
          index={5}
          duration={1.2}
          y={24}
          blur={0}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            aria-hidden
            animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="h-10 w-6 rounded-full border-2 border-white/50 p-1"
          >
            <motion.div className="mx-auto h-2 w-1 rounded-full bg-white/80" />
          </motion.div>
        </ScrollReveal>
      )}
    </section>
  );
}
