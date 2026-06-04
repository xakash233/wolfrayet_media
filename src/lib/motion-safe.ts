/** Stable Framer Motion presets — SSR-safe (visible without JavaScript) */

export const VIEWPORT_ONCE = {
  once: true,
  margin: "-40px" as const,
};

/** Use instead of opacity:0 initial — prevents blank page when JS fails to load */
export const SSR_SAFE_INITIAL = false;

export const fadeInUpInView = {
  initial: SSR_SAFE_INITIAL,
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT_ONCE,
};

export const fadeInInView = {
  initial: SSR_SAFE_INITIAL,
  whileInView: { opacity: 1 },
  viewport: VIEWPORT_ONCE,
};
