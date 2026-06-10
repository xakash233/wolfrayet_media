"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { MegaMenu } from "@/components/layout/mega-menu";
import { MegaMenuNav } from "@/components/layout/mega-menu-nav";
import { MobileNavMenu } from "@/components/layout/mobile-nav-menu";
import type { MegaMenuTabId } from "@/lib/mega-menu";
import { getLenis } from "@/lib/motion/lenis-gsap";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

type MenuState = { open: boolean; tab: MegaMenuTabId };

type MenuAction =
  | { type: "toggle"; tab: MegaMenuTabId }
  | { type: "open"; tab: MegaMenuTabId }
  | { type: "close" };

function menuReducer(state: MenuState, action: MenuAction): MenuState {
  switch (action.type) {
    case "close":
      return { ...state, open: false };
    case "open":
      return { open: true, tab: action.tab };
    case "toggle":
      if (state.open && state.tab === action.tab) {
        return { ...state, open: false };
      }
      return { open: true, tab: action.tab };
    default:
      return state;
  }
}

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrollPosition(20);
  const headerRef = useRef<HTMLElement>(null);
  const [{ open: menuOpen, tab: megaTab }, dispatch] = useReducer(menuReducer, {
    open: false,
    tab: "services",
  });

  const closeMenu = useCallback(() => dispatch({ type: "close" }), []);

  const openMega = useCallback((tab: MegaMenuTabId) => {
    dispatch({ type: "toggle", tab });
  }, []);

  const toggleMobileMenu = useCallback(() => {
    dispatch({ type: menuOpen ? "close" : "open", tab: megaTab });
  }, [menuOpen, megaTab]);

  useEffect(() => {
    dispatch({ type: "close" });
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const lenis = getLenis();
    lenis?.stop();

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (headerRef.current?.contains(target)) return;
      dispatch({ type: "close" });
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, [menuOpen]);

  return (
    <>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
            aria-hidden
          />
        )}
      </AnimatePresence>

      <motion.header
        ref={headerRef}
        initial={false}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,padding] duration-300",
          menuOpen
            ? "bg-[#0a0a0a]/95 shadow-lg backdrop-blur-xl"
            : scrolled
              ? "border-b border-white/10 bg-background/95 py-3 shadow-lg backdrop-blur-xl"
              : "bg-transparent py-4 sm:py-5"
        )}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div
            className={cn(
              "relative z-10 flex items-center justify-between gap-3",
              menuOpen ? "py-3 sm:py-4" : ""
            )}
          >
            <Logo priority size="lg" staticLogo={menuOpen || !scrolled} />

            <MegaMenuNav
              className="hidden lg:flex"
              activeTab={megaTab}
              onSelect={openMega}
              isOpen={menuOpen}
              pathname={pathname}
              scrolled={scrolled}
              onClose={closeMenu}
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
              {menuOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="inline-flex text-white hover:bg-white/10 hover:text-white"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  menuOpen ? "hidden" : "inline-flex lg:hidden",
                  !scrolled &&
                    !menuOpen &&
                    "text-white hover:bg-white/10 hover:text-white dark:text-white"
                )}
                onClick={toggleMobileMenu}
                aria-label="Open menu"
                aria-expanded={menuOpen}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {menuOpen && (
            <div className="relative z-10">
              <div className="lg:hidden" data-lenis-prevent>
                <MobileNavMenu onClose={closeMenu} />
                <div className="border-t border-white/10 pb-4 pt-3">
                  <Button asChild variant="premium" size="sm" className="w-full">
                    <Link href="/contact" onClick={closeMenu}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="hidden lg:block" data-lenis-prevent>
                <MegaMenu
                  open={menuOpen}
                  activeTab={megaTab}
                  onClose={closeMenu}
                />
              </div>
            </div>
          )}
        </div>
      </motion.header>
    </>
  );
}
