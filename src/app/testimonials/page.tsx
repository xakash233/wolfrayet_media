import type { Metadata } from "next";
import { TestimonialsPageContent } from "@/components/sections/testimonials-page-content";
import { testimonials } from "@/data/testimonials";
import { SEO_META } from "@/lib/seo-keywords";

export const metadata: Metadata = {
  title: SEO_META.testimonials.title,
  description: SEO_META.testimonials.description,
};

export default function TestimonialsPage() {
  return (
    <TestimonialsPageContent
      testimonials={testimonials}
      featured={testimonials[0]}
    />
  );
}
