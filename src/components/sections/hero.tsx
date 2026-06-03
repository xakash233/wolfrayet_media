"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const DEFAULT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop&q=75";

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
  /** Hide Wolfrayet Media label above title (inner pages). */
  hideEyebrow?: boolean;
}

export function Hero({
  title = SITE_CONFIG.tagline,
  subtitle = SITE_CONFIG.description,
  showCta = true,
  compact = false,
  showViewMore = false,
  viewMoreHref = "/#intro",
  imageSrc = DEFAULT_HERO_IMAGE,
  imageAlt = "",
  hideEyebrow = false,
}: HeroProps) {
  const reducedMotion = useReducedMotion();
  const isHomeTagline = title === SITE_CONFIG.tagline;

  return (
    <section
      aria-label={compact ? "Page hero" : "Hero"}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      {/* Full-bleed background — covers entire hero to all edges */}
      <div className="absolute inset-0 z-0 h-full min-h-[100svh] w-full" aria-hidden>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={!compact}
          fetchPriority={!compact ? "high" : "auto"}
          className="h-full min-h-full w-full object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/75" />
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
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.5 }}
            className="hero-eyebrow mb-5 text-primary"
          >
            {SITE_CONFIG.name}
          </motion.p>
        )}

        <motion.h1
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.1 }}
          className={cn(
            "mx-auto max-w-5xl text-white text-balance",
            isHomeTagline ? "hero-title-home uppercase tracking-wide" : "hero-title"
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
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.2 }}
            className="hero-subtitle mx-auto mt-6 max-w-3xl text-white/90"
          >
            {subtitle}
          </motion.p>
        )}

        {showViewMore && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.5, delay: 0.25 }}
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
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.3 }}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          aria-hidden
        >
          <motion.div
            animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-10 w-6 rounded-full border-2 border-white/30 p-1"
          >
            <motion.div className="mx-auto h-2 w-1 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
