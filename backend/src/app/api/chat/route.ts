import { z } from "zod";
import { getAIResponse } from "@/lib/ai-responses";
import { jsonWithCors, optionsResponse } from "@/lib/cors";

const chatSchema = z.object({
  message: z.string().min(1).max(1000),
});

export async function OPTIONS(request: Request) {
  return optionsResponse(request);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = chatSchema.safeParse(body);

    if (!result.success) {
      return jsonWithCors(request, { error: "Invalid message" }, { status: 400 });
    }

    const reply = getAIResponse(result.data.message);

    return jsonWithCors(request, {
      reply,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return jsonWithCors(request, { error: "Internal server error" }, { status: 500 });
  }
}
