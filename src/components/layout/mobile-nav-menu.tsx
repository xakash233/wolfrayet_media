"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { cn } from "@/lib/utils";

interface MobileNavMenuProps {
  onClose: () => void;
  className?: string;
}

function MobileLink({
  href,
  title,
  subtitle,
  onNavigate,
  external,
}: {
  href: string;
  title: string;
  subtitle?: string;
  onNavigate: () => void;
  external?: boolean;
}) {
  const className =
    "flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2.5 text-left transition-colors hover:bg-white/[0.08]";

  const inner = (
    <>
      <div className="min-w-0 pr-2">
        <p className="text-sm font-medium text-white/90">{title}</p>
        {subtitle && (
          <p className="mt-0.5 truncate text-xs text-white/40">{subtitle}</p>
        )}
      </div>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/30" />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={className}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onNavigate} className={className}>
      {inner}
    </Link>
  );
}

function getDropdownItems(
  tabId: MegaMenuTabId,
  allCategories: ServiceCategory[]
) {
  if (tabId === "services") {
    return allCategories.map((cat) => ({
      href: `/services#${cat.id}`,
      title: megaMenuTitle(cat.title),
      subtitle: `${cat.items.length} services`,
    }));
  }

  if (tabId === "blog") {
    return [
      { href: "/blog", title: "All Articles", subtitle: "Tips & trends" },
      {
        href: "/blog/seo-trends-2024",
        title: "SEO Trends",
        subtitle: "Search strategies",
      },
      {
        href: "/blog/social-media-strategy-guide",
        title: "Social Media",
        subtitle: "Playbook",
      },
      {
        href: "/blog/ppc-roas-optimization",
        title: "PPC & ROAS",
        subtitle: "Paid ads",
      },
    ];
  }

  return [
    { href: "/contact", title: "Request a Quote", subtitle: "Project form" },
    {
      href: WHATSAPP_URL,
      title: "WhatsApp",
      subtitle: "Fast response",
      external: true,
    },
    {
      href: `mailto:${SITE_CONFIG.email}`,
      title: "Email",
      subtitle: SITE_CONFIG.email,
    },
    {
      href: `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`,
      title: "Call",
      subtitle: SITE_CONFIG.phone,
    },
  ];
}

export function MobileNavMenu({ onClose, className }: MobileNavMenuProps) {
  const [services, setServices] =
    useState<CmsServicesData>(defaultCmsServices);

  useEffect(() => {
    fetch(apiUrl("/api/cms/services"))
      .then((r) => (r.ok ? r.json() : null))
      .then((data: CmsServicesData | null) => {
        if (data?.digitalMarketingCategories?.length) {
          setServices(data);
        }
      })
      .catch(() => null);
  }, []);

  const allCategories: ServiceCategory[] = [
    ...services.digitalMarketingCategories,
    {
      ...services.itServicesCategory,
      number: services.digitalMarketingCategories.length + 1,
    },
  ];

  const directTabs = MEGA_MENU_TABS.filter(
    (tab) => "directLink" in tab && tab.directLink
  );
  const dropdownTabs = MEGA_MENU_TABS.filter(
    (tab) => !("directLink" in tab && tab.directLink)
  );

  return (
    <nav
      className={cn("flex touch-manipulation flex-col gap-1 py-2", className)}
      aria-label="Mobile navigation"
    >
      <div className="flex flex-col gap-0.5">
        {directTabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            onClick={onClose}
            className="rounded-lg px-3 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <Accordion type="single" collapsible className="w-full">
        {dropdownTabs.map((tab) => {
          const items = getDropdownItems(tab.id, allCategories);
          return (
            <AccordionItem
              key={tab.id}
              value={tab.id}
              className="border-white/10"
            >
              <AccordionTrigger className="touch-manipulation px-3 py-3 text-base font-medium text-white/90 hover:no-underline hover:text-white [&[data-state=open]]:text-white">
                {tab.label}
              </AccordionTrigger>
              <AccordionContent className="px-1 pb-2">
                <div className="flex flex-col gap-1">
                  {items.map((item) => (
                    <MobileLink
                      key={item.title}
                      href={item.href}
                      title={item.title}
                      subtitle={item.subtitle}
                      onNavigate={onClose}
                      external={"external" in item && item.external}
                    />
                  ))}
                  <Button
                    asChild
                    variant="premium"
                    size="sm"
                    className="group mt-2 h-10 w-full rounded-full text-xs font-semibold sm:text-sm"
                  >
                    <Link href={tab.href} onClick={onClose}>
                      View all {tab.label}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </nav>
  );
}
