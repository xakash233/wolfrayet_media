"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, Eye } from "lucide-react";
import { AdminCard, AdminShell } from "@/components/admin/admin-shell";
import { adminFetch } from "@/lib/cms/admin-fetch";
import type { CmsEnquiry } from "@/lib/cms/types";

const QUOTE_SOURCE = "Ready to get started?";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<CmsEnquiry[]>([]);

  useEffect(() => {
    adminFetch<CmsEnquiry[]>("/api/admin/enquiries")
      .then(setEnquiries)
      .catch(() => {});
  }, []);

  return (
    <AdminShell
      title="Enquiries"
      description="Contact form submissions — open a lead for full details."
    >
      {enquiries.length === 0 ? (
        <AdminCard>
          <p className="text-muted-foreground">No enquiries yet.</p>
        </AdminCard>
      ) : (
        <div className="space-y-3">
          {enquiries.map((e) => (
            <AdminCard
              key={e.id}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{e.name}</p>
                  {e.subject.startsWith(QUOTE_SOURCE) && (
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-primary">
                      {QUOTE_SOURCE}
                    </span>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {new Date(e.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="truncate text-sm text-muted-foreground">{e.email}</p>
                <p className="text-sm font-medium">{e.subject}</p>
              </div>
              <Link
                href={`/admin/enquiries/${e.id}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                <Eye className="h-4 w-4" />
                Lead Details
                <ChevronRight className="h-4 w-4" />
              </Link>
            </AdminCard>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
