"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DotMatrixIcon } from "@/components/layout/dot-matrix-icon";
import {
  MEGA_MENU_TABS,
  megaMenuTitle,
  type MegaMenuTabId,
} from "@/lib/mega-menu";
import { defaultCmsServices } from "@/lib/cms/defaults";
import { SITE_CONFIG, WHATSAPP_URL } from "@/lib/constants";
import type { ServiceCategory } from "@/types";
import type { CmsServicesData } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  open: boolean;
  activeTab: MegaMenuTabId;
  onClose: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const cardMotion = {
  whileHover: { scale: 1.015, x: 2 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring" as const, stiffness: 420, damping: 28 },
};

function ServiceCard({
  category,
  onNavigate,
  index,
}: {
  category: ServiceCategory;
  onNavigate: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.22, ease: EASE }}
    >
      <motion.div {...cardMotion}>
        <Link
          href={`/services#${category.id}`}
          onClick={onNavigate}
          className="group flex items-center gap-3 rounded-lg border border-transparent bg-white/[0.03] px-3 py-2 transition-[border-color,background-color,box-shadow] hover:border-white/10 hover:bg-white/[0.07] hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] sm:px-3.5"
          data-cursor="pointer"
        >
          <DotMatrixIcon
            categoryId={category.id}
            className="h-7 w-7 shrink-0 text-white/85 transition-transform group-hover:scale-105 sm:h-8 sm:w-8"
          />
          <span className="min-w-0 flex-1 text-xs font-medium leading-snug text-white/85 group-hover:text-white sm:text-sm">
            {megaMenuTitle(category.title)}
          </span>
          <span className="hidden shrink-0 text-[10px] tabular-nums text-white/30 sm:inline sm:text-xs">
            /{category.items.length}
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/20 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

function LinkCard({
  href,
  title,
  subtitle,
  onNavigate,
  index,
}: {
  href: string;
  title: string;
  subtitle?: string;
  onNavigate: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.22, ease: EASE }}
    >
      <motion.div {...cardMotion}>
        <Link
          href={href}
          onClick={onNavigate}
          className="group flex items-center justify-between rounded-lg border border-transparent bg-white/[0.03] px-3 py-2.5 transition-[border-color,background-color,box-shadow] hover:border-white/10 hover:bg-white/[0.07] hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] sm:px-3.5 sm:py-3"
          data-cursor="pointer"
        >
          <div className="min-w-0 pr-2">
            <p className="truncate text-xs font-medium text-white/85 group-hover:text-white sm:text-sm">
              {title}
            </p>
            {subtitle && (
              <p className="mt-0.5 truncate text-[10px] text-white/35 sm:text-xs">
                {subtitle}
              </p>
            )}
          </div>
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/20 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

function TabPanel({
  activeTab,
  allCategories,
  onClose,
}: {
  activeTab: MegaMenuTabId;
  allCategories: ServiceCategory[];
  onClose: () => void;
}) {
  const gridClass =
    "grid grid-cols-1 gap-1.5 min-[480px]:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3";

  if (activeTab === "services") {
    return (
      <div className="grid grid-cols-1 gap-1.5 min-[480px]:grid-cols-2 sm:gap-2 lg:grid-cols-2">
        {allCategories.map((cat, i) => (
          <ServiceCard
            key={cat.id}
            category={cat}
            onNavigate={onClose}
            index={i}
          />
        ))}
      </div>
    );
  }


  if (activeTab === "blog") {
    const items = [
      { href: "/blog", title: "All Articles", subtitle: "Tips & trends" },
      { href: "/blog/seo-trends-2024", title: "SEO Trends", subtitle: "Search strategies" },
      { href: "/blog/social-media-strategy-guide", title: "Social Media", subtitle: "Playbook" },
      { href: "/blog/ppc-roas-optimization", title: "PPC & ROAS", subtitle: "Paid ads" },
    ];
    return (
      <div className={gridClass}>
        {items.map((item, i) => (
          <LinkCard key={item.title} {...item} onNavigate={onClose} index={i} />
        ))}
      </div>
    );
  }

  const contactItems = [
    { href: "/contact", title: "Request a Quote", subtitle: "Project form" },
    { href: WHATSAPP_URL, title: "WhatsApp", subtitle: "Fast response", external: true },
    { href: `mailto:${SITE_CONFIG.email}`, title: "Email", subtitle: SITE_CONFIG.email },
    { href: `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`, title: "Call", subtitle: SITE_CONFIG.phone },
  ];

  return (
    <div className={gridClass}>
      {contactItems.map((item, i) =>
        item.external ? (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.22, ease: EASE }}
          >
            <motion.div {...cardMotion}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="group flex items-center justify-between rounded-lg border border-transparent bg-white/[0.03] px-3 py-2.5 transition-[border-color,background-color] hover:border-white/10 hover:bg-white/[0.07] sm:px-3.5 sm:py-3"
              >
                <div className="min-w-0 pr-2">
                  <p className="text-xs font-medium text-white/85 group-hover:text-white sm:text-sm">
                    {item.title}
                  </p>
                  <p className="mt-0.5 truncate text-[10px] text-white/35 sm:text-xs">
                    {item.subtitle}
                  </p>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/20 group-hover:text-white/60" />
              </a>
            </motion.div>
          </motion.div>
        ) : (
          <LinkCard
            key={item.title}
            href={item.href}
            title={item.title}
            subtitle={item.subtitle}
            onNavigate={onClose}
            index={i}
          />
        )
      )}
    </div>
  );
}

export function MegaMenu({ open, activeTab, onClose }: MegaMenuProps) {
  const [services, setServices] =
    useState<CmsServicesData>(defaultCmsServices);

  useEffect(() => {
    if (!open) return;
    fetch("/api/cms/services")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: CmsServicesData | null) => {
        if (data?.digitalMarketingCategories?.length) {
          setServices(data);
        }
      })
      .catch(() => null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const allCategories: ServiceCategory[] = [
    ...services.digitalMarketingCategories,
    {
      ...services.itServicesCategory,
      number: services.digitalMarketingCategories.length + 1,
    },
  ];

  const tabHref = MEGA_MENU_TABS.find((t) => t.id === activeTab)?.href ?? "/";
  const tabLabel =
    MEGA_MENU_TABS.find((t) => t.id === activeTab)?.label ?? "Services";

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="border-t border-white/10"
      >
        <div
          className={cn(
            "py-3 sm:py-4",
            activeTab === "services"
              ? "max-h-[min(52vh,420px)] overflow-y-auto overscroll-contain lg:max-h-none lg:overflow-visible"
              : "max-h-[min(38vh,280px)] overflow-y-auto overscroll-contain"
          )}
        >
          <TabPanel
            activeTab={activeTab}
            allCategories={allCategories}
            onClose={onClose}
          />
        </div>

        <div className="pb-3 pt-1 sm:pb-4 sm:pt-2">
          <Link
            href={tabHref}
            onClick={onClose}
            className="group inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40 transition-colors hover:text-white/90 sm:text-[11px]"
          >
            View all {tabLabel}
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </>
  );
}
