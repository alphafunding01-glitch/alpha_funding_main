import NavBar from "@/components/navbar";
import AboutUsHero from "@/sections/about-us/about-us-hero";
import AboutUsStory from "@/sections/about-us/about-us-story";
import AboutUsMissionVision from "@/sections/about-us/about-us-mission-vission";
import AboutUsValues from "@/sections/about-us/about-us-values";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import { BreadcrumbJsonLd } from 'next-seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn about Alpha Funding - your trusted partner for flexible business finance solutions. Discover our mission, values, and commitment to supporting UK businesses.',
    openGraph: {
        url: 'https://www.alpha-funding.co.uk/about-us',
        title: 'About Alpha Funding - Business Finance Experts',
        description: 'Discover how Alpha Funding helps UK businesses grow with flexible finance solutions and expert support.',
        images: [
            {
                url: 'https://www.alpha-funding.co.uk/og-about.jpg',
                width: 1200,
                height: 630,
                alt: 'About Alpha Funding',
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
            <div className={"flex bg-light-gray flex-col"}>
                <AboutUsHero />
                <AboutUsStory />
                <AboutUsMissionVision />
                <AboutUsValues />
                <div className={"bg-white"}>
                    <CheckEligibleSection />
                </div>
            </div>
            <Footer />
        </div>
    )
}
