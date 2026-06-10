import { join } from "path";
import { mkdirSync } from "fs";

export function getPublicUploadDir(subfolder: string): string {
  const dir = join(process.cwd(), "public", subfolder);
  mkdirSync(dir, { recursive: true });
  return dir;
}
