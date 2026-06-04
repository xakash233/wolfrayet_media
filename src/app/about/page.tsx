import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { VisionMissionSection } from "@/components/sections/vision-mission-section";
import { TeamCards } from "@/components/sections/team-cards";
import { Timeline } from "@/components/sections/timeline";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { CTASection } from "@/components/sections/cta-section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { teamMembers } from "@/data/team";
import { timeline, features } from "@/data/stats";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE_CONFIG.name} — our vision, mission, team, and commitment to digital marketing excellence.`,
};

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About Wolfrayet Media"
        subtitle="Delivering exceptional digital marketing and web development solutions."
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
        <SectionHeading
          align="center"
          eyebrow="Team"
          title="Meet the Experts"
          description="Passionate marketers, strategists, and creatives dedicated to your success."
        />
        <TeamCards members={teamMembers} />
      </AnimatedSection>

      <AnimatedSection className="bg-muted/20">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="The Wolfrayet Advantage"
          description="What sets us apart in a crowded digital marketing landscape."
        />
        <FeaturesGrid features={features} />
      </AnimatedSection>

      <AnimatedSection>
        <CTASection />
      </AnimatedSection>
    </>
  );
}
