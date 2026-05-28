import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
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
  description: `Learn about ${SITE_CONFIG.name} — our mission, team, and commitment to driving digital marketing excellence.`,
};

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About Wolfrayet Media"
        subtitle="Delivering exceptional digital marketing solutions since 2012."
        showCta={false}
        compact
      />

      <AnimatedSection>
        <AboutPreview />
      </AnimatedSection>

      <AnimatedSection className="bg-muted/20">
        <SectionHeading
          eyebrow="Our Story"
          title="Company Timeline"
          description="A decade-plus journey of growth, innovation, and client success."
        />
        <Timeline events={timeline} />
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeading
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
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold text-primary">Our Vision</h3>
            <p className="mt-4 text-muted-foreground">
              To be the most trusted digital marketing partner for ambitious
              brands worldwide—known for innovation, integrity, and
              transformative results.
            </p>
          </div>
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold text-primary">Our Mission</h3>
            <p className="mt-4 text-muted-foreground">
              To empower businesses of all sizes with data-driven marketing
              strategies that deliver measurable growth, transparent reporting,
              and lasting partnerships.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <CTASection />
      </AnimatedSection>
    </>
  );
}
