import NavBar from "../../../components/navbar";
import Footer from "@/sections/common/footer";
import { SolutionsHeaderSection } from "@/sections/solutions/business-loans/solutions-header-sction";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BreadcrumbJsonLd, FAQJsonLd } from 'next-seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Growth Guarantee Scheme',
    description: 'Access government-backed funding with the Growth Guarantee Scheme. Support your UK business with flexible, competitive finance for growth and innovation.',
    openGraph: {
        url: 'https://www.alpha-funding.co.uk/solutions/growth-guarantee-scheme',
        title: 'Growth Guarantee Scheme - Government-Backed Funding | Alpha Funding',
        description: 'Fuel your business ambitions with GGS - government-backed loans for UK SMEs to support growth and resilience.',
        images: [
            {
                url: 'https://www.alpha-funding.co.uk/og-ggs.jpg',
                width: 1200,
                height: 630,
                alt: 'Growth Guarantee Scheme',
            },
        ],
    },
};

export default function GrowthFinanceScheme() {

    const content = [
        {
            point: "Flexible Funding",
            content: "The Growth Guarantee Scheme provides tailored funding solutions to help you scale, innovate, or stabilise operations."
        },
        {
            point: "Competitive Rates",
            content: "Access finance with fair and competitive terms designed to suit your business's unique goals."
        },
        {
            point: "Wide Usage",
            content: "From managing cash flow to covering salaries or refinancing debt, GGS funding supports a variety of needs."
        },
        {
            point: "Simple Application",
            content: "With a straightforward process and dedicated financial specialists, accessing the scheme is fast and hassle-free."
        },
        {
            point: "Government-Backed",
            content: "This is a government-backed loan scheme (not a grant), offering businesses added security and support."
        },
        {
            point: "Sustainability Focus",
            content: "Looking to invest in eco-friendly assets? Explore the Green Growth Guarantee Scheme for green energy solutions."
        }
    ];

    return (
        <div className={"flex flex-col"}>
            <BreadcrumbJsonLd
                items={[
                    {
                        name: 'Home',
                        item: 'https://www.alpha-funding.co.uk',
                    },
                    {
                        name: 'Solutions',
                        item: 'https://www.alpha-funding.co.uk/solutions',
                    },
                    {
                        name: 'Growth Guarantee Scheme',
                    },
                ]}
            />
            <FAQJsonLd
                questions={[
                    {
                        question: 'What is the Growth Guarantee Scheme (GGS)?',
                        answer: 'The Growth Guarantee Scheme is a UK government-backed loan scheme launched on July 1st, 2024, designed to support small and medium-sized enterprises (SMEs) with access to finance for growth, stability, and innovation. It replaced the Recovery Loan Scheme.',
                    },
                    {
                        question: 'Is the Growth Guarantee Scheme a grant?',
                        answer: 'No, the GGS is a government-backed loan scheme, not a grant. It provides businesses with access to finance that must be repaid, but with added security and support from government backing.',
                    },
                    {
                        question: 'What can I use GGS funding for?',
                        answer: 'GGS funding can be used for managing cash flow, covering operational overheads, purchasing equipment, acquiring inventory, upgrading technology, marketing, refinancing debt, paying rent and utilities, supporting wages, and addressing unexpected costs.',
                    },
                    {
                        question: 'What is the Green Growth Guarantee Scheme?',
                        answer: 'The Green Growth Guarantee Scheme is a variant of the GGS designed specifically for businesses investing in eco-friendly assets and green energy solutions, supporting sustainability initiatives.',
                    },
                ]}
            />
            <NavBar />
            <div className={"flex bg-light-gray flex-col"}>
                <SolutionsHeaderSection
                    label={"Growth Guarantee Scheme"}
                    header={"Fuel Your Business Ambitions with the Growth Guarantee Scheme"}
                    description={"The Growth Guarantee Scheme (GGS) offers UK businesses access to vital funding, supporting growth, innovation, and long-term resilience in today's dynamic economy. \n\nPlease note: This is a government-backed loan scheme—not a grant."}
                    image={"https://images.pexels.com/photos/980074/pexels-photo-980074.jpeg"}
                    secondaryHeader={"What is the Growth Guarantee Scheme?"}
                    secondaryContent={"Launched on 1st July 2024, the Growth Guarantee Scheme (GGS) is the UK government's latest initiative to support small and medium-sized enterprises (SMEs). Introduced in the Spring 2024 Budget, GGS builds on the foundations of the Recovery Loan Scheme (RLS), offering ongoing access to finance for businesses across the UK to drive growth, stability, and innovation."}
                    sectorPoints={[
                        "Managing day-to-day cash flow",
                        "Covering operational overheads",
                        "Purchasing equipment or machinery",
                        "Acquiring inventory and raw materials",
                        "Upgrading technology and infrastructure",
                        "Investing in marketing and advertising",
                        "Refinancing existing business debt",
                        "Paying commercial rent and utilities",
                        "Supporting staff wages and salaries",
                        "Addressing unexpected or emergency costs"
                    ]}
                    sectorQuestion={"How Can the Growth Guarantee Scheme Support Your Business?"}
                />
                <WhyChooseSolution
                    upperHeader={"Your Business, Your Terms"}
                    header={"Why Choose the Growth Guarantee Scheme?"}
                    content={"Whether you're looking to scale, innovate, or strengthen your operations, the Growth Guarantee Scheme offers tailored funding solutions to meet your goals. With flexible terms, competitive rates, and a straightforward application process, accessing the finance your business needs is simple and stress-free."}
                    subContent={"At Alpha Funding Finance, our dedicated team of specialists is here to support your journey—helping you recover, grow, and thrive in today's evolving marketplace. \n\nInvesting in Sustainability? Explore the Green Growth Guarantee Scheme—designed to support businesses investing in eco-friendly assets and green energy solutions."}
                    bottomContent={(
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Apply Now <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    )}
                    question={"Benefits of the Growth Guarantee Scheme"}
                    answers={content}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    )
}
