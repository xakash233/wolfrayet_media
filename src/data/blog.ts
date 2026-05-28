import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "seo-trends-2024",
    title: "10 SEO Trends That Will Dominate 2024",
    excerpt:
      "Stay ahead of the curve with these essential SEO strategies—from AI content to Core Web Vitals.",
    content: `Search engine optimization continues to evolve at breakneck speed. In 2024, AI-generated content, E-E-A-T signals, and user experience metrics are more important than ever.

**Key trends to watch:**

1. **AI and Search** - Google is getting better at detecting AI content. Focus on human expertise and original insights.
2. **Core Web Vitals** - Page experience remains a ranking factor. Optimize LCP, FID, and CLS.
3. **Zero-click searches** - Optimize for featured snippets and People Also Ask boxes.
4. **Video SEO** - YouTube and video results dominate many SERPs.
5. **Local SEO** - Google Business Profile optimization is critical for local businesses.

The brands that win in 2024 will combine technical excellence with genuinely helpful content that serves user intent.`,
    category: "SEO",
    author: "Sneha Kapoor",
    date: "2024-03-15",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    slug: "social-media-strategy-guide",
    title: "The Complete Social Media Strategy Guide for 2024",
    excerpt:
      "Build an engaged audience and drive conversions with this step-by-step social media playbook.",
    content: `Social media isn't just about posting—it's about building relationships and driving measurable business outcomes.

**Your strategy framework:**

- Define clear goals (awareness, engagement, leads, sales)
- Know your audience deeply—demographics, pain points, content preferences
- Choose platforms wisely—don't spread thin across every network
- Create a content calendar with mix of educational, entertaining, and promotional
- Engage authentically—respond to comments and DMs promptly
- Measure what matters—track reach, engagement rate, click-through, and conversions

Consistency beats perfection. Post regularly, test different formats, and double down on what works.`,
    category: "Social Media",
    author: "Priya Mehta",
    date: "2024-03-10",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=500&fit=crop",
  },
  {
    slug: "ppc-roas-optimization",
    title: "How to Optimize PPC Campaigns for Maximum ROAS",
    excerpt:
      "Practical tactics to improve your paid advertising return on ad spend by 2x or more.",
    content: `Getting positive ROAS from PPC requires continuous optimization across targeting, creative, and landing pages.

**Optimization checklist:**

1. **Negative keywords** - Regularly audit search terms and add negatives
2. **Audience segmentation** - Create tailored ad groups for each persona
3. **Landing page alignment** - Message match between ad and landing page
4. **Bid strategies** - Test Target ROAS vs Maximize Conversions
5. **Creative testing** - A/B test headlines, images, and CTAs weekly
6. **Conversion tracking** - Ensure all micro and macro conversions are tracked

Start with your highest-spending campaigns and apply these optimizations systematically.`,
    category: "PPC",
    author: "Rahul Verma",
    date: "2024-03-05",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
  },
  {
    slug: "content-marketing-roi",
    title: "Measuring Content Marketing ROI: A Practical Framework",
    excerpt:
      "Learn how to attribute revenue to content and prove marketing's impact to stakeholders.",
    content: `Content marketing ROI is notoriously hard to measure—but not impossible. Here's a framework that works.

**Metrics to track:**

- **Traffic metrics** - Organic sessions, time on page, pages per session
- **Engagement** - Comments, shares, email signups from content
- **Lead metrics** - Content-attributed form fills and demo requests
- **Revenue** - Multi-touch attribution connecting content to closed deals

Use UTM parameters, marketing automation, and CRM integration to build a complete picture. Report monthly with clear narratives tying content to business outcomes.`,
    category: "Content",
    author: "Akash Sharma",
    date: "2024-02-28",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
  },
  {
    slug: "brand-storytelling",
    title: "Brand Storytelling: Connecting Emotionally with Your Audience",
    excerpt:
      "Why stories sell better than features—and how to craft narratives that build lasting brand loyalty.",
    content: `Humans are wired for stories. Brands that master storytelling create emotional connections that transcend transactional relationships.

**Elements of powerful brand stories:**

- **Authenticity** - Share real challenges and victories
- **Relatability** - Your customer is the hero, not your brand
- **Consistency** - Same voice and values across all touchpoints
- **Visual storytelling** - Images and video amplify narrative impact

Start with your origin story, customer success stories, and the "why" behind what you do. Weave these into every piece of content you create.`,
    category: "Branding",
    author: "Rahul Verma",
    date: "2024-02-20",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1557804506-669a77965ba3?w=800&h=500&fit=crop",
  },
  {
    slug: "email-marketing-automation",
    title: "Email Marketing Automation: Workflows That Convert",
    excerpt:
      "Set up automated email sequences that nurture leads and recover abandoned carts on autopilot.",
    content: `Email remains one of the highest-ROI marketing channels. Automation lets you scale personalization.

**Essential workflows:**

1. Welcome series for new subscribers
2. Lead nurture sequences based on behavior
3. Abandoned cart recovery
4. Post-purchase follow-up and upsell
5. Re-engagement for inactive subscribers

Segment your list, personalize beyond {first_name}, and always provide value before asking for the sale.`,
    category: "Email",
    author: "Priya Mehta",
    date: "2024-02-15",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1557201103-d672f7cae0c2?w=800&h=500&fit=crop",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogCategories(): string[] {
  return Array.from(new Set(blogPosts.map((post) => post.category)));
}
