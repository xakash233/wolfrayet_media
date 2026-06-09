import { NextResponse } from "next/server";
import { getCmsSettings } from "@/lib/cms/data";

export async function GET() {
  const settings = getCmsSettings();
  return NextResponse.json({
    popup: settings.popup,
    heroVideo: settings.heroVideo,
  });
}
