import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const rawDbUrl = process.env.DATABASE_URL ?? "";
  let dbUrl = rawDbUrl;

  if (rawDbUrl) {
    try {
      const url = new URL(rawDbUrl);
      if (!url.searchParams.get("connection_limit")) {
        url.searchParams.set("connection_limit", "5");
      }
      if (!url.searchParams.get("pool_timeout")) {
        url.searchParams.set("pool_timeout", "20");
      }
      dbUrl = url.toString();
    } catch {
      dbUrl = rawDbUrl;
    }
  }

  return new PrismaClient(
    dbUrl ? { datasources: { db: { url: dbUrl } } } : undefined
  );
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
