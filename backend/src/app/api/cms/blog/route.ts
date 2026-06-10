import { getCmsBlogPosts } from "@/lib/cms/data";
import { jsonWithCors, optionsResponse } from "@/lib/cors";

export const revalidate = 60;

export async function OPTIONS(request: Request) {
  return optionsResponse(request);
}

export async function GET(request: Request) {
  const posts = await getCmsBlogPosts();
  return jsonWithCors(request, posts);
}
