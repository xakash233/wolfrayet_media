"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import SplitType from "split-type";
import { gsap } from "@/lib/motion/lenis-gsap";
import { cn } from "@/lib/utils";

interface SplitHeroTitleProps {
  lines: readonly string[];
  className?: string;
  as?: "h1" | "h2";
}

function SplitHeroLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    const el = ref.current;
    let split: SplitType | null = null;

    const ctx = gsap.context(() => {
      split = new SplitType(el, {
        types: "chars",
      });

      const chars = split.chars;
      if (!chars?.length) return;

      gsap.set(chars, { opacity: 0, y: 48, willChange: "transform, opacity" });

      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.025,
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
  }, [text, reducedMotion, delay]);

  return (
    <span ref={ref} className="inline-block">
      {text}
    </span>
  );
}

export function SplitHeroTitle({
  lines,
  className,
  as: Tag = "h1",
}: SplitHeroTitleProps) {
  return (
    <Tag className={cn(className)}>
      {lines.map((line, index) => (
        <span key={line} className="block leading-[1.08]">
          <SplitHeroLine text={line} delay={index * 0.35} />
        </span>
      ))}
    </Tag>
  );
}
