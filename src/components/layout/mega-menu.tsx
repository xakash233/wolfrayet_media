"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { megaMenuImageUrl } from "@/lib/images";
import { cn } from "@/lib/utils";
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
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/lib/api/config";

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
  const imageSrc = megaMenuImageUrl(category.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.22, ease: EASE }}
    >
      <Link
        href={`/services#${category.id}`}
        onClick={onNavigate}
        className={cn(
          "group relative flex min-h-[3.25rem] items-center gap-3 overflow-hidden rounded-xl",
          "border border-white/[0.06] bg-white/[0.04] px-3 py-3 sm:min-h-[3.5rem] sm:px-3.5 sm:py-3.5",
          "transition-[border-color,box-shadow,transform,min-height,padding] duration-500",
          "hover:min-h-[4.1rem] hover:py-4 hover:scale-[1.02] sm:hover:min-h-[4.3rem]",
          "hover:border-white/15 hover:shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
        )}
        data-cursor="pointer"
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          className={cn(
            "object-cover object-center",
            "scale-110 opacity-0 transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
            "group-hover:scale-[1.03] group-hover:opacity-100"
          )}
          sizes="(max-width: 1024px) 50vw, 360px"
        />

        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/35",
            "opacity-0 transition-opacity duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
            "group-hover:opacity-100"
          )}
          aria-hidden
        />

        <div className="relative z-10 flex w-full min-w-0 items-center gap-3">
          <DotMatrixIcon
            categoryId={category.id}
            className="h-7 w-7 shrink-0 text-white/90 drop-shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-8 sm:w-8"
          />
          <span className="min-w-0 flex-1 text-xs font-medium leading-snug text-white/85 transition-colors duration-300 group-hover:text-white sm:text-sm">
            {megaMenuTitle(category.title)}
          </span>
          <span className="hidden shrink-0 text-[10px] tabular-nums text-white/35 transition-colors duration-300 group-hover:text-white/70 sm:inline sm:text-xs">
            /{category.items.length} services
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/80" />
        </div>
      </Link>
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
      <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 sm:gap-2.5 lg:grid-cols-2">
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

function ViewAllFooter({
  href,
  label,
  onClose,
}: {
  href: string;
  label: string;
  onClose: () => void;
}) {
  return (
    <div className="shrink-0 border-t border-white/15 bg-[#0a0a0a]/95 px-1 pt-3 backdrop-blur-sm sm:pt-4">
      <Button
        asChild
        variant="premium"
        size="lg"
        className="group h-12 w-full rounded-full text-sm font-semibold shadow-[0_8px_32px_rgba(255,255,255,0.12)] sm:text-base"
      >
        <Link href={href} onClick={onClose} data-cursor="pointer">
          View all {label}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </Button>
    </div>
  );
}

export function MegaMenu({ open, activeTab, onClose }: MegaMenuProps) {
  const [services, setServices] =
    useState<CmsServicesData>(defaultCmsServices);

  useEffect(() => {
    if (!open) return;
    fetch(apiUrl("/api/cms/services"))
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
        className="flex max-h-[min(68vh,520px)] flex-col border-t border-white/10"
      >
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-3 sm:py-4">
          <TabPanel
            activeTab={activeTab}
            allCategories={allCategories}
            onClose={onClose}
          />
        </div>

        <ViewAllFooter href={tabHref} label={tabLabel} onClose={onClose} />
      </div>
    </>
  );
}
