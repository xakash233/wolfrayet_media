"use client";

import { Eye, Target, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { cn } from "@/lib/utils";

interface VisionMissionCardProps {
  label: string;
  title: string;
  body: string;
  icon: typeof Eye;
  accent: "cyan" | "violet";
  index: number;
}

function VisionMissionCard({
  label,
  title,
  body,
  icon: Icon,
  accent,
  index,
}: VisionMissionCardProps) {
  const accentStyles =
    accent === "cyan"
      ? {
          border: "border-primary/30 group-hover:border-primary/50",
          glow: "from-primary/20 via-primary/5 to-transparent",
          iconBg: "bg-primary/15 text-primary",
          badge: "bg-primary/10 text-primary",
          line: "bg-primary",
        }
      : {
          border: "border-violet-500/30 group-hover:border-violet-500/50",
          glow: "from-violet-500/20 via-violet-500/5 to-transparent",
          iconBg: "bg-violet-500/15 text-violet-500 dark:text-violet-400",
          badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
          line: "bg-violet-500",
        };

  return (
    <ScrollReveal
      as="article"
      index={index + 1}
      duration={1.55}
      className={cn(
        "group relative overflow-hidden rounded-3xl border bg-card/60 p-8 backdrop-blur-sm transition-shadow duration-300 sm:p-10",
        accentStyles.border,
        "hover:shadow-xl hover:shadow-primary/5"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gradient-to-br opacity-60 blur-3xl transition-opacity group-hover:opacity-100",
          accentStyles.glow
        )}
      />
      <div
        className={cn(
          "absolute left-0 top-8 h-12 w-1 rounded-full",
          accentStyles.line
        )}
      />

      <div className="relative flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110",
              accentStyles.iconBg
            )}
          >
            <Icon className="h-7 w-7" aria-hidden />
          </div>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest",
              accentStyles.badge
            )}
          >
            0{index + 1}
          </span>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h3>
        </div>

        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          {body}
        </p>
      </div>
    </ScrollReveal>
  );
}

export function VisionMissionSection() {
  return (
    <div className="relative">
      <ScrollReveal index={0} duration={1.45} className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" aria-hidden />
          About Wolfrayet Media
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Vision & Mission
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Where we&apos;re headed and how we help brands grow every day.
        </p>
      </ScrollReveal>

      <div className="grid gap-8 lg:grid-cols-2">
        <VisionMissionCard
          label="Our Vision"
          title="Trusted Global Growth Partner"
          body={SITE_CONFIG.vision}
          icon={Eye}
          accent="cyan"
          index={0}
        />
        <VisionMissionCard
          label="Our Mission"
          title="Impactful Digital Experiences"
          body={SITE_CONFIG.mission}
          icon={Target}
          accent="violet"
          index={1}
        />
      </div>

      <ScrollReveal
        index={3}
        duration={1.3}
        y={0}
        blur={0}
        className="mx-auto mt-12 h-px max-w-md origin-center bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden
      >
        <span className="sr-only">Section divider</span>
      </ScrollReveal>
    </div>
  );
}
