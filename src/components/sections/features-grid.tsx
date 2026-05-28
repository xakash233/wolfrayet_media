"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Eye,
  Users,
  Trophy,
  Zap,
  Handshake,
  Code2,
  type LucideIcon,
} from "lucide-react";
import type { Feature } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  LineChart,
  Eye,
  Users,
  Trophy,
  Zap,
  Handshake,
  Code2,
};

interface FeaturesGridProps {
  features: Feature[];
}

export function FeaturesGrid({ features }: FeaturesGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => {
        const Icon = iconMap[feature.icon] ?? Zap;
        return (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card group p-6"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
