import { getCmsTeam } from "@/lib/cms/data";
import { AdminTeamClient } from "./team-client";

export default function AdminTeamPage() {
  const team = getCmsTeam();
  return <AdminTeamClient initialData={team} />;
}
