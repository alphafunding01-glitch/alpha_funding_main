import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function PlantVehicleFinance() {
    const challenges = [
        {
            point: "Upgrade to modern, efficient equipment",
            content:
                "Outdated machinery can slow projects down. Financing allows you to replace old equipment with the latest, more reliable alternatives.",
        },
        {
            point: "Expand your fleet without draining capital",
            content:
                "Grow your hire fleet strategically by spreading the cost of new vehicles over time instead of large upfront spending.",
        },
        {
            point: "Keep projects running year-round",
            content:
                "Access short-term finance to cover quiet periods so your business stays stable even when demand dips.",
        },
        {
            point: "Boost competitiveness with specialist machinery",
            content:
                "Offer niche and specialist equipment to clients who need unique solutions, strengthening your position in the market.",
        },
        {
            point: "Free up cash tied in current assets",
            content:
                "Refinance existing machinery or vehicles to unlock working capital you can reinvest in growth opportunities.",
        },
    ];

    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="flex bg-[#f4f4f4] flex-col">
                <SectorsHeaderSection
                    title="Plant & Vehicle Hire"
                    header="Flexible Finance for Plant and Vehicle Hire Businesses"
                    description="Our tailored hire finance solutions provide plant and vehicle companies with the capital they need to keep construction and infrastructure projects moving."
                    subHeader="Finance designed for equipment hire and fleet growth"
                    image="https://images.pexels.com/photos/19319639/pexels-photo-19319639.jpeg"
                    subDescription={
                        "From business loans to stabilise working capital, to asset finance for expanding your hire stock, our solutions are designed for plant and vehicle hire providers. \n\n" +
                        "Whether you’re looking to acquire brand-new machinery, upgrade to more efficient vehicles, or smooth out cash flow during seasonal dips, we’ve got the right finance tools to support your long-term growth."
                    }
                    cards={[
                        {
                            title: "Business Loans",
                            description:
                                "Get access to capital that supports your operations, staffing and overall business strategy.",
                            points: [
                                "Stabilise cash flow year-round",
                                "Cover maintenance and repair costs",
                                "Recruit and train skilled staff",
                                "Strengthen supplier relationships",
                                "Improve operational capacity",
                                "Fund marketing and promotion",
                            ],
                            url: "",
                        },
                        {
                            title: "Asset Finance",
                            description:
                                "Acquire or upgrade essential equipment without upfront costs, keeping your fleet modern and reliable.",
                            points: [
                                "Excavators and diggers",
                                "Dump trucks and loaders",
                                "Cranes and lifting equipment",
                                "Rollers and compactors",
                                "Generators and power tools",
                                "Lighting and scaffolding systems",
                                "Concrete mixers and pumps",
                                "Transport vehicles and trailers",
                            ],
                            url: "",
                        },
                    ]}
                />
                <WhyChooseSolution
                    upperHeader="Overcoming industry challenges"
                    header="Finance that keeps your fleet future-ready"
                    content="Plant and vehicle hire businesses require heavy investment to keep up with construction demand. Our tailored finance solutions give you the means to scale, modernise and stay competitive in a fast-changing industry."
                    subContent=""
                    bottomContent={
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Get Funded Today <ArrowUpRight className="w-4 h-4"/>
                        </Link>
                    }
                    question=""
                    answers={challenges}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    );
}
