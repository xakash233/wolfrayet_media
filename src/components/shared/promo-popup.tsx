"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { CmsPopup } from "@/lib/cms/types";

export function PromoPopup() {
  const [popup, setPopup] = useState<CmsPopup | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/cms/settings")
      .then((r) => r.json())
      .then((data: { popup: CmsPopup }) => {
        if (data.popup?.enabled && data.popup.image) {
          const dismissed = sessionStorage.getItem("wolfrayet_popup_dismissed");
          if (!dismissed) {
            setPopup(data.popup);
            setOpen(true);
          }
        }
      })
      .catch(() => {});
  }, []);

  function dismiss() {
    sessionStorage.setItem("wolfrayet_popup_dismissed", "1");
    setOpen(false);
  }

  if (!open || !popup?.image) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal
      aria-label={popup.alt}
    >
      <div className="relative max-w-lg">
        <button
          type="button"
          onClick={dismiss}
          className="absolute -right-2 -top-2 z-10 rounded-full bg-background p-2 shadow-lg"
          aria-label="Close popup"
        >
          <X className="h-5 w-5" />
        </button>
        <Link href={popup.link || "/contact"} onClick={dismiss}>
          <Image
            src={popup.image}
            alt={popup.alt}
            width={800}
            height={600}
            className="max-h-[80vh] w-auto rounded-xl object-contain"
          />
        </Link>
      </div>
    </div>
  );
}
