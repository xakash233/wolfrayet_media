import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { AnimatedSectionImage } from "@/components/shared/animated-section-image";
import { SECTION_IMAGES } from "@/lib/images";
import { ServicesEnhanced } from "@/components/sections/services-enhanced";
import { ServiceCatalog } from "@/components/sections/service-catalog";
import { PricingPackages } from "@/components/sections/pricing-packages";
import { ProcessWorkflow } from "@/components/sections/process-workflow";
import { CTASection } from "@/components/sections/cta-section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { services } from "@/data/services";
import {
  digitalMarketingCategories,
  itServicesCategory,
} from "@/data/service-categories";
import { customAddOns, pricingNote, pricingPlans } from "@/data/pricing";
import { SITE_CONFIG } from "@/lib/constants";
import { Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing Services",
  description: `Explore ${SITE_CONFIG.name} full digital marketing services — SEO, PPC, social media, web development, branding, analytics, pricing packages (INR), and more.`,
};

const comparison = [
  { feature: "Dedicated account manager", us: true, typical: false },
  { feature: "Real-time analytics dashboard", us: true, typical: false },
  { feature: "AI-powered strategy insights", us: true, typical: false },
  { feature: "Monthly strategy sessions", us: true, typical: true },
  { feature: "Custom reporting", us: true, typical: false },
  { feature: "Multi-channel campaigns", us: true, typical: true },
  { feature: "Transparent INR pricing", us: true, typical: false },
  { feature: "WhatsApp priority support", us: true, typical: false },
  { feature: "Custom web development (Next.js / React)", us: true, typical: false },
];

export default function ServicesPage() {
  return (
    <>
      <Hero
        title="Our Services"
        subtitle="Full digital marketing services and India-based pricing packages — SEO, PPC, social, web, branding, and growth."
        showCta
        compact
        hideEyebrow
        heroImage="services"
      />

      <AnimatedSection>
        <div className="relative mb-10 aspect-[21/7] overflow-hidden rounded-2xl border border-border/50">
          <AnimatedSectionImage
            src={SECTION_IMAGES.features}
            alt="Digital marketing services and analytics"
            fill
            className="h-full w-full"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/50 to-transparent" />
        </div>
        <SectionHeading
          eyebrow="What We Offer"
          title="Comprehensive Marketing Services"
          description="Browse service cards and tabs, or jump to the full numbered catalog below."
        />
        <ServicesEnhanced services={services} />
      </AnimatedSection>

      <AnimatedSection className="bg-muted/20">
        <SectionHeading
          eyebrow="Full Catalog"
          title="Full Digital Marketing Services List"
          description="All services organized by topic — exactly as in our service menu."
        />
        <ServiceCatalog categories={digitalMarketingCategories} />
      </AnimatedSection>

      <AnimatedSection id="pricing">
        <SectionHeading
          eyebrow="Pricing"
          title="Digital Marketing Pricing Packages"
          description="India-based, Tamil Nadu–focused packages in INR covering our full service range."
        />
        <PricingPackages
          plans={pricingPlans}
          note={pricingNote}
          customAddOns={customAddOns}
        />
      </AnimatedSection>

      <AnimatedSection className="bg-muted/20">
        <SectionHeading
          eyebrow="Process"
          title="How We Work"
          description="A proven four-step framework that delivers consistent results."
        />
        <ProcessWorkflow />
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeading
          eyebrow="IT Services"
          title={itServicesCategory.title}
          description={itServicesCategory.description}
        />
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          {itServicesCategory.items.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-border bg-card/40 p-4 text-sm text-muted-foreground"
            >
              <span className="mr-2 text-primary">•</span>
              {item}
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-muted/20">
        <SectionHeading
          eyebrow="Compare"
          title="Wolfrayet vs Typical Agencies"
          description="See why leading brands choose us over the competition."
        />
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border shadow-xl">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="p-4 font-semibold">Feature</th>
                <th className="p-4 text-center font-semibold text-primary">
                  Wolfrayet
                </th>
                <th className="p-4 text-center font-semibold text-muted-foreground">
                  Typical Agency
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr
                  key={row.feature}
                  className="border-b border-border/50 transition-colors hover:bg-muted/20"
                >
                  <td className="p-4">{row.feature}</td>
                  <td className="p-4 text-center">
                    {row.us ? (
                      <Check className="mx-auto h-5 w-5 text-primary" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-muted-foreground" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {row.typical ? (
                      <Check className="mx-auto h-5 w-5 text-muted-foreground" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-muted-foreground/50" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <CTASection />
      </AnimatedSection>
    </>
  );
}
