"use client";

import { motion } from "framer-motion";
import { Search, Lightbulb, Rocket, BarChart } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Audit your brand, competitors, and audience to uncover opportunities.",
  },
  {
    icon: Lightbulb,
    title: "Strategy",
    description: "Build a data-driven roadmap aligned with your business goals.",
  },
  {
    icon: Rocket,
    title: "Execute",
    description: "Launch campaigns across channels with precision and creativity.",
  },
  {
    icon: BarChart,
    title: "Optimize",
    description: "Measure, analyze, and continuously improve for maximum ROI.",
  },
];

export function ProcessWorkflow() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="relative text-center"
          >
            {index < steps.length - 1 && (
              <div className="absolute right-0 top-8 hidden h-px w-full translate-x-1/2 bg-gradient-to-r from-primary/50 to-transparent lg:block" />
            )}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="h-8 w-8" />
            </div>
            <span className="mt-4 inline-block text-sm font-bold text-primary">
              Step {index + 1}
            </span>
            <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
