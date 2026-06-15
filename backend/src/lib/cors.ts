const DEFAULT_ORIGINS = [
  "http://localhost:3000",
  "https://wolfrayetmedia.in",
  "https://www.wolfrayetmedia.in",
];

function isLocalDevOrigin(origin: string): boolean {
  return /^https?:\/\/localhost(:\d+)?$/.test(origin);
}

export function getAllowedOrigins(): string[] {
  const raw = process.env.ALLOWED_ORIGINS?.trim();
  if (!raw) return DEFAULT_ORIGINS;
  return raw
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
}

export function resolveCorsOrigin(request: Request): string | null {
  const origin = request.headers.get("origin");
  const allowed = getAllowedOrigins();

  if (origin) {
    if (process.env.NODE_ENV !== "production" && isLocalDevOrigin(origin)) {
      return origin;
    }
    if (allowed.includes(origin)) return origin;
  }

  if (!origin && process.env.NODE_ENV !== "production") {
    return allowed[0] ?? "http://localhost:3000";
  }

  return allowed[0] ?? null;
}

export function corsHeaders(request: Request): HeadersInit {
  const origin = resolveCorsOrigin(request);
  if (!origin) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    Vary: "Origin",
  };
}

export function jsonWithCors(
  request: Request,
  body: unknown,
  init?: ResponseInit
): Response {
  return Response.json(body, {
    ...init,
    headers: {
      ...corsHeaders(request),
      ...(init?.headers ?? {}),
    },
  });
}

export function optionsResponse(request: Request): Response {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request),
  });
}
