import type { Service } from "@/types";
import {
  digitalMarketingCategories,
  itServicesCategory,
} from "@/data/service-categories";

const categoryServices: Service[] = digitalMarketingCategories.map((category) => ({
  id: category.id,
  title: category.title,
  description: category.description,
  icon: category.icon,
  features: [...category.items],
  href: `/services#${category.id}`,
}));

export const itServices: Service = {
  id: itServicesCategory.id,
  title: itServicesCategory.title,
  description: itServicesCategory.description,
  icon: "Server",
  features: [...itServicesCategory.items],
  href: `/services#${itServicesCategory.id}`,
};

const webDevIndex = categoryServices.findIndex((s) => s.id === "web-development");

/** All services — IT Services inserted after Website Design & Development. */
export const services: Service[] = [
  ...categoryServices.slice(0, webDevIndex + 1),
  itServices,
  ...categoryServices.slice(webDevIndex + 1),
];

const featuredIds = [
  "seo",
  "ppc",
  "smm",
  "web-development",
  "it-services",
  "content",
  "social-ads",
] as const;

/** Homepage service cards (ordered). */
export const featuredServices: Service[] = featuredIds
  .map((id) => services.find((s) => s.id === id))
  .filter((s): s is Service => s !== undefined);
