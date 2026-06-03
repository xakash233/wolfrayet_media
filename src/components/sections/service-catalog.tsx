"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { ServiceCategory } from "@/types";

interface ServiceCatalogProps {
  categories: ServiceCategory[];
}

export function ServiceCatalog({ categories }: ServiceCatalogProps) {
  return (
    <div id="full-catalog" className="space-y-10">
      {categories.map((category, index) => (
        <motion.article
          key={category.id}
          id={category.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.03 }}
          className="scroll-mt-28 rounded-2xl border border-border bg-card/40 p-6 sm:p-8"
        >
          <div className="flex flex-wrap items-start gap-3 border-b border-border/60 pb-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              {category.number}
            </span>
            <div>
              <h3 className="text-xl font-bold sm:text-2xl">{category.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                {category.description}
              </p>
            </div>
          </div>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {category.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.article>
      ))}
    </div>
  );
}
