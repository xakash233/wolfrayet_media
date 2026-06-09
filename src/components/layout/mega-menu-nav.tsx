"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MEGA_MENU_TABS, type MegaMenuTabId } from "@/lib/mega-menu";
import { cn } from "@/lib/utils";

interface MegaMenuNavProps {
  activeTab: MegaMenuTabId;
  onSelect: (tab: MegaMenuTabId) => void;
  onHover?: (tab: MegaMenuTabId) => void;
  isOpen: boolean;
  pathname: string;
  scrolled: boolean;
  className?: string;
}

export function MegaMenuNav({
  activeTab,
  onSelect,
  onHover,
  isOpen,
  pathname,
  scrolled,
  className,
}: MegaMenuNavProps) {
  const isActive = (tab: (typeof MEGA_MENU_TABS)[number]) =>
    isOpen
      ? activeTab === tab.id
      : pathname === tab.href || pathname.startsWith(`${tab.href}/`);

  const tabClass = (active: boolean) => {
    if (isOpen) {
      return active
        ? "text-white"
        : "text-white/50 hover:text-white/85";
    }

    if (scrolled) {
      return active
        ? "text-foreground dark:text-white"
        : "text-foreground/65 hover:text-foreground dark:text-white/60 dark:hover:text-white";
    }

    return active
      ? "text-white"
      : "text-white/70 hover:text-white";
  };

  const pillClass = isOpen
    ? "bg-white/10"
    : scrolled
      ? "bg-foreground/10 dark:bg-white/10"
      : "bg-white/15";

  const focusRing = isOpen || !scrolled
    ? "focus-visible:ring-white/30"
    : "focus-visible:ring-foreground/25 dark:focus-visible:ring-white/30";

  return (
    <nav
      className={cn(
        "flex items-center gap-0.5",
        "max-lg:scrollbar-none max-lg:-mx-1 max-lg:overflow-x-auto max-lg:px-1",
        className
      )}
      aria-label="Main navigation"
    >
      {MEGA_MENU_TABS.map((tab) => {
        const active = isActive(tab);
        const isDirectLink = "directLink" in tab && tab.directLink;
        
        const className = cn(
          "relative shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2",
          focusRing,
          "sm:px-4 sm:py-2",
          tabClass(active)
        );

        const content = (
          <>
            {active && (
              <motion.span
                layoutId="mega-tab-pill"
                className={cn("absolute inset-0 rounded-full", pillClass)}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 34,
                }}
              />
            )}
            <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
          </>
        );

        if (isDirectLink) {
          return (
            <Link
              key={tab.id}
              href={tab.href}
              onMouseEnter={() => onHover?.(tab.id)}
              onFocus={() => onHover?.(tab.id)}
              className={className}
            >
              {content}
            </Link>
          );
        }

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(tab.id)}
            onMouseEnter={() => onHover?.(tab.id)}
            onFocus={() => onHover?.(tab.id)}
            className={className}
            aria-expanded={isOpen && activeTab === tab.id}
            aria-haspopup="dialog"
          >
            {content}
          </button>
        );
      })}
    </nav>
  );
}
