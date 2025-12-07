import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function ConstructionSector() {
    const content = [
        {
            point: "Increase purchasing power",
            content:
                "Buy essential materials in bulk and mitigate the risk of price fluctuations or shortages."
        },
        {
            point: "Finance major equipment with ease",
            content:
                "Spread the cost of essential machinery and tools with flexible repayment terms."
        },
        {
            point: "Invest beyond equipment",
            content:
                "Use our bespoke business loans to cover recruitment, marketing, or operational growth."
        },
        {
            point: "Unlock capital through asset refinance",
            content:
                "Release funds tied up in existing equipment to reinvest where it matters most."
        },
        {
            point: "Recover from the impact of COVID-19",
            content:
                "If your business was affected by the pandemic, our Recovery Loan options can support your comeback."
        }
    ];

    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="flex bg-light-gray flex-col">
                <SectorsHeaderSection
                    title="CONSTRUCTION"
                    header="Construction Finance Solutions to Build With Confidence, Grow With Purpose"
                    description="From managing daily operations to investing in large-scale equipment, construction businesses require agile and dependable financing. At Alpha Funding, we offer tailored construction finance solutions designed to strengthen your capabilities and support your long-term growth."
                    subHeader="Finance That Supports Every Stage of Construction"
                    image="https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg"
                    subDescription="Whether you’re facing a short-term cash flow gap or looking to acquire essential machinery, our business loans and asset finance products offer the flexibility, speed, and reliability your projects demand. With our support, you can focus on building what matters—on time and on budget."
                    cards={[
                        {
                            title: "Business Loans",
                            description:
                                "Capital That Powers Your Project Pipeline. Our construction business loans are designed to meet the demands of an evolving industry, providing financial support for both planned and unexpected business needs.",
                            points: [
                                "Maintain steady cash flow across multiple projects",
                                "Fund expansion into new markets or service areas",
                                "Manage unplanned costs and project delays",
                                "Upgrade site infrastructure and operational efficiency",
                                "Hire skilled labour and expand your team",
                                "Invest in sustainable building methods and materials"
                            ],
                            url: ""
                        },
                        {
                            title: "Asset & Equipment Finance",
                            description:
                                "Acquire the machinery and tools you need—without the upfront burden. Access essential equipment and tools with hire purchase or leasing solutions, structured around your budget and project timelines.",
                            points: [
                                "Excavators, bulldozers, dumpers, and cranes",
                                "Rollers, loaders, and heavy machinery",
                                "Scaffolding and safety decking",
                                "Surveying tools and welding machinery",
                                "Hand tools, power tools, and generators",
                                "Portacabins and on-site welfare units"
                            ],
                            url: ""
                        }
                    ]}
                />

                <WhyChooseSolution
                    upperHeader="Addressing Industry-Specific Challenges"
                    header="Finance That Keeps Your Construction Business Moving"
                    content="Alpha Funding understands the complexities of the construction industry, from fluctuating material costs to labour shortages and supply chain disruptions. Our finance solutions are built to adapt, so your business can continue to perform with strength and agility."
                    subContent="Success Story: Explore how we helped a residential builder secure construction company financing through Alpha Funding."
                    bottomContent={
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Get Funded Today <ArrowUpRight className="w-4 h-4"/>
                        </Link>
                    }
                    question=""
                    answers={content}
                />

                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    );
}
