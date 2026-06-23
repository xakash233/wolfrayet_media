"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useHydrationSafeReducedMotion } from "@/lib/motion/use-hydration-safe-reduced-motion";
import {
  SCROLL_REVEAL_BLUR,
  SCROLL_REVEAL_Y,
  scrollRevealTransition,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

type Phase = "ssr" | "hidden" | "shown";

export interface ScrollRevealOptions {
  /** Stagger index for delay (0, 1, 2…) — total animation budget ≤ 4s */
  index?: number;
  duration?: number;
  y?: number;
  blur?: number;
  className?: string;
  once?: boolean;
}

type ScrollRevealProps = ScrollRevealOptions & {
  as?: "div" | "section" | "article";
  children: React.ReactNode;
  id?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
} as const;

const visibleState = { opacity: 1, y: 0 };

function hiddenState(y: number, blur: number) {
  if (blur <= 0) return { opacity: 0, y };
  return { opacity: 0, y, filter: `blur(${blur}px)` };
}

function shownState(blur: number) {
  if (blur <= 0) return visibleState;
  return { opacity: 1, y: 0, filter: "blur(0px)" };
}

export function useScrollReveal({
  index = 0,
  duration,
  y = SCROLL_REVEAL_Y,
  blur = SCROLL_REVEAL_BLUR,
  once = true,
}: ScrollRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useHydrationSafeReducedMotion();
  const isInView = useInView(ref, {
    once,
    amount: 0.14,
    margin: "-50px 0px -40px 0px",
  });
  const [phase, setPhase] = useState<Phase>("ssr");

  useEffect(() => {
    if (reducedMotion) {
      setPhase("shown");
      return;
    }

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const inViewport =
      rect.top < window.innerHeight * 0.88 && rect.bottom > 0;

    setPhase(inViewport ? "shown" : "hidden");
  }, [reducedMotion]);

  useEffect(() => {
    if (isInView && phase === "hidden") {
      setPhase("shown");
    }
  }, [isInView, phase]);

  const shown = phase === "ssr" || phase === "shown" || Boolean(reducedMotion);

  return {
    ref,
    initial: false as const,
    animate: shown ? shownState(blur) : hiddenState(y, blur),
    transition:
      phase === "hidden" && !isInView
        ? { duration: 0 }
        : scrollRevealTransition(index, duration),
  };
}

export function ScrollReveal({
  as = "div",
  children,
  className,
  index = 0,
  duration,
  y,
  blur,
  once,
  ...rest
}: ScrollRevealProps): React.ReactElement {
  const MotionComponent = MOTION_TAGS[as];
  const reveal = useScrollReveal({ index, duration, y, blur, once });

  return (
    <MotionComponent
      {...rest}
      ref={reveal.ref}
      initial={reveal.initial}
      animate={reveal.animate}
      transition={reveal.transition}
      className={cn(className)}
    >
      {children}
    </MotionComponent>
  );
}
