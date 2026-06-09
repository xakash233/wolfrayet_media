import Link from "next/link";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { SeoKeywordTags } from "@/components/sections/seo-keyword-tags";
import { PRIMARY_SEO_KEYWORDS } from "@/lib/seo-keywords";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function SeoKeywordsSection() {
  return (
    <AnimatedSection compact className="bg-muted/20">
      <SectionHeading
        compact
        align="center"
        eyebrow="Why Wolfrayet Media"
        title="Why Wolfrayet Media Is Among the Best Digital Marketing Agencies"
        description="Wolfrayet Media is a leading digital marketing agency dedicated to transforming brands through innovative strategies, data-driven marketing, and creative excellence. We help businesses increase online visibility, generate high-quality leads, and achieve measurable growth through expert SEO, social media marketing, performance advertising, branding, and web development solutions. Our commitment to delivering real results, maximizing ROI, and creating meaningful customer engagement makes us a trusted partner for businesses seeking long-term digital success."
      />
      <ScrollReveal
        index={1}
        duration={1.5}
        className="mx-auto mt-6 max-w-4xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base"
      >
        <p>
          Explore our{" "}
          <Link href="/services" className="font-medium text-primary hover:underline">
            top digital marketing services
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="font-medium text-primary hover:underline">
            get in touch
          </Link>{" "}
          to start growing your brand today.
        </p>
      </ScrollReveal>
      <SeoKeywordTags keywords={PRIMARY_SEO_KEYWORDS} />
    </AnimatedSection>
  );
}
