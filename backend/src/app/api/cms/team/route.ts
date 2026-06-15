import { getCmsTeam } from "@/lib/cms/data";
import { defaultCmsTeam } from "@/lib/cms/defaults";
import { jsonWithCors, optionsResponse } from "@/lib/cors";

export const revalidate = 60;

export async function OPTIONS(request: Request) {
  return optionsResponse(request);
}

export async function GET(request: Request) {
  try {
    const team = await getCmsTeam();
    return jsonWithCors(request, team);
  } catch (error) {
    console.error("[cms/team]", error);
    return jsonWithCors(request, defaultCmsTeam);
  }
}
