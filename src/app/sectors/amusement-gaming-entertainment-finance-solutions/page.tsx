import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import {ArrowUpRight} from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function AmusementGamingEntertainment() {

    const content = [
        {
            point: "Stay on the cutting edge of tech",
            content: "Invest in advanced gaming technologies like AR and VR to meet the growing demand for immersive experiences."
        },
        {
            point: "Meet regulatory standards with confidence",
            content: "Access the funding you need to remain compliant with ever-evolving regulations—without disrupting operations."
        },
        {
            point: "Manage seasonal ups and downs",
            content: "Smooth out cash flow throughout the year with tailored financing solutions, including merchant cash advances."
        },
        {
            point: "Unlock capital from owned equipment",
            content: "Refinance existing assets to access working capital and reinvest in growth."
        },
        {
            point: "Create unforgettable customer experiences",
            content: "Enhance your venue with engaging, state-of-the-art attractions that keep customers coming back."
        }
    ];

    return (
        <div className={"flex flex-col"}>
            <NavBar/>
            <div className={"flex bg-light-gray flex-col"}>
                <SectorsHeaderSection
                    title={"AMUSEMENTS & GAMING"}
                    header={"Entertainment Finance for Amusement & Gaming Businesses"}
                    description={
                        "Whether you operate a casino, amusement park, arcade, or digital gaming platform, securing the right finance can be the key to unlocking new levels of success. At Alpha Funding, we provide tailored entertainment finance solutions to help you grow, adapt, and stay competitive—without the red tape."
                    }
                    subHeader={"Finance Built for Entertainment Experiences"}
                    image={"https://images.pexels.com/photos/1293261/pexels-photo-1293261.jpeg"}
                    subDescription={
                        "From high-end arcade machines to cutting-edge VR setups, we help businesses across the amusement and gaming sectors access capital and equipment without compromising cash flow. With flexible loans and customised asset finance options, you can focus on delivering exceptional experiences to your customers, every time."
                    }
                    cards={[
                        {
                            title: "Business Loans",
                            description: "Flexible funding to keep your operations in play—designed to support both day-to-day needs and long-term goals.",
                            points: [
                                "Manage cash flow through seasonal fluctuations",
                                "Evolve with changing customer preferences",
                                "Invest in digital innovation and immersive tech",
                                "Stay ahead of regulatory requirements",
                                "Explore emerging industry trends",
                                "Expand through strategic partnerships and collaborations"
                            ],
                            url: ""
                        },
                        {
                            title: "Asset & Equipment Finance",
                            description: "Finance that fuels immersive experiences—upgrade your entertainment offering without tying up working capital.",
                            points: [
                                "Arcade cabinets and gaming consoles",
                                "Virtual reality and augmented reality setups",
                                "Claw machines and slot machines",
                                "Mobile gaming systems",
                                "Betting tables and terminals",
                                "Inflatable amusements and bounce houses"
                            ],
                            url: ""
                        }
                    ]}
                />
                <WhyChooseSolution
                    upperHeader={"Overcoming Industry Challenges"}
                    header={"Finance That Helps You Stay Ahead of the Game"}
                    content={
                        "Navigating the amusement and gaming industry means dealing with rapid tech evolution, regulatory demands, and seasonality. Our financial solutions are designed to help you overcome these hurdles and focus on what matters—delivering memorable entertainment."
                    }
                    subContent={""}
                    bottomContent={(
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Get Funded Today <ArrowUpRight className="w-4 h-4"/>
                        </Link>
                    )}
                    question={"Why Choose Our Entertainment Finance?"}
                    answers={content}
                />
                <CheckEligibleSection/>
            </div>
            <Footer/>
        </div>
    )
}
