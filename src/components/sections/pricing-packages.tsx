"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { CustomAddOn, PricingPlan } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { VIEWPORT_ONCE } from "@/lib/motion-safe";

interface PricingPackagesProps {
  plans: PricingPlan[];
  note: string;
  customAddOns: CustomAddOn;
}

function PricingPlanCard({
  plan,
  index,
}: {
  plan: PricingPlan;
  index: number;
}) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ delay: index * 0.06 }}
    >
      <Card
        className={cn(
          "relative h-full",
          plan.highlighted &&
            "border-primary shadow-xl shadow-primary/10 lg:scale-[1.02]"
        )}
      >
        {(plan.highlighted || plan.badge) && (
          <div className="absolute right-0 top-0 rounded-bl-lg bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {plan.badge ?? "Featured"}
          </div>
        )}
        <CardHeader className="pb-3">
          <h3 className="text-xl font-bold">{plan.name}</h3>
          <p className="text-xs font-medium uppercase tracking-wide text-primary">
            Best for: {plan.bestFor}
          </p>
          <div className="mt-3">
            <span className="text-2xl font-bold sm:text-3xl">
              {plan.priceDisplay}
            </span>
            <span className="text-muted-foreground"> / {plan.period}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2.5">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
          {plan.summary && (
            <p className="mt-4 border-t border-border/60 pt-4 text-sm italic text-muted-foreground">
              {plan.summary}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button
            asChild
            variant={plan.highlighted ? "default" : "outline"}
            className="w-full"
          >
            <Link href="/contact">{plan.cta}</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function PricingPackages({
  plans,
  note,
  customAddOns,
}: PricingPackagesProps) {
  const corePlans = plans.filter(
    (p) => p.id !== "premium" && p.id !== "enterprise"
  );
  const topTierPlans = plans.filter(
    (p) => p.id === "premium" || p.id === "enterprise"
  );

  return (
    <div className="space-y-16">
      <p className="mx-auto max-w-3xl text-center text-sm text-muted-foreground">
        {note}
      </p>

      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {corePlans.map((plan, index) => (
          <PricingPlanCard key={plan.id} plan={plan} index={index} />
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {topTierPlans.map((plan, index) => (
          <PricingPlanCard
            key={plan.id}
            plan={plan}
            index={corePlans.length + index}
          />
        ))}
      </div>

      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        className="mx-auto max-w-4xl rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-8"
      >
        <h3 className="text-xl font-bold">Custom Add-Ons</h3>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {customAddOns.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">{customAddOns.summary}</p>
        <Button asChild variant="premium" className="mt-6">
          <Link href="/contact">Request Custom Quote</Link>
        </Button>
      </motion.div>
    </div>
  );
}
