import { getCmsTeam } from "@/lib/cms/data";
import { jsonWithCors, optionsResponse } from "@/lib/cors";

export const revalidate = 60;

export async function OPTIONS(request: Request) {
  return optionsResponse(request);
}

export async function GET(request: Request) {
  const team = await getCmsTeam();
  return jsonWithCors(request, team);
}
