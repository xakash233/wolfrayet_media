"use client";

import { Plus, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { ImageUpload } from "@/components/admin/image-upload";
import {
  AdminAlert,
  AdminCard,
  AdminSaveButton,
  AdminShell,
  adminUpload,
} from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  const [error, setError] = useState(false);

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
    setError(false);
    try {
      await adminFetch("/api/admin/team", {
        method: "PUT",
        body: JSON.stringify(team),
      });
      setMessage("Team saved successfully!");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Save failed");
      setError(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell
      title="Team"
      description="Manage team photos, roles, and bios shown on the About page."
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Users className="h-4 w-4" />
          </div>
          <span>
            <strong className="text-foreground">{team.length}</strong> team
            {team.length === 1 ? " member" : " members"}
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
          className="gap-2"
          onClick={() => setTeam((prev) => [...prev, newMember()])}
        >
          <Plus className="h-4 w-4" />
          Add member
        </Button>
      </div>

      <div className="space-y-5">
        {team.length === 0 && (
          <AdminCard title="No team members yet">
            <p className="text-sm text-muted-foreground">
              Click &quot;Add member&quot; to create your first team profile.
            </p>
          </AdminCard>
        )}

        {team.map((member, index) => (
          <AdminCard key={`${member.id}-${index}`} className="relative">
            <div className="absolute right-4 top-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => removeMember(index)}
              >
                <Trash2 className="mr-1.5 h-4 w-4" />
                Remove
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
              <ImageUpload
                value={member.image}
                alt={member.name}
                aspect="square"
                onUpload={async (file) => {
                  const { url } = await adminUpload(file, "Team");
                  updateMember(index, { image: url });
                }}
                onClear={() => updateMember(index, { image: "" })}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`name-${index}`}>Full name</Label>
                  <Input
                    id={`name-${index}`}
                    value={member.name}
                    onChange={(e) =>
                      updateMember(index, { name: e.target.value })
                    }
                    placeholder="e.g. Krishna Kumar"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`role-${index}`}>Role / title</Label>
                  <Input
                    id={`role-${index}`}
                    value={member.role}
                    onChange={(e) =>
                      updateMember(index, { role: e.target.value })
                    }
                    placeholder="e.g. Founder, CEO"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor={`bio-${index}`}>Bio</Label>
                  <Textarea
                    id={`bio-${index}`}
                    value={member.bio}
                    onChange={(e) =>
                      updateMember(index, { bio: e.target.value })
                    }
                    placeholder="Short professional bio for the About page…"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      <div className="sticky bottom-4 mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-border/70 bg-card/95 p-4 shadow-lg backdrop-blur-md">
        <AdminSaveButton saving={saving} onClick={save} label="Save team" />
        <AdminAlert
          message={message}
          variant={error ? "error" : "success"}
        />
      </div>
    </AdminShell>
  );
}
