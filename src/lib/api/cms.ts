import {
  defaultCmsBlog,
  defaultCmsServices,
  defaultCmsSettings,
  defaultCmsTeam,
} from "@/lib/cms/defaults";
import type {
  CmsBlogData,
  CmsServicesData,
  CmsSettings,
  CmsTeamData,
} from "@/lib/cms/types";
import { fetchBackendCmsJson } from "@/lib/api/cms-fetch";

export async function getCmsSettings(): Promise<CmsSettings> {
  const data = await fetchBackendCmsJson<Pick<CmsSettings, "popup" | "heroVideo">>(
    "/api/cms/settings",
    defaultCmsSettings
  );
  return { ...defaultCmsSettings, ...data };
}

export async function getCmsServices(): Promise<CmsServicesData> {
  return fetchBackendCmsJson<CmsServicesData>(
    "/api/cms/services",
    defaultCmsServices
  );
}

export async function getCmsBlogPosts(): Promise<CmsBlogData> {
  return fetchBackendCmsJson<CmsBlogData>("/api/cms/blog", defaultCmsBlog);
}

export async function getCmsTeam(): Promise<CmsTeamData> {
  return fetchBackendCmsJson<CmsTeamData>("/api/cms/team", defaultCmsTeam);
}
