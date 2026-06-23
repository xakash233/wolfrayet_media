"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function StartProjectFab() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 120, 200], [0, 0, 1]);
  const y = useTransform(scrollY, [0, 200], [24, 0]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none fixed inset-x-0 bottom-24 z-40 flex justify-center sm:bottom-6"
    >
      <Link
        href="/contact"
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-border/60 bg-foreground px-6 py-3.5 text-sm font-semibold text-background shadow-2xl backdrop-blur-sm transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
      >
        Start a project
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}
