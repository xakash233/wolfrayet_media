import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ContactEnhanced } from "@/components/sections/contact-enhanced";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${SITE_CONFIG.name} via WhatsApp, AI chat, or contact form. We respond within 24 hours.`,
};

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Contact Us"
        subtitle="Let's Get Started — WhatsApp for instant chat, AI for quick answers, or the form for detailed projects."
        showCta={false}
        compact
        hideEyebrow
      />

      <AnimatedSection>
        <ContactEnhanced />
      </AnimatedSection>
    </>
  );
}
