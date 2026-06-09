import { getCmsServices } from "@/lib/cms/data";
import { AdminServicesClient } from "./services-client";

export default async function AdminServicesPage() {
  const data = await getCmsServices();
  return <AdminServicesClient initialData={data} />;
}
