"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedSectionImage } from "@/components/shared/animated-section-image";
import { useScrollReveal } from "@/components/shared/scroll-reveal";
import { SECTION_IMAGES } from "@/lib/images";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTASection({
  title = "Ready to get started?",
  description = "Share your project details and our team will respond within 24 hours with a tailored quote.",
  primaryLabel = "Send Request",
  primaryHref = "/contact",
  secondaryLabel = "View Our Work",
  secondaryHref = "/portfolio",
}: CTASectionProps) {
  const reveal = useScrollReveal({ index: 0, duration: 1.6 });

  return (
    <motion.div
      ref={reveal.ref}
      initial={reveal.initial}
      animate={reveal.animate}
      transition={reveal.transition}
      className="relative overflow-hidden rounded-3xl border border-primary/20 p-8 sm:p-12 lg:p-16"
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <AnimatedSectionImage
          src={SECTION_IMAGES.cta}
          alt=""
          fill
          className="h-full w-full"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>
      <div className="relative z-10 max-w-2xl">
        <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button asChild variant="premium" size="lg" className="group">
            <Link href={primaryHref}>
              {primaryLabel}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
