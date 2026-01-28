
import React from 'react';
import NavBar from "@/components/navbar";
import Footer from "@/sections/common/footer";
import CheckEligibilityContent from "@/sections/check-eligibility/check-eligibility-content";
import { BreadcrumbJsonLd } from 'next-seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Check Eligibility | Alpha Funding',
    description: 'Check your business finance eligibility in 60 seconds with no credit check. Get instant funding estimates tailored to your business.',
    openGraph: {
        title: 'Check Eligibility | Alpha Funding',
        description: 'See how much you could borrow without checking your credit score.',
        url: 'https://alpha-funding.co.uk/check-eligibility',
        siteName: 'Alpha Funding',
        images: [
            {
                url: 'https://alpha-funding.co.uk/og-check-eligibility.jpg',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_GB',
        type: 'website',
    },
};

export default function CheckEligibility() {
    return (
        <div className="flex flex-col min-h-screen bg-brand-midnight">
            <BreadcrumbJsonLd
                items={[
                    {
                        name: 'Home',
                        item: 'https://alpha-funding.co.uk',
                    },
                    {
                        name: 'Check Eligibility',
                        item: 'https://alpha-funding.co.uk/check-eligibility',
                    },
                ]}
            />
            <NavBar />
            <CheckEligibilityContent />
            <Footer />
        </div>
    )
}