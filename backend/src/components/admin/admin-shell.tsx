"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChevronRight,
  ExternalLink,
  FileText,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Settings,
  Users,
  Video,
  Wrench,
  X,
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
  { href: "/admin/team", label: "Team", icon: Users },
] as const;

const SITE_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL ?? "http://localhost:3000";

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active =
          href === "/admin"
            ? pathname === href
            : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "admin-sidebar-link",
              active ? "admin-sidebar-link-active" : "admin-sidebar-link-inactive"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminShell({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
}) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] lg:flex">
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 shrink-0 flex-col border-r border-white/[0.06] bg-[hsl(var(--admin-sidebar))] p-5 transition-transform duration-300 lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
              Wolfrayet
            </p>
            <p className="text-lg font-semibold text-white">Admin Panel</p>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-white/60 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <SidebarNav onNavigate={() => setMobileOpen(false)} />

        <div className="mt-auto space-y-2 border-t border-white/[0.08] pt-5">
          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-sidebar-link admin-sidebar-link-inactive"
          >
            <ExternalLink className="h-4 w-4" />
            View live site
          </a>
          <button
            type="button"
            onClick={logout}
            className="admin-sidebar-link w-full admin-sidebar-link-inactive"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:min-h-0">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-border/60 bg-card/80 px-4 py-4 backdrop-blur-xl sm:px-8">
          <button
            type="button"
            className="rounded-lg border border-border p-2 lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          {title ? (
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>Admin</span>
                <ChevronRight className="h-3 w-3" />
                <span className="truncate font-medium text-foreground">{title}</span>
              </div>
              <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl">
                {title}
              </h1>
              {description && (
                <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          ) : (
            <div className="flex-1 lg:hidden" />
          )}
        </header>

        <main className={cn("flex-1", title ? "px-4 py-6 sm:px-8 sm:py-8" : "p-0")}>
          {children}
        </main>
      </div>
    </div>
  );
}

export function AdminCard({
  children,
  className,
  title,
  description,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/70 bg-card p-6 shadow-sm",
        className
      )}
    >
      {(title || description) && (
        <div className="mb-5 border-b border-border/60 pb-4">
          {title && <h2 className="text-base font-semibold">{title}</h2>}
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
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
    <Button
      onClick={onClick}
      disabled={saving}
      size="lg"
      className="min-w-[160px] shadow-lg shadow-primary/20"
    >
      <Settings className="mr-2 h-4 w-4" />
      {saving ? "Saving…" : label}
    </Button>
  );
}

export function AdminAlert({
  message,
  variant = "success",
}: {
  message: string;
  variant?: "success" | "error";
}) {
  if (!message) return null;
  return (
    <div
      className={cn(
        "rounded-xl px-4 py-2.5 text-sm font-medium",
        variant === "success"
          ? "bg-emerald-500/10 text-emerald-700"
          : "bg-destructive/10 text-destructive"
      )}
    >
      {message}
    </div>
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
