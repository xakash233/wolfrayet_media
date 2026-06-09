"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AdminCard,
  AdminSaveButton,
  AdminShell,
  adminUpload,
} from "@/components/admin/admin-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminFetch } from "@/lib/cms/admin-fetch";
import type { CmsSettings } from "@/lib/cms/types";

export default function AdminPopupPage() {
  const [settings, setSettings] = useState<CmsSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    adminFetch<CmsSettings>("/api/admin/settings").then(setSettings).catch(() => {});
  }, []);

  async function save() {
    if (!settings) return;
    setSaving(true);
    setMessage("");
    try {
      await adminFetch("/api/admin/settings", {
        method: "PUT",
        body: JSON.stringify(settings),
      });
      setMessage("Saved!");
    } catch {
      setMessage("Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !settings) return;
    const { url } = await adminUpload(file, "popup");
    setSettings({
      ...settings,
      popup: { ...settings.popup, image: url, enabled: true },
    });
  }

  if (!settings) return <AdminShell title="Popup Image">Loading…</AdminShell>;

  return (
    <AdminShell title="Popup Image">
      <AdminCard className="max-w-xl space-y-5">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={settings.popup.enabled}
            onChange={(e) =>
              setSettings({
                ...settings,
                popup: { ...settings.popup, enabled: e.target.checked },
              })
            }
          />
          Show popup on homepage
        </label>

        <div className="space-y-2">
          <Label>Popup image</Label>
          <Input type="file" accept="image/*" onChange={onFile} />
          {settings.popup.image && (
            <div className="relative mt-2 aspect-video max-w-sm overflow-hidden rounded-lg border">
              <Image
                src={settings.popup.image}
                alt="Popup preview"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="link">Link URL (on click)</Label>
          <Input
            id="link"
            value={settings.popup.link}
            onChange={(e) =>
              setSettings({
                ...settings,
                popup: { ...settings.popup, link: e.target.value },
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="alt">Alt text</Label>
          <Input
            id="alt"
            value={settings.popup.alt}
            onChange={(e) =>
              setSettings({
                ...settings,
                popup: { ...settings.popup, alt: e.target.value },
              })
            }
          />
        </div>

        <div className="flex items-center gap-4">
          <AdminSaveButton saving={saving} onClick={save} />
          {message && <span className="text-sm text-primary">{message}</span>}
        </div>
      </AdminCard>
    </AdminShell>
  );
}
