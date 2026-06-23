"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/shared/logo";

const STORAGE_KEY = "wrm-site-loaded";
const LOADER_MS = 1100;

export function PageLoader() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const dismissed = useRef(false);

  useEffect(() => {
    if (reducedMotion) setVisible(false);
  }, [reducedMotion]);

  useEffect(() => {
    if (dismissed.current) return;

    const hide = () => {
      if (dismissed.current) return;
      dismissed.current = true;
      setVisible(false);
    };

    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        hide();
        return;
      }
    } catch {
      hide();
      return;
    }

    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* private browsing */
      }
      hide();
    }, LOADER_MS);

    return () => window.clearTimeout(timer);
    // Run once on mount — do not re-run when reducedMotion resolves (Strict Mode / hydration).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Loading site"
    >
      <Logo href="/" size="lg" />
      <div className="h-0.5 w-32 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full origin-left rounded-full bg-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}
