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
    title: 'Bridging Loans',
    description: 'Short-term business bridging loans to bridge financial gaps. Quick property finance, development funding, and interim financing for UK businesses.',
    openGraph: {
        url: 'https://www.alpha-funding.co.uk/other-solutions/bridging-loans',
        title: 'Bridging Loans - Short-term Property Finance | Alpha Funding',
        description: 'Bridge the gap with fast short-term loans. Property purchases, renovations, and business financing.',
        images: [
            {
                url: 'https://www.alpha-funding.co.uk/og-bridging-loans.jpg',
                width: 1200,
                height: 630,
                alt: 'Bridging Loans',
            },
        ],
    },
};

export default function BridgingLoans() {

    const content = [
        {
            point: "Rapid Access to Funds",
            content: "Apply online and receive approval within 24 hours. If accepted, funds can be in your account within two weeks - significantly faster than traditional term loans."
        },
        {
            point: "Property Purchase Flexibility",
            content: "Purchase a new property before selling your current one. Use equity in your current property as a down payment on the new one, perfect for property chains or investment opportunities."
        },
        {
            point: "Versatile Usage",
            content: "Ideal for property acquisition, renovations, new construction projects, working capital, cash flow management, and awaiting long-term financing. Commercial or residential applications supported."
        },
        {
            point: "No Credit Barriers",
            content: "Even with poor credit, you may qualify if you have equity, repayment means, and suitable security. Focus is on asset value rather than credit history alone."
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
                        name: 'Bridging Loans',
                    },
                ]}
            />
            <FAQJsonLd
                questions={[
                    {
                        question: 'What are bridging loans?',
                        answer: 'Bridging loans provide short-term business credit to bridge financial gaps between multiple loans or property transactions. They are commonly used for property development, renovations, and awaiting long-term financing, with legal charges against borrower assets.',
                    },
                    {
                        question: 'How quickly can I get a bridging loan?',
                        answer: 'Bridging loans are notably fast - you can apply online, receive approval within 24 hours, and get funds within two weeks. Some can be completed in 24-48 hours, much faster than traditional term loans.',
                    },
                    {
                        question: 'What can I use a bridging loan for?',
                        answer: 'Typically used for property acquisition and rehabilitation (commercial or residential), renovations, new construction, managing working capital, covering short-term expenses, or awaiting equity financing rounds. Requires a clear exit strategy.',
                    },
                    {
                        question: 'What are bridging loan interest rates?',
                        answer: 'Due to their specialized short-term nature, interest rates may be higher than regular term loans. However, "rolled up" interest options allow you to pay a flat sum at the end, beneficial if you lack funds in early phases.',
                    },
                ]}
            />
            <NavBar />
            <div className={"flex bg-light-gray flex-col"}>
                <SolutionsHeaderSection
                    label={"Bridging Loans"}
                    header={"Bridge financial gaps with short-term credit"}
                    description={"Alpha Funding can help you bridge the financial gaps between multiple loans by providing short-term business credit. A common financial instrument used by real estate owners and business investors for loan deficits and a variety of other objectives."}
                    image={"https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg"}
                    sectorPoints={[
                        "Purchase property before selling current one",
                        "Finance renovations and new construction",
                        "Await long-term financing or equity rounds",
                        "Cover working capital or cash flow gaps",
                        "Property development finance (commercial/residential)",
                        "24-hour approval possible",
                        "Funds available within two weeks"
                    ]}
                    sectorQuestion={"When to Use Bridging Loans?"}
                    secondaryContent={"A bridge loan enables you to purchase another property before selling your current one. It is frequently used to finance renovations or new construction projects prior to obtaining a conventional mortgage. Sometimes called 'swing loan,' 'gap financing,' or 'interim financing,' it uses your current property equity as leverage for new purchases."}
                    secondaryHeader={"How do Bridging Loans work?"}
                />
                <WhyChooseSolution
                    upperHeader={"Fast, Flexible Short-Term Finance"}
                    header={"The Perfect Bridge to Your Next Opportunity"}
                    content={"Bridging finance is a type of commercial finance that permits you to obtain funding for a brief period. Businesses and individuals alike can benefit from bridging loans. As long as you meet eligibility requirements and have a viable exit strategy, you can use funds for property development, working capital, or covering short-term cash flow difficulties."}
                    subContent={"While bridge loans provide rapid cash flow, they come with higher interest rates and typically require collateral. Think of it as a bridge getting you from point A to point B until you can repay in full or acquire permanent financing. The speed advantage - 24-48 hours completion versus weeks for term loans - makes it ideal for time-sensitive opportunities."}
                    bottomContent={(
                        <Link href={"/contact"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Apply For Bridging Loan <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    )}
                    question={"Key Benefits of Bridging Loans"}
                    answers={content}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    )
}
