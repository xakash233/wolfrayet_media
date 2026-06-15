import { PrismaClient } from "@prisma/client";
import { normalizeDatabaseUrl } from "@/lib/database-url";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const rawDbUrl = process.env.DATABASE_URL ?? "";
  const dbUrl = rawDbUrl ? normalizeDatabaseUrl(rawDbUrl) : "";

  return new PrismaClient(
    dbUrl ? { datasources: { db: { url: dbUrl } } } : undefined
  );
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// Reuse one client per serverless instance (required on Vercel).
globalForPrisma.prisma = prisma;
