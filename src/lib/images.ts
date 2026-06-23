/** Curated Unsplash assets — IDs verified (HTTP 200) */

export const MAX_ANIMATION_SEC = 4;

export const IMAGE_ANIMATION = {
  fadeDuration: 0.65,
  zoomDuration: 3.2,
  ease: [0.22, 1, 0.36, 1] as const,
} as const;

export function unsplash(
  photoId: string,
  width = 1920,
  height = 1080,
  quality = 80
): string {
  return `https://images.unsplash.com/photo-${photoId}?w=${width}&h=${height}&fit=crop&q=${quality}`;
}

/** Full-viewport hero backgrounds */
export const HERO_IMAGES = {
  default: unsplash("1677442136019-21780ecad995"),
  about: unsplash("1522071820081-009f0129c71c"),
  services: unsplash("1551288049-bebda4e38f71"),
  portfolio: unsplash("1547658719-da2b51169166"),
  blog: unsplash("1432888498266-38ffec3eaf0a"),
  contact: unsplash("1521791136064-7986c2920216"),
  testimonials: unsplash("1529156069898-49953e39b3ac"),
} as const;

export const SECTION_IMAGES = {
  intro: unsplash("1553877522-43269d4ea984", 1200, 800),
  features: unsplash("1454165804606-c3d57bc86b40", 1200, 800),
  testimonials: unsplash("1529156069898-49953e39b3ac", 1200, 800),
  pricing: unsplash("1460925895917-afdab827c52f", 1200, 800),
  cta: unsplash("1559136555-9303baea8ebd", 1400, 900),
  newsletter: unsplash("1516321318423-f06f85e504b3", 1200, 800),
} as const;

const SERVICE_PHOTO_IDS: Record<string, string> = {
  seo: "1551288049-bebda4e38f71",
  ppc: "1553877522-43269d4ea984",
  smm: "1611162616305-c69b3fa7fbe0",
  "social-ads": "1611162616305-c69b3fa7fbe0",
  content: "1432888498266-38ffec3eaf0a",
  email: "1516321318423-f06f85e504b3",
  "web-development": "1526374965328-7f61d4dc18c5",
  "app-development": "1512941937669-90a1b58e7e9c",
  branding: "1547658719-da2b51169166",
  cro: "1460925895917-afdab827c52f",
  orm: "1552664730-d307ca884978",
  influencer: "1529156069898-49953e39b3ac",
  video: "1552664730-d307ca884978",
  analytics: "1551288049-bebda4e38f71",
  "digital-growth": "1454165804606-c3d57bc86b40",
  "it-services": "1558494949-ef010cbdcc31",
};

const BLOG_CATEGORY_PHOTOS: Record<string, string> = {
  SEO: "1551288049-bebda4e38f71",
  "Social Media": "1611162616305-c69b3fa7fbe0",
  PPC: "1553877522-43269d4ea984",
  Content: "1432888498266-38ffec3eaf0a",
  Branding: "1547658719-da2b51169166",
  Email: "1516321318423-f06f85e504b3",
  Analytics: "1460925895917-afdab827c52f",
};

const PORTFOLIO_CATEGORY_PHOTOS: Record<string, string> = {
  Branding: "1547658719-da2b51169166",
  SEO: "1551288049-bebda4e38f71",
  "E-commerce": "1556742049-0cfed4f6a45d",
  "Social Media": "1611162616305-c69b3fa7fbe0",
  PPC: "1553877522-43269d4ea984",
  "Web Development": "1526374965328-7f61d4dc18c5",
  "Local SEO": "1551288049-bebda4e38f71",
};

const DEFAULT_SERVICE_PHOTO = "1460925895917-afdab827c52f";

/** Moody, premium photos for mega menu hover backgrounds */
const MEGA_MENU_PHOTO_IDS: Record<string, string> = {
  seo: "1551288049-bebda4e38f71",
  ppc: "1553877522-43269d4ea984",
  smm: "1611162616305-c69b3fa7fbe0",
  "social-ads": "1522202176988-66273c2fd55f",
  content: "1486312338219-ce68d2c6f44d",
  email: "1516321318423-f06f85e504b3",
  "web-development": "1498050108023-c5249f4df085",
  "app-development": "1512941937669-90a1b58e7e9c",
  branding: "1561070791-2526d30994b5",
  cro: "1460925895917-afdab827c52f",
  orm: "1563986768609-322da13575f3",
  influencer: "1529156069898-49953e39b3ac",
  video: "1574717024653-61fd2cf4d44d",
  analytics: "1460925895917-afdab827c52f",
  "digital-growth": "1454165804606-c3d57bc86b40",
  "it-services": "1558494949-ef010cbdcc31",
};

export function megaMenuImageUrl(serviceId: string): string {
  const id = MEGA_MENU_PHOTO_IDS[serviceId] ?? DEFAULT_SERVICE_PHOTO;
  return unsplash(id, 720, 400, 88);
}

export function serviceImageUrl(
  serviceId: string,
  width = 900,
  height = 560
): string {
  const id = SERVICE_PHOTO_IDS[serviceId] ?? DEFAULT_SERVICE_PHOTO;
  return unsplash(id, width, height);
}

export function blogImageUrl(category: string, width = 800, height = 500): string {
  const id = BLOG_CATEGORY_PHOTOS[category] ?? DEFAULT_SERVICE_PHOTO;
  return unsplash(id, width, height);
}

export function portfolioImageUrl(
  category: string,
  width = 800,
  height = 600
): string {
  const id = PORTFOLIO_CATEGORY_PHOTOS[category] ?? DEFAULT_SERVICE_PHOTO;
  return unsplash(id, width, height);
}

export function testimonialAvatarUrl(
  photoId: string,
  size = 200,
  quality = 85
): string {
  return `https://images.unsplash.com/photo-${photoId}?w=${size}&h=${size}&fit=crop&crop=faces&facepad=2&q=${quality}`;
}

export function staggerDelay(index: number, step = 0.1, baseDuration = 0.55): number {
  const maxDelay = MAX_ANIMATION_SEC - baseDuration - 0.15;
  return Math.min(index * step, maxDelay);
}
