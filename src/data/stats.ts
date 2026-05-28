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
    year: "2012",
    title: "Founded",
    description: "Wolfrayet Media launched with a mission to democratize digital marketing.",
  },
  {
    year: "2015",
    title: "First 50 Clients",
    description: "Reached milestone of 50 satisfied clients across India and abroad.",
  },
  {
    year: "2018",
    title: "Team Expansion",
    description: "Grew to 20+ specialists covering SEO, PPC, content, and design.",
  },
  {
    year: "2021",
    title: "Award Recognition",
    description: "Named Top Digital Agency by Marketing Excellence Awards.",
  },
  {
    year: "2024",
    title: "Global Reach",
    description: "Serving 120+ clients across 15 countries with remote-first operations.",
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
