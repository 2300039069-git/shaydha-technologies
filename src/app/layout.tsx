import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "SHAYDHA TECHNOLOGIES | Digital Solutions & Software Development",
    template: "%s | SHAYDHA TECHNOLOGIES",
  },
  description:
    "SHAYDHA TECHNOLOGIES builds modern websites, mobile applications, AI solutions and custom software for businesses designed to perform, scale, and grow.",
  keywords: [
    "SHAYDHA TECHNOLOGIES",
    "software agency",
    "web development",
    "mobile app development",
    "AI solutions",
    "custom software",
    "Next.js agency",
    "enterprise software development",
    "headless commerce",
  ],
  authors: [{ name: "SHAYDHA TECHNOLOGIES" }],
  creator: "SHAYDHA TECHNOLOGIES",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/logo-mark.svg",
  },
  openGraph: {
    title: "SHAYDHA TECHNOLOGIES | Digital Solutions & Software Development",
    description:
      "We build digital experiences that move businesses forward. Full-stack engineering, AI integrations, and mobile applications.",
    url: SITE_CONFIG.url,
    siteName: "SHAYDHA TECHNOLOGIES",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHAYDHA TECHNOLOGIES | Digital Solutions & Software Development",
    description:
      "We build digital experiences that move businesses forward. Web Development • Mobile Apps • Custom Software • AI Solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SHAYDHA TECHNOLOGIES",
    description:
      "SHAYDHA TECHNOLOGIES builds modern websites, mobile applications, AI solutions and custom software for businesses.",
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: "Bengaluru",
    },
    serviceType: [
      "Web Development",
      "Mobile App Development",
      "Custom Software Development",
      "AI Solutions",
      "UI/UX Design",
      "E-Commerce Solutions",
    ],
    areaServed: "Worldwide",
  };

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('shaydha_theme');
                  if (saved === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 dark:bg-[#07080B] dark:text-slate-100 antialiased relative transition-colors duration-200">
        <ThemeProvider>
          <CustomCursor />
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
