import type { PortfolioProject } from "@/types";

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "techflow-rebrand",
    title: "TechFlow Brand Refresh",
    category: "Branding",
    description: "Complete brand identity overhaul for a B2B SaaS leader.",
    longDescription:
      "TechFlow needed a modern identity that reflected their innovative product while maintaining enterprise credibility. We delivered a comprehensive rebrand including logo, color system, typography, and brand guidelines used across all marketing touchpoints.",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=600&fit=crop",
    tags: ["Branding", "Web Design", "Strategy"],
    client: "TechFlow Inc",
    year: "2024",
    results: ["40% increase in brand recall", "Unified visual identity", "2x social engagement"],
  },
  {
    slug: "growthlabs-seo",
    title: "GrowthLabs SEO Campaign",
    category: "SEO",
    description: "240% organic traffic growth in 6 months.",
    longDescription:
      "GrowthLabs was invisible in search despite having a strong product. Our technical SEO audit uncovered critical issues, and our content strategy targeted high-intent keywords in their niche.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["SEO", "Content", "Analytics"],
    client: "GrowthLabs",
    year: "2024",
    results: ["240% organic traffic", "150+ ranking keywords", "#1 for 12 target terms"],
  },
  {
    slug: "retailmax-ecommerce",
    title: "RetailMax E-commerce Growth",
    category: "E-commerce",
    description: "180% revenue increase through integrated digital marketing.",
    longDescription:
      "RetailMax needed to compete with larger retailers online. We implemented a full-funnel strategy combining SEO, PPC, email automation, and conversion rate optimization.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    tags: ["PPC", "Email", "CRO"],
    client: "RetailMax",
    year: "2023",
    results: ["180% revenue growth", "4.2x ROAS", "35% cart recovery rate"],
  },
  {
    slug: "startuphub-launch",
    title: "StartupHub Launch Campaign",
    category: "Social Media",
    description: "Viral launch campaign for a new startup accelerator.",
    longDescription:
      "StartupHub needed buzz for their platform launch. We created a multi-channel campaign with influencer partnerships, paid social, and content that generated organic shares.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    tags: ["Social Media", "Influencer", "Content"],
    client: "StartupHub",
    year: "2023",
    results: ["2M+ impressions", "50K signups", "3x engagement vs industry avg"],
  },
  {
    slug: "healthplus-local",
    title: "HealthPlus Local SEO",
    category: "SEO",
    description: "Dominated local search for a healthcare provider network.",
    longDescription:
      "HealthPlus operates 12 clinics across the region. We optimized Google Business Profiles, built local citations, and created location-specific landing pages.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    tags: ["Local SEO", "Google Business", "Content"],
    client: "HealthPlus",
    year: "2023",
    results: ["Top 3 for 45 local keywords", "200% map pack visibility", "60% more appointments"],
  },
  {
    slug: "financepro-ppc",
    title: "FinancePro PPC Optimization",
    category: "PPC",
    description: "Reduced CPA by 45% while scaling ad spend 3x.",
    longDescription:
      "FinancePro's paid campaigns were underperforming. We restructured account architecture, implemented advanced bidding strategies, and created high-converting landing pages.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["PPC", "Landing Pages", "Analytics"],
    client: "FinancePro",
    year: "2024",
    results: ["45% lower CPA", "3x ad spend scale", "5.1x ROAS"],
  },
  {
    slug: "cloudnine-website",
    title: "CloudNine SaaS Website",
    category: "Web Development",
    description: "Premium Next.js marketing site with 98 Lighthouse score and 2x demo signups.",
    longDescription:
      "CloudNine needed a fast, modern web presence that matched their product quality. We designed and built a full marketing site with Next.js 14, Framer Motion animations, SEO optimization, and conversion-focused landing pages — delivering sub-2s load times and a seamless mobile experience.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f237b27?w=800&h=600&fit=crop",
    tags: ["Next.js", "React", "UI/UX", "SEO"],
    client: "CloudNine SaaS",
    year: "2024",
    results: ["98 Lighthouse performance", "2x demo signups", "Sub-2s page load"],
  },
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function getPortfolioCategories(): string[] {
  return ["All", ...Array.from(new Set(portfolioProjects.map((p) => p.category)))];
}
