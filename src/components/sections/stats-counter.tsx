"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Stat } from "@/types";
import { useScrollReveal } from "@/components/shared/scroll-reveal";

interface StatsCounterProps {
  stats: Stat[];
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
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setDisplay(Math.min(Math.round(increment * step), value));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
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
  const reveal = useScrollReveal({ index, duration: 1.4 });

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
