import { SITE_CONFIG } from "@/lib/constants";

const GREETINGS = ["hi", "hello", "hey", "good morning", "good afternoon"];

const KEYWORD_RESPONSES: { keywords: string[]; response: string }[] = [
  {
    keywords: ["price", "pricing", "cost", "package", "plan"],
    response: `Our plans start at $999/month (Starter), $2,499/month (Growth — most popular), and $4,999/month (Enterprise). Every plan includes strategy, reporting, and dedicated support. Visit /contact or WhatsApp us for a custom quote tailored to your goals.`,
  },
  {
    keywords: ["seo", "search", "organic", "ranking"],
    response: `We offer full SEO services: technical audits, keyword research, content strategy, link building, and local SEO. Clients typically see meaningful organic growth within 3–6 months. Want a free SEO audit? Message us on WhatsApp or fill the contact form.`,
  },
  {
    keywords: ["ppc", "ads", "google ads", "paid", "roas"],
    response: `Our PPC team manages Google Ads, Meta Ads, and retargeting with conversion tracking and weekly optimization. Average client ROAS is 4x+. We can review your current ad spend — share your industry and monthly budget via /contact.`,
  },
  {
    keywords: ["social", "instagram", "facebook", "linkedin"],
    response: `We handle social strategy, content calendars, community management, and influencer partnerships across all major platforms. Engagement-focused campaigns are included in Growth and Enterprise plans.`,
  },
  {
    keywords: [
      "web",
      "website",
      "development",
      "next.js",
      "nextjs",
      "react",
      "landing page",
      "web app",
      "e-commerce site",
    ],
    response: `We build fast, modern websites and web apps with Next.js, React, and TypeScript — mobile-responsive, SEO-ready, and conversion-focused. Services include landing pages, business sites, e-commerce, and CMS integration. See /services#web-development or /portfolio for examples.`,
  },
  {
    keywords: [
      "it",
      "infrastructure",
      "server",
      "storage",
      "network",
      "lan",
      "wan",
      "vpn",
      "firewall",
      "cloud migration",
      "aws",
      "azure",
      "gcp",
      "disaster recovery",
      "business continuity",
      "backup",
      "load balancer",
    ],
    response: `Yes — we provide IT Services including infrastructure planning, hybrid cloud strategy, AWS/Azure/GCP migration, backup and storage management, LAN/WAN design, and security/network operations (firewalls, VPNs, load balancers). Check the IT Services section on /services or contact us for a tailored infrastructure roadmap.`,
  },
  {
    keywords: ["portfolio", "case study", "work", "example"],
    response: `Browse our case studies at /portfolio — including 240% SEO growth for GrowthLabs, 180% e-commerce revenue for RetailMax, and brand refreshes for TechFlow. Real metrics, real clients.`,
  },
  {
    keywords: ["contact", "call", "meet", "talk", "email", "phone"],
    response: `Reach us at ${SITE_CONFIG.email}, ${SITE_CONFIG.phone}, or WhatsApp. Office hours: ${SITE_CONFIG.hours}. Address: ${SITE_CONFIG.address}. Use the Contact page (/contact) or tap the green WhatsApp button — we reply within 24 hours.`,
  },
  {
    keywords: ["testimonial", "review", "client", "feedback"],
    response: `Our clients rate us 5/5 consistently. Read full stories at /testimonials — CEOs and CMOs from TechFlow, GrowthLabs, StartupHub, and more share their results.`,
  },
  {
    keywords: ["blog", "article", "insight", "tips"],
    response: `Our blog at /blog covers SEO trends, PPC optimization, content ROI, and brand storytelling — written by our strategists. Subscribe on any page for weekly insights.`,
  },
  {
    keywords: ["time", "how long", "timeline", "when"],
    response: `PPC can show results in days; SEO typically 3–6 months for strong gains; branding projects 4–8 weeks. Onboarding includes a 2-week audit and strategy roadmap. We'll give you a clear timeline after our discovery call.`,
  },
];

const DEFAULT_RESPONSE = `I'm the ${SITE_CONFIG.name} AI assistant. I can help with services, pricing, SEO, PPC, social media, web development, portfolio case studies, and how to get in touch. What would you like to know? You can also chat on WhatsApp or visit /contact for a human strategist.`;

export function getAIResponse(message: string): string {
  const lower = message.toLowerCase().trim();

  if (GREETINGS.some((g) => lower.startsWith(g) || lower === g)) {
    return `Hello! Welcome to ${SITE_CONFIG.name}. I'm here to answer questions about digital marketing, web development, pricing, and how we can grow your business. How can I help you today?`;
  }

  for (const { keywords, response } of KEYWORD_RESPONSES) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return response;
    }
  }

  return DEFAULT_RESPONSE;
}
