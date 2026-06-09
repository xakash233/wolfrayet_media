"use client";

import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  AdminCard,
  AdminSaveButton,
  AdminShell,
  adminUpload,
} from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminFetch } from "@/lib/cms/admin-fetch";
import type { TeamMember } from "@/types";

function newMember(): TeamMember {
  return {
    id: `member-${Date.now()}`,
    name: "New Team Member",
    role: "",
    bio: "",
    image: "",
    social: {},
  };
}

export function AdminTeamClient({
  initialData,
}: {
  initialData: TeamMember[];
}) {
  const [team, setTeam] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function updateMember(index: number, patch: Partial<TeamMember>) {
    setTeam((prev) =>
      prev.map((m, i) => (i === index ? { ...m, ...patch } : m))
    );
  }

  function removeMember(index: number) {
    setTeam((prev) => prev.filter((_, i) => i !== index));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      await adminFetch("/api/admin/team", {
        method: "PUT",
        body: JSON.stringify(team),
      });
      setMessage("Saved!");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function uploadPhoto(
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await adminUpload(file, "Team");
      updateMember(index, { image: url });
    } catch {
      setMessage("Photo upload failed");
    }
  }

  return (
    <AdminShell title="Team Images">
      <div className="mb-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setTeam((prev) => [...prev, newMember()])}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add member
        </Button>
      </div>

      <div className="space-y-6">
        {team.length === 0 && (
          <AdminCard>
            <p className="text-sm text-muted-foreground">
              No team members yet. Click &quot;Add member&quot; to create one.
            </p>
          </AdminCard>
        )}

        {team.map((member, index) => (
          <AdminCard key={`${member.id}-${index}`} className="space-y-4">
            <div className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => removeMember(index)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted/50">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="px-2 text-center text-xs text-muted-foreground">
                    No photo
                  </span>
                )}
              </div>
              <div className="grid flex-1 gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={member.name}
                    onChange={(e) =>
                      updateMember(index, { name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    value={member.role}
                    onChange={(e) =>
                      updateMember(index, { role: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Bio</Label>
                  <Input
                    value={member.bio}
                    onChange={(e) =>
                      updateMember(index, { bio: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Upload photo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => uploadPhoto(index, e)}
                  />
                  {member.image && (
                    <p className="text-xs text-muted-foreground">
                      Path: {member.image}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </AdminCard>
        ))}

        <div className="flex items-center gap-4">
          <AdminSaveButton saving={saving} onClick={save} />
          {message && <span className="text-sm text-primary">{message}</span>}
        </div>
      </div>
    </AdminShell>
  );
}
