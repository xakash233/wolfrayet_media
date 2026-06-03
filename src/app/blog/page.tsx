import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
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
      />

      <AnimatedSection>
        <BlogEnhanced posts={blogPosts} />
      </AnimatedSection>

      <AnimatedSection className="bg-muted/20">
        <NewsletterSignup />
      </AnimatedSection>
    </>
  );
}
