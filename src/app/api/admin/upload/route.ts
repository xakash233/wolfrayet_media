import { randomUUID } from "crypto";
import { writeFileSync } from "fs";
import { join } from "path";
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
    const safeName = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
    const dir = getPublicUploadDir(folder);
    const bytes = Buffer.from(await file.arrayBuffer());
    writeFileSync(join(dir, safeName), bytes);

    return NextResponse.json({
      success: true,
      url: `/${folder}/${safeName}`,
      filename: safeName,
    });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
