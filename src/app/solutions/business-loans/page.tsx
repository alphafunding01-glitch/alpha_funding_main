import NavBar from "../../../components/navbar";
import Footer from "@/sections/common/footer";
import { SolutionsHeaderSection } from "@/sections/solutions/business-loans/solutions-header-sction";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { BreadcrumbJsonLd, FAQJsonLd } from 'next-seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Business Loans',
    description: 'Quick & flexible business loans for UK businesses. Access working capital for expansion, cash flow, inventory, and more. Fast approval and tailored solutions.',
    openGraph: {
        url: 'https://www.alpha-funding.co.uk/solutions/business-loans',
        title: 'Business Loans - Fast & Flexible Funding | Alpha Funding',
        description: 'Get the working capital you need with our fast and affordable business loans. Tailored solutions for UK businesses.',
        images: [
            {
                url: 'https://www.alpha-funding.co.uk/og-business-loans.jpg',
                width: 1200,
                height: 630,
                alt: 'Business Loans',
            },
        ],
    },
};

export default function BusinessLoans() {

    const content = [
        {
            point: "Flexible Funding That Fits",
            content: "Whether you're scaling operations, stabilising cash flow, or covering unexpected costs, our financing solutions are built to adapt to your business needs."
        },
        {
            point: "Fast, Hassle-Free Access",
            content: "Need capital quickly? Our unsecured loans provide a fast, straightforward way to access funds—without the need for asset collateral."
        },
        {
            point: "Custom Solutions for Larger Goals",
            content: "For substantial financing needs, our secured loans offer higher borrowing limits and longer repayment terms—perfect for businesses seeking over £500,000 in short-term capital or a more extended repayment plan."
        },
        {
            point: "Rapid Capital When You Need It",
            content: "Access business funding quickly and efficiently—ready to use for a wide range of purposes to keep your business moving forward."
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
                        name: 'Business Loans',
                    },
                ]}
            />
            <FAQJsonLd
                questions={[
                    {
                        question: 'What can I use a business loan for?',
                        answer: 'Business loans can be used for expanding operations, marketing campaigns, managing cash flow, consolidating debts, purchasing inventory, covering payroll, renovating premises, or handling unexpected costs including VAT bills.',
                    },
                    {
                        question: 'How quickly can I access funds?',
                        answer: 'Our unsecured loans provide fast, straightforward access to funds without the need for asset collateral. The exact timeline depends on your specific situation and application.',
                    },
                    {
                        question: 'What is the difference between secured and unsecured business loans?',
                        answer: 'Unsecured loans provide quick access without requiring collateral, while secured loans offer higher borrowing limits (over £500,000) and longer repayment terms for substantial financing needs.',
                    },
                    {
                        question: 'How much can I borrow?',
                        answer: 'Loan amounts vary based on your business needs and circumstances. Secured loans are available for businesses seeking over £500,000 in short-term capital or extended repayment plans.',
                    },
                ]}
            />
            <NavBar />
            <div className={"flex bg-light-gray flex-col"}>
                <SolutionsHeaderSection
                    label={"Business Loans"}
                    header={"Quick & Flexible Funding Solutions for UK Businesses"}
                    description={"Access the working capital you need, when you need it. Whether you're investing in equipment, stocking up on inventory, or improving your cash flow, our fast and affordable business loans are tailored to support your unique goals."}
                    image={"https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg"}
                    sectorPoints={[
                        "Expanding your business operations",
                        "Running marketing and advertising campaigns",
                        "Managing day-to-day cash flow",
                        "Consolidating existing debts",
                        "Purchasing stock or inventory",
                        "Covering staff wages and payroll",
                        "Renovating or upgrading your premises",
                        "Handling unexpected costs, including VAT bills"
                    ]}
                    sectorQuestion={"Empowering UK Businesses to Thrive"}
                    secondaryContent={"Whether you're planning to scale up, streamline operations, or take advantage of a new opportunity, we're here to help you secure the funding that fits your business goals."}
                    secondaryHeader={"Getting the Right Business Loan Made Simple"}
                />
                <WhyChooseSolution
                    upperHeader={"How Can Loan or Asset Refinance Benefit Your Business?"}
                    header={"Unlock Growth and Productivity Through Smart Financing"}
                    content={"Refinancing your loans or assets can ease financial pressure, improve cash flow, and free up capital to support growth, innovation, and long-term productivity. Our tailored solutions are designed to help you unlock your business's full potential and take advantage of new opportunities."}
                    subContent={"Asset refinancing can also help you break free from high-interest or outdated finance agreements. We can restructure your existing deal with your current lender and offer bespoke terms that better suit your needs and financial goals."}
                    bottomContent={(
                        <></>
                    )}
                    question={"Why Partner with Us for Your Business Loan?"}
                    answers={content}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    )
}
