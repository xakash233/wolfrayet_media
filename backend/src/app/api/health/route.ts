import { prisma } from "@/lib/prisma";
import { getDatabaseHint } from "@/lib/database-url";

export const dynamic = "force-dynamic";

export async function GET() {
  let database: "ok" | "error" | "unconfigured" = "unconfigured";
  let hint: string | undefined;

  if (process.env.DATABASE_URL) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      database = "ok";
    } catch (error) {
      console.error("[health] Database check failed:", error);
      database = "error";
      hint = getDatabaseHint(error);
    }
  } else {
    hint = "Set DATABASE_URL in the Vercel backend project, then redeploy.";
  }

  return Response.json({
    status: "ok",
    database,
    ...(hint ? { hint } : {}),
    timestamp: new Date().toISOString(),
  });
}
