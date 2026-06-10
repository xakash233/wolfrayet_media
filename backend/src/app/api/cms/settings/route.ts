import { getCmsSettings } from "@/lib/cms/data";
import { jsonWithCors, optionsResponse } from "@/lib/cors";

export const revalidate = 60;

export async function OPTIONS(request: Request) {
  return optionsResponse(request);
}

export async function GET(request: Request) {
  const settings = await getCmsSettings();
  return jsonWithCors(request, {
    popup: settings.popup,
    heroVideo: settings.heroVideo,
  });
}
