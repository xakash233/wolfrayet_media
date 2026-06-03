import type { Metadata } from "next";
import { BrandIntroSection } from "@/components/sections/brand-intro-section";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Our Digital Solutions",
  description: SITE_CONFIG.heroDescription,
};

export default function AboutDetailsPage() {
  return <BrandIntroSection fullScreen />;
}
