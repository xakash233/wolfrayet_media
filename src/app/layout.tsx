import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { MotionProvider } from "@/components/providers/motion-provider";
import { PageTransitionProvider } from "@/components/providers/page-transition-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/shared/floating-actions";
import { StartProjectFab } from "@/components/shared/start-project-fab";
import { PromoPopup } from "@/components/shared/promo-popup";
import { OrganizationJsonLd } from "@/components/shared/json-ld";
import { SITE_CONFIG } from "@/lib/constants";
import { SEO_KEYWORDS } from "@/lib/seo-keywords";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const OG_IMAGE = "/logo/favicon2.png";

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
    locale: "en_IN",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.tagline,
    description: SITE_CONFIG.seoDescription,
    images: [{ url: OG_IMAGE, width: 512, height: 512, alt: SITE_CONFIG.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.tagline,
    description: SITE_CONFIG.seoDescription,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/logo/favicon2.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/logo/favicon2.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/logo/favicon2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="dark"){d.classList.add("dark");}else{d.classList.remove("dark");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <OrganizationJsonLd />
        <ThemeProvider>
          <MotionProvider>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Header />
            <main id="main-content" tabIndex={-1} className="outline-none">
              <PageTransitionProvider>{children}</PageTransitionProvider>
            </main>
            <Footer />
            <FloatingActions />
            <StartProjectFab />
            <PromoPopup />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
