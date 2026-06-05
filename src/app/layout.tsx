import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { PageTransitionProvider } from "@/components/providers/page-transition-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/shared/floating-actions";
import { OrganizationJsonLd } from "@/components/shared/json-ld";
import { SITE_CONFIG } from "@/lib/constants";
import { SEO_KEYWORDS } from "@/lib/seo-keywords";

const DM_SANS_STYLESHEET =
  "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.seoDescription,
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.tagline,
    description: SITE_CONFIG.seoDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.tagline,
    description: SITE_CONFIG.seoDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href={DM_SANS_STYLESHEET} rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <OrganizationJsonLd />
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Header />
          <main id="main-content" tabIndex={-1} className="outline-none">
            <PageTransitionProvider>{children}</PageTransitionProvider>
          </main>
          <Footer />
          <FloatingActions />
        </ThemeProvider>
      </body>
    </html>
  );
}
