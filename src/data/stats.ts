import type { Stat, Feature, TimelineEvent } from "@/types";

export const stats: Stat[] = [
  { label: "Projects Completed", value: 250, suffix: "+" },
  { label: "Happy Clients", value: 120, suffix: "+" },
  { label: "Years Experience", value: 12, suffix: "+" },
  { label: "Team Members", value: 35, suffix: "+" },
];

export const features: Feature[] = [
  {
    id: "1",
    title: "Data-Driven Strategy",
    description:
      "Every decision backed by analytics. We measure, optimize, and scale what works.",
    icon: "LineChart",
  },
  {
    id: "2",
    title: "Transparent Reporting",
    description:
      "Real-time dashboards and monthly reports. You always know exactly how campaigns perform.",
    icon: "Eye",
  },
  {
    id: "3",
    title: "Dedicated Team",
    description:
      "Your own account manager and specialists—not a rotating cast of freelancers.",
    icon: "Users",
  },
  {
    id: "4",
    title: "Proven Results",
    description:
      "Average 3x ROI across clients. We focus on metrics that matter to your bottom line.",
    icon: "Trophy",
  },
  {
    id: "5",
    title: "Web Development",
    description:
      "Next.js, React, and premium UI — fast, SEO-ready websites that convert visitors into customers.",
    icon: "Code2",
  },
  {
    id: "6",
    title: "Flexible Partnerships",
    description:
      "Month-to-month options. Scale up or down as your business needs change.",
    icon: "Handshake",
  },
];

export const timeline: TimelineEvent[] = [
  {
    id: "founded-2026",
    year: "Mar 2026",
    title: "Wolfrayet Media Founded",
    description:
      "Krishna Kumar launched Wolfrayet Media with a mission to deliver best-in-class digital marketing, web development, and IT services from India.",
  },
  {
    id: "web-apr-2026",
    year: "Apr 2026",
    title: "Web Development — Corporate Website",
    description:
      "Built and launched a fast, mobile-first business website with Next.js, contact flows, and analytics for a regional services company.",
  },
  {
    id: "seo-may-2026",
    year: "May 2026",
    title: "SEO — Local Search Growth",
    description:
      "On-page SEO, Google Business Profile optimization, and content strategy that improved local rankings and inbound leads within 90 days.",
  },
  {
    id: "it-jun-2026",
    year: "Jun 2026",
    title: "IT Services — Infrastructure & Support",
    description:
      "Deployed secure hosting, email, backups, and ongoing IT support so a client team could run campaigns and operations without downtime.",
  },
];

export const clientLogos: { id: string; name: string }[] = [
  { id: "1", name: "TechFlow" },
  { id: "2", name: "GrowthLabs" },
  { id: "3", name: "RetailMax" },
  { id: "4", name: "StartupHub" },
  { id: "5", name: "HealthPlus" },
  { id: "6", name: "FinancePro" },
  { id: "7", name: "CloudNine" },
  { id: "8", name: "DataSync" },
];
