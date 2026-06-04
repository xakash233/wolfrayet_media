import { MAX_ANIMATION_SEC } from "@/lib/images";

export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

/** Standard section / card entrance — always completes under 4s */
export const sectionTransition = (delay = 0) => ({
  duration: 0.55,
  delay: Math.min(delay, MAX_ANIMATION_SEC - 0.7),
  ease: EASE_SMOOTH,
});

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: sectionTransition(),
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.45, ease: EASE_SMOOTH },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: sectionTransition(),
  },
};

export const scaleOnHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -32 },
  animate: { opacity: 1, x: 0 },
  transition: sectionTransition(),
};

export const slideInRight = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  transition: sectionTransition(),
};

export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: EASE_SMOOTH },
};

/** whileInView preset for cards & grids */
export const inViewFadeUp = (index = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: sectionTransition(index * 0.1),
});
