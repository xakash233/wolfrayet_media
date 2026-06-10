import { HERO_IMAGES } from "@/lib/images";
import type { CmsHeroVideo } from "@/lib/cms/types";

/** Homepage hero video — WebM (VP9) */
export const HERO_VIDEO = {
  webm: "/video/hero-intro2.webm",
  mp4: "",
  poster: HERO_IMAGES.default,
} as const;

const OBSOLETE_MP4 = ["/video/hero-intro.mp4", "/video/hero-intro2.mp4"];
const OBSOLETE_WEBM = ["/video/hero-intro.webm"];

/** CMS may store old paths — always fall back to the bundled public video. */
export function resolveHeroVideo(video?: Partial<CmsHeroVideo>): CmsHeroVideo {
  const webmRaw = video?.webm?.trim() ?? "";
  const webm =
    webmRaw && !OBSOLETE_WEBM.includes(webmRaw) ? webmRaw : HERO_VIDEO.webm;

  const mp4Raw = video?.mp4?.trim() ?? "";
  const mp4 =
    mp4Raw && !OBSOLETE_MP4.includes(mp4Raw) ? mp4Raw : HERO_VIDEO.mp4;

  const posterRaw = video?.poster?.trim() ?? "";
  const poster = posterRaw || HERO_VIDEO.poster;

  return { mp4, webm, poster };
}
