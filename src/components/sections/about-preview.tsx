"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface AboutPreviewProps {
  reversed?: boolean;
}

export function AboutPreview({ reversed = false }: AboutPreviewProps) {
  return (
    <div
      className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: reversed ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative aspect-[4/3] overflow-hidden rounded-2xl"
      >
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
          alt="Digital marketing analytics"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: reversed ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          About Us
        </p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Our Mission</h2>
        <p className="mt-4 text-muted-foreground">
          At Wolfrayet Media, we deliver exceptional digital marketing solutions
          that drive real business growth. Our team combines strategic thinking
          with cutting-edge technology to help brands stand out in crowded markets.
        </p>
        <p className="mt-4 text-muted-foreground">
          From SEO and PPC to social media and content marketing, we provide
          end-to-end services tailored to your unique goals. Transparency,
          results, and partnership define everything we do.
        </p>
        <Button asChild variant="premium" className="mt-8">
          <Link href="/about">Find Out More</Link>
        </Button>
      </motion.div>
    </div>
  );
}
