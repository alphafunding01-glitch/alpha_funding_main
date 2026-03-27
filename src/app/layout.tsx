import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Serif_Display, Work_Sans } from "next/font/google";

import "./globals.css";
import { Poppins } from "next/font/google";
import { ChatWidgetClient } from "@/components/chat/chat-widget-client";
import CookiesBanner from "@/components/common/cookies-banner";
import FloatingContactButtons from "@/components/common/floating-contact-buttons";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalyticsConsent from "@/components/common/google-analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"]
})

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Alpha Funding',
    default: 'Alpha Funding - Business Finance Solutions',
  },
  description: 'Alpha Funding provides flexible business finance solutions with fast turnaround and supportive service. Get funding tailored to your journey.',
  keywords: ['business finance', 'business loans', 'commercial finance', 'UK business funding', 'refinance', 'merchant cash advance'],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.alpha-funding.co.uk',
    siteName: 'Alpha Funding',
    images: [
      {
        url: 'https://www.alpha-funding.co.uk/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alpha Funding - Business Finance Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@alphafunding',
  },
};

const developerSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.alpha-funding.co.uk/#website",
      "url": "https://www.alpha-funding.co.uk",
      "name": "Alpha Funding",
      "description": "UK Business Finance Solutions — Commercial Loans, Asset Finance, Invoice Finance",
      "creator": {
        "@type": "Person",
        "@id": "https://www.linkedin.com/in/moe-momin-47b75b41/",
        "name": "Muneb Momin",
        "jobTitle": "Generative AI Engineer",
        "description": "Full stack developer specialising in AI-integrated web applications using Next.js, React, and large language model APIs.",
        "email": "Muneb.momin1991@gmail.com",
        "sameAs": [
          "https://www.linkedin.com/in/moe-momin-47b75b41/"
        ]
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(developerSchema) }}
        />
      </head>
      <body
        className={`${poppins.className} ${dmSerif.variable} ${workSans.variable} antialiased`}
      >
        {children}
        <CookiesBanner />
        <FloatingContactButtons />
        <ChatWidgetClient />
        <Analytics />
        <SpeedInsights />
        <GoogleAnalyticsConsent />
      </body>
    </html>
  );
}
