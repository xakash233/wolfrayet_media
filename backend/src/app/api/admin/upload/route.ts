import { randomUUID } from "crypto";
import { writeFileSync } from "fs";
import { join } from "path";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/cms/api-auth";
import { getPublicUploadDir } from "@/lib/cms/storage";

const ALLOWED_FOLDERS = ["popup", "Team", "video", "uploads"] as const;

export async function POST(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = (formData.get("folder") as string) || "uploads";

    if (!ALLOWED_FOLDERS.includes(folder as (typeof ALLOWED_FOLDERS)[number])) {
      return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
    }

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
    const safeName = `${folder}/${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(safeName, file, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      return NextResponse.json({
        success: true,
        url: blob.url,
        filename: safeName.split("/").pop(),
      });
    }

    const filename = safeName.split("/").pop()!;
    const dir = getPublicUploadDir(folder);
    const bytes = Buffer.from(await file.arrayBuffer());
    writeFileSync(join(dir, filename), bytes);

    return NextResponse.json({
      success: true,
      url: `/${folder}/${filename}`,
      filename,
    });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
