import { HERO_IMAGES } from "@/lib/images";

/** Homepage hero video — WebM preferred, MP4 fallback for Safari */
export const HERO_VIDEO = {
  webm: "/video/hero-intro.webm",
  mp4: "/video/hero-intro.mp4",
  poster: HERO_IMAGES.default,
} as const;
