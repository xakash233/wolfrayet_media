import { SITE_CONFIG } from "@/lib/constants";
import {
  SEO_KEYWORDS,
  SEO_SERVICE_TYPES,
} from "@/lib/seo-keywords";

export function OrganizationJsonLd() {
  const founderUrl = `${SITE_CONFIG.url}/about#team`;
  const founderImage = `${SITE_CONFIG.url}${SITE_CONFIG.founder.image}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.seoDescription,
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    areaServed: ["IN", "Worldwide"],
    knowsAbout: SEO_SERVICE_TYPES,
    keywords: SEO_KEYWORDS.join(", "),
    founder: {
      "@type": "Person",
      name: SITE_CONFIG.founder.name,
      jobTitle: SITE_CONFIG.founder.jobTitle,
      image: founderImage,
      url: founderUrl,
      worksFor: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Marketing Services",
      itemListElement: SEO_SERVICE_TYPES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
