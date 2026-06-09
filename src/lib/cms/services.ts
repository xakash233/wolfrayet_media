import type { Service } from "@/types";
import { getCmsServices } from "@/lib/cms/data";

export function buildServicesFromCms(): Service[] {
  const { digitalMarketingCategories, itServicesCategory } = getCmsServices();

  const categoryServices: Service[] = digitalMarketingCategories.map((category) => ({
    id: category.id,
    title: category.title,
    description: category.description,
    icon: category.icon,
    features: [...category.items],
    href: `/services#${category.id}`,
  }));

  const itServices: Service = {
    id: itServicesCategory.id,
    title: itServicesCategory.title,
    description: itServicesCategory.description,
    icon: "Server",
    features: [...itServicesCategory.items],
    href: `/services#${itServicesCategory.id}`,
  };

  const webDevIndex = categoryServices.findIndex((s) => s.id === "web-development");

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
  "web-development",
  "it-services",
  "content",
  "social-ads",
] as const;

export function buildFeaturedServicesFromCms(): Service[] {
  const services = buildServicesFromCms();
  return featuredIds
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is Service => s !== undefined);
}
