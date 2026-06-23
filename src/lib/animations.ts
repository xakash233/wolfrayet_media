import { MAX_ANIMATION_SEC } from "@/lib/images";

/** Lesse Studio–style expo ease-out */
export const EASE_LESSE = [0.16, 1, 0.3, 1] as const;
export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

export const SCROLL_REVEAL_Y = 80;
export const SCROLL_REVEAL_BLUR = 0;
/** Default scroll reveal duration — capped at MAX_ANIMATION_SEC (4s) for SEO/UX budget */
export const SCROLL_REVEAL_DURATION = 1;
export const SCROLL_STAGGER_STEP = 0.12;

/**
 * Scroll reveal transition — total delay + duration never exceeds MAX_ANIMATION_SEC.
 */
export function scrollRevealTransition(
  staggerIndex = 0,
  duration = SCROLL_REVEAL_DURATION
) {
  const d = Math.min(duration, MAX_ANIMATION_SEC);
  const delay = Math.min(
    staggerIndex * SCROLL_STAGGER_STEP,
    Math.max(0, MAX_ANIMATION_SEC - d - 0.05)
  );
  return {
    duration: d,
    delay,
    ease: EASE_LESSE,
  };
}

/** @deprecated Use scrollRevealTransition */
export const sectionTransition = scrollRevealTransition;

export const fadeInUp = {
  initial: { opacity: 0, y: SCROLL_REVEAL_Y },
  animate: { opacity: 1, y: 0 },
  transition: scrollRevealTransition(),
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.85, ease: EASE_LESSE },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: SCROLL_STAGGER_STEP,
      delayChildren: 0.08,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 48 },
  animate: {
    opacity: 1,
    y: 0,
    transition: scrollRevealTransition(),
  },
};

export const scaleOnHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -48 },
  animate: { opacity: 1, x: 0 },
  transition: scrollRevealTransition(),
};

export const slideInRight = {
  initial: { opacity: 0, x: 48 },
  animate: { opacity: 1, x: 0 },
  transition: scrollRevealTransition(),
};

export const inViewFadeUp = (index = 0) => ({
  initial: { opacity: 0, y: SCROLL_REVEAL_Y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: scrollRevealTransition(index),
});
