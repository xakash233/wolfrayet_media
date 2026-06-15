/**
 * Normalize DATABASE_URL for Prisma on Vercel / Neon / Supabase.
 * - Ensures SSL on cloud Postgres
 * - Uses a single connection per serverless instance
 */
export function normalizeDatabaseUrl(rawUrl: string): string {
  if (!rawUrl.trim()) return rawUrl;

  try {
    const url = new URL(rawUrl);
    const isServerless = Boolean(process.env.VERCEL);
    const host = url.hostname.toLowerCase();

    if (
      !url.searchParams.has("sslmode") &&
      (host.includes("neon.tech") ||
        host.includes("supabase.co") ||
        host.includes("railway.app"))
    ) {
      url.searchParams.set("sslmode", "require");
    }

    if (!url.searchParams.get("connection_limit")) {
      url.searchParams.set("connection_limit", isServerless ? "1" : "5");
    }
    if (!url.searchParams.get("pool_timeout")) {
      url.searchParams.set("pool_timeout", "20");
    }
    if (isServerless && !url.searchParams.get("connect_timeout")) {
      url.searchParams.set("connect_timeout", "15");
    }

    // Neon serverless: pooled hostname must include "-pooler"
    if (
      isServerless &&
      host.includes("neon.tech") &&
      !host.includes("-pooler")
    ) {
      console.warn(
        "[prisma] DATABASE_URL should use Neon's pooled host (*-pooler.*.neon.tech) on Vercel."
      );
    }

    return url.toString();
  } catch {
    return rawUrl;
  }
}

export function getDatabaseHint(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  const lower = message.toLowerCase();

  if (lower.includes("password authentication failed")) {
    return "Invalid database username or password in DATABASE_URL.";
  }
  if (lower.includes("enotfound") || lower.includes("getaddrinfo")) {
    return "Database host not found — check DATABASE_URL hostname.";
  }
  if (lower.includes("timeout") || lower.includes("etimedout")) {
    return "Database connection timed out — use a pooled URL (Neon: *-pooler.* host).";
  }
  if (lower.includes("does not exist") && lower.includes("database")) {
    return "Database name in DATABASE_URL does not exist.";
  }
  if (lower.includes("ssl") || lower.includes("certificate")) {
    return "SSL error — add ?sslmode=require to DATABASE_URL.";
  }

  return "Cannot connect — verify DATABASE_URL in Vercel backend env vars.";
}
