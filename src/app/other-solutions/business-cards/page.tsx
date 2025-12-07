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
    title: 'Business Credit Cards',
    description: 'Corporate credit cards for UK businesses. Manage cash flow, track expenses, and control staff spending with flexible business credit cards.',
    openGraph: {
        url: 'https://www.alpha-funding.co.uk/other-solutions/business-cards',
        title: 'Business Credit Cards - Corporate Cards | Alpha Funding',
        description: 'Get business credit cards with flexible limits and interest-free periods. Perfect for cash flow and expense management.',
        images: [
            {
                url: 'https://www.alpha-funding.co.uk/og-business-cards.jpg',
                width: 1200,
                height: 630,
                alt: 'Business Credit Cards',
            },
        ],
    },
};

export default function BusinessCards() {

    const content = [
        {
            point: "Cash Flow Management",
            content: "Use as a revolving credit facility for short-term expenses when working capital is insufficient. Pay suppliers, cover renovations, purchase inventory, or address working capital needs."
        },
        {
            point: "Expense Tracking & Control",
            content: "Monitor and manage staff spending effectively. Set individual spending limits for employees to stay on top of business expenses and daily operational costs."
        },
        {
            point: "Interest-Free Periods",
            content: "Most lenders offer interest-free periods on corporate credit cards (typically 45-90 days). Only pay interest if you exceed this term, making it cost-effective for managing cash flow."
        },
        {
            point: "Build Business Credit",
            content: "Consistently paying credit card bills on time improves your business credit score, demonstrating trustworthiness and qualifying you for additional financing in the future."
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
                        name: 'Business Cards',
                    },
                ]}
            />
            <FAQJsonLd
                questions={[
                    {
                        question: 'How do business credit cards work?',
                        answer: 'Business credit cards are issued against a business account and provide a credit limit based on your business credit score. They work like personal cards but offer features tailored for business use, including expense tracking and employee cards.',
                    },
                    {
                        question: 'What are the qualifications for business credit cards?',
                        answer: 'Your firm must be registered and trading. As unsecured lending, criteria are strict and consider your credit rating, trading history, revenue, and profit. They are commonly used by creditworthy businesses.',
                    },
                    {
                        question: 'Can I get a business card with bad credit?',
                        answer: 'While you will undergo a credit check, some lenders may offer modest initial credit limits. By repaying on time, you can improve your credit score and qualify for higher limits or better rates later.',
                    },
                    {
                        question: 'What are typical interest rates on business credit cards?',
                        answer: 'Interest rates typically range between 15% and 25%, higher than personal cards. However, many offer interest-free periods (45-90 days), so paying the balance in full avoids interest charges entirely.',
                    },
                ]}
            />
            <NavBar />
            <div className={"flex bg-light-gray flex-col"}>
                <SolutionsHeaderSection
                    label={"Business Credit Cards"}
                    header={"Flexible credit solutions for business expenses"}
                    description={"Business Cards, often known as corporate credit cards, are an excellent way for businesses to easily obtain additional funds when required. They're excellent for controlling cash flow, tracking expenses, and spreading costs."}
                    image={"https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg"}
                    sectorPoints={[
                        "Cash flow management for short-term needs",
                        "Employee expense tracking and control",
                        "Interest-free periods (45-90 days typical)",
                        "Individual spending limits per employee",
                        "Build and improve business credit score",
                        "Emergency working capital access",
                        "Supplier payments and operational costs"
                    ]}
                    sectorQuestion={"How can Business Credit Cards help?"}
                    secondaryContent={"A business credit card provides a credit limit based on your business's credit score. You can focus on interest rates if balances aren't paid in full monthly. Most lenders offer interest-free periods (typically 45 days, some up to 90 days), meaning you're only charged interest if you exceed this term."}
                    secondaryHeader={"How do Business Credit Cards work?"}
                />
                <WhyChooseSolution
                    upperHeader={"Smart Business Financing"}
                    header={"Revolving Credit When You Need It"}
                    content={"A corporate credit card can manage short-term cash flow expenses when working capital is insufficient, effectively acting as a revolving credit facility. Whether paying suppliers, renovating, purchasing inventory, or requiring working capital, a company credit card serves as an emergency loan."}
                    subContent={"Watch and manage staff spending effectively - beneficial for firms with regular operational expenses. Set individual employee spending limits to maintain control. Consistent on-time payments improve your business credit score, demonstrating trustworthiness for future financing."}
                    bottomContent={(
                        <Link href={"/contact"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Apply For Business Card <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    )}
                    question={"Key Benefits of Business Credit Cards"}
                    answers={content}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    )
}
