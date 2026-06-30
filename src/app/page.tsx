import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { HorizontalShowcase } from "@/components/sections/horizontal-showcase";
import { SeoKeywordsSection } from "@/components/sections/seo-keywords-section";
import { AnimatedSectionImage } from "@/components/shared/animated-section-image";
import { BrandIntroSection } from "@/components/sections/brand-intro-section";
import { ServiceCard } from "@/components/sections/service-card";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { NewsletterSignup } from "@/components/sections/newsletter-signup";
import { CTASection } from "@/components/sections/cta-section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { BlogCard } from "@/components/sections/blog-card";
import { Button } from "@/components/ui/button";
import { getCmsSettings } from "@/lib/api/cms";
import { buildFeaturedServicesFromCms } from "@/lib/cms/services";
import { features } from "@/data/stats";
import { testimonials } from "@/data/testimonials";
import { faqItems } from "@/data/faq";
import { getBlogPosts } from "@/data/blog";
import { SECTION_IMAGES } from "@/lib/images";
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

export const revalidate = 60;

export default async function HomePage() {
  const settings = await getCmsSettings();
  const featuredServices = await buildFeaturedServicesFromCms();
  const blogPosts = await getBlogPosts();

  return (
    <>
      <Hero
        videoIntro
        videoConfig={settings.heroVideo}
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
          description="Turn your digital presence into a powerful growth engine with top digital marketing services that boost visibility, attract qualified leads, increase conversions, and drive sustainable business success."
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

      <HorizontalShowcase />

      <AnimatedSection compact>
        <SectionHeading
          compact
          eyebrow="Testimonials"
          title="Our Clients Love Us"
          description="Our clients love us for delivering powerful digital solutions, exceptional service, and measurable results that drive sustainable business growth and long-term success."
        />
        <TestimonialsCarousel testimonials={testimonials} showViewAll />
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
