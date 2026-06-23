import type { Testimonial } from "@/types";
import { testimonialAvatarUrl } from "@/lib/images";

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Arun Kumar",
    role: "CEO",
    company: "TechFlow Inc",
    content:
      "Wolfrayet Media transformed our online presence. Our organic traffic increased 240% in just 6 months. Their strategic approach and transparent reporting set them apart from every agency we've worked with.",
    avatar: testimonialAvatarUrl("1640531005390-38bd92755d6a"),
    rating: 5,
    metric: "240% traffic growth",
    service: "SEO & Branding",
  },
  {
    id: "2",
    name: "Priya Menon",
    role: "Marketing Director",
    company: "GrowthLabs",
    content:
      "The team's expertise in PPC and conversion optimization delivered a 4.2x ROAS on our campaigns. Professional, responsive, and results-driven — exactly what we needed to scale profitably.",
    avatar: testimonialAvatarUrl("1770626894265-bdb99db109f1"),
    rating: 5,
    metric: "4.2x ROAS",
    service: "PPC & Analytics",
  },
  {
    id: "3",
    name: "Karthik Selvam",
    role: "Founder",
    company: "StartupHub",
    content:
      "From brand strategy to social media, Wolfrayet handled everything seamlessly. Our engagement rates tripled and we finally have a cohesive brand voice across all channels.",
    avatar: testimonialAvatarUrl("1594993964054-ea538f381fba"),
    rating: 5,
    metric: "3x engagement",
    service: "Social Media",
  },
  {
    id: "4",
    name: "Lakshmi Devi",
    role: "CMO",
    company: "RetailMax",
    content:
      "Outstanding partnership. They don't just execute—they educate and collaborate. Our e-commerce revenue grew 180% year-over-year with their full-funnel approach.",
    avatar: testimonialAvatarUrl("1762341124796-530c0085f7d8"),
    rating: 5,
    metric: "180% revenue",
    service: "E-commerce",
  },
  {
    id: "5",
    name: "Rajesh Iyer",
    role: "VP Marketing",
    company: "HealthPlus",
    content:
      "Local SEO was a game-changer for our clinic network. We went from invisible on Google Maps to top-3 rankings across 12 locations. Appointment bookings up 60%.",
    avatar: testimonialAvatarUrl("1542183669-c4c74d629b34"),
    rating: 5,
    metric: "60% more bookings",
    service: "Local SEO",
  },
  {
    id: "6",
    name: "Meena Ravi",
    role: "Head of Growth",
    company: "FinancePro",
    content:
      "They cut our CPA by 45% while scaling spend 3x. The landing pages and bid strategy work was world-class. Best marketing investment we've made.",
    avatar: testimonialAvatarUrl("1758518729459-235dcaadc611"),
    rating: 5,
    metric: "45% lower CPA",
    service: "PPC",
  },
  {
    id: "7",
    name: "Suresh Babu",
    role: "Director",
    company: "CloudNine SaaS",
    content:
      "Content marketing that actually converts. Blog traffic up 320%, demo requests doubled. Wolfrayet understands B2B SaaS better than specialists charging 3x more.",
    avatar: testimonialAvatarUrl("1713946598467-fcf9332c56ea"),
    rating: 5,
    metric: "2x demo requests",
    service: "Content Marketing",
  },
  {
    id: "8",
    name: "Divya Natarajan",
    role: "Owner",
    company: "Bella Boutique",
    content:
      "Instagram and Pinterest strategy brought our brand to life online. Sales from social grew 95% in Q1 alone. Creative, strategic, and always on deadline.",
    avatar: testimonialAvatarUrl("1768221677463-191fc4e15690"),
    rating: 5,
    metric: "95% social sales",
    service: "Social & Influencer",
  },
];

export const testimonialStats = [
  { label: "Average Rating", value: "5.0", suffix: "/5" },
  { label: "Client Satisfaction", value: "98", suffix: "%" },
  { label: "Would Recommend", value: "100", suffix: "%" },
  { label: "Repeat Clients", value: "85", suffix: "%" },
];
