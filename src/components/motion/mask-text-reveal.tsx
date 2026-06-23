"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/motion/lenis-gsap";
import { cn } from "@/lib/utils";

interface MaskTextRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function MaskTextReveal({ children, className }: MaskTextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    const el = ref.current;

    const ctx = gsap.context(() => {
      gsap.set(el, {
        clipPath: "inset(100% 0 0 0)",
        y: 24,
        opacity: 0,
        willChange: "transform, opacity, clip-path",
      });

      gsap.to(el, {
        clipPath: "inset(0% 0 0 0)",
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        onComplete: () => {
          gsap.set(el, { clearProps: "willChange" });
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [children, reducedMotion]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
