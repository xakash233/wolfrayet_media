import type { PricingPlan } from "@/types";

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 999,
    period: "month",
    description: "Perfect for small businesses starting their digital journey.",
    features: [
      "SEO audit & recommendations",
      "Social media management (2 platforms)",
      "Monthly performance report",
      "Email support",
      "5 blog posts/month",
    ],
    cta: "Get Started",
  },
  {
    id: "growth",
    name: "Growth",
    price: 2499,
    period: "month",
    description: "Ideal for growing brands ready to scale their marketing.",
    features: [
      "Everything in Starter",
      "PPC campaign management",
      "Content strategy & creation",
      "Weekly strategy calls",
      "Advanced analytics dashboard",
      "Landing page design & development",
      "Priority support",
    ],
    highlighted: true,
    cta: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 4999,
    period: "month",
    description: "Full-service solution for established brands and enterprises.",
    features: [
      "Everything in Growth",
      "Custom web development (Next.js / React)",
      "Dedicated account manager",
      "Custom integrations",
      "Brand strategy workshops",
      "24/7 priority support",
      "Unlimited revisions",
    ],
    cta: "Contact Sales",
  },
];
