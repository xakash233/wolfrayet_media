export const SITE_CONFIG = {
  name: "Wolfrayet Media",
  tagline: "Digital Marketing & Web Development Agency",
  description:
    "Wolfrayet Media drives business growth through smart digital marketing, custom web development, and cutting-edge technology.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wolfrayetmedia.com",
  email: "info@wolfrayetmedia.com",
  phone: "+91 98765 43210",
  address:
    "123 Digital Avenue, Business District, Gwalior, Madhya Pradesh 474001, India",
  hours: "Mon–Sat: 9:00 AM – 7:00 PM",
  whatsapp: "919876543210",
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    pinterest: "https://pinterest.com",
    youtube: "https://youtube.com",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const WHATSAPP_URL = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
  "Hi Wolfrayet Media! I'd like to discuss digital marketing for my business."
)}`;
