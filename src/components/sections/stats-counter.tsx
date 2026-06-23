"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Stat } from "@/types";
import { useScrollReveal } from "@/components/shared/scroll-reveal";

interface StatsCounterProps {
  stats: Stat[];
}

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2200;
    let start: number | null = null;
    let frame = 0;

    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(Math.round(value * easeOutExpo(progress)));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const reveal = useScrollReveal({ index, duration: 1 });

  return (
    <motion.div
      ref={reveal.ref}
      initial={reveal.initial}
      animate={reveal.animate}
      transition={reveal.transition}
      className="text-center"
    >
      <p className="text-4xl font-bold text-primary sm:text-5xl">
        <AnimatedNumber
          value={stat.value}
          suffix={stat.suffix}
          prefix={stat.prefix}
        />
      </p>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        {stat.label}
      </p>
    </motion.div>
  );
}

export function StatsCounter({ stats }: StatsCounterProps) {
  return (
    <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatItem key={stat.label} stat={stat} index={index} />
      ))}
    </div>
  );
}
