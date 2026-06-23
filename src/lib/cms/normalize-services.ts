import { defaultCmsServices } from "@/lib/cms/defaults";
import type { CmsServicesData } from "@/lib/cms/types";

function hasDuplicateItems(items: string[]): boolean {
  return new Set(items).size !== items.length;
}

/** Restore missing categories and replace duplicated item lists from defaults. */
export function normalizeCmsServices(data: CmsServicesData): CmsServicesData {
  const dbMap = new Map(
    data.digitalMarketingCategories.map((category) => [category.id, category])
  );

  const digitalMarketingCategories =
    defaultCmsServices.digitalMarketingCategories.map((defaultCategory) => {
      const dbCategory = dbMap.get(defaultCategory.id);
      if (!dbCategory) {
        return {
          ...defaultCategory,
          items: [...defaultCategory.items],
        };
      }

      if (hasDuplicateItems(dbCategory.items)) {
        return {
          ...dbCategory,
          number: defaultCategory.number,
          title: defaultCategory.title,
          description: defaultCategory.description,
          icon: defaultCategory.icon,
          items: [...defaultCategory.items],
        };
      }

      return { ...dbCategory, items: [...dbCategory.items] };
    });

  const defaultIt = defaultCmsServices.itServicesCategory;
  const itServicesCategory = hasDuplicateItems(data.itServicesCategory.items)
    ? { ...data.itServicesCategory, items: [...defaultIt.items] }
    : { ...data.itServicesCategory, items: [...data.itServicesCategory.items] };

  return { digitalMarketingCategories, itServicesCategory };
}
