"use client";

import { useEffect, useId, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/motion/lenis-gsap";
import { cn } from "@/lib/utils";

interface HeroCurvedTextProps {
  phrase: string;
  repeats?: number;
  className?: string;
}

export function HeroCurvedText({
  phrase,
  repeats = 4,
  className,
}: HeroCurvedTextProps) {
  const pathId = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const reducedMotion = useReducedMotion();
  const text = Array.from({ length: repeats }, () => phrase).join("   •   ");

  useEffect(() => {
    if (reducedMotion || !svgRef.current) return;

    const textPath = svgRef.current.querySelector("textPath");
    if (!textPath) return;

    const ctx = gsap.context(() => {
      gsap.set(textPath, { opacity: 0 });
      gsap.to(textPath, {
        opacity: 1,
        duration: 1.2,
        delay: 0.65,
        ease: "power2.out",
      });

      gsap.fromTo(
        textPath,
        { attr: { startOffset: "0%" } },
        {
          attr: { startOffset: "-12%" },
          duration: 18,
          repeat: -1,
          ease: "none",
          delay: 1.2,
        }
      );
    }, svgRef);

    return () => ctx.revert();
  }, [phrase, reducedMotion, repeats]);

  return (
    <svg
      ref={svgRef}
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 z-20 h-[min(52vw,420px)] w-[min(96vw,1200px)] -translate-x-1/2 -translate-y-[38%] text-foreground sm:h-[min(44vw,460px)] sm:-translate-y-[40%] lg:-translate-y-[42%]",
        className
      )}
      viewBox="0 0 1200 420"
      fill="none"
      aria-hidden
    >
      <defs>
        <path
          id={pathId}
          d="M 24 96 C 220 360, 420 360, 600 228 S 980 72, 1176 148"
        />
      </defs>
      <text
        className="fill-current text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-[11px] md:text-xs"
        dominantBaseline="middle"
      >
        <textPath href={`#${pathId}`} startOffset="0%">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
