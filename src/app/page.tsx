import Image from "next/image";
import NavBar from "@/components/navbar";
import HomeHeroPage from "@/sections/home/home-hero-page";
import Homehero2 from "@/sections/home/home-hero-2";
import HomeBusinessFinanceWorks from "@/sections/home/home-business-finance-works";
import HomeWhyChooseUs from "@/sections/home/home-why-choose-us";
import HomeReviewSection from "@/sections/home/home-review-section";
import Footer from "@/sections/common/footer";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import BusinessBannerSection from "@/sections/common/read-business-banner";
import WhyAlphaFunding from "@/sections/home/home-why-alpha-funding";
import CookieConsent from "@/components/cookies-dialog";
import { OrganizationJsonLd, BreadcrumbJsonLd } from 'next-seo';
import type { Metadata } from 'next';
import HomeFaqSection from "@/sections/home/home-faq-section";

export const metadata: Metadata = {
    title: 'Business Loans UK | Commercial Finance Broker | Alpha Funding',
    description: 'Fast business loans from £10k–£10M. UK commercial finance broker with decisions in 24–48 hours. Secured, unsecured, asset, invoice & property finance for SMEs.',
    openGraph: {
        url: 'https://www.alpha-funding.co.uk/',
        title: 'Business Loans UK | Commercial Finance Broker | Alpha Funding',
        description: 'Fast business loans from £10k–£10M. UK commercial finance broker with decisions in 24–48 hours. Secured, unsecured, asset, invoice & property finance for SMEs.',
        images: [
            {
                url: 'https://www.alpha-funding.co.uk/og-home.jpg',
                width: 1200,
                height: 630,
                alt: 'Alpha Funding - Business Finance Solutions',
            },
        ],
    },
};

export default function Home() {
    return (
        <div className={"flex flex-col "}>
            <OrganizationJsonLd
                type="Organization"
                name="Alpha Funding"
                url="https://www.alpha-funding.co.uk"
                logo="https://www.alpha-funding.co.uk/logo.png"
                description="Alpha Funding provides flexible business finance solutions including business loans, refinance, merchant cash advance, and commercial property finance."
                sameAs={[
                    'https://www.linkedin.com/company/alpha-funding',
                    'https://twitter.com/alphafunding',
                ]}
                address={[
                    {
                        streetAddress: '307 Euston Road',
                        addressLocality: 'London',
                        addressRegion: 'London',
                        postalCode: 'NW1 3AD',
                        addressCountry: 'GB',
                    },
                    {
                        streetAddress: 'Commerce House, Campbeltown Rd, Tranmere',
                        addressLocality: 'Wirral',
                        addressRegion: 'Merseyside',
                        postalCode: 'CH41 9HP',
                        addressCountry: 'GB',
                    },
                ]}
                contactPoint={{
                    telephone: '+44-20-7078-7446',
                    contactType: 'customer service',
                    email: 'contact@alpha-funding.co.uk',
                }}
            />
            <BreadcrumbJsonLd
                items={[
                    {
                        name: 'Home',
                        item: 'https://www.alpha-funding.co.uk',
                    },
                ]}
            />
            <NavBar />
            <div className={"flex bg-light-gray flex-col"}>
                <HomeHeroPage />
                <Homehero2 />
                <HomeWhyChooseUs />
                <HomeBusinessFinanceWorks />
                <CheckEligibleSection />
                <WhyAlphaFunding />
                <HomeReviewSection />
                <HomeFaqSection />
                <BusinessBannerSection />
                <CookieConsent />
            </div>
            <Footer />
        </div>
    );
}
