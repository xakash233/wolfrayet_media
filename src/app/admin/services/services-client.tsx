"use client";

import { useState } from "react";
import {
  AdminCard,
  AdminSaveButton,
  AdminShell,
} from "@/components/admin/admin-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminFetch } from "@/lib/cms/admin-fetch";
import type { CmsServicesData } from "@/lib/cms/types";
import type { ServiceCategory } from "@/types";

export function AdminServicesClient({
  initialData,
}: {
  initialData: CmsServicesData;
}) {
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function updateCategory(
    list: "digital" | "it",
    index: number,
    patch: Partial<ServiceCategory>
  ) {
    if (list === "it") {
      setData((prev) => ({
        ...prev,
        itServicesCategory: { ...prev.itServicesCategory, ...patch },
      }));
      return;
    }
    setData((prev) => ({
      ...prev,
      digitalMarketingCategories: prev.digitalMarketingCategories.map((c, i) =>
        i === index ? { ...c, ...patch } : c
      ),
    }));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      await adminFetch("/api/admin/services", {
        method: "PUT",
        body: JSON.stringify(data),
      });
      setMessage("Saved!");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="Services">
      <div className="space-y-6">
        {data.digitalMarketingCategories.map((cat, index) => (
          <AdminCard key={cat.id} className="space-y-3">
            <p className="text-xs font-bold text-primary">
              #{cat.number} {cat.id}
            </p>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={cat.title}
                onChange={(e) =>
                  updateCategory("digital", index, { title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={cat.description}
                onChange={(e) =>
                  updateCategory("digital", index, {
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Items (one per line)</Label>
              <textarea
                className="min-h-[100px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                value={cat.items.join("\n")}
                onChange={(e) =>
                  updateCategory("digital", index, {
                    items: e.target.value.split("\n").filter(Boolean),
                  })
                }
              />
            </div>
          </AdminCard>
        ))}

        <AdminCard className="space-y-3">
          <p className="text-xs font-bold text-primary">IT Services</p>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={data.itServicesCategory.title}
              onChange={(e) =>
                updateCategory("it", 0, { title: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              value={data.itServicesCategory.description}
              onChange={(e) =>
                updateCategory("it", 0, { description: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Items (one per line)</Label>
            <textarea
              className="min-h-[100px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              value={data.itServicesCategory.items.join("\n")}
              onChange={(e) =>
                updateCategory("it", 0, {
                  items: e.target.value.split("\n").filter(Boolean),
                })
              }
            />
          </div>
        </AdminCard>

        <div className="flex items-center gap-4">
          <AdminSaveButton saving={saving} onClick={save} />
          {message && <span className="text-sm text-primary">{message}</span>}
        </div>
      </div>
    </AdminShell>
  );
}
