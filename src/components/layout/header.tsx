"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { MegaMenu } from "@/components/layout/mega-menu";
import { MegaMenuNav } from "@/components/layout/mega-menu-nav";
import type { MegaMenuTabId } from "@/lib/mega-menu";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

const CLOSE_DELAY_MS = 180;

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrollPosition(20);
  const [megaOpen, setMegaOpen] = useState(false);
  const [megaTab, setMegaTab] = useState<MegaMenuTabId>("services");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setMegaOpen(false), CLOSE_DELAY_MS);
  }, [cancelClose]);

  const showMega = useCallback(
    (tab: MegaMenuTabId) => {
      cancelClose();
      setMegaTab(tab);
      setMegaOpen(true);
    },
    [cancelClose]
  );

  const openMega = (tab: MegaMenuTabId) => {
    if (megaOpen && megaTab === tab) {
      setMegaOpen(false);
      return;
    }
    showMega(tab);
  };

  const toggleMobileMega = () => {
    if (megaOpen) {
      setMegaOpen(false);
      return;
    }
    showMega("services");
  };

  useEffect(() => {
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          megaOpen
            ? "bg-[#0a0a0a]/75 shadow-lg backdrop-blur-xl"
            : scrolled
              ? "border-b border-white/10 bg-background/95 py-3 shadow-lg backdrop-blur-xl"
              : "bg-transparent py-4 sm:py-5"
        )}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div
            className={cn(
              "flex items-center justify-between gap-3",
              megaOpen ? "py-3 sm:py-4" : ""
            )}
          >
            <Logo priority size="lg" staticLogo={megaOpen || !scrolled} />

            <MegaMenuNav
              className="hidden lg:flex"
              activeTab={megaTab}
              onSelect={openMega}
              onHover={showMega}
              isOpen={megaOpen}
              pathname={pathname}
              scrolled={scrolled}
            />

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <ThemeToggle />
              <Button
                asChild
                variant="premium"
                size="sm"
                className="hidden sm:inline-flex"
              >
                <Link href="/contact">Get Started</Link>
              </Button>
              {megaOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="inline-flex text-white hover:bg-white/10 hover:text-white"
                  onClick={() => setMegaOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  megaOpen ? "hidden" : "inline-flex lg:hidden",
                  !scrolled &&
                    !megaOpen &&
                    "text-white hover:bg-white/10 hover:text-white dark:text-white"
                )}
                onClick={toggleMobileMega}
                aria-label="Open menu"
                aria-expanded={megaOpen}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {megaOpen && (
            <div className="pb-1 lg:hidden">
              <MegaMenuNav
                className="w-full justify-start pb-1"
                activeTab={megaTab}
                onSelect={openMega}
                isOpen
                pathname={pathname}
                scrolled={scrolled}
              />
            </div>
          )}

          <AnimatePresence>
            {megaOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <MegaMenu
                  open={megaOpen}
                  activeTab={megaTab}
                  onClose={() => setMegaOpen(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}
