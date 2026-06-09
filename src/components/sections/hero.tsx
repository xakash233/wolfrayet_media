"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SSR_SAFE_INITIAL } from "@/lib/motion-safe";
import { ArrowRight } from "lucide-react";
import { AnimatedSectionImage } from "@/components/shared/animated-section-image";
import { HeroVideoBackground } from "@/components/sections/hero-video-background";
import { SITE_CONFIG } from "@/lib/constants";
import { HERO_IMAGES } from "@/lib/images";
import { sectionTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { CmsHeroVideo } from "@/lib/cms/types";

interface HeroProps {
  title?: string;
  subtitle?: string;
  showCta?: boolean;
  /** Inner pages: hides scroll indicator; keeps full-viewport background. */
  compact?: boolean;
  showViewMore?: boolean;
  viewMoreHref?: string;
  /** Override background image (e.g. blog post featured image). */
  imageSrc?: string;
  imageAlt?: string;
  /** Preset hero background when imageSrc is not set */
  heroImage?: keyof typeof HERO_IMAGES;
  /** Hide Wolfrayet Media label above title (inner pages). */
  hideEyebrow?: boolean;
  /** Homepage: full-screen video background with image fallback */
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

  return (
    <section
      aria-label={compact ? "Page hero" : "Hero"}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      {/* Full-bleed background — covers entire hero to all edges */}
      <div className="absolute inset-0 z-0 min-h-[100svh] w-full" aria-hidden>
        {videoIntro ? (
          <HeroVideoBackground
            className="min-h-[100svh] w-full"
            webm={videoConfig?.webm}
            mp4={videoConfig?.mp4}
            poster={videoConfig?.poster}
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
            videoIntro ? "bg-black/50" : "bg-black/75"
          )}
        />
        <div className="absolute inset-0 bg-hero-glow bg-mesh-dark" />
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-6xl px-4 text-center sm:px-6 lg:px-8",
          compact ? "py-28 sm:py-32" : "py-32 sm:py-36"
        )}
      >
        {!hideEyebrow && (
          <motion.p
            initial={SSR_SAFE_INITIAL}
            animate={{ opacity: 1, y: 0 }}
            transition={sectionTransition(0)}
            className="hero-eyebrow mb-5 text-primary"
          >
            {SITE_CONFIG.name}
          </motion.p>
        )}

        <motion.h1
          initial={SSR_SAFE_INITIAL}
          animate={{ opacity: 1, y: 0 }}
          transition={sectionTransition(0.12)}
          className={cn(
            "mx-auto max-w-6xl text-white text-balance",
            isHomeTagline ? "hero-title-home tracking-wide" : "hero-title"
          )}
        >
          {isHomeTagline ? (
            <>
              {SITE_CONFIG.heroTaglineLines[0]}
              <br />
              {SITE_CONFIG.heroTaglineLines[1]}
            </>
          ) : (
            title
          )}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={SSR_SAFE_INITIAL}
            animate={{ opacity: 1, y: 0 }}
            transition={sectionTransition(0.24)}
            className="hero-subtitle mx-auto mt-6 max-w-3xl text-white/90"
          >
            {subtitle}
          </motion.p>
        )}

        {showViewMore && (
          <motion.div
            initial={SSR_SAFE_INITIAL}
            animate={{ opacity: 1, y: 0 }}
            transition={sectionTransition(0.32)}
            className="mt-6"
          >
            <Button
              asChild
              variant="outline"
              size="default"
              className="bg-white/10 px-6 text-base text-white hover:bg-white/20"
            >
              <Link href={viewMoreHref}>View More</Link>
            </Button>
          </motion.div>
        )}

        {showCta && (
          <motion.div
            initial={SSR_SAFE_INITIAL}
            animate={{ opacity: 1, y: 0 }}
            transition={sectionTransition(0.4)}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
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
          </motion.div>
        )}
      </div>

      {!compact && (
        <motion.div
          initial={SSR_SAFE_INITIAL}
          animate={{ opacity: 1 }}
          transition={sectionTransition(0.85)}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          aria-hidden
        >
          <motion.div
            animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="h-10 w-6 rounded-full border-2 border-white/30 p-1"
          >
            <motion.div className="mx-auto h-2 w-1 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
