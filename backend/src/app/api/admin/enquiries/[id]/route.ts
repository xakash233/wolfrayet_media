import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/cms/api-auth";
import { getCmsEnquiryById } from "@/lib/cms/data";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const enquiry = await getCmsEnquiryById(params.id);
  if (!enquiry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(enquiry);
}
