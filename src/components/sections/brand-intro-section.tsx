"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Logo } from "@/components/shared/logo";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop&q=75";

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
          : "scroll-mt-24 border-y border-border/50 py-8 sm:py-10 lg:py-12"
      )}
    >
      {fullScreen ? (
        <div className="absolute inset-0 z-0 min-h-[100svh] w-full" aria-hidden>
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            className="h-full w-full object-cover object-center"
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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "w-full rounded-3xl border text-center shadow-2xl backdrop-blur-md",
            fullScreen
              ? "mx-auto max-w-4xl border-white/10 bg-black/45 p-8 sm:p-12 lg:p-16"
              : "border-border bg-card/90 dark:border-white/10 dark:bg-black/55 p-6 sm:p-8 lg:p-10"
          )}
        >
          <div className="flex justify-center">
            <Logo
              href="/"
              size="lg"
              imageClassName={cn(
                "h-12 w-auto sm:h-14 md:h-16",
                fullScreen && "sm:h-16 md:h-20"
              )}
            />
          </div>

          <h2
            className={cn(
              "hero-title mx-auto mt-8 max-w-5xl uppercase tracking-wide text-balance",
              fullScreen ? "text-white" : "text-foreground"
            )}
          >
            {SITE_CONFIG.heroHeadline}
          </h2>

          <p
            className={cn(
              "hero-subtitle mx-auto mt-8 w-full max-w-4xl text-balance",
              fullScreen ? "text-white/90" : "text-muted-foreground"
            )}
          >
            {SITE_CONFIG.heroDescription}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
