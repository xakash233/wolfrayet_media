import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { VisionMissionSection } from "@/components/sections/vision-mission-section";
import { Timeline } from "@/components/sections/timeline";
import { CTASection } from "@/components/sections/cta-section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { timeline } from "@/data/stats";
import { SEO_META } from "@/lib/seo-keywords";

export const metadata: Metadata = {
  title: SEO_META.about.title,
  description: SEO_META.about.description,
};

export const revalidate = 60;

export default async function AboutPage() {
  return (
    <>
      <Hero
        title="About Wolfrayet Media"
        subtitle="."
        showCta={false}
        compact
        hideEyebrow
        heroImage="about"
      />

      <AnimatedSection>
        <VisionMissionSection />
      </AnimatedSection>

      <AnimatedSection className="bg-muted/20">
        <SectionHeading
          eyebrow="Our Story"
          title="Company Timeline"
          description="Founded in March 2026 — our first months delivering web development, SEO, and IT services."
        />
        <Timeline events={timeline} />
      </AnimatedSection>

      <AnimatedSection>
        <CTASection />
      </AnimatedSection>
    </>
  );
}
