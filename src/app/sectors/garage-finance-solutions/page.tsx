import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function GarageFinance() {
    const content = [
        {
            point: "Efficiently Manage Your Inventory",
            content:
                "Secure financing to expand and diversify your vehicle stock, ensuring you meet evolving customer needs and preferences."
        },
        {
            point: "Upgrade Your Equipment",
            content:
                "Invest in advanced automotive service and repair tools to enhance efficiency, improve service quality, and elevate customer satisfaction."
        },
        {
            point: "Access Working Capital",
            content:
                "Maintain smooth operations by managing rising costs and navigating slower sales periods with flexible working capital solutions."
        },
        {
            point: "Strengthen Your Supply Chain",
            content:
                "Reduce risks associated with supply disruptions by diversifying suppliers and exploring alternative sourcing strategies."
        },
        {
            point: "Unlock Capital from Existing Assets",
            content:
                "Release cash tied up in your current equipment through refinancing options, providing additional liquidity to fuel business growth."
        }
    ];

    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="flex bg-light-gray flex-col">
                <SectorsHeaderSection
                    title={"GARAGE FINANCE"}
                    header={"Specialist Garage Finance to Accelerate Business Growth"}
                    description={
                        "Unlock the full potential of your car sales or automotive service business with tailored garage finance solutions from Alpha Funding Business Finance. Whether you're expanding operations, upgrading equipment, or improving cash flow, our funding options are designed to drive your success forward."
                    }
                    subHeader={"Get into the Fast Lane with Tailored Car & Garage Finance"}
                    image={"https://images.pexels.com/photos/97075/pexels-photo-97075.jpeg"}
                    subDescription={
                        "Whether you're navigating high capital requirements, cash flow challenges, or difficulty accessing traditional loans, Alpha Funding Business Finance is here to help. Our specialised car and garage finance solutions—ranging from fast business loans to flexible asset finance—are designed to give your automotive business the financial freedom to scale efficiently and stay competitive."
                    }
                    cards={[
                        {
                            title: "Business Loans",
                            description:
                                "Accelerate your operations with a bespoke business loan tailored to your unique needs.",
                            points: [
                                "Access working capital",
                                "Smooth out cash flow fluctuations",
                                "Expand your premises or service capacity",
                                "Recruit and train skilled technicians",
                                "Launch targeted marketing campaigns",
                                "Invest in long-term business growth"
                            ],
                            url: ""
                        },
                        {
                            title: "Asset Finance",
                            description:
                                "Acquire the essential tools, vehicles, and infrastructure needed to drive success.",
                            points: [
                                "Vehicle inventory and showroom stock",
                                "Dealership and service centre facilities",
                                "Diagnostic and repair equipment",
                                "Office furnishings and admin systems",
                                "Vehicle tracking technologies",
                                "Inventory and stock management systems",
                                "Garage tools, lifts, and workshop machinery"
                            ],
                            url: ""
                        }
                    ]}
                />

                <WhyChooseSolution
                    upperHeader={"Overcoming Industry Challenges"}
                    header={"Expert Financing Solutions to Accelerate Your Car and Garage Business"}
                    content={
                        "In today’s fast-evolving automotive market, rising operational expenses and supply chain disruptions create significant hurdles for car and garage businesses. Our customised finance solutions are specifically designed to empower you to navigate these challenges with ease, enabling you to maintain momentum, optimise operations, and accelerate growth with confidence."
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
                    answers={content}
                />

                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    );
}
