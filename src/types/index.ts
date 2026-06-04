export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  href: string;
}

export interface ServiceCategory {
  number: number;
  id: string;
  title: string;
  description: string;
  icon: string;
  items: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  metric?: string;
  service?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceDisplay: string;
  period: string;
  description: string;
  bestFor: string;
  summary?: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  cta: string;
}

export interface CustomAddOn {
  items: string[];
  summary: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export interface PortfolioProject {
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  client: string;
  year: string;
  results: string[];
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ClientLogo {
  id: string;
  name: string;
}
