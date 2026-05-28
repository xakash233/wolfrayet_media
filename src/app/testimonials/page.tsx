import type { Metadata } from "next";
import { TestimonialsPageContent } from "@/components/sections/testimonials-page-content";
import { testimonials } from "@/data/testimonials";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Client Testimonials",
  description: `Read what clients say about ${SITE_CONFIG.name}. 5-star reviews, case study results, and success stories from CEOs and marketing leaders.`,
};

export default function TestimonialsPage() {
  return (
    <TestimonialsPageContent
      testimonials={testimonials}
      featured={testimonials[0]}
    />
  );
}
