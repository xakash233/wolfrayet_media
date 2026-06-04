"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { HEADER_NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileNav({ open, onClose, pathname }: MobileNavProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 z-50 flex h-full w-[min(320px,85vw)] flex-col border-l border-border bg-background p-6 shadow-2xl lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mb-8 flex items-center justify-between">
              <Logo size="sm" onClick={onClose} />
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <ul className="flex flex-col gap-1">
              {HEADER_NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-lg font-medium transition-colors",
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted dark:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <Button asChild variant="premium" className="w-full" size="lg">
                <Link href="/contact" onClick={onClose}>
                  Get Started Today
                </Link>
              </Button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
