"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { AnimatedSectionImage } from "@/components/shared/animated-section-image";
import { serviceImageUrl } from "@/lib/images";
import { sectionTransition } from "@/lib/animations";
import type { Service } from "@/types";
import { ServiceCard } from "@/components/sections/service-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ServicesEnhancedProps {
  services: Service[];
}

const highlights = [
  {
    icon: Zap,
    title: "Fast Launch",
    desc: "Campaigns live within 2 weeks of onboarding",
  },
  {
    icon: Shield,
    title: "No Lock-in",
    desc: "Flexible month-to-month on Starter & Growth",
  },
  {
    icon: Clock,
    title: "24h Response",
    desc: "Dedicated support with guaranteed reply times",
  },
];

export function ServicesEnhanced({ services }: ServicesEnhancedProps) {
  return (
    <div className="space-y-20">
      <div className="grid gap-4 sm:grid-cols-3">
        {highlights.map((h, i) => (
          <motion.div
            key={h.title}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={sectionTransition(i * 0.1)}
            className="glass-card p-6 text-center"
          >
            <h.icon className="mx-auto h-8 w-8 text-primary" />
            <p className="mt-3 font-bold">{h.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{h.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      <Tabs defaultValue={services[0]?.id} className="w-full">
        <TabsList className="mb-8 flex h-auto max-h-48 w-full flex-wrap justify-start gap-2 overflow-y-auto bg-transparent p-0">
          {services.map((s) => (
            <TabsTrigger
              key={s.id}
              value={s.id}
              className="rounded-full border border-border px-3 py-1.5 text-xs sm:text-sm data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {s.title.replace(/\s*\([^)]*\)/g, "").trim()}
            </TabsTrigger>
          ))}
        </TabsList>
        {services.map((service) => (
          <TabsContent key={service.id} value={service.id}>
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={sectionTransition(0)}
              className="grid items-center gap-10 rounded-3xl border border-border bg-card/50 p-6 lg:grid-cols-2 lg:p-10"
            >
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                <AnimatedSectionImage
                  src={serviceImageUrl(service.id)}
                  alt={service.title}
                  fill
                  className="h-full w-full"
                  sizes="50vw"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold sm:text-3xl">{service.title}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-8" variant="premium">
                  <Link href="/contact">
                    Get a Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
