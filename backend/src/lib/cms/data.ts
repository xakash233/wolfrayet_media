import {
  createCmsEnquiry,
  fetchCmsBlogPosts,
  fetchCmsEnquiries,
  fetchCmsServices,
  fetchCmsSettings,
  fetchCmsTeam,
  saveCmsBlogPosts,
  saveCmsServices,
  saveCmsSettings,
  saveCmsTeam,
} from "@/lib/cms/repository";
import type {
  CmsBlogData,
  CmsEnquiry,
  CmsServicesData,
  CmsSettings,
  CmsTeamData,
} from "@/lib/cms/types";

export async function getCmsSettings(): Promise<CmsSettings> {
  return fetchCmsSettings();
}

export async function getCmsServices(): Promise<CmsServicesData> {
  return fetchCmsServices();
}

export async function getCmsBlogPosts(): Promise<CmsBlogData> {
  return fetchCmsBlogPosts();
}

export async function getCmsTeam(): Promise<CmsTeamData> {
  return fetchCmsTeam();
}

export async function getCmsEnquiries(): Promise<CmsEnquiry[]> {
  return fetchCmsEnquiries();
}

export {
  saveCmsSettings,
  saveCmsServices,
  saveCmsBlogPosts,
  saveCmsTeam,
  createCmsEnquiry,
};
