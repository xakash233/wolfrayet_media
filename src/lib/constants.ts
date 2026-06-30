export const SITE_CONFIG = {
  name: "Wolfrayet Media",
  tagline: "Best In Class Digital Marketing & Web Development Agency",
  heroTaglineLines: [
    "Best In Class Digital Marketing",
    "& Web Development Agency",
  ] as const,
  editorialHero: {
    kicker: "Marketing That Builds. That Delivers.",
    focalWord: "GROWTH",
    pathPhrase:
      "Because when strategy meets creativity, 1 + 1 doesn't make 2. It becomes 11.",
  },
  pageHeroes: {
    about: {
      kicker: "People That Build. That Deliver.",
      focalWord: "ABOUT",
      pathPhrase:
        "Because when the right minds come together, 1 + 1 doesn't make 2. It becomes 11.",
      srOnlyTitle: "About Wolfrayet Media",
    },
  },
  heroHeadline:
    "Your Trusted Digital Marketing And Web Development Partner",
  heroDescription:
    "Wolfrayet Media is your trusted digital marketing and web development partner, transforming bold ideas into powerful digital success through innovative strategies, SEO-driven growth, and high-performance websites that attract, engage, and convert customers while accelerating your brand's growth in a competitive online marketplace.",
  description:
    "Wolfrayet Media is your trusted digital marketing and web development partner, transforming bold ideas into powerful digital success through innovative strategies, SEO-driven growth, and high-performance websites that attract, engage, and convert customers while accelerating your brand's growth in a competitive online marketplace.",
  seoDescription:
    "Wolfrayet Media is a top-rated digital marketing agency delivering smart, results-driven strategies that help businesses grow, boost visibility, and connect with the right audience.",
  bannerLongDescription:
    "By combining creativity, technology, and data-driven insights, we build powerful websites and execute targeted marketing campaigns that enhance brand visibility, attract qualified leads, and increase conversions. Our team works closely with every client to understand their goals, ensuring each solution is customized to reflect their brand identity and support long-term business growth. From website design and development to SEO, social media marketing, and paid advertising, we provide end-to-end digital solutions that help businesses stay ahead in today's competitive digital landscape.",
  vision:
    "To become a trusted digital growth partner, empowering businesses worldwide with innovative marketing and technology solutions that drive measurable success and long-term growth.",
  mission:
    "We transform ideas into impactful digital experiences through strategic marketing, performance-driven campaigns, creative branding, and innovative online solutions that help businesses attract, engage, and convert their ideal audience while achieving sustainable growth in a competitive digital landscape.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.wolfrayetmedia.in",
  email: "info@wolfrayetmedia.in",
  phone: "+91 85310 72803",
  whatsapp: "918531072803",
  founder: {
    name: "Krishna Kumar",
    jobTitle: "Founder & CEO",
    image: "/Team/krishna.jpeg",
  },
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

/** Label for contact quote form submissions in admin enquiries. */
export const ENQUIRY_QUOTE_SOURCE = "Ready to get started?";
