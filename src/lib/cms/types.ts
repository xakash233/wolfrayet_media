import type { BlogPost, ServiceCategory, TeamMember } from "@/types";

export interface CmsPopup {
  enabled: boolean;
  image: string;
  link: string;
  alt: string;
}

export interface CmsHeroVideo {
  webm?: string;
  mp4: string;
  poster?: string;
}

export interface CmsSettings {
  popup: CmsPopup;
  heroVideo: CmsHeroVideo;
}

export interface CmsEnquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface CmsServicesData {
  digitalMarketingCategories: ServiceCategory[];
  itServicesCategory: ServiceCategory;
}

export type CmsBlogData = BlogPost[];
export type CmsTeamData = TeamMember[];
