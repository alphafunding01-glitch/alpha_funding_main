import NavBar from "../../../components/navbar";
import Footer from "@/sections/common/footer";
import { SolutionsHeaderSection } from "@/sections/solutions/business-loans/solutions-header-sction";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import {Button, buttonVariants} from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function CommercialPropertyFinance() {

    const content = [
        {
            point: "Possess Your Business Property",
            content: "Enable your business to own its commercial premises instead of renting or leasing, offering long-term security and control over its location."
        },
        {
            point: "Accumulate Equity",
            content: "Through consistent mortgage repayments, your business builds equity in the property, which can be leveraged for additional funding in the future."
        },
        {
            point: "Easier Financial Planning",
            content: "Fixed-rate mortgages provide stable monthly payments, helping your business budget and manage cash flow effectively."
        },
        {
            point: "Increase in Property Value",
            content: "Commercial real estate can grow in value over time, adding worth to your business and potentially increasing profits."
        },
        {
            point: "Income from Tenants",
            content: "Rental payments from tenants occupying the property can help cover mortgage expenses."
        },
        {
            point: "Enhanced Control",
            content: "Owning commercial property grants greater authority over your location, operations, and expansion plans, supporting development as needed."
        }
    ];

    return (
        <div className={"flex flex-col"}>
            <NavBar />
            <div className={"flex bg-light-gray flex-col"}>
                <SolutionsHeaderSection
                    label={"Commercial Property Finance"}
                    header={"Business Expansion Through Commercial Property Finance"}
                    description={
                        "Alpha Funding Finance delivers versatile funding options for buying, upgrading, or enlarging commercial premises, enabling your business to pursue growth prospects with confidence."
                    }
                    image={"https://images.pexels.com/photos/10375864/pexels-photo-10375864.jpeg"}
                    sectorPoints={[
                        "Establish a Permanent Base – Gain full ownership of your premises instead of relying on rental agreements.",
                        "Capitalize on Investment Opportunities – Access funding quickly to seize high-potential property investments.",
                        "Support Business Growth – Expand, consolidate, or redesign your workspace to meet evolving needs.",
                        "Enhance Productivity – Develop environments that support efficiency, collaboration, and employee wellbeing.",
                        "Increase Customer Visibility – Position your business in high-footfall locations to boost accessibility and brand presence.",
                        "Optimise Operations – Relocate strategically to improve logistics and reduce supply chain disruptions."
                    ]}
                    sectorQuestion={"Securing a base for your business"}
                    secondaryHeader={"Understanding Commercial Property Finance"}
                    secondaryContent={
                        "Commercial property finance is a funding solution that allows businesses or investors to purchase, develop, or refinance commercial real estate—such as offices, warehouses, industrial units, or retail premises."
                    }
                />
                <WhyChooseSolution
                    upperHeader={"Secure Your Funding, Strengthen Your Business"}
                    header={"Key Benefits of Our Business Property Finance Solutions"}
                    content={
                        "Alpha Funding’s business property finance is designed with flexibility in mind—offering adjustable term lengths and tailored funding options to suit a wide range of needs. Whether you're looking to acquire, refinance, or develop commercial property, we provide the financial support to help you move forward with confidence."
                    }
                    subContent={
                        "Our solutions are ideal for:\n• Commercial developers planning to purchase or renovate properties\n• Business owners aiming to expand operations or secure their own premises\n\nWhatever your objective, our experienced lending specialists will work closely with you to deliver a solution that aligns with your goals.\n\nSuccess in Action:\nDiscover how we helped secure a £450,000 commercial property loan for a new entertainment venue in London. Read our client success story to learn more."
                    }
                    bottomContent={(
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Get Funding For Your Business <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    )}
                    question={"Reasons to Select Our Business Loans"}
                    answers={content}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    )
}
