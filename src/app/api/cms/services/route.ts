import { defaultCmsServices } from "@/lib/cms/defaults";
import { proxyCmsRoute } from "@/lib/api/cms-route-handler";

export const dynamic = "force-dynamic";

export async function GET() {
  return proxyCmsRoute("/api/cms/services", defaultCmsServices);
}
