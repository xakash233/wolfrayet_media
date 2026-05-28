import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ServicesEnhanced } from "@/components/sections/services-enhanced";
import { ProcessWorkflow } from "@/components/sections/process-workflow";
import { CTASection } from "@/components/sections/cta-section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { services } from "@/data/services";
import { SITE_CONFIG } from "@/lib/constants";
import { Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing Services",
  description: `Explore ${SITE_CONFIG.name} services — SEO, PPC, social media, web development, branding, analytics, and more.`,
};

const comparison = [
  { feature: "Dedicated account manager", us: true, typical: false },
  { feature: "Real-time analytics dashboard", us: true, typical: false },
  { feature: "AI-powered strategy insights", us: true, typical: false },
  { feature: "Monthly strategy sessions", us: true, typical: true },
  { feature: "Custom reporting", us: true, typical: false },
  { feature: "Multi-channel campaigns", us: true, typical: true },
  { feature: "Transparent pricing", us: true, typical: false },
  { feature: "WhatsApp priority support", us: true, typical: false },
  { feature: "Custom web development (Next.js / React)", us: true, typical: false },
];

const itServices = [
  "Mentor infrastructure engineers and administrators",
  "Plan and design scalable IT infrastructure (servers, storage, networking)",
  "Define cloud/on-premises hybrid strategies",
  "Ensure disaster recovery and business continuity planning",
  "Cloud migration (AWS, Azure, GCP)",
  "Optimize cloud resource usage and costs",
  "Backup and storage management",
  "Design and maintain LAN/WAN infrastructure",
  "Oversee firewalls, VPNs, and load balancers",
];

const fullServiceCatalog = [
  "UI UX Design",
  "Search Engine Optimization",
  "Social Media Marketing",
  "Email Marketing and Automation",
  "E-commerce Marketing",
  "Content Writing",
  "Social Media Marketing",
  "Website Development",
  "PPC",
  "Google Ads",
  "Meta Ads",
  "LinkedIn Ads",
  "Twitter Ads",
  "Graphic Design and Animation",
  "Penalty Recovery Services",
  "ASO Service",
  "Local SEO",
  "Influencer Marketing",
  "Video Marketing",
  "Mobile Marketing (All Types Included)",
  "Video Editing",
];

export default function ServicesPage() {
  return (
    <>
      <Hero
        title="Our Services"
        subtitle="Digital marketing and custom web development — strategy, execution, and sites that convert."
        showCta
        compact
      />

      <AnimatedSection>
        <SectionHeading
          eyebrow="What We Offer"
          title="Comprehensive Marketing Services"
          description="Explore our full service lineup. Use tabs below for detailed breakdowns."
        />
        <ServicesEnhanced services={services} />
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
          title="Infrastructure, Cloud, and Network Leadership"
          description="End-to-end IT consulting and operations support for scalable, resilient systems."
        />
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          {itServices.map((item) => (
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
          eyebrow="Complete Catalog"
          title="All Services"
          description="Our full range of digital marketing, creative, and growth services."
        />
        <ol className="mx-auto grid max-w-5xl list-decimal gap-x-8 gap-y-3 pl-6 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
          {fullServiceCatalog.map((service, index) => (
            <li key={`${service}-${index}`}>{service}</li>
          ))}
        </ol>
      </AnimatedSection>

      <AnimatedSection>
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
