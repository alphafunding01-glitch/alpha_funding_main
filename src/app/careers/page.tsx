
import React from 'react';
import NavBar from '@/components/navbar';
import Footer from '@/sections/common/footer';
import CareersPageContent from '@/sections/careers/careers-page-content';
import { BreadcrumbJsonLd } from 'next-seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Careers | Alpha Funding',
    description: 'Join the Alpha Funding team and help build the future of business finance. View our open positions and learn about our culture.',
};

export default function CareersPage() {
    return (
        <div className="bg-white min-h-screen">
            <BreadcrumbJsonLd
                items={[
                    {
                        name: 'Home',
                        item: 'https://alpha-funding.co.uk',
                    },
                    {
                        name: 'Careers',
                        item: 'https://alpha-funding.co.uk/careers',
                    },
                ]}
            />
            <NavBar hideOnScroll={true} />
            <CareersPageContent />
            <Footer />
        </div>
    );
}
