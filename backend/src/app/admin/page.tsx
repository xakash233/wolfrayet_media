import Link from "next/link";
import { AdminCard, AdminShell } from "@/components/admin/admin-shell";
import {
  ArrowUpRight,
  FileText,
  Image,
  Mail,
  Users,
  Video,
  Wrench,
} from "lucide-react";

const MODULES = [
  {
    href: "/admin/popup",
    title: "Popup Image",
    desc: "Homepage promotional popup",
    icon: Image,
    color: "from-violet-500/20 to-violet-500/5",
  },
  {
    href: "/admin/services",
    title: "Services",
    desc: "Categories, titles & service lists",
    icon: Wrench,
    color: "from-sky-500/20 to-sky-500/5",
  },
  {
    href: "/admin/blog",
    title: "Blog",
    desc: "Posts, excerpts & featured images",
    icon: FileText,
    color: "from-amber-500/20 to-amber-500/5",
  },
  {
    href: "/admin/video",
    title: "Home Video",
    desc: "Hero intro MP4 / WebM",
    icon: Video,
    color: "from-rose-500/20 to-rose-500/5",
  },
  {
    href: "/admin/enquiries",
    title: "Enquiries",
    desc: "Contact form submissions",
    icon: Mail,
    color: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    href: "/admin/team",
    title: "Team",
    desc: "Photos, roles & bios",
    icon: Users,
    color: "from-cyan-500/20 to-cyan-500/5",
  },
] as const;

export default function AdminDashboardPage() {
  return (
    <AdminShell
      title="Dashboard"
      description="Quick access to every content module."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {MODULES.map(({ href, title, desc, icon: Icon, color }) => (
          <Link key={href} href={href} className="group block">
            <AdminCard className="admin-stat-card h-full">
              <div
                className={`mb-4 inline-flex rounded-xl bg-gradient-to-br p-3 ${color}`}
              >
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-semibold group-hover:text-primary">
                    {title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100" />
              </div>
            </AdminCard>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
