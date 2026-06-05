import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { SeoKeywordsSection } from "@/components/sections/seo-keywords-section";
import { SEO_META } from "@/lib/seo-keywords";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: SEO_META.home.title,
  description: SEO_META.home.description,
  openGraph: {
    title: `${SEO_META.home.title} | ${SITE_CONFIG.name}`,
    description: SEO_META.home.description,
  },
};
import { AnimatedSectionImage } from "@/components/shared/animated-section-image";
import { SECTION_IMAGES } from "@/lib/images";
import { BrandIntroSection } from "@/components/sections/brand-intro-section";
import { ServiceCard } from "@/components/sections/service-card";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { PricingCards } from "@/components/sections/pricing-cards";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { NewsletterSignup } from "@/components/sections/newsletter-signup";
import { CTASection } from "@/components/sections/cta-section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { featuredServices } from "@/data/services";
import { features } from "@/data/stats";
import { testimonials } from "@/data/testimonials";
import { pricingPlans } from "@/data/pricing";
import { faqItems } from "@/data/faq";
import { blogPosts } from "@/data/blog";
import { BlogCard } from "@/components/sections/blog-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <Hero
        videoIntro
        showCta={false}
        showViewMore
        viewMoreHref="/#intro"
      />

      <BrandIntroSection />

      <AnimatedSection compact>
        <SectionHeading
          compact
          eyebrow="Services"
          title="Top Digital Marketing Services"
          description="Best digital marketing services from a top PPC agency and best local SEO agency — SEO, paid search, social media, content marketing, ecommerce, and web development."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection compact className="bg-muted/20">
        <div className="relative mb-8 aspect-[21/8] overflow-hidden rounded-2xl border border-border/50 sm:mb-10">
          <AnimatedSectionImage
            src={SECTION_IMAGES.features}
            alt="Strategic business growth and analytics"
            fill
            className="h-full w-full"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        </div>
        <SectionHeading
          compact
          eyebrow="Why Us"
          title="Results You Can Measure, Success You Can Trust"
          description="Accelerate Your Business Growth with Strategic Digital Marketing, Creative Brand Solutions, and Results-Driven Technology."
        />
        <FeaturesGrid features={features} />
      </AnimatedSection>

      <AnimatedSection compact>
        <SectionHeading
          compact
          eyebrow="Testimonials"
          title="Our Clients Love Us"
          description="Don't just take our word for it—hear from brands we've helped grow."
        />
        <TestimonialsCarousel testimonials={testimonials} showViewAll />
      </AnimatedSection>

      <AnimatedSection compact>
        <SectionHeading
          compact
          eyebrow="Pricing"
          title="Plans That Scale With You"
          description="India-based digital marketing packages in INR. GST extra. View all plans on our services page."
        />
        <PricingCards plans={pricingPlans} compact />
        <div className="mt-6 text-center">
          <Button asChild variant="outline">
            <Link href="/services#pricing">View All Pricing Packages</Link>
          </Button>
        </div>
      </AnimatedSection>

      <AnimatedSection compact className="bg-muted/20">
        <SectionHeading
          compact
          eyebrow="Blog"
          title="Latest Insights"
          description="Stay informed with our marketing tips, trends, and case studies."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>
      </AnimatedSection>

      <SeoKeywordsSection />

      <AnimatedSection compact>
        <SectionHeading
          compact
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about working with Wolfrayet Media."
        />
        <FAQAccordion items={faqItems} />
      </AnimatedSection>

      <AnimatedSection compact className="space-y-5">
        <NewsletterSignup />
        <CTASection />
      </AnimatedSection>
    </>
  );
}
