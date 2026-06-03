export const SITE_CONFIG = {
  name: "Wolfrayet Media",
  tagline: "Best in class digital marketing & web development agency",
  heroTaglineLines: [
    "Best in class digital marketing",
    "& web development agency",
  ] as const,
  heroHeadline:
    "Your trusted digital marketing and web development partner",
  heroDescription:
    "We help businesses grow online through customized digital marketing and web development solutions. By combining creativity, technology, and data-driven strategies, we create high-performing websites and targeted marketing campaigns that boost brand visibility, generate leads, and increase conversions. Our end-to-end services include web design, development, SEO, social media marketing, and paid advertising, all tailored to support long-term business growth.",
  description:
    "Wolfrayet Media helps brands grow with creative strategies, SEO campaigns, and digital solutions that boost visibility, engagement, and long-term success.",
  bannerLongDescription:
    "By combining creativity, technology, and data-driven insights, we build powerful websites and execute targeted marketing campaigns that enhance brand visibility, attract qualified leads, and increase conversions. Our team works closely with every client to understand their goals, ensuring each solution is customized to reflect their brand identity and support long-term business growth. From website design and development to SEO, social media marketing, and paid advertising, we provide end-to-end digital solutions that help businesses stay ahead in today's competitive digital landscape.",
  vision:
    "To become a trusted digital growth partner, empowering businesses worldwide with innovative marketing and technology solutions that drive measurable success and long-term growth.",
  mission:
    "We transform ideas into impactful digital experiences through strategic marketing, performance-driven campaigns, creative branding, and innovative online solutions that help businesses attract, engage, and convert their ideal audience while achieving sustainable growth in a competitive digital landscape.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wolfrayetmedia.com",
  email: "info@wolfrayetmedia.com",
  phone: "+91 85310 72803",
  whatsapp: "918531072803",
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

/** Main header + mobile menu (excludes portfolio & testimonials). */
export const HEADER_NAV_LINKS = NAV_LINKS.filter(
  (link) => link.href !== "/portfolio" && link.href !== "/testimonials"
);

export const WHATSAPP_URL = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
  "Hi Wolfrayet Media! I'd like to discuss digital marketing for my business."
)}`;
