import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { AnimatedSectionImage } from "@/components/shared/animated-section-image";
import { SECTION_IMAGES } from "@/lib/images";
import { BlogEnhanced } from "@/components/sections/blog-enhanced";
import { NewsletterSignup } from "@/components/sections/newsletter-signup";
import { AnimatedSection } from "@/components/shared/animated-section";
import { blogPosts } from "@/data/blog";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Marketing Blog & Insights",
  description: `Expert marketing insights, SEO trends, and growth strategies from the ${SITE_CONFIG.name} team.`,
};

export default function BlogPage() {
  return (
    <>
      <Hero
        title="Marketing Insights"
        subtitle="Expert tips, industry trends, and actionable strategies to grow your business."
        showCta={false}
        compact
        hideEyebrow
        heroImage="blog"
      />

      <AnimatedSection>
        <div className="relative mb-10 aspect-[21/7] overflow-hidden rounded-2xl border border-border/50">
          <AnimatedSectionImage
            src={SECTION_IMAGES.newsletter}
            alt="Marketing insights and content strategy"
            fill
            className="h-full w-full"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/55 to-transparent" />
        </div>
        <BlogEnhanced posts={blogPosts} />
      </AnimatedSection>

      <AnimatedSection className="bg-muted/20">
        <NewsletterSignup />
      </AnimatedSection>
    </>
  );
}
