import React from "react";
import type { Metadata } from 'next';

// New Refined Sections
import HomeHeroSection from "@/sections/home/home-hero-section";
import HomeTrustBar from "@/sections/home/home-trust-bar";
import HomeAIEligibilitySection from "@/sections/home/home-ai-eligibility-section";
import HomeProductsGrid from "@/sections/home/home-products-grid";
import HomeHowItWorks from "@/sections/home/home-how-it-works";
import HomeWhyAlpha from "@/sections/home/home-why-alpha";
import HomeTestimonials from "@/sections/home/home-testimonials";
import HomeCalculatorCTA from "@/sections/home/home-calculator-cta";
import HomeFaq from "@/sections/home/home-faq";
import HomeFinalCTA from "@/sections/home/home-final-cta";
import ScrollProgress from "@/components/ui/scroll-progress";
import NavBar from "@/components/navbar";
import Footer from "@/sections/common/footer";

// SEO Metadata
export const metadata: Metadata = {
    title: "Business Loans UK | Fast Funding £10k-£10M | Alpha Funding",
    description: "Get business funding in 24-48 hours. Compare 50+ UK lenders. No upfront fees. 97% approval rate. Check eligibility in 60 seconds.",
    openGraph: {
        title: "Business Loans UK | Fast Funding £10k-£10M | Alpha Funding",
        description: "Get business funding in 24-48 hours. Compare 50+ UK lenders.",
        type: 'website',
        locale: 'en_GB',
        url: 'https://alphafunding.uk',
        siteName: 'Alpha Funding',
    },
};

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen bg-white">
            <NavBar />
            {/* Visual Feedback Components */}
            <ScrollProgress />

            {/* Hero Section - Glassmorphic / Parallax */}
            <HomeHeroSection />

            {/* Trust Bar - Animated Stats Counter */}
            <HomeTrustBar />

            {/* AI Eligibility Widget - Generative UI Engine */}
            <HomeAIEligibilitySection />

            {/* Products Grid - Bento Style */}
            <HomeProductsGrid />

            {/* How It Works - Scroll Linked Timeline */}
            <HomeHowItWorks />

            {/* Why Alpha - Feature Bento Grid */}
            <HomeWhyAlpha />

            {/* Testimonials - Glassmorphic Carousel */}
            <HomeTestimonials />

            {/* Calculator CTA - Floating Neuromorphic Card */}
            <HomeCalculatorCTA />

            {/* FAQ Section - Neuromorphic Accordion */}
            <HomeFaq />

            {/* Final CTA Banner - Animated Mesh Gradient */}
            <HomeFinalCTA />

            <Footer />

            {/* Structured Data for SEO: Organization */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Alpha Funding Business Finance",
                        "url": "https://alphafunding.uk",
                        "logo": "https://alphafunding.uk/logo.png",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+44-000-000-000",
                            "contactType": "customer service"
                        }
                    })
                }}
            />
        </main>
    );
}
