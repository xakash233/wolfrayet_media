import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { PortfolioEnhanced } from "@/components/sections/portfolio-enhanced";
import { CTASection } from "@/components/sections/cta-section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  portfolioProjects,
  getPortfolioCategories,
} from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { SEO_META } from "@/lib/seo-keywords";

export const metadata: Metadata = {
  title: SEO_META.portfolio.title,
  description: SEO_META.portfolio.description,
};

export default function PortfolioPage() {
  const categories = getPortfolioCategories();

  return (
    <>
      <Hero
        title="Our Work"
        subtitle="Real results for real brands. Explore case studies with metrics that prove our impact."
        showCta
        compact
        hideEyebrow
        heroImage="portfolio"
      />

      <AnimatedSection>
        <SectionHeading
          eyebrow="Case Studies"
          title="Projects That Delivered"
          description="Filter by category. Click any project for full results, client details, and outcomes."
        />
        <PortfolioEnhanced
          projects={portfolioProjects}
          categories={categories}
        />
      </AnimatedSection>

      <AnimatedSection className="bg-muted/20">
        <div className="text-center">
          <p className="text-muted-foreground">
            Loved what you see? Read what clients say about working with us.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/testimonials">View Client Testimonials</Link>
          </Button>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <CTASection
          title="Want Results Like These?"
          description="Let's create your next success story together."
        />
      </AnimatedSection>
    </>
  );
}
