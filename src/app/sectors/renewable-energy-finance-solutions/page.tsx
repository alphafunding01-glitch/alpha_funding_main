import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function EnergyRenewables() {
    const content = [
        {
            point: "Fund clean energy infrastructure",
            content: "Secure financing for solar arrays, wind farms, and hydro systems—covering installation, upgrades, and upkeep."
        },
        {
            point: "Finance efficiency upgrades",
            content: "Support eco-friendly building improvements such as insulation, smart meters, and green heating systems."
        },
        {
            point: "Smooth cash flow for long projects",
            content: "Access working capital to bridge funding gaps while projects are in development or awaiting government incentives."
        },
        {
            point: "Support the EV transition",
            content: "Flexible loans and leases to grow your electric vehicle fleets, charging networks, or logistics systems."
        },
        {
            point: "Unlock capital from assets",
            content: "Refinance existing equipment or infrastructure to release equity and reinvest into future-ready projects."
        }
    ];

    return (
        <div className={"flex flex-col"}>
            <NavBar />
            <div className={"flex bg-[#f9fafb] flex-col"}>
                <SectorsHeaderSection
                    title={"Energy & Renewables"}
                    header={"Finance Solutions Driving the Green Revolution"}
                    description={
                        "We help renewable energy businesses access tailored finance to accelerate growth, embrace sustainability, and meet rising demand for clean energy."
                    }
                    subHeader={"Financial support built for energy pioneers"}
                    image={"https://images.pexels.com/photos/885350/pexels-photo-885350.jpeg"}
                    subDescription={
                        "With increasing pressure to balance profitability and sustainability, renewable energy companies need flexible funding that adapts to their unique challenges. \n\n" +
                        "Our sector-focused finance solutions—from business loans to asset finance—equip you to deliver on green commitments, invest in next-gen technologies, and strengthen your market position in a rapidly evolving industry."
                    }
                    cards={[
                        {
                            title: "Business Loans",
                            description: "Customisable funding designed to support every stage of your energy project lifecycle.",
                            points: [
                                "Bridge delays in grant or subsidy payments",
                                "Accelerate research and development",
                                "Expand operations into new markets",
                                "Invest in sustainability certifications",
                                "Hire skilled technical teams",
                                "Finance large-scale installations",
                                "Support marketing and awareness campaigns",
                                "Strengthen compliance and reporting processes"
                            ],
                            url: ""
                        },
                        {
                            title: "Asset Finance",
                            description: "Obtain the essential equipment and green technologies that power renewable energy progress.",
                            points: [
                                "Solar panels & inverters",
                                "Wind turbines & monitoring systems",
                                "Hydroelectric and tidal generators",
                                "Geothermal heating technology",
                                "Battery storage and smart grids",
                                "Biomass and biofuel equipment",
                                "EV fleets and charging stations",
                                "Energy-efficient building systems"
                            ],
                            url: ""
                        }
                    ]}
                />
                <WhyChooseSolution
                    upperHeader={"Addressing tomorrow’s energy challenges today"}
                    header={"Finance designed for a cleaner, smarter energy future"}
                    content={
                        "The renewable energy sector faces unique demands—from high upfront costs to ever-changing policy frameworks. We create flexible, practical finance strategies that help you grow sustainably, without compromising your cash flow."
                    }
                    subContent={
                        "With our support, you can invest in transformative projects, modernise infrastructure, and position your business as a leader in the green economy."
                    }
                    bottomContent={(
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Get Funded Today <ArrowUpRight className="w-4 h-4"/>
                        </Link>
                    )}
                    question={""}
                    answers={content}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    )
}
