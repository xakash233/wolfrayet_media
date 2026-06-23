"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/motion/lenis-gsap";

/** Refreshes ScrollTrigger after route changes so pin/horizontal sections stay aligned. */
export function ScrollTriggerRefresh() {
  const pathname = usePathname();

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
