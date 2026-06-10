"use client";

import { useEffect, useState } from "react";
import { AdminCard, AdminShell } from "@/components/admin/admin-shell";
import { adminFetch } from "@/lib/cms/admin-fetch";
import type { CmsEnquiry } from "@/lib/cms/types";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<CmsEnquiry[]>([]);

  useEffect(() => {
    adminFetch<CmsEnquiry[]>("/api/admin/enquiries")
      .then(setEnquiries)
      .catch(() => {});
  }, []);

  return (
    <AdminShell title="Enquiry Form Submissions">
      {enquiries.length === 0 ? (
        <AdminCard>
          <p className="text-muted-foreground">No enquiries yet.</p>
        </AdminCard>
      ) : (
        <div className="space-y-4">
          {enquiries.map((e) => (
            <AdminCard key={e.id} className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">{e.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(e.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="text-sm">
                <a href={`mailto:${e.email}`} className="text-primary hover:underline">
                  {e.email}
                </a>
                {e.phone && ` · ${e.phone}`}
              </p>
              <p className="text-sm font-medium">{e.subject}</p>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {e.message}
              </p>
            </AdminCard>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
