import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { IoCall } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";
import { buttonVariants } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"]
})

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
        <div className={"flex gap-3 items-center fixed bottom-10 right-4 md:right-[6%]"}>
          <Link className={buttonVariants({
            size: "icon"
          })} href={"https://wa.me/+44"}>
            <IoLogoWhatsapp />
          </Link>
          <Link href={"tel:"} className={buttonVariants({
            variant: "secondary",
            size: "icon"
          })}>
            <IoCall />
          </Link>
        </div>
      </body>
    </html>
  );
}
