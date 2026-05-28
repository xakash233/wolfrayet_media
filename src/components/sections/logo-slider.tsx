"use client";

import { motion } from "framer-motion";

interface LogoSliderProps {
  logos: { id: string; name: string }[];
}

export function LogoSlider({ logos }: LogoSliderProps) {
  const duplicated = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden py-8">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />
      <motion.div
        className="flex gap-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        {duplicated.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="flex shrink-0 items-center justify-center rounded-xl border border-border bg-card px-8 py-4"
          >
            <span className="whitespace-nowrap text-lg font-semibold text-muted-foreground">
              {logo.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
