import type { BlogPost } from "@/types";
import { BLOG_SEED_POSTS } from "@/data/blog-seed";
import { getCmsBlogPosts } from "@/lib/cms/data";

export { BLOG_SEED_POSTS };

export function getBlogPosts(): BlogPost[] {
  return getCmsBlogPosts();
}

/** @deprecated Use getBlogPosts() */
export const blogPosts = BLOG_SEED_POSTS;

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPosts().find((post) => post.slug === slug);
}

export function getBlogCategories(): string[] {
  return Array.from(new Set(getBlogPosts().map((post) => post.category)));
}
