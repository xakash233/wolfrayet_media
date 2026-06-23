import { NextResponse } from "next/server";
import { fetchBackendCmsJson } from "@/lib/api/cms-fetch";

export async function proxyCmsRoute<T>(path: string, fallback: T) {
  const data = await fetchBackendCmsJson(path, fallback);
  return NextResponse.json(data);
}
