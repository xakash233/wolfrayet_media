"use client";

import { useEffect, useState } from "react";
import {
  AdminCard,
  AdminSaveButton,
  AdminShell,
} from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminFetch } from "@/lib/cms/admin-fetch";
import { blogImageUrl } from "@/lib/images";
import type { BlogPost } from "@/types";
import { Plus, Trash2 } from "lucide-react";

function newPost(): BlogPost {
  const slug = `post-${Date.now()}`;
  return {
    slug,
    title: "New Blog Post",
    excerpt: "",
    content: "",
    category: "SEO",
    author: "Wolfrayet Media",
    date: new Date().toISOString().slice(0, 10),
    readTime: "5 min read",
    image: blogImageUrl("SEO"),
  };
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    adminFetch<BlogPost[]>("/api/admin/blog").then(setPosts).catch(() => {});
  }, []);

  function updatePost(index: number, patch: Partial<BlogPost>) {
    setPosts((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...patch } : p))
    );
  }

  function removePost(index: number) {
    setPosts((prev) => prev.filter((_, i) => i !== index));
  }

  async function save() {
    setSaving(true);
    try {
      await adminFetch("/api/admin/blog", {
        method: "PUT",
        body: JSON.stringify(posts),
      });
      setMessage("Saved!");
    } catch {
      setMessage("Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="Blog">
      <div className="mb-4">
        <Button type="button" variant="outline" onClick={() => setPosts((p) => [newPost(), ...p])}>
          <Plus className="mr-2 h-4 w-4" />
          Add post
        </Button>
      </div>

      <div className="space-y-6">
        {posts.map((post, index) => (
          <AdminCard key={`${post.slug}-${index}`} className="space-y-3">
            <div className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removePost(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={post.title}
                  onChange={(e) => updatePost(index, { title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input
                  value={post.slug}
                  onChange={(e) => updatePost(index, { slug: e.target.value })}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Excerpt</Label>
                <Input
                  value={post.excerpt}
                  onChange={(e) => updatePost(index, { excerpt: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={post.category}
                  onChange={(e) =>
                    updatePost(index, {
                      category: e.target.value,
                      image: blogImageUrl(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Author</Label>
                <Input
                  value={post.author}
                  onChange={(e) => updatePost(index, { author: e.target.value })}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Content (markdown-style)</Label>
                <textarea
                  className="min-h-[120px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  value={post.content}
                  onChange={(e) => updatePost(index, { content: e.target.value })}
                />
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <AdminSaveButton saving={saving} onClick={save} />
        {message && <span className="text-sm text-primary">{message}</span>}
      </div>
    </AdminShell>
  );
}
