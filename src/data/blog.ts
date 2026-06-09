import type { BlogPost } from "@/types";
import { BLOG_SEED_POSTS } from "@/data/blog-seed";
import { getCmsBlogPosts } from "@/lib/cms/data";

export { BLOG_SEED_POSTS };

export async function getBlogPosts(): Promise<BlogPost[]> {
  return getCmsBlogPosts();
}

/** @deprecated Use getBlogPosts() */
export const blogPosts = BLOG_SEED_POSTS;

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getBlogCategories(): Promise<string[]> {
  const posts = await getBlogPosts();
  return Array.from(new Set(posts.map((post) => post.category)));
}
