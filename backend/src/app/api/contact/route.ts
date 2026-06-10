import { createCmsEnquiry } from "@/lib/cms/data";
import { jsonWithCors, optionsResponse } from "@/lib/cors";
import { contactFormSchema } from "@/lib/validations";

export async function OPTIONS(request: Request) {
  return optionsResponse(request);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return jsonWithCors(
        request,
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    await createCmsEnquiry(result.data);

    return jsonWithCors(
      request,
      { success: true, message: "Message received successfully" },
      { status: 200 }
    );
  } catch {
    return jsonWithCors(request, { error: "Internal server error" }, { status: 500 });
  }
}
