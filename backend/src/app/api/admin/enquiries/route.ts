import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/cms/api-auth";
import { getCmsEnquiries } from "@/lib/cms/data";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return NextResponse.json(await getCmsEnquiries());
}
