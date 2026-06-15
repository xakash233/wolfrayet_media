import { getCmsBlogPosts } from "@/lib/cms/data";
import { defaultCmsBlog } from "@/lib/cms/defaults";
import { jsonWithCors, optionsResponse } from "@/lib/cors";

export const revalidate = 60;

export async function OPTIONS(request: Request) {
  return optionsResponse(request);
}

export async function GET(request: Request) {
  try {
    const posts = await getCmsBlogPosts();
    return jsonWithCors(request, posts);
  } catch (error) {
    console.error("[cms/blog]", error);
    return jsonWithCors(request, defaultCmsBlog);
  }
}
