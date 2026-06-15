import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  let database: "ok" | "error" | "unconfigured" = "unconfigured";

  if (process.env.DATABASE_URL) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      database = "ok";
    } catch (error) {
      console.error("[health] Database check failed:", error);
      database = "error";
    }
  }

  return Response.json({
    status: "ok",
    database,
    timestamp: new Date().toISOString(),
  });
}
