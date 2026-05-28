import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "seo",
    title: "SEO Optimization",
    description:
      "Dominate search rankings with data-driven SEO strategies that drive organic traffic and qualified leads.",
    icon: "Search",
    features: ["Keyword research", "Technical audits", "Link building", "Local SEO"],
    href: "/services#seo",
  },
  {
    id: "ppc",
    title: "PPC Advertising",
    description:
      "Maximize ROI with precision-targeted paid campaigns across Google, Meta, and emerging platforms.",
    icon: "Target",
    features: ["Google Ads", "Meta Ads", "Retargeting", "Conversion tracking"],
    href: "/services#ppc",
  },
  {
    id: "social",
    title: "Social Media Marketing",
    description:
      "Build engaged communities and brand loyalty through strategic content and influencer partnerships.",
    icon: "Share2",
    features: ["Content strategy", "Community management", "Influencer outreach", "Analytics"],
    href: "/services#social",
  },
  {
    id: "content",
    title: "Content Marketing",
    description:
      "Tell your brand story with compelling content that educates, entertains, and converts.",
    icon: "PenLine",
    features: ["Blog writing", "Video scripts", "Email campaigns", "Brand voice"],
    href: "/services#content",
  },
  {
    id: "branding",
    title: "Brand Strategy",
    description:
      "Craft distinctive brand identities that resonate with your audience and stand out in crowded markets.",
    icon: "Palette",
    features: ["Brand identity", "Visual design", "Messaging", "Guidelines"],
    href: "/services#branding",
  },
  {
    id: "analytics",
    title: "Analytics & Insights",
    description:
      "Turn data into actionable insights with advanced tracking, dashboards, and performance reporting.",
    icon: "BarChart3",
    features: ["GA4 setup", "Custom dashboards", "Attribution", "A/B testing"],
    href: "/services#analytics",
  },
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Fast, modern websites and web apps built with Next.js, React, and premium UX — optimized for speed, SEO, and conversions.",
    icon: "Code2",
    features: [
      "Custom websites & landing pages",
      "Next.js / React applications",
      "E-commerce & CMS integration",
      "Performance & SEO-ready code",
    ],
    href: "/services#web-development",
  },
];
