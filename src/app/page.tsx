import { Hero } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { StatsCounter } from "@/components/sections/stats-counter";
import { ServiceCard } from "@/components/sections/service-card";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { PricingCards } from "@/components/sections/pricing-cards";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { NewsletterSignup } from "@/components/sections/newsletter-signup";
import { CTASection } from "@/components/sections/cta-section";
import { LogoSlider } from "@/components/sections/logo-slider";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { services } from "@/data/services";
import { stats, features, clientLogos } from "@/data/stats";
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
      <Hero />

      <AnimatedSection className="bg-muted/20">
        <AboutPreview />
      </AnimatedSection>

      <AnimatedSection>
        <StatsCounter stats={stats} />
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeading
          eyebrow="Services"
          title="What We Do Best"
          description="Digital marketing and custom web development — built to accelerate your growth."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-muted/20">
        <SectionHeading
          eyebrow="Why Us"
          title="Built for Results"
          description="We combine strategy, creativity, and technology to deliver measurable outcomes."
        />
        <FeaturesGrid features={features} />
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeading
          eyebrow="Testimonials"
          title="Our Clients Love Us"
          description="Don't just take our word for it—hear from brands we've helped grow."
        />
        <TestimonialsCarousel testimonials={testimonials} showViewAll />
      </AnimatedSection>

      <AnimatedSection className="border-y border-border/50">
        <p className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted by industry leaders
        </p>
        <LogoSlider logos={clientLogos} />
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeading
          eyebrow="Pricing"
          title="Plans That Scale With You"
          description="Transparent pricing with no hidden fees. Choose the plan that fits your goals."
        />
        <PricingCards plans={pricingPlans} />
      </AnimatedSection>

      <AnimatedSection className="bg-muted/20">
        <SectionHeading
          eyebrow="Blog"
          title="Latest Insights"
          description="Stay informed with our marketing tips, trends, and case studies."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about working with Wolfrayet Media."
        />
        <FAQAccordion items={faqItems} />
      </AnimatedSection>

      <AnimatedSection>
        <NewsletterSignup />
      </AnimatedSection>

      <AnimatedSection>
        <CTASection />
      </AnimatedSection>
    </>
  );
}
