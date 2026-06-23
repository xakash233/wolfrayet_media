import type { Service } from "@/types";
import { getCmsServices } from "@/lib/api/cms";
import { normalizeCmsServices } from "@/lib/cms/normalize-services";

export async function buildServicesFromCms(): Promise<Service[]> {
  const cmsServices = normalizeCmsServices(await getCmsServices());
  const { digitalMarketingCategories, itServicesCategory } = cmsServices;

  const categoryServices: Service[] = digitalMarketingCategories.map(
    (category) => ({
      id: category.id,
      title: category.title,
      description: category.description,
      icon: category.icon,
      features: [...category.items],
      href: `/services#${category.id}`,
    })
  );

  const itServices: Service = {
    id: itServicesCategory.id,
    title: itServicesCategory.title,
    description: itServicesCategory.description,
    icon: "Server",
    features: [...itServicesCategory.items],
    href: `/services#${itServicesCategory.id}`,
  };

  const webDevIndex = categoryServices.findIndex(
    (s) => s.id === "web-development"
  );

  return [
    ...categoryServices.slice(0, webDevIndex + 1),
    itServices,
    ...categoryServices.slice(webDevIndex + 1),
  ];
}

const featuredIds = [
  "seo",
  "ppc",
  "smm",
  "social-ads",
  "app-development",
  "web-development",
  "it-services",
  "content",
] as const;

export async function buildFeaturedServicesFromCms(): Promise<Service[]> {
  const services = await buildServicesFromCms();
  return featuredIds
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is Service => s !== undefined);
}
