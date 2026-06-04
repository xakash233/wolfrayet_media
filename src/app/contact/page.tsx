import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ContactEnhanced } from "@/components/sections/contact-enhanced";
import { AnimatedSectionImage } from "@/components/shared/animated-section-image";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SECTION_IMAGES } from "@/lib/images";
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
        heroImage="contact"
      />

      <AnimatedSection>
        <div className="relative mb-10 aspect-[21/7] overflow-hidden rounded-2xl border border-border/50">
          <AnimatedSectionImage
            src={SECTION_IMAGES.cta}
            alt="Contact our digital marketing team"
            fill
            className="h-full w-full"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        </div>
        <ContactEnhanced />
      </AnimatedSection>
    </>
  );
}
