import type { CustomAddOn, PricingPlan } from "@/types";

/** Set to true to show pricing on /services#pricing (and homepage if re-enabled). */
export const PRICING_SECTION_ENABLED = false;

export const pricingNote =
  "India-based, Tamil Nadu–focused pricing in INR. All prices per month. GST extra.";

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Package",
    priceDisplay: "₹7,500 – ₹12,000",
    period: "month",
    description: "Ideal for businesses taking their first step online.",
    bestFor: "Small businesses, local shops, freelancers, and startups",
    summary: "Ideal for businesses taking their first step online.",
    features: [
      "Social Media Management (1 platform – Facebook/Instagram)",
      "8–10 posts per month",
      "Basic On-Page SEO (up to 5 pages)",
      "Keyword Research (10 keywords)",
      "Google Business Profile Optimization",
      "Basic Ads Setup (Facebook/Instagram or Google Ads)",
      "Monthly Performance Report",
      "Email & WhatsApp Support",
    ],
    cta: "Get Started",
  },
  {
    id: "growth",
    name: "Growth Package",
    priceDisplay: "₹18,000 – ₹30,000",
    period: "month",
    description: "Ideal for growing businesses that want more leads.",
    bestFor: "Growing businesses that want more leads",
    summary: "Ideal for growing businesses that want more leads.",
    features: [
      "Social Media Management (2–3 platforms)",
      "15–20 posts per month + reels (2/month)",
      "Complete SEO (on-page, off-page, technical)",
      "Keyword Research (30–40 keywords)",
      "Backlink Building (5–8 monthly)",
      "Google + Meta Ads Management",
      "Blog Writing (2/month)",
      "Email Marketing (2 campaigns/month)",
      "Conversion Tracking Setup",
      "Monthly Strategy Meeting",
    ],
    highlighted: true,
    badge: "Most Popular",
    cta: "Choose Growth",
  },
  {
    id: "standard",
    name: "Standard Package",
    priceDisplay: "₹30,000 – ₹42,000",
    period: "month",
    description: "Best for businesses that want consistent online visibility & leads.",
    bestFor: "Businesses ready for steady visibility and lead flow",
    summary: "Best for businesses that want consistent online visibility & leads.",
    features: [
      "Everything in Growth Package",
      "Blog Writing (2/month)",
      "Email Marketing (2 campaigns/month)",
      "Conversion Tracking Setup",
      "Monthly Strategy Meeting",
      "Enhanced reporting & campaign tuning",
    ],
    cta: "Get a Quote",
  },
  {
    id: "premium",
    name: "Premium Package",
    priceDisplay: "₹45,000 – ₹75,000",
    period: "month",
    description: "Perfect for brands that want aggressive digital growth.",
    bestFor: "Established companies aiming for statewide or nationwide growth",
    summary: "Perfect for brands that want aggressive digital growth.",
    features: [
      "Social Media Management (all major platforms)",
      "25–30 premium posts/month + 4–6 reels",
      "Advanced SEO (local, technical, e-commerce)",
      "Keyword Research (100+ keywords)",
      "High-quality Backlinks (10–20/month)",
      "Full Ads Management (Google, Facebook, Instagram, LinkedIn, YouTube)",
      "Conversion Rate Optimization (CRO)",
      "Blog Writing (4/month)",
      "Email Automation & Drip Campaigns",
      "Influencer Marketing Support (Tamil Nadu creators)",
      "Dedicated Account Manager",
      "Weekly Reports + Monthly Strategy Call",
    ],
    cta: "Go Premium",
  },
  {
    id: "enterprise",
    name: "Enterprise / Custom Package",
    priceDisplay: "₹1,00,000+",
    period: "month",
    description: "Built for brands with complex, high-volume marketing requirements.",
    bestFor: "Big brands, franchises, companies with large-scale marketing needs",
    summary: "Built for brands with complex, high-volume marketing requirements.",
    features: [
      "Custom multi-channel strategy & execution",
      "Dedicated account & creative team",
      "Enterprise SEO, PPC, and social at scale",
      "Advanced analytics & executive reporting",
      "Priority support & SLA-backed response times",
      "Quarterly business reviews & roadmap planning",
    ],
    cta: "Contact Sales",
  },
];

export const customAddOns: CustomAddOn = {
  items: [
    "Full Website Development or Redesign",
    "E-commerce Setup (Shopify/WooCommerce)",
    "Marketing Automation Systems",
    "CRM Integration (HubSpot, Zoho, Salesforce)",
    "Advanced Video Production",
    "Large Budget Ad Campaigns",
    "24/7 Support",
    "Dedicated Creative & Strategy Team",
  ],
  summary:
    "Built for brands with complex, high-volume marketing requirements.",
};
