"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ContactQuoteForm } from "@/components/sections/contact-quote-form";
import { useScrollReveal, ScrollReveal } from "@/components/shared/scroll-reveal";
import { SITE_CONFIG, WHATSAPP_URL } from "@/lib/constants";

function QuoteHeading() {
  const reveal = useScrollReveal({ index: 0, duration: 1.4, y: 48, blur: 0 });

  return (
    <motion.h1
      ref={reveal.ref as React.Ref<HTMLHeadingElement>}
      initial={reveal.initial}
      animate={reveal.animate}
      transition={reveal.transition}
      className="text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight"
    >
      <span className="block text-white">Ready to</span>
      <span className="mt-1 block text-white/35">get started?</span>
    </motion.h1>
  );
}

export function ContactQuoteSection() {
  return (
    <section className="relative min-h-[100svh] bg-black px-4 pb-20 pt-28 text-white sm:px-6 sm:pt-32 lg:px-8 lg:pb-28 lg:pt-36">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-28">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <QuoteHeading />
          <ScrollReveal
            index={2}
            duration={1.3}
            y={32}
            blur={0}
            className="mt-8 hidden max-w-md text-base leading-relaxed text-white/50 lg:block"
          >
            <p>
              Share your project details and the services you need. Our team at{" "}
              {SITE_CONFIG.name} will respond within 24 hours with a tailored
              quote.
            </p>
            <p className="mt-6">
              Prefer a faster reply?{" "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white underline-offset-4 hover:underline"
                data-cursor="pointer"
              >
                Message us on WhatsApp
              </a>
            </p>
          </ScrollReveal>
        </div>

        <div className="lg:pt-2">
          <ContactQuoteForm />
          <ScrollReveal
            index={7}
            duration={1.2}
            y={24}
            blur={0}
            className="mt-10 border-t border-white/10 pt-8 text-sm text-white/45 lg:hidden"
          >
            <p>
              Or reach us at{" "}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-white/70 hover:text-white"
              >
                {SITE_CONFIG.email}
              </a>
            </p>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-white/70 hover:text-white"
            >
              WhatsApp →
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
