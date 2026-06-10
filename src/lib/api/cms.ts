import { apiUrl } from "@/lib/api/config";
import { defaultCmsBlog, defaultCmsServices, defaultCmsSettings, defaultCmsTeam } from "@/lib/cms/defaults";
import type {
  CmsBlogData,
  CmsServicesData,
  CmsSettings,
  CmsTeamData,
} from "@/lib/cms/types";

const REVALIDATE = 60;

async function fetchJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(apiUrl(path), {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export async function getCmsSettings(): Promise<CmsSettings> {
  const data = await fetchJson<Pick<CmsSettings, "popup" | "heroVideo">>(
    "/api/cms/settings",
    defaultCmsSettings
  );
  return { ...defaultCmsSettings, ...data };
}

export async function getCmsServices(): Promise<CmsServicesData> {
  return fetchJson<CmsServicesData>("/api/cms/services", defaultCmsServices);
}

export async function getCmsBlogPosts(): Promise<CmsBlogData> {
  return fetchJson<CmsBlogData>("/api/cms/blog", defaultCmsBlog);
}

export async function getCmsTeam(): Promise<CmsTeamData> {
  return fetchJson<CmsTeamData>("/api/cms/team", defaultCmsTeam);
}
