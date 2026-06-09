import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getCmsEnquiries } from "@/lib/cms/data";
import { writeCmsFile } from "@/lib/cms/storage";
import type { CmsEnquiry } from "@/lib/cms/types";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const enquiries = getCmsEnquiries();
    const entry: CmsEnquiry = {
      id: randomUUID(),
      ...result.data,
      createdAt: new Date().toISOString(),
    };
    writeCmsFile("enquiries.json", [entry, ...enquiries]);

    // API-ready: integrate with email service (Resend, SendGrid, etc.)
    // await sendEmail(result.data);

    return NextResponse.json(
      { success: true, message: "Message received successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
