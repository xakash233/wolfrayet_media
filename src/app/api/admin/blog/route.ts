import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/cms/api-auth";
import { getCmsBlogPosts, saveCmsBlogPosts } from "@/lib/cms/data";
import type { CmsBlogData } from "@/lib/cms/types";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return NextResponse.json(await getCmsBlogPosts());
}

export async function PUT(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  try {
    const body = (await request.json()) as CmsBlogData;
    await saveCmsBlogPosts(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
