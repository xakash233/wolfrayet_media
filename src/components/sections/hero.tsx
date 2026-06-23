"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useHydrationSafeReducedMotion } from "@/lib/motion/use-hydration-safe-reduced-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { HeroCurvedText } from "@/components/motion/hero-curved-text";
import { HeroBackgroundMotion } from "@/components/motion/hero-background-motion";
import { SplitHeroTitle } from "@/components/motion/split-hero-title";
import { SplitRevealText } from "@/components/motion/split-reveal-text";
import { AnimatedSectionImage } from "@/components/shared/animated-section-image";
import { HeroVideoBackground } from "@/components/sections/hero-video-background";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SITE_CONFIG } from "@/lib/constants";
import { HERO_IMAGES } from "@/lib/images";
import { HERO_VIDEO } from "@/lib/media";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { CmsHeroVideo } from "@/lib/cms/types";

type PageHeroKey = keyof typeof SITE_CONFIG.pageHeroes;

interface HeroProps {
  variant?: "default" | "editorial";
  pageKey?: PageHeroKey;
  editorialKicker?: string;
  focalWord?: string;
  pathPhrase?: string;
  srOnlyTitle?: string;
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

function resolveEditorialCopy({
  pageKey,
  editorialKicker,
  focalWord,
  pathPhrase,
  srOnlyTitle,
}: Pick<
  HeroProps,
  "pageKey" | "editorialKicker" | "focalWord" | "pathPhrase" | "srOnlyTitle"
>) {
  const preset = pageKey ? SITE_CONFIG.pageHeroes[pageKey] : SITE_CONFIG.editorialHero;

  return {
    kicker: editorialKicker ?? preset.kicker,
    focalWord: focalWord ?? preset.focalWord,
    pathPhrase: pathPhrase ?? preset.pathPhrase,
    srOnlyTitle:
      srOnlyTitle ??
      ("srOnlyTitle" in preset ? preset.srOnlyTitle : SITE_CONFIG.tagline),
  };
}

export function Hero({
  variant = "default",
  pageKey,
  editorialKicker,
  focalWord,
  pathPhrase,
  srOnlyTitle,
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
  const reducedMotion = useHydrationSafeReducedMotion();

  if (variant === "editorial") {
    const copy = resolveEditorialCopy({
      pageKey,
      editorialKicker,
      focalWord,
      pathPhrase,
      srOnlyTitle,
    });

    return (
      <section
        aria-label={compact ? "Page hero" : "Hero"}
        className={cn(
          "relative flex w-full items-center justify-center overflow-hidden bg-background",
          compact ? "min-h-[72svh] sm:min-h-[78svh]" : "min-h-[100svh]"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsl(var(--primary)/0.06),transparent_70%)]" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <p className="sr-only">{copy.srOnlyTitle}</p>

          <SplitRevealText
            as="p"
            delay={0.1}
            stagger={0.022}
            y={32}
            className="editorial-hero-kicker mx-auto max-w-4xl text-balance font-bold text-foreground"
          >
            {copy.kicker}
          </SplitRevealText>

          <div className="relative mx-auto mt-2 w-full max-w-[1200px] sm:mt-4">
            <HeroCurvedText phrase={copy.pathPhrase} />

            <SplitRevealText
              as="h1"
              delay={0.35}
              stagger={0.04}
              y={64}
              className="editorial-hero-focal relative z-10 font-black uppercase text-[#FF6B00] dark:text-[#FF7A1A]"
            >
              {copy.focalWord}
            </SplitRevealText>
          </div>

          {subtitle && (
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              {subtitle}
            </motion.p>
          )}

          {showViewMore && (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 sm:mt-12"
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="btn-motion border-2 border-foreground/20 bg-transparent px-8 text-base font-semibold text-foreground hover:bg-foreground/5"
              >
                <Link href={viewMoreHref}>View More</Link>
              </Button>
            </motion.div>
          )}

          {showCta && (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button asChild variant="default" size="lg" className="group btn-motion">
                <Link href="/contact">
                  Get Started Today
                  <ArrowRight
                    className="ml-2 h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
                    aria-hidden
                  />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-motion-underline">
                <Link href="/services">Explore Services</Link>
              </Button>
            </motion.div>
          )}
        </div>

        {!compact && !reducedMotion && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="text-muted-foreground"
            >
              <ArrowDown className="h-5 w-5" />
            </motion.div>
          </motion.div>
        )}
      </section>
    );
  }

  const backgroundSrc = imageSrc ?? HERO_IMAGES[heroImage];
  const isHomeTagline = title === SITE_CONFIG.tagline;
  const useVideoBlend = videoIntro && !reducedMotion;
  const useSplitHero = isHomeTagline && !reducedMotion;

  return (
    <section
      aria-label={compact ? "Page hero" : "Hero"}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      <HeroBackgroundMotion>
        <div className="absolute inset-0 z-0 min-h-[100svh] w-full" aria-hidden>
          {videoIntro ? (
            <HeroVideoBackground
              className="min-h-[100svh] w-full"
              webm={videoConfig?.webm}
              mp4={videoConfig?.mp4 || HERO_VIDEO.mp4}
            />
          ) : (
            <AnimatedSectionImage
              src={backgroundSrc}
              alt={imageAlt}
              fill
              priority={!compact}
              imageClassName="object-cover object-center"
              sizes="100vw"
              parallax={false}
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
      </HeroBackgroundMotion>

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
              duration={1}
              className={cn(
                "hero-eyebrow mb-5",
                videoIntro ? "text-white" : "text-primary"
              )}
            >
              {SITE_CONFIG.name}
            </ScrollReveal>
          )}

          {useSplitHero ? (
            <SplitHeroTitle
              lines={SITE_CONFIG.heroTaglineLines}
              className="hero-title-cinematic mx-auto max-w-6xl text-white"
            />
          ) : (
            <ScrollReveal
              index={hideEyebrow ? 0 : 1}
              duration={1}
              className={cn(
                "mx-auto max-w-6xl text-white",
                isHomeTagline ? "hero-title-home tracking-wide" : "hero-title text-balance"
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
          )}

          {subtitle && (
            <ScrollReveal
              index={hideEyebrow ? 1 : 2}
              duration={1}
              className={cn(
                "hero-subtitle mx-auto mt-6 max-w-3xl",
                isHomeTagline && "hero-subtitle-home",
                videoIntro ? "text-white/95" : "text-white/90"
              )}
            >
              {subtitle}
            </ScrollReveal>
          )}
        </div>

        {showViewMore && (
          <ScrollReveal index={hideEyebrow ? 2 : 3} duration={1} className="mt-8">
            <Button
              asChild
              variant="outline"
              size="lg"
              className={cn(
                "btn-motion isolate border-2 px-8 text-base font-semibold",
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
            duration={1}
            className="relative z-20 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button asChild variant="premium" size="lg" className="group btn-motion">
              <Link href="/contact">
                Get Started Today
                <ArrowRight
                  className="ml-2 h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
                  aria-hidden
                />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg" className="btn-motion-underline">
              <Link href="/services">Explore Services</Link>
            </Button>
          </ScrollReveal>
        )}
      </div>

      {!compact && (
        <ScrollReveal
          index={5}
          duration={1}
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
