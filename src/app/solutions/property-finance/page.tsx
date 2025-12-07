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
    title: 'Property Finance',
    description: 'Real estate development & management funding made easier. Commercial, residential, or hybrid-land use property finance for UK businesses.',
    openGraph: {
        url: 'https://www.alpha-funding.co.uk/solutions/property-finance',
        title: 'Property Finance - Real Estate Development Funding | Alpha Funding',
        description: 'Fund your real estate ventures from land acquisition to refurbishment. Flexible property finance solutions for developers.',
        images: [
            {
                url: 'https://www.alpha-funding.co.uk/og-property-finance.jpg',
                width: 1200,
                height: 630,
                alt: 'Property Finance',
            },
        ],
    },
};

export default function PropertyFinance() {

    const content = [
        {
            point: "Borrow Big, Build Bigger",
            content: "Property Finance allows borrowers to borrow large sums of money to carry out exhaustive and large-scale development projects across commercial and residential sectors."
        },
        {
            point: "Better Chances of Funding",
            content: "It is easier to get funded through Alpha Funding than traditional banks. The loan amount is sanctioned much faster with more flexible terms."
        },
        {
            point: "Umbrella Loan Coverage",
            content: "You need not apply for different types of funding for different property objectives. Property finance covers all expenses from A to Z of property development."
        },
        {
            point: "Flexible Finance Options",
            content: "From short-term bridging loans for refurbishment to long-term mortgages for new property assets, we offer comprehensive property finance solutions tailored to your needs."
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
                        name: 'Property Finance',
                    },
                ]}
            />
            <FAQJsonLd
                questions={[
                    {
                        question: 'What is Property Finance?',
                        answer: 'Property Finance allows you to fund all your real estate ventures for growth. It includes bridging loans, mortgages, term loans, and personal loans for property development, acquisition, and refurbishment.',
                    },
                    {
                        question: 'What construction ventures are suitable for Property Finance?',
                        answer: 'Property Finance covers residential property development, land acquisition, property acquisition, commercial property development, mezzanine and development bridging, property refurbishments, and property auctions.',
                    },
                    {
                        question: 'How much can I borrow for property finance?',
                        answer: 'Property Finance allows borrowers to borrow large sums of money for exhaustive and large-scale projects across residential, commercial, and hybrid-land use developments.',
                    },
                    {
                        question: 'What makes Property Finance better than traditional banks?',
                        answer: 'Alpha Funding offers faster sanctions, better approval chances, and more flexible terms than traditional banks. Property finance covers all development expenses from land acquisition to refurbishment in one umbrella loan.',
                    },
                ]}
            />
            <NavBar />
            <div className={"flex bg-light-gray flex-col"}>
                <SolutionsHeaderSection
                    label={"Property Finance"}
                    header={"Real estate development & management funding made easier!"}
                    description={"For commercial, residential, or hybrid-land use, property finance ensures all the cost borne for land, development, or refurbishment is easily achievable. Explore the best property finance options for your venture."}
                    image={"https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg"}
                    sectorPoints={[
                        "Residential Property Development",
                        "Land Acquisition and site assembly",
                        "Property Acquisition and portfolios",
                        "Commercial Property Development",
                        "Mezzanine and Development bridging",
                        "Residential & Commercial refurbishments",
                        "Property Auctions and quick purchases"
                    ]}
                    sectorQuestion={"Key Construction Ventures Suitable for Property Finance"}
                    secondaryContent={"Property Finance allows you to fund all your real estate ventures for growth. From short-term loans for property refurbishment to long-term mortgages for new property assets, there are several options available to cover the funding needs of your ambitious projects. Alternative Finance tools such as Property Finance can help you realize your real estate dreams better than with traditional banks."}
                    secondaryHeader={"What is Property Finance?"}
                />
                <WhyChooseSolution
                    upperHeader={"Comprehensive Real Estate Financing"}
                    header={"Unlock Growth and Productivity Through Property Finance"}
                    content={"Property Finance offers a diversified set of real estate goals without limiting developers to certain aspects. It facilitates the entire construction ecosystem from residential to commercial and everything in between, providing comprehensive support for your development journey."}
                    subContent={"Whether you're acquiring land, developing residential or commercial properties, refurbishing existing assets, or participating in property auctions, our property finance solutions provide the capital you need with flexible terms and faster approvals than traditional lenders."}
                    bottomContent={(
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Apply For Property Finance <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    )}
                    question={"What are the advantages of Property Finance?"}
                    answers={content}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    )
}
