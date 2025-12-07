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
    title: 'Business Cash Advance',
    description: 'Innovative cash advance for repayments only when you get paid. Borrow £5,000 to £200,000 with no fixed payments or interest rates.',
    openGraph: {
        url: 'https://www.alpha-funding.co.uk/solutions/business-cash-advance',
        title: 'Business Cash Advance - Flexible Revenue-Based Funding | Alpha Funding',
        description: 'Short-term cash advance for SMEs without fixed payments or security. Pay back from your card sales with no interest.',
        images: [
            {
                url: 'https://www.alpha-funding.co.uk/og-business-cash-advance.jpg',
                width: 1200,
                height: 630,
                alt: 'Business Cash Advance',
            },
        ],
    },
};

export default function BusinessCashAdvance() {

    const content = [
        {
            point: "Minimal Default Risk",
            content: "As no interest rates or fixed monthly repayments are involved, the chances of defaulting are very low since repayments on agreed factor rates are done automatically from earned revenue."
        },
        {
            point: "Zero Interest",
            content: "No interest rates at all. It solely relies on the factor rate for repayments. Be assured of no hidden service charges whatsoever while borrowing."
        },
        {
            point: "Quick Cash Access",
            content: "Lenders can quickly assess your sales history through previous credit sales and release funds rapidly. Business Cash Advance sees the highest approval rates across many financial options."
        },
        {
            point: "Revenue-Based Repayment",
            content: "Pay less when you earn less and more when you earn more. Repayments are automatically deducted as a small percentage of your daily card sales, keeping cash flow predictable."
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
                        name: 'Business Cash Advance',
                    },
                ]}
            />
            <FAQJsonLd
                questions={[
                    {
                        question: 'What is Business Cash Advance?',
                        answer: 'Business Cash Advance, also known as Merchant Cash Advance, allows SMEs to quickly get funded up to £200,000. Instead of interest, a factor rate is charged, and repayments are made automatically from your credit and debit card sales revenue.',
                    },
                    {
                        question: 'How do repayments work with Business Cash Advance?',
                        answer: 'Repayments are linked to your revenue from credit and debit card sales. A fixed small percentage (factor rate) is automatically deducted from your daily card sales. There are no fixed interest rates or set monthly payments.',
                    },
                    {
                        question: 'Who is eligible for Business Cash Advance?',
                        answer: 'UK businesses that accept credit/debit card payments, have a UK bank account, process at least £2,500 monthly in card payments, are LLPs or registered sole traders, and have been operating for more than three months.',
                    },
                    {
                        question: 'What are the key benefits over traditional loans?',
                        answer: 'Zero interest rates (only factor rates), minimal default risk, quick cash access with high approval rates, and flexible repayments that scale with your revenue - pay less when you earn less, more when you earn more.',
                    },
                ]}
            />
            <NavBar />
            <div className={"flex bg-light-gray flex-col"}>
                <SolutionsHeaderSection
                    label={"Business Cash Advance"}
                    header={"Innovative cash advance for repayments only when you get paid"}
                    description={"Short-term cash advance for SMEs without fixed payments, terms, or any security. Borrow from £5,000 to £200,000 and pay back the advances with a small percentage from your future credit/debit sales."}
                    image={"https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg"}
                    sectorPoints={[
                        "Accept payments using credit and debit cards",
                        "UK trading business with UK-based bank account",
                        "Monthly payment processing of at least £2,500",
                        "LLPs, limited companies, or registered sole traders",
                        "More than three months of active operations"
                    ]}
                    sectorQuestion={"Who is eligible for Business Cash Advance?"}
                    secondaryContent={"Business Cash Advance enables businesses to pay back with the revenue they generate through their credit and debit card sales. Lenders charge a fixed, small percent factor rate on the revenue. The revenue directs the repayment rates - you only repay from your earned income. There are absolutely no fixed interest rates or set monthly payments with the Merchant Cash Advance Facility."}
                    secondaryHeader={"What is Business Cash Advance?"}
                />
                <WhyChooseSolution
                    upperHeader={"Flexible Revenue-Based Financing"}
                    header={"Win-Win Funding Solution for Growing Businesses"}
                    content={"Business Cash Advance greatly reduces financial stress on borrowers by keeping repayment rates predictable and linear to growth. Pay less when you earn less and more when you earn more - a true win-win situation for both borrowers and lenders."}
                    subContent={"A Merchant Cash Advance is a quick and flexible option to borrow funds for your business if you handle payments through a card machine (PDQ) and/or an internet payment system. With the highest approval rates and zero interest, it's becoming increasingly popular among UK SMEs."}
                    bottomContent={(
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Apply For Cash Advance <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    )}
                    question={"Key Benefits of Business Cash Advance"}
                    answers={content}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    )
}
