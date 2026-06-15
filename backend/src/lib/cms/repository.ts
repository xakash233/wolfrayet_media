import { ServiceCategoryType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  defaultCmsBlog,
  defaultCmsServices,
  defaultCmsSettings,
  defaultCmsTeam,
} from "@/lib/cms/defaults";
import { resolveHeroVideo } from "@/lib/media";
import type {
  CmsBlogData,
  CmsEnquiry,
  CmsServicesData,
  CmsSettings,
  CmsTeamData,
} from "@/lib/cms/types";
import type { BlogPost, ServiceCategory, TeamMember } from "@/types";

function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function requireDatabase(): void {
  if (!hasDatabase()) {
    throw new Error("DATABASE_URL is not configured");
  }
}

async function withCmsFallback<T>(
  label: string,
  fallback: T,
  fn: () => Promise<T>
): Promise<T> {
  if (!hasDatabase()) return fallback;
  try {
    return await fn();
  } catch (error) {
    console.error(`[CMS] ${label} failed, using defaults:`, error);
    return fallback;
  }
}

const TX_OPTIONS = { maxWait: 10_000, timeout: 60_000 };

function mapSettings(row: {
  popupEnabled: boolean;
  popupImage: string;
  popupLink: string;
  popupAlt: string;
  heroWebm: string;
  heroMp4: string;
  heroPoster: string;
}): CmsSettings {
  return {
    popup: {
      enabled: row.popupEnabled,
      image: row.popupImage,
      link: row.popupLink,
      alt: row.popupAlt,
    },
    heroVideo: {
      webm: row.heroWebm,
      mp4: row.heroMp4,
      poster: row.heroPoster,
    },
  };
}

function mapSettingsResolved(row: Parameters<typeof mapSettings>[0]): CmsSettings {
  const settings = mapSettings(row);
  return {
    ...settings,
    heroVideo: resolveHeroVideo(settings.heroVideo),
  };
}

function mapServiceCategory(
  row: {
    id: string;
    number: number;
    title: string;
    description: string;
    icon: string;
    items: { label: string; sortOrder: number }[];
  }
): ServiceCategory {
  return {
    id: row.id,
    number: row.number,
    title: row.title,
    description: row.description,
    icon: row.icon,
    items: [...row.items]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((item) => item.label),
  };
}

function mapBlogPost(row: {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    author: row.author,
    date: row.date,
    readTime: row.readTime,
    image: row.image,
    featured: row.featured,
  };
}

function mapTeamMember(row: {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string | null;
  twitter: string | null;
}): TeamMember {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    bio: row.bio,
    image: row.image,
    social: {
      ...(row.linkedin ? { linkedin: row.linkedin } : {}),
      ...(row.twitter ? { twitter: row.twitter } : {}),
    },
  };
}

export async function isDatabaseSeeded(): Promise<boolean> {
  if (!hasDatabase()) return false;
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "default" },
  });
  return Boolean(settings);
}

export async function seedCmsDatabase(): Promise<void> {
  requireDatabase();
  const settings = defaultCmsSettings;

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      popupEnabled: settings.popup.enabled,
      popupImage: settings.popup.image,
      popupLink: settings.popup.link,
      popupAlt: settings.popup.alt,
      heroWebm: settings.heroVideo.webm ?? "",
      heroMp4: settings.heroVideo.mp4,
      heroPoster: settings.heroVideo.poster ?? "",
    },
    update: {
      popupEnabled: settings.popup.enabled,
      popupImage: settings.popup.image,
      popupLink: settings.popup.link,
      popupAlt: settings.popup.alt,
      heroWebm: settings.heroVideo.webm ?? "",
      heroMp4: settings.heroVideo.mp4,
      heroPoster: settings.heroVideo.poster ?? "",
    },
  });

  await saveCmsServices(defaultCmsServices);

  for (const post of defaultCmsBlog) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        author: post.author,
        date: post.date,
        readTime: post.readTime,
        image: post.image,
        featured: post.featured ?? false,
      },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        author: post.author,
        date: post.date,
        readTime: post.readTime,
        image: post.image,
        featured: post.featured ?? false,
      },
    });
  }

  await saveCmsTeam(defaultCmsTeam);
}

async function ensureSeeded(): Promise<void> {
  if (!hasDatabase()) return;
  if (!(await isDatabaseSeeded())) {
    await seedCmsDatabase();
  }
}

export async function fetchCmsSettings(): Promise<CmsSettings> {
  return withCmsFallback("fetchCmsSettings", defaultCmsSettings, async () => {
    await ensureSeeded();
    const row = await prisma.siteSettings.findUnique({ where: { id: "default" } });
    if (!row) return defaultCmsSettings;
    return mapSettingsResolved(row);
  });
}

export async function saveCmsSettings(data: CmsSettings): Promise<void> {
  requireDatabase();
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      popupEnabled: data.popup.enabled,
      popupImage: data.popup.image,
      popupLink: data.popup.link,
      popupAlt: data.popup.alt,
      heroWebm: data.heroVideo.webm ?? "",
      heroMp4: data.heroVideo.mp4,
      heroPoster: data.heroVideo.poster ?? "",
    },
    update: {
      popupEnabled: data.popup.enabled,
      popupImage: data.popup.image,
      popupLink: data.popup.link,
      popupAlt: data.popup.alt,
      heroWebm: data.heroVideo.webm ?? "",
      heroMp4: data.heroVideo.mp4,
      heroPoster: data.heroVideo.poster ?? "",
    },
  });
}

export async function fetchCmsServices(): Promise<CmsServicesData> {
  return withCmsFallback("fetchCmsServices", defaultCmsServices, async () => {
    await ensureSeeded();
    const categories = await prisma.serviceCategory.findMany({
      include: { items: true },
      orderBy: [{ type: "asc" }, { sortOrder: "asc" }],
    });

    if (categories.length === 0) return defaultCmsServices;

    const digitalMarketingCategories = categories
      .filter((c) => c.type === ServiceCategoryType.DIGITAL)
      .map(mapServiceCategory);

    const itRow = categories.find((c) => c.type === ServiceCategoryType.IT);
    const itServicesCategory = itRow
      ? mapServiceCategory(itRow)
      : defaultCmsServices.itServicesCategory;

    return { digitalMarketingCategories, itServicesCategory };
  });
}

export async function saveCmsServices(data: CmsServicesData): Promise<void> {
  requireDatabase();
  const allCategories = [
    ...data.digitalMarketingCategories.map((c) => ({
      ...c,
      type: ServiceCategoryType.DIGITAL,
    })),
    { ...data.itServicesCategory, type: ServiceCategoryType.IT },
  ];
  const allIds = allCategories.map((c) => c.id);

  await prisma.$transaction(async (tx) => {
    await tx.serviceCategoryItem.deleteMany({
      where: { categoryId: { notIn: allIds } },
    });
    await tx.serviceCategory.deleteMany({
      where: { id: { notIn: allIds } },
    });

    const allItems: { categoryId: string; label: string; sortOrder: number }[] =
      [];

    for (const category of allCategories) {
      await tx.serviceCategory.upsert({
        where: { id: category.id },
        create: {
          id: category.id,
          number: category.number,
          title: category.title,
          description: category.description,
          icon: category.icon,
          type: category.type,
          sortOrder: category.number,
        },
        update: {
          number: category.number,
          title: category.title,
          description: category.description,
          icon: category.icon,
          type: category.type,
          sortOrder: category.number,
        },
      });

      category.items.forEach((label, index) => {
        allItems.push({ categoryId: category.id, label, sortOrder: index });
      });
    }

    if (allItems.length > 0) {
      await tx.serviceCategoryItem.createMany({ data: allItems });
    }
  }, TX_OPTIONS);
}

export async function fetchCmsBlogPosts(): Promise<CmsBlogData> {
  return withCmsFallback("fetchCmsBlogPosts", defaultCmsBlog, async () => {
    await ensureSeeded();
    const rows = await prisma.blogPost.findMany({ orderBy: { date: "desc" } });
    if (rows.length === 0) return defaultCmsBlog;
    return rows.map(mapBlogPost);
  });
}

export async function saveCmsBlogPosts(data: CmsBlogData): Promise<void> {
  requireDatabase();
  const slugs = data.map((post) => post.slug);

  await prisma.$transaction(async (tx) => {
    await tx.blogPost.deleteMany({ where: { slug: { notIn: slugs } } });

    for (const post of data) {
      await tx.blogPost.upsert({
        where: { slug: post.slug },
        create: {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          author: post.author,
          date: post.date,
          readTime: post.readTime,
          image: post.image,
          featured: post.featured ?? false,
        },
        update: {
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          author: post.author,
          date: post.date,
          readTime: post.readTime,
          image: post.image,
          featured: post.featured ?? false,
        },
      });
    }
  }, TX_OPTIONS);
}

export async function fetchCmsTeam(): Promise<CmsTeamData> {
  return withCmsFallback("fetchCmsTeam", defaultCmsTeam, async () => {
    await ensureSeeded();
    const rows = await prisma.teamMember.findMany({ orderBy: { sortOrder: "asc" } });
    if (rows.length === 0) return defaultCmsTeam;
    return rows.map(mapTeamMember);
  });
}

export async function saveCmsTeam(data: CmsTeamData): Promise<void> {
  requireDatabase();
  const ids = data.map((member) => member.id);

  await prisma.$transaction(async (tx) => {
    await tx.teamMember.deleteMany({ where: { id: { notIn: ids } } });

    for (let index = 0; index < data.length; index++) {
      const member = data[index];
      await tx.teamMember.upsert({
        where: { id: member.id },
        create: {
          id: member.id,
          name: member.name,
          role: member.role,
          bio: member.bio,
          image: member.image,
          linkedin: member.social.linkedin ?? null,
          twitter: member.social.twitter ?? null,
          sortOrder: index,
        },
        update: {
          name: member.name,
          role: member.role,
          bio: member.bio,
          image: member.image,
          linkedin: member.social.linkedin ?? null,
          twitter: member.social.twitter ?? null,
          sortOrder: index,
        },
      });
    }
  }, TX_OPTIONS);
}

export async function fetchCmsEnquiries(): Promise<CmsEnquiry[]> {
  if (!hasDatabase()) return [];
  const rows = await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone ?? undefined,
    subject: row.subject,
    message: row.message,
    createdAt: row.createdAt.toISOString(),
  }));
}

export async function createCmsEnquiry(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<CmsEnquiry> {
  requireDatabase();
  const row = await prisma.enquiry.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      subject: data.subject,
      message: data.message,
    },
  });

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone ?? undefined,
    subject: row.subject,
    message: row.message,
    createdAt: row.createdAt.toISOString(),
  };
}
