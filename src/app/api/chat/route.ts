import { NextResponse } from "next/server";
import { z } from "zod";
import { getAIResponse } from "@/lib/ai-responses";

const chatSchema = z.object({
  message: z.string().min(1).max(1000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = chatSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const reply = getAIResponse(result.data.message);

    return NextResponse.json({
      reply,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
