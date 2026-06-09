"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  Users,
  Video,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/popup", label: "Popup Image", icon: Image },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/video", label: "Home Video", icon: Video },
  { href: "/admin/enquiries", label: "Enquiries", icon: Mail },
  { href: "/admin/team", label: "Team Images", icon: Users },
] as const;

export function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-8">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-6 rounded-xl border border-border bg-card p-4 shadow-sm">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
              Wolfrayet Admin
            </p>
            <nav className="space-y-1">
              {NAV.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                    pathname === href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </nav>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 w-full justify-start gap-2"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-sm text-muted-foreground">
                Manage site content without editing code
              </p>
            </div>
            <Link
              href="/"
              className="text-sm font-medium text-primary hover:underline"
            >
              View site
            </Link>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

export function AdminCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export function AdminSaveButton({
  saving,
  onClick,
  label = "Save changes",
}: {
  saving: boolean;
  onClick: () => void;
  label?: string;
}) {
  return (
    <Button onClick={onClick} disabled={saving}>
      <Settings className="mr-2 h-4 w-4" />
      {saving ? "Saving…" : label}
    </Button>
  );
}

export async function adminUpload(
  file: File,
  folder: string
): Promise<{ url: string }> {
  const form = new FormData();
  form.append("file", file);
  form.append("folder", folder);
  const res = await fetch("/api/admin/upload", {
    method: "POST",
    credentials: "same-origin",
    body: form,
  });
  if (res.status === 401) {
    window.location.assign("/admin/login");
    throw new Error("Unauthorized");
  }
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}
