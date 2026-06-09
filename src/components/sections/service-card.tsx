"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Target,
  Share2,
  PenLine,
  Palette,
  BarChart3,
  Code2,
  Users,
  Megaphone,
  Mail,
  TrendingUp,
  Star,
  Video,
  Rocket,
  Server,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/types";
import { AnimatedSectionImage } from "@/components/shared/animated-section-image";
import { useScrollReveal } from "@/components/shared/scroll-reveal";
import { serviceImageUrl } from "@/lib/images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const iconMap: Record<string, LucideIcon> = {
  Search,
  Target,
  Share2,
  PenLine,
  Palette,
  BarChart3,
  Code2,
  Users,
  Megaphone,
  Mail,
  TrendingUp,
  Star,
  Video,
  Rocket,
  Server,
};

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const Icon = iconMap[service.icon] ?? Search;
  const reveal = useScrollReveal({ index, duration: 1.25 });

  return (
    <motion.div
      ref={reveal.ref}
      initial={reveal.initial}
      animate={reveal.animate}
      transition={reveal.transition}
      whileHover={{ y: -6 }}
    >
      <Link href={service.href}>
        <Card className="group h-full overflow-hidden border-border/50 bg-card/50 transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
          <div className="relative aspect-[16/9] overflow-hidden">
            <AnimatedSectionImage
              src={serviceImageUrl(service.id, 640, 360)}
              alt={service.title}
              fill
              className="h-full w-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
              <Icon className="h-5 w-5" aria-hidden />
            </div>
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">{service.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{service.description}</p>
            <ul className="mt-4 space-y-1">
              {service.features.slice(0, 3).map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
