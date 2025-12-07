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
    title: 'Refinance',
    description: 'Enhance your business cash flow with smart refinance solutions. Lower interest rates, unlock asset equity, and improve financial flexibility.',
    openGraph: {
        url: 'https://www.alpha-funding.co.uk/solutions/refinance',
        title: 'Business Refinance Solutions | Alpha Funding',
        description: 'Free up working capital and optimize your business finances with our tailored refinance solutions.',
        images: [
            {
                url: 'https://www.alpha-funding.co.uk/og-refinance.jpg',
                width: 1200,
                height: 630,
                alt: 'Refinance Solutions',
            },
        ],
    },
};

export default function Refinance() {

    const content = [
        {
            point: "Lower Interest Costs",
            content: "Refinancing your existing loan or hard asset can lead to reduced interest rates and monthly payments—helping your business save significantly over time."
        },
        {
            point: "Stronger Cash Flow",
            content: "Lower repayments mean more working capital. Refinance solutions free up funds that can be redirected to growth, operations, or new opportunities."
        },
        {
            point: "Simplified Debt Management",
            content: "Consolidate multiple business debts into a single, manageable loan. This not only simplifies repayments but may also reduce your total interest burden."
        },
        {
            point: "Unlock Asset Equity",
            content: "Refinancing can help you unlock the built-up equity in your equipment or vehicles—providing access to capital without taking on new debt."
        },
        {
            point: "Enhanced Credit Profile",
            content: "Consistent, consolidated repayments can strengthen your business's credit standing, improving your chances of securing future funding."
        },
        {
            point: "Fewer Monthly Repayments",
            content: "Streamline your finances with fewer repayments to track and manage—reducing administrative load and interest accumulation."
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
                        name: 'Refinance',
                    },
                ]}
            />
            <FAQJsonLd
                questions={[
                    {
                        question: 'What is business refinancing?',
                        answer: 'Business refinancing involves replacing your existing loan or asset finance with a new agreement that offers better terms, lower interest rates, or improved cash flow. It can also help unlock equity in your assets.',
                    },
                    {
                        question: 'What are the benefits of refinancing?',
                        answer: 'Benefits include lower interest costs, stronger cash flow, simplified debt management, unlocking asset equity, enhanced credit profile, and fewer monthly repayments to manage.',
                    },
                    {
                        question: 'Can I refinance multiple debts at once?',
                        answer: 'Yes, you can consolidate multiple business debts into a single, manageable loan. This simplifies repayments and may reduce your total interest burden.',
                    },
                    {
                        question: 'How does asset refinancing work?',
                        answer: 'Asset refinancing allows you to unlock the built-up equity in your equipment or vehicles, providing access to capital without taking on new debt. We can restructure your existing deal with better terms.',
                    },
                ]}
            />
            <NavBar />
            <div className={"flex bg-light-gray flex-col"}>
                <SolutionsHeaderSection
                    label={"Refinance"}
                    header={"Enhance Your Business Cash Flow with Smart Refinance Solutions"}
                    description={"Unlock new opportunities with our tailored business loan and vehicle refinance options. Free up working capital, lower your monthly obligations, and invest in essential assets or equipment, without compromising your business growth."}
                    image={"https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg"}
                    sectorPoints={[
                        "Improve loan terms to better suit your current financial position",
                        "Combine multiple agreements into one streamlined solution",
                        "Reduce interest costs and improve repayment efficiency",
                        "Simplify cash flow management with fewer monthly obligations",
                        "Access working capital for expansion, staffing, or operations",
                        "Unlock equity from owned assets without incurring new debt"
                    ]}
                    secondaryHeader={"How Can Business Loan or Asset Refinance Help You?"}
                    secondaryContent={"Refinancing offers a strategic way for businesses to improve liquidity and optimize financial performance. Whether you're looking to unlock the value tied up in existing assets or improve the terms of your current financing, refinancing can support smarter business decisions."}
                    sectorQuestion={"Why Consider Asset & Equipment Refinancing?"}
                />
                <WhyChooseSolution
                    upperHeader={"How Can Loan or Asset Refinance Benefit Your Business?"}
                    header={"Tailored Refinance Solutions for Growth and Efficiency"}
                    content={"Refinancing your business loans or assets can relieve financial pressure, improve cash flow, and fuel sustainable growth. Our tailored refinancing solutions are designed to help you unlock capital, invest in innovation, and increase operational efficiency, so you can focus on driving your business forward."}
                    subContent={"Asset refinancing also offers a smart way to break free from costly, outdated finance agreements. We can work with your current lender to restructure the terms, replacing high-interest or rigid contracts with competitive, flexible arrangements that align with your business needs."}
                    bottomContent={(
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Apply For Refinance <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    )}
                    question={"Key Benefits of Business Loan & Asset Refinance"}
                    answers={content}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    )
}
