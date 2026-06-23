"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import SplitType from "split-type";
import { gsap } from "@/lib/motion/lenis-gsap";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  mode?: "words" | "chars";
}

export function TextReveal({
  children,
  className,
  mode = "words",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    const el = ref.current;
    let split: SplitType | null = null;

    const ctx = gsap.context(() => {
      split = new SplitType(el, {
        types: mode === "chars" ? "chars" : "words",
      });

      const targets = mode === "chars" ? split.chars : split.words;
      if (!targets?.length) return;

      gsap.set(targets, {
        opacity: 0,
        y: 40,
        willChange: "transform, opacity",
      });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: mode === "chars" ? 0.02 : 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onComplete: () => {
          gsap.set(targets, { clearProps: "willChange" });
        },
      });
    }, ref);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [children, mode, reducedMotion]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
