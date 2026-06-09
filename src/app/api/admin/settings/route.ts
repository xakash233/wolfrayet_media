import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/cms/api-auth";
import { getCmsSettings, saveCmsSettings } from "@/lib/cms/data";
import type { CmsSettings } from "@/lib/cms/types";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return NextResponse.json(await getCmsSettings());
}

export async function PUT(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  try {
    const body = (await request.json()) as CmsSettings;
    await saveCmsSettings(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
