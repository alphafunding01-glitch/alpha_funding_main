import React from "react";
import NavBar from "@/components/navbar";
import Footer from "@/sections/common/footer";
import { BreadcrumbJsonLd } from 'next-seo';
import AboutUsContent from "@/sections/about-us/about-us-content";

// Define Metadata here
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'UK Commercial Finance Broker | Alpha Funding',
    description: 'Alpha Funding connects UK businesses with the right finance—fast. No runaround. No radio silence. Just expert guidance and funding decisions in 24-48 hours.',
    openGraph: {
        url: 'https://www.alpha-funding.co.uk/about-us',
        title: 'Alpha Funding - UK Commercial Finance Broker',
        description: 'You Built Your Business. We Help You Fund What\'s Next. Expert guidance and funding decisions in 24-48 hours.',
        images: [
            {
                url: 'https://www.alpha-funding.co.uk/og-about.jpg',
                width: 1200,
                height: 630,
                alt: 'Alpha Funding Team',
            },
        ],
    },
};

export default function AboutUs() {
    return (
        <div className={"flex flex-col"}>
            <BreadcrumbJsonLd
                items={[
                    {
                        name: 'Home',
                        item: 'https://www.alpha-funding.co.uk',
                    },
                    {
                        name: 'About Us',
                    },
                ]}
            />
            <NavBar />
            <main className="flex-grow pt-36">
                <AboutUsContent />
            </main>
            <Footer />
        </div>
    )
}