import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function EngineeringManufacturingFinance() {
    const keySolutions = [
        {
            point: "Modernise production facilities",
            content:
                "Secure financing to replace outdated machinery, expand workshops, and scale operations with efficiency.",
        },
        {
            point: "Attract and retain skilled professionals",
            content:
                "Support recruitment campaigns and provide continuous training to build a future-ready workforce.",
        },
        {
            point: "Adopt smart manufacturing",
            content:
                "Invest in AI-driven systems, robotics, and digital twins to boost precision and productivity.",
        },
        {
            point: "Drive sustainable transformation",
            content:
                "Fund eco-conscious processes, low-energy equipment, and circular economy initiatives to meet ESG goals.",
        },
        {
            point: "Expand into global markets",
            content:
                "Access capital to support exports, manage supply chain complexity, and explore international growth opportunities.",
        },
    ];

    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="flex bg-[#f5f5f5] flex-col">
                <SectorsHeaderSection
                    title={"Engineering & Manufacturing"}
                    header={"Finance Solutions to Power Industry Growth"}
                    description={
                        "We provide tailored financial strategies that empower engineering and manufacturing businesses to innovate, compete globally, and achieve operational excellence."
                    }
                    subHeader={"Fuel progress with engineering and manufacturing finance"}
                    image={
                        "https://images.pexels.com/photos/4484076/pexels-photo-4484076.jpeg"
                    }
                    subDescription={
                        "The engineering and manufacturing industry is the backbone of innovation and economic growth. Yet, achieving scale and maintaining efficiency requires access to strategic funding. \n\n" +
                        "Our finance solutions are designed to help you modernise equipment, optimise production processes, and embrace the technologies shaping the factories of the future."
                    }
                    cards={[
                        {
                            title: "Growth Loans",
                            description:
                                "Flexible loans that provide working capital and enable you to tackle new opportunities with confidence.",
                            points: [
                                "Manage payroll and recruitment costs",
                                "Upgrade outdated systems and processes",
                                "Develop new product lines",
                                "Protect against market volatility",
                                "Enhance digital capabilities",
                                "Finance research and prototypes",
                                "Increase energy efficiency",
                            ],
                            url: "",
                        },
                        {
                            title: "Equipment Finance",
                            description:
                                "Protect your cash reserves while accessing the assets and tools required to stay competitive.",
                            points: [
                                "CNC machinery and tools",
                                "Automation and robotics",
                                "3D printing and additive manufacturing",
                                "Specialist testing equipment",
                                "Energy-efficient machinery",
                                "IT infrastructure and ERP systems",
                                "Materials and inventory financing",
                            ],
                            url: "",
                        },
                    ]}
                />
                <WhyChooseSolution
                    upperHeader={"Overcoming industry pressures"}
                    header={"Manufacturing and engineering finance for a competitive edge"}
                    content={
                        "From supply chain disruptions to rising production costs, the sector faces challenges that demand resilience and innovation. Our finance solutions help you streamline processes, stay competitive, and accelerate growth in a global marketplace."
                    }
                    subContent={""}
                    bottomContent={
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Get Funded Today <ArrowUpRight className="w-4 h-4"/>
                        </Link>
                    }
                    question={""}
                    answers={keySolutions}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    );
}
