"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { SITE_CONFIG, WHATSAPP_URL } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VIEWPORT_ONCE } from "@/lib/motion-safe";

const contactItems = [
  {
    icon: Phone,
    label: "Phone",
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-6">
      {contactItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border/50">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.label}
                  </p>
                  <a
                    href={item.href}
                    className="mt-1 font-medium hover:text-primary"
                  >
                    {item.value}
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}

      <Button
        asChild
        className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg shadow-[#25D366]/25"
        size="lg"
      >
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon className="mr-2 h-5 w-5" />
          Message us on WhatsApp
        </a>
      </Button>
    </div>
  );
}
