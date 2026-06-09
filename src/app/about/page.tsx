import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { VisionMissionSection } from "@/components/sections/vision-mission-section";
import { TeamCards } from "@/components/sections/team-cards";
import { Timeline } from "@/components/sections/timeline";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { CTASection } from "@/components/sections/cta-section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { getCmsTeam } from "@/lib/cms/data";
import { timeline, features } from "@/data/stats";
import { SEO_META } from "@/lib/seo-keywords";

export const metadata: Metadata = {
  title: SEO_META.about.title,
  description: SEO_META.about.description,
};

export const revalidate = 60;

export default async function AboutPage() {
  const teamMembers = await getCmsTeam();
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
          description="Wolfrayet Media delivers data-driven digital marketing and web solutions, combining innovation, strategy, and measurable growth to help brands outperform competitors."
        />
        <FeaturesGrid features={features} />
      </AnimatedSection>

      <AnimatedSection>
        <CTASection />
      </AnimatedSection>
    </>
  );
}
