"use client";

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

export default function AdminVideoPage() {
  const [settings, setSettings] = useState<CmsSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    adminFetch<CmsSettings>("/api/admin/settings").then(setSettings).catch(() => {});
  }, []);

  async function save() {
    if (!settings) return;
    setSaving(true);
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

  async function uploadVideo(
    e: React.ChangeEvent<HTMLInputElement>,
    type: "mp4" | "webm"
  ) {
    const file = e.target.files?.[0];
    if (!file || !settings) return;
    const { url } = await adminUpload(file, "video");
    setSettings({
      ...settings,
      heroVideo: { ...settings.heroVideo, [type]: url },
    });
  }

  if (!settings) return <AdminShell title="Home Page Video">Loading…</AdminShell>;

  return (
    <AdminShell title="Home Page Video">
      <AdminCard className="max-w-xl space-y-6">
        <p className="text-sm text-muted-foreground">
          Upload homepage hero background video. MP4 works in Safari; WebM is
          smaller for Chrome/Firefox.
        </p>

        <div className="space-y-2">
          <Label>MP4 video</Label>
          <Input
            type="file"
            accept="video/mp4"
            onChange={(e) => uploadVideo(e, "mp4")}
          />
          <p className="text-xs text-muted-foreground">
            Current: {settings.heroVideo.mp4}
          </p>
        </div>

        <div className="space-y-2">
          <Label>WebM video (optional)</Label>
          <Input
            type="file"
            accept="video/webm"
            onChange={(e) => uploadVideo(e, "webm")}
          />
          <p className="text-xs text-muted-foreground">
            Current: {settings.heroVideo.webm}
          </p>
        </div>

        <div className="space-y-2">
          <Label>Poster image URL</Label>
          <Input
            value={settings.heroVideo.poster}
            onChange={(e) =>
              setSettings({
                ...settings,
                heroVideo: { ...settings.heroVideo, poster: e.target.value },
              })
            }
          />
        </div>

        {settings.heroVideo.mp4 && (
          <video
            src={settings.heroVideo.mp4}
            controls
            muted
            className="max-h-48 w-full rounded-lg border"
          />
        )}

        <div className="flex items-center gap-4">
          <AdminSaveButton saving={saving} onClick={save} />
          {message && <span className="text-sm text-primary">{message}</span>}
        </div>
      </AdminCard>
    </AdminShell>
  );
}
