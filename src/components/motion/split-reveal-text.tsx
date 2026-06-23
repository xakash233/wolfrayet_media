"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import SplitType from "split-type";
import { gsap } from "@/lib/motion/lenis-gsap";
import { cn } from "@/lib/utils";

interface SplitRevealTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  y?: number;
}

const TAGS = {
  h1: "h1",
  h2: "h2",
  p: "p",
  span: "span",
  div: "div",
} as const;

export function SplitRevealText({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  stagger = 0.028,
  y = 48,
}: SplitRevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    const el = ref.current;
    let split: SplitType | null = null;

    const ctx = gsap.context(() => {
      split = new SplitType(el, {
        types: "lines,words,chars",
        lineClass: "split-line",
      });

      const chars = split.chars;
      if (!chars?.length) return;

      gsap.set(chars, { opacity: 0, y, willChange: "transform, opacity" });

      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger,
        ease: "power3.out",
        delay,
        onComplete: () => {
          gsap.set(chars, { clearProps: "willChange" });
        },
      });
    }, ref);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [children, delay, reducedMotion, stagger, y]);

  const Component = TAGS[Tag];

  return (
    <Component ref={ref as React.RefObject<HTMLDivElement>} className={cn(className)}>
      {children}
    </Component>
  );
}
