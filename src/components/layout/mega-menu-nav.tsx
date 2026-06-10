"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { MEGA_MENU_TABS, type MegaMenuTabId } from "@/lib/mega-menu";
import { cn } from "@/lib/utils";

interface MegaMenuNavProps {
  activeTab: MegaMenuTabId;
  onSelect: (tab: MegaMenuTabId) => void;
  isOpen: boolean;
  pathname: string;
  scrolled: boolean;
  onClose?: () => void;
  className?: string;
}

export function MegaMenuNav({
  activeTab,
  onSelect,
  isOpen,
  pathname,
  scrolled,
  onClose,
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
      className={cn("flex items-center gap-0.5", className)}
      aria-label="Main navigation"
    >
      {MEGA_MENU_TABS.map((tab) => {
        const active = isActive(tab);
        const isDirectLink = "directLink" in tab && tab.directLink;

        const itemClass = cn(
          "relative inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2",
          focusRing,
          "sm:gap-1.5 sm:px-4 sm:py-2",
          tabClass(active),
          active && pillClass
        );

        if (isDirectLink) {
          return (
            <Link
              key={tab.id}
              href={tab.href}
              onClick={onClose}
              className={itemClass}
            >
              <span className="whitespace-nowrap">{tab.label}</span>
            </Link>
          );
        }

        return (
          <button
            key={tab.id}
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(tab.id);
            }}
            className={itemClass}
            aria-expanded={isOpen && activeTab === tab.id}
            aria-haspopup="true"
          >
            <span className="whitespace-nowrap">{tab.label}</span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 shrink-0 transition-transform duration-200",
                isOpen && activeTab === tab.id && "rotate-180"
              )}
              aria-hidden
            />
          </button>
        );
      })}
    </nav>
  );
}
