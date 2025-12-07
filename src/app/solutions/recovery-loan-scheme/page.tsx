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
    title: 'Recovery Loan Scheme (RLS)',
    description: 'Government-backed Recovery Loan Scheme for COVID-19 affected businesses. Access funding up to £10m with flexible terms for growth and recovery.',
    openGraph: {
        url: 'https://www.alpha-funding.co.uk/solutions/recovery-loan-scheme',
        title: 'Recovery Loan Scheme (RLS) - COVID-19 Business Support | Alpha Funding',
        description: 'Government-backed funding for pandemic-affected businesses. Get support up to £10m for cash flow, growth, and recovery.',
        images: [
            {
                url: 'https://www.alpha-funding.co.uk/og-rls.jpg',
                width: 1200,
                height: 630,
                alt: 'Recovery Loan Scheme',
            },
        ],
    },
};

export default function RecoveryLoanScheme() {

    const content = [
        {
            point: "Government-Backed Support",
            content: "The Recovery Loan Scheme provides government-backed finance to help businesses affected by COVID-19 recover and grow during the UK's economic recovery period."
        },
        {
            point: "Flexible Funding Up to £10M",
            content: "Access substantial funding from £25,001 to £10 million through various finance options including term loans, invoice finance, overdrafts, and asset finance."
        },
        {
            point: "Multiple Finance Options",
            content: "Choose from term loans (6 years), invoice finance (3 years), business overdrafts (6 years), or asset finance (3 years) based on your business needs."
        },
        {
            point: "Wide Eligibility",
            content: "Businesses of all sizes can apply, even if you've previously borrowed through CBILS or BBLS schemes. Simply meet the basic criteria and demonstrate pandemic impact."
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
                        name: 'Recovery Loan Scheme',
                    },
                ]}
            />
            <FAQJsonLd
                questions={[
                    {
                        question: 'What is the Recovery Loan Scheme (RLS)?',
                        answer: 'The UK government Recovery Loan Scheme is a finance/loan support instrument for businesses affected by the COVID-19 pandemic. It provides funding from £25,001 to £10 million for legitimate business purposes including cash flow, wages, growth, and operations.',
                    },
                    {
                        question: 'Can I apply if I already borrowed through CBILS or BBLS?',
                        answer: 'Yes, you are eligible to apply for financial assistance under the Recovery Loan Scheme even if you have already borrowed money through the previously mentioned CBILS or BBLS schemes.',
                    },
                    {
                        question: 'What finance options are available under RLS?',
                        answer: 'RLS offers four key funding options: Term Loans (£25,001-£10M, 6 years), Invoice Finance (£10,000-£10M, 3 years), Business Overdrafts (£25,001-£10M, 6 years), and Asset Finance (£10,000-£10M, 3 years).',
                    },
                    {
                        question: 'Who can apply for the Recovery Loan Scheme?',
                        answer: 'Businesses of any size can apply if they: have been trading in the UK for at least 12 months, had viable operations before the pandemic, experienced genuine COVID-19 impact, and are not in legal collective insolvency proceedings.',
                    },
                ]}
            />
            <NavBar />
            <div className={"flex bg-light-gray flex-col"}>
                <SolutionsHeaderSection
                    label={"Recovery Loan Scheme (RLS)"}
                    header={"Business Hit By Pandemic?"}
                    description={"Take full advantage of the government's newly released Recovery Loan Scheme (RLS) for COVID-19 hit businesses and get funded up to £10m to grow and thrive again during the UK's economic recovery."}
                    image={"https://images.pexels.com/photos/3970330/pexels-photo-3970330.jpeg"}
                    sectorPoints={[
                        "Cash flow management and operational costs",
                        "Wages payment and payroll support",
                        "Business growth and investment opportunities",
                        "New hiring and staffing expansion",
                        "Inventory stocking and supply management",
                        "Property renovation and maintenance",
                        "Equipment upgrades and asset purchases",
                        "VAT bills and tax obligations"
                    ]}
                    sectorQuestion={"What is Recovery Loan Scheme (RLS)?"}
                    secondaryContent={"The UK government's Recovery Loan Scheme (RLS) is a finance/loan support instrument for businesses affected in the aftermath of COVID-19 pandemic. Businesses of any size can apply for RLS and make use of the granted funds for legitimate business purposes. RLS is an extension and replacement to the previously released COVID-19 loan schemes — CBILS and BBLS, both of which came to an end on Mar 31, 2021."}
                    secondaryHeader={"Government-Backed Finance for Recovery & Growth"}
                />
                <WhyChooseSolution
                    upperHeader={"Finance Options Available Under RLS"}
                    header={"Choose the Right Funding Solution for Your Business"}
                    content={"The Recovery Loan Scheme offers four flexible finance options tailored to different business needs. Whether you need working capital, asset funding, or invoice financing, RLS provides government-backed support to help your business recover and grow."}
                    subContent={"Following are the key funding options available: Term Loans (£25,001-£10M, 6 year tenure), Invoice Finance (£10,000-£10M, 3 year tenure), Business Overdrafts (£25,001-£10M, 6 year tenure), and Asset Finance (£10,000-£10M, 3 year tenure)."}
                    bottomContent={(
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Apply For RLS <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    )}
                    question={"Why Choose Recovery Loan Scheme for Your Business?"}
                    answers={content}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    )
}
