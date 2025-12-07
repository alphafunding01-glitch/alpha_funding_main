import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function LogisticsTransportFinance() {
    const keyChallenges = [
        {
            point: "Jump on the technology advancement bandwagon",
            content:
                "Invest in efficiency-enhancing technologies like GPS tracking and telemetry to increase productivity.",
        },
        {
            point: "Maintain the best port of call",
            content:
                "Access the distribution, logistics and warehousing facilities your staff need to stay on course.",
        },
        {
            point: "Keep your working capital wheels turning",
            content:
                "Get access to working capital to cover day-to-day expenses without worrying about spiralling costs.",
        },
        {
            point: "Give clean vehicles the green light",
            content:
                "With cleaner, more efficient vehicles, you can save costs and keep on top of environmental regulations.",
        },
        {
            point: "Keep your cash flow on track",
            content:
                "Keep cash flow stable, even during seasonal lows, with invoice financing for logistics and transport.",
        },
    ];

    return (
        <div className={"flex flex-col"}>
            <NavBar />
            <div className={"flex bg-[#f9f9f9] flex-col"}>
                <SectorsHeaderSection
                    title={"Logistics & Transport"}
                    header={"Logistics and Transport Finance to Move Your Business Forward"}
                    description={
                        "Drive your business' growth forward with logistics and transport finance solutions that ensure a smooth journey on the road to success."
                    }
                    subHeader={"Go the distance with logistics and transport finance solutions"}
                    image={"https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg"}
                    subDescription={
                        "As a vital sector that ensures the necessary movement of goods, products and people, there are ample opportunities for transport and logistics businesses to thrive - if they can secure the finance they need to overcome industry challenges and fuel future growth.\n\n" +
                        "To help businesses on their voyage to success, we offer easily accessible transportation business loans for everyday operational requirements, as well as transport and logistics asset finance for all equipment financing needs."
                    }
                    cards={[
                        {
                            title: "Business Loans",
                            description:
                                "Our logistics and transportation business loans help advance your business to get it to where it needs to be.",
                            points: [
                                "Maintain adequate insurance coverage",
                                "Navigate supply chain disruptions",
                                "Overcome rising costs",
                                "Expand and maintain your fleet",
                                "Meet regulatory demands",
                                "Invest in efficiency-enabling technology solutions",
                                "Purchase property and premises",
                            ],
                            url: "",
                        },
                        {
                            title: "Asset Finance",
                            description:
                                "We deliver transport and logistics asset finance solutions to keep your business moving a mile a minute.",
                            points: [
                                "Trucks and trailers",
                                "Forklifts and handling equipment",
                                "GPS tracking systems",
                                "Warehouse management systems",
                                "Automatic identification and data capture (AIDC) technology",
                                "Telematics devices",
                                "Fuel-efficient vehicles and equipment",
                            ],
                            url: "",
                        },
                    ]}
                />
                <WhyChooseSolution
                    upperHeader={"Solving key industry challenges"}
                    header={"Logistics and transport finance for when the rubber hits the road"}
                    content={
                        "We understand the challenges facing businesses in the transport and logistics sector. From the ripple effects of Brexit to rising fuel and maintenance costs, businesses need reliable logistic and transport finance to help them go the extra mile.\n\n" +
                        "Read about how we supported a national logistics firm to raise £2.4m through haulage business finance in our success story."
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
                    answers={keyChallenges}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    );
}
