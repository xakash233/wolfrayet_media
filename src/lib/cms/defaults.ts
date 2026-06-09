import { BLOG_SEED_POSTS } from "@/data/blog-seed";
import {
  digitalMarketingCategories,
  itServicesCategory,
} from "@/data/service-categories";
import { teamMembers } from "@/data/team";
import { HERO_VIDEO } from "@/lib/media";
import type {
  CmsBlogData,
  CmsServicesData,
  CmsSettings,
  CmsTeamData,
} from "@/lib/cms/types";

export const defaultCmsSettings: CmsSettings = {
  popup: {
    enabled: false,
    image: "",
    link: "/contact",
    alt: "Special offer",
  },
  heroVideo: {
    webm: HERO_VIDEO.webm,
    mp4: HERO_VIDEO.mp4,
    poster: HERO_VIDEO.poster,
  },
};

export const defaultCmsServices: CmsServicesData = {
  digitalMarketingCategories: digitalMarketingCategories.map((c) => ({
    ...c,
    items: [...c.items],
  })),
  itServicesCategory: {
    number: 0,
    icon: "Server",
    ...itServicesCategory,
    items: [...itServicesCategory.items],
  },
};

export const defaultCmsBlog: CmsBlogData = BLOG_SEED_POSTS.map((p) => ({ ...p }));
export const defaultCmsTeam: CmsTeamData = teamMembers.map((m) => ({ ...m }));
