import NavBar from "../../../components/navbar";
import Footer from "@/sections/common/footer";
import { SolutionsHeaderSection } from "@/sections/solutions/business-loans/solutions-header-sction";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import { buttonVariants } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BreadcrumbJsonLd, FAQJsonLd } from 'next-seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Business Bank Accounts',
    description: 'Find the perfect business bank account for your UK company. Compare free banking, startup accounts, and specialized services for contractors and traders.',
    openGraph: {
        url: 'https://www.alpha-funding.co.uk/other-solutions/business-bank-accounts',
        title: 'Business Bank Accounts - Find the Right Bank | Alpha Funding',
        description: 'Connect your business to the right bank with our expert matching service. Free banking, low costs, and tailored services.',
        images: [
            {
                url: 'https://www.alpha-funding.co.uk/og-bank-accounts.jpg',
                width: 1200,
                height: 630,
                alt: 'Business Bank Accounts',
            },
        ],
    },
};

export default function BusinessBankAccounts() {

    const content = [
        {
            point: "Switching Services",
            content: "Access better banking services at decreased service costs. We help you switch to banks offering superior features and lower fees for your business."
        },
        {
            point: "Startup Accounts",
            content: "Specialized banking solutions for new business entrepreneurs. Get started with accounts designed for early-stage companies with minimal fees and maximum support."
        },
        {
            point: "Bad Credit Solutions",
            content: "Banking options for businesses with low credit scores. We connect you with lenders who understand and accommodate credit challenges."
        },
        {
            point: "Free Banking Options",
            content: "Access virtually free limited banking services perfect for small businesses. Minimize operational costs while maintaining professional banking services."
        },
        {
            point: "Contractor Banking",
            content: "Specialized accounts for contractors and business leverage models. Banking tailored to the unique needs of contract-based businesses."
        },
        {
            point: "Individual Trader Accounts",
            content: "Perfect banking solutions for lone business owners. Simple, straightforward accounts for sole traders and individual operators."
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
                        name: 'Other Solutions',
                        item: 'https://www.alpha-funding.co.uk/other-solutions',
                    },
                    {
                        name: 'Business Bank Accounts',
                    },
                ]}
            />
            <FAQJsonLd
                questions={[
                    {
                        question: 'How do I choose the right business bank account?',
                        answer: 'Consider factors like monthly fees, transaction costs, branch access, online banking features, and specialized services. For SMEs starting anew, free accounts may be advantageous. Compare multiple providers to find the best deals.',
                    },
                    {
                        question: 'Can I get a business bank account with bad credit?',
                        answer: 'Yes, we connect businesses with low credit scores to banks that accommodate credit challenges. While options may be more limited, specialized banking solutions are available.',
                    },
                    {
                        question: 'What is free banking for businesses?',
                        answer: 'Free banking offers virtually free limited banking services, typically with no monthly fees for basic transactions. This can be highly advantageous for small businesses and startups looking to minimize costs.',
                    },
                    {
                        question: 'Do contractors need specialized business accounts?',
                        answer: 'Yes, contractor banking accounts are tailored to the unique needs of contract-based businesses, offering features like flexible cash flow management and business leverage tools.',
                    },
                ]}
            />
            <NavBar />
            <div className={"flex bg-light-gray flex-col"}>
                <SolutionsHeaderSection
                    label={"Business Bank Accounts"}
                    header={"Let's connect your business to the right bank!"}
                    description={"All types of businesses, with correct and accurate understanding of finance requirements and needs, can be matched with the best banks that offer the most relevant services. We help you determine which business bank account is the perfect fit for your firm's needs."}
                    image={"https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg"}
                    sectorPoints={[
                        "NO EXTRA COSTS - Virtually-free service to customers",
                        "TRUSTED LENDERS - Verified fund providers",
                        "COMPLETE TRANSPARENCY - Easy and informed decisions",
                        "FINANCE SPECIALISTS - Expert financial counsel",
                        "Switching services for better rates",
                        "Startup-friendly banking solutions",
                        "Bad credit account options"
                    ]}
                    sectorQuestion={"Why Compare Business Bank Accounts?"}
                    secondaryContent={"Different business bank accounts offer a variety of perks; you must decide which ones are most crucial for your organization. For instance, establishing a free account may be the most advantageous benefit for SMEs starting anew, although some small firms may prioritize cheap cash deposit costs or branch access. Comparing multiple bank providers is the greatest approach to determine the best business banking deals."}
                    secondaryHeader={"Find the Perfect Banking Match for Your Business"}
                />
                <WhyChooseSolution
                    upperHeader={"Tailored Banking Solutions"}
                    header={"Business Account Types to Suit Every Need"}
                    content={"Knowing what better banking services are available might assist you in determining which business bank account is the perfect fit for your firm's needs. We match you with banks offering the most relevant services based on your business type, size, and financial requirements."}
                    subContent={"Whether you're a startup entrepreneur, contractor, individual trader, or established business looking to switch for better rates, we connect you to the right banking partner with complete transparency and no hidden costs."}
                    bottomContent={(
                        <Link href={"/contact"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Find Your Bank <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    )}
                    question={"Business Banking Options Available"}
                    answers={content}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    )
}
