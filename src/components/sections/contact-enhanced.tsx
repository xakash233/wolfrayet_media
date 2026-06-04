"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Bot, Sparkles } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { ContactInfo } from "@/components/sections/contact-info";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { SITE_CONFIG, WHATSAPP_URL } from "@/lib/constants";
import { faqItems } from "@/data/faq";
import { Button } from "@/components/ui/button";
import { VIEWPORT_ONCE } from "@/lib/motion-safe";
import { sectionTransition } from "@/lib/animations";

export function ContactEnhanced() {
  const quickFaqs = faqItems.slice(0, 3);

  return (
    <div className="space-y-16">
      <div className="grid gap-4 sm:grid-cols-3">
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={sectionTransition(0)}
          whileHover={{ y: -4 }}
          className="group flex flex-col items-center rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 p-6 text-center transition-shadow hover:shadow-lg hover:shadow-[#25D366]/20"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30">
            <WhatsAppIcon className="h-7 w-7" />
          </div>
          <p className="mt-4 font-bold text-[#25D366]">WhatsApp</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Fastest response · Usually within 1 hour
          </p>
          <span className="mt-4 text-sm font-semibold group-hover:underline">
            Message us now →
          </span>
        </motion.a>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={sectionTransition(0.1)}
          className="glass-card flex flex-col items-center p-6 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Bot className="h-7 w-7" />
          </div>
          <p className="mt-4 font-bold">AI Assistant</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Instant answers about services & pricing
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Tap the chat button bottom-right
          </p>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={sectionTransition(0.2)}
          className="glass-card flex flex-col items-center p-6 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <MessageCircle className="h-7 w-7 text-primary" />
          </div>
          <p className="mt-4 font-bold">Contact Form</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Detailed inquiries · Reply within 24h
          </p>
          <a
            href="#contact-form"
            className="mt-4 text-sm font-semibold text-primary hover:underline"
          >
            Jump to form ↓
          </a>
        </motion.div>
      </div>

      <div
        id="contact-form"
        className="grid gap-12 rounded-3xl border border-border bg-card/30 p-6 lg:grid-cols-2 lg:p-10"
      >
        <div>
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Send a Message
            </span>
          </div>
          <h2 className="text-2xl font-bold sm:text-3xl">Let&apos;s Get Started</h2>
          <p className="mt-2 text-muted-foreground">
            Tell us about your business goals. A strategist will reach out within
            24 hours.
          </p>
          <ContactForm />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Contact Details</h2>
          <p className="mt-2 text-muted-foreground">{SITE_CONFIG.name}</p>
          <div className="mt-8">
            <ContactInfo />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border p-8">
        <h3 className="text-center text-lg font-bold">Quick Answers</h3>
        <div className="mt-6">
          <FAQAccordion items={quickFaqs} />
        </div>
        <div className="mt-6 text-center">
          <Button asChild variant="outline">
            <Link href="/contact">View all FAQs on Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
