import { getCmsServices } from "@/lib/cms/data";
import { defaultCmsServices } from "@/lib/cms/defaults";
import { jsonWithCors, optionsResponse } from "@/lib/cors";

export const revalidate = 60;

export async function OPTIONS(request: Request) {
  return optionsResponse(request);
}

export async function GET(request: Request) {
  try {
    const services = await getCmsServices();
    return jsonWithCors(request, services);
  } catch (error) {
    console.error("[cms/services]", error);
    return jsonWithCors(request, defaultCmsServices);
  }
}
