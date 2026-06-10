"use client";

import Image from "next/image";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { resolveAssetUrl } from "@/lib/admin-assets";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  alt: string;
  onUpload: (file: File) => Promise<void>;
  onClear?: () => void;
  className?: string;
  aspect?: "square" | "video" | "banner";
}

const aspectClass = {
  square: "aspect-square w-36",
  video: "aspect-video w-full max-w-md",
  banner: "aspect-[21/9] w-full",
};

export function ImageUpload({
  value,
  alt,
  onUpload,
  onClear,
  className,
  aspect = "square",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setUploading(true);
    try {
      await onUpload(file);
    } finally {
      setUploading(false);
    }
  }

  const src = resolveAssetUrl(value);

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "group relative overflow-hidden rounded-xl border-2 border-dashed transition-all",
          aspectClass[aspect],
          dragging
            ? "border-primary bg-primary/5"
            : "border-border/80 bg-muted/30 hover:border-primary/40 hover:bg-muted/50"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          void handleFiles(e.dataTransfer.files);
        }}
      >
        {src ? (
          <>
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="200px"
              unoptimized={src.startsWith("/") || src.includes("blob.vercel-storage")}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/50 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black shadow-lg"
              >
                Change photo
              </button>
            </div>
            {onClear && (
              <button
                type="button"
                onClick={onClear}
                className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Upload className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {uploading ? "Uploading…" : "Drop image or click to upload"}
            </span>
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => void handleFiles(e.target.files)}
        />
      </div>
      {src && (
        <p className="truncate text-[11px] text-muted-foreground" title={value}>
          {value}
        </p>
      )}
    </div>
  );
}
