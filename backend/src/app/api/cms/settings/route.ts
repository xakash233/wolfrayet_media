import { getCmsSettings } from "@/lib/cms/data";
import { defaultCmsSettings } from "@/lib/cms/defaults";
import { jsonWithCors, optionsResponse } from "@/lib/cors";

export const revalidate = 60;

export async function OPTIONS(request: Request) {
  return optionsResponse(request);
}

export async function GET(request: Request) {
  try {
    const settings = await getCmsSettings();
    return jsonWithCors(request, {
      popup: settings.popup,
      heroVideo: settings.heroVideo,
    });
  } catch (error) {
    console.error("[cms/settings]", error);
    return jsonWithCors(request, {
      popup: defaultCmsSettings.popup,
      heroVideo: defaultCmsSettings.heroVideo,
    });
  }
}
