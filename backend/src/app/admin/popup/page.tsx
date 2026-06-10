"use client";

import { useEffect, useState } from "react";
import { ImageUpload } from "@/components/admin/image-upload";
import {
  AdminAlert,
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

  if (!settings) {
    return (
      <AdminShell title="Popup Image">
        <div className="flex h-40 items-center justify-center text-muted-foreground">
          Loading…
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      title="Popup Image"
      description="Configure the promotional popup on the homepage."
    >
      <AdminCard className="max-w-2xl space-y-5">
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
          <ImageUpload
            value={settings.popup.image}
            alt="Popup preview"
            aspect="video"
            onUpload={async (file) => {
              const { url } = await adminUpload(file, "popup");
              setSettings({
                ...settings,
                popup: { ...settings.popup, image: url, enabled: true },
              });
            }}
            onClear={() =>
              setSettings({
                ...settings,
                popup: { ...settings.popup, image: "" },
              })
            }
          />
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

        <div className="flex flex-wrap items-center gap-4">
          <AdminSaveButton saving={saving} onClick={save} />
          <AdminAlert message={message} variant={message === "Save failed" ? "error" : "success"} />
        </div>
      </AdminCard>
    </AdminShell>
  );
}
