import { getCmsServices } from "@/lib/cms/data";
import { AdminServicesClient } from "./services-client";

export default function AdminServicesPage() {
  const data = getCmsServices();
  return <AdminServicesClient initialData={data} />;
}
