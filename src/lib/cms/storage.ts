import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const CMS_DIR = join(process.cwd(), "content", "cms");

function ensureDir() {
  mkdirSync(CMS_DIR, { recursive: true });
}

export function readCmsFile<T>(filename: string, fallback: T): T {
  ensureDir();
  const filePath = join(CMS_DIR, filename);
  if (!existsSync(filePath)) {
    writeCmsFile(filename, fallback);
    return fallback;
  }
  try {
    return JSON.parse(readFileSync(filePath, "utf-8")) as T;
  } catch {
    writeCmsFile(filename, fallback);
    return fallback;
  }
}

export function writeCmsFile<T>(filename: string, data: T): void {
  ensureDir();
  const filePath = join(CMS_DIR, filename);
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function getPublicUploadDir(subfolder: string): string {
  const dir = join(process.cwd(), "public", subfolder);
  mkdirSync(dir, { recursive: true });
  return dir;
}
