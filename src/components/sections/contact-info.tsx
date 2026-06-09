"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { SITE_CONFIG, WHATSAPP_URL } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { useScrollReveal, ScrollReveal } from "@/components/shared/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

function ContactInfoItem({
  item,
  index,
}: {
  item: (typeof contactItems)[number];
  index: number;
}) {
  const Icon = item.icon;
  const reveal = useScrollReveal({ index, duration: 1.35, y: 40 });

  return (
    <motion.div
      ref={reveal.ref}
      initial={reveal.initial}
      animate={reveal.animate}
      transition={reveal.transition}
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
}

export function ContactInfo() {
  return (
    <div className="space-y-6">
      {contactItems.map((item, index) => (
        <ContactInfoItem key={item.label} item={item} index={index} />
      ))}

      <ScrollReveal index={contactItems.length} duration={1.4}>
        <Button
          asChild
          className="w-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 hover:bg-[#20BD5A]"
          size="lg"
        >
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="mr-2 h-5 w-5" />
            Message us on WhatsApp
          </a>
        </Button>
      </ScrollReveal>
    </div>
  );
}
