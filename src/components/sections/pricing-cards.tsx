"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { PricingPlan } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { VIEWPORT_ONCE } from "@/lib/motion-safe";

interface PricingCardsProps {
  plans: PricingPlan[];
  compact?: boolean;
}

export function PricingCards({ plans, compact = false }: PricingCardsProps) {
  const displayPlans = compact ? plans.filter((p) => p.highlighted || p.id === "starter" || p.id === "premium") : plans;

  return (
    <div className={cn("grid gap-8", compact ? "lg:grid-cols-3" : "lg:grid-cols-3")}>
      {displayPlans.map((plan, index) => (
        <motion.div
          key={plan.id}
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4 }}
        >
          <Card
            className={cn(
              "relative h-full overflow-hidden transition-all",
              plan.highlighted
                ? "border-primary shadow-xl shadow-primary/10 scale-[1.02]"
                : "border-border/50"
            )}
          >
            {(plan.highlighted || plan.badge) && (
              <div className="absolute right-0 top-0 rounded-bl-lg bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                {plan.badge ?? "Most Popular"}
              </div>
            )}
            <CardHeader className="pb-4">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-4">
                <span className="text-2xl font-bold sm:text-3xl">
                  {plan.priceDisplay}
                </span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.slice(0, compact ? 6 : plan.features.length).map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                variant={plan.highlighted ? "default" : "outline"}
                className="w-full"
              >
                <Link href={compact ? "/services#pricing" : "/contact"}>
                  {compact && !plan.highlighted ? "View Plans" : plan.cta}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
