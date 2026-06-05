import Link from "next/link";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { PRIMARY_SEO_KEYWORDS } from "@/lib/seo-keywords";

export function SeoKeywordsSection() {
  return (
    <AnimatedSection compact className="bg-muted/20">
      <SectionHeading
        compact
        align="center"
        eyebrow="Why Wolfrayet Media"
        title="Among the Best Digital Marketing Agencies & Top Marketing Companies"
        description="Businesses searching for a best digital marketing agency near me, top PPC agencies, or best local SEO agency choose Wolfrayet Media for measurable growth across India and worldwide."
      />
      <div className="mx-auto max-w-4xl space-y-6 text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
        <p>
          As one of the{" "}
          <strong className="font-semibold text-foreground">
            best digital marketing companies
          </strong>{" "}
          and{" "}
          <strong className="font-semibold text-foreground">
            top digital marketing firms
          </strong>
          , we combine SEO, paid search, social media, and web development. Whether
          you need a{" "}
          <strong className="font-semibold text-foreground">
            best PPC agency
          </strong>
          ,{" "}
          <strong className="font-semibold text-foreground">
            best content marketing agencies
          </strong>
          -level strategy, or{" "}
          <strong className="font-semibold text-foreground">
            digital performance marketing agency
          </strong>{" "}
          support, our team delivers end-to-end{" "}
          <strong className="font-semibold text-foreground">
            best digital marketing services
          </strong>{" "}
          tailored to your goals.
        </p>
        <p>
          From{" "}
          <strong className="font-semibold text-foreground">
            best ecommerce marketing agency
          </strong>{" "}
          campaigns and{" "}
          <strong className="font-semibold text-foreground">
            top social media marketing companies
          </strong>{" "}
          workflows to{" "}
          <strong className="font-semibold text-foreground">
            best marketing agencies for startups
          </strong>{" "}
          and real estate brands, we help you compete with the{" "}
          <strong className="font-semibold text-foreground">
            biggest digital marketing companies
          </strong>{" "}
          — without enterprise overhead. Explore our{" "}
          <Link href="/services" className="font-medium text-primary hover:underline">
            top digital marketing services
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="font-medium text-primary hover:underline">
            get online marketing services near me
          </Link>
          .
        </p>
      </div>
      <ul
        className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-2"
        aria-label="Core digital marketing specialties"
      >
        {PRIMARY_SEO_KEYWORDS.map((keyword) => (
          <li
            key={keyword}
            className="rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-xs text-muted-foreground"
          >
            {keyword}
          </li>
        ))}
      </ul>
    </AnimatedSection>
  );
}
