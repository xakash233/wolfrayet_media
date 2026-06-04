"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { VIEWPORT_ONCE } from "@/lib/motion-safe";

interface AboutPreviewProps {
  findOutMoreHref?: string;
  showFindOutMore?: boolean;
}

export function AboutPreview({
  findOutMoreHref = "/about-details",
  showFindOutMore = true,
}: AboutPreviewProps) {
  return (
    <div className="mx-auto max-w-4xl">
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border bg-card/40 p-8 sm:p-10"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          About Us
        </p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Our Mission</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {SITE_CONFIG.mission}
        </p>
        {showFindOutMore && (
          <Button asChild variant="premium" className="mt-8">
            <Link href={findOutMoreHref}>Find Out More</Link>
          </Button>
        )}
      </motion.div>
    </div>
  );
}
