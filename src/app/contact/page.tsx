import type { Metadata } from "next";
import { ContactQuoteSection } from "@/components/sections/contact-quote-section";
import { SEO_META } from "@/lib/seo-keywords";

export const metadata: Metadata = {
  title: SEO_META.contact.title,
  description: SEO_META.contact.description,
};

export default function ContactPage() {
  return <ContactQuoteSection />;
}
