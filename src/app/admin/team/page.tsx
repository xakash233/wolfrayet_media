import { getCmsTeam } from "@/lib/cms/data";
import { AdminTeamClient } from "./team-client";

export default async function AdminTeamPage() {
  const team = await getCmsTeam();
  return <AdminTeamClient initialData={team} />;
}
