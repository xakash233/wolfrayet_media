import Link from "next/link";
import { AdminCard, AdminShell } from "@/components/admin/admin-shell";
import {
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
    desc: "Promotional popup on homepage",
    icon: Image,
  },
  {
    href: "/admin/services",
    title: "Services",
    desc: "Edit service titles, descriptions & items",
    icon: Wrench,
  },
  {
    href: "/admin/blog",
    title: "Blog",
    desc: "Add, edit, or remove blog posts",
    icon: FileText,
  },
  {
    href: "/admin/video",
    title: "Home Page Video",
    desc: "Upload hero intro MP4 / WebM",
    icon: Video,
  },
  {
    href: "/admin/enquiries",
    title: "Enquiry Form",
    desc: "View contact form submissions",
    icon: Mail,
  },
  {
    href: "/admin/team",
    title: "Team Images",
    desc: "Update team photos & bios",
    icon: Users,
  },
] as const;

export default function AdminDashboardPage() {
  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map(({ href, title, desc, icon: Icon }) => (
          <Link key={href} href={href}>
            <AdminCard className="transition-shadow hover:shadow-md">
              <Icon className="h-8 w-8 text-primary" />
              <h2 className="mt-3 font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </AdminCard>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
