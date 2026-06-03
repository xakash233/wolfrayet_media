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

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
    >
      <Link href={service.href}>
        <Card className="group h-full border-border/50 bg-card/50 transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
          <CardHeader>
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-6 w-6" />
            </div>
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
