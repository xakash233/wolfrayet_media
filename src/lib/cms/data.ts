import {
  defaultCmsBlog,
  defaultCmsServices,
  defaultCmsSettings,
  defaultCmsTeam,
} from "@/lib/cms/defaults";
import { readCmsFile } from "@/lib/cms/storage";
import type {
  CmsBlogData,
  CmsEnquiry,
  CmsServicesData,
  CmsSettings,
  CmsTeamData,
} from "@/lib/cms/types";

export function getCmsSettings(): CmsSettings {
  return readCmsFile("settings.json", defaultCmsSettings);
}

export function getCmsServices(): CmsServicesData {
  return readCmsFile("services.json", defaultCmsServices);
}

export function getCmsBlogPosts(): CmsBlogData {
  return readCmsFile("blog.json", defaultCmsBlog);
}

export function getCmsTeam(): CmsTeamData {
  return readCmsFile("team.json", defaultCmsTeam);
}

export function getCmsEnquiries(): CmsEnquiry[] {
  return readCmsFile<CmsEnquiry[]>("enquiries.json", []);
}
