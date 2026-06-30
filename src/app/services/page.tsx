import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ServicesBentoGrid } from "@/components/sections/services-bento-grid";
import { ServiceCatalog } from "@/components/sections/service-catalog";
import { ProcessWorkflow } from "@/components/sections/process-workflow";
import { CTASection } from "@/components/sections/cta-section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { getCmsServices } from "@/lib/api/cms";
import { SEO_META } from "@/lib/seo-keywords";
import { Check, X } from "lucide-react";
import type { ServiceCategory } from "@/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: SEO_META.services.title,
  description: SEO_META.services.description,
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

export default async function ServicesPage() {
  const { digitalMarketingCategories, itServicesCategory } =
    await getCmsServices();

  const itCategory: ServiceCategory = {
    number: 0,
    id: itServicesCategory.id,
    title: itServicesCategory.title,
    description: itServicesCategory.description,
    icon: "Server",
    items: [...itServicesCategory.items],
  };

  const allCategories = [...digitalMarketingCategories, itCategory];

  return (
    <>
      <Hero
        title="Our Services"
        subtitle="Full digital marketing services — SEO, PPC, social, web, branding, and growth."
        showCta
        compact
        hideEyebrow
        heroImage="services"
      />

      <div className="py-12 sm:py-16 lg:py-20">
        <ServicesBentoGrid
          categories={digitalMarketingCategories}
          itCategory={itCategory}
        />
      </div>

      <AnimatedSection className="bg-muted/20">
        <SectionHeading
          eyebrow="Full Catalog"
          title="Every Service, Listed"
          description="Detailed breakdown of everything included in each category."
        />
        <ServiceCatalog categories={allCategories} />
      </AnimatedSection>

      <AnimatedSection className="bg-muted/20">
        <SectionHeading
          eyebrow="Process"
          title="How We Work"
          description="A proven four-step framework that delivers consistent results."
        />
        <ProcessWorkflow />
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
