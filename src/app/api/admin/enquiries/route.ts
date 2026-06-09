import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/cms/api-auth";
import { getCmsEnquiries } from "@/lib/cms/data";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const enquiries = getCmsEnquiries().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(enquiries);
}
