"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { LeadDetailsView } from "@/components/admin/lead-details-view";
import { adminFetch } from "@/lib/cms/admin-fetch";
import type { CmsEnquiry } from "@/lib/cms/types";

export default function LeadDetailPage({ params }: { params: { id: string } }) {
  const [enquiry, setEnquiry] = useState<CmsEnquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    adminFetch<CmsEnquiry>(`/api/admin/enquiries/${params.id}`)
      .then(setEnquiry)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <AdminShell title="" description="">
      <div className="-mx-4 -mt-4 bg-neutral-100 sm:-mx-8 sm:-mt-8">
        {loading && (
          <p className="p-8 text-sm text-muted-foreground">Loading lead…</p>
        )}
        {error && (
          <div className="p-8">
            <p className="text-sm text-destructive">Lead not found.</p>
            <Link
              href="/admin/enquiries"
              className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Back to enquiries
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}
        {enquiry && <LeadDetailsView enquiry={enquiry} />}
      </div>
    </AdminShell>
  );
}
