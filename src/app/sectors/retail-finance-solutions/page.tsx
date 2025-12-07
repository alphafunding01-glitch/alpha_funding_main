import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function RetailFinance() {
    const retailSolutions = [
        {
            point: "Keep shelves stocked",
            content:
                "Access working capital to purchase inventory in advance and meet unexpected spikes in customer demand.",
        },
        {
            point: "Upgrade in-store experiences",
            content:
                "Transform your shop layout, lighting and displays to create a shopping environment that excites and engages.",
        },
        {
            point: "Take your brand online",
            content:
                "Finance the launch or expansion of your ecommerce platform to reach customers wherever they prefer to shop.",
        },
        {
            point: "Balance seasonal peaks",
            content:
                "Smooth out sales fluctuations with tailored funding that helps you prepare for high seasons without cash flow strain.",
        },
        {
            point: "Unlock hidden value",
            content:
                "Release equity from vehicles, equipment or store assets and put that capital back into business growth.",
        },
    ];

    return (
        <div className={"flex flex-col"}>
            <NavBar />
            <div className={"flex bg-bg-subtle flex-col"}>
                <SectorsHeaderSection
                    title={"Retail Finance"}
                    header={"Smart Retail Finance for a Competitive Edge"}
                    description={
                        "Retail is evolving rapidly. Whether you run a boutique, a supermarket or an online store, flexible finance can help you keep pace with trends, delight customers and protect your bottom line."
                    }
                    subHeader={"Funding tailored for modern retailers"}
                    image={"https://images.pexels.com/photos/5650010/pexels-photo-5650010.jpeg"}
                    subDescription={
                        "From stocking inventory to launching new sales channels, retail businesses face constant pressure to adapt and innovate. Reliable funding makes it easier to manage day-to-day operations, take advantage of opportunities and scale with confidence.\n\n" +
                        "Our tailored retail finance options give you the breathing room to invest in technology, refresh your space and strengthen customer loyalty—without compromising your working capital."
                    }
                    cards={[
                        {
                            title: "Retail Business Loans",
                            description:
                                "Flexible loans designed to cover everyday expenses or fuel major growth initiatives.",
                            points: [
                                "Manage payroll and supplier costs",
                                "Launch new product ranges",
                                "Open additional locations",
                                "Invest in brand campaigns",
                                "Support cash flow during slow seasons",
                                "Respond quickly to shifting customer demand",
                                "Train and develop staff",
                                "Adopt digital retail technologies",
                            ],
                            url: "",
                        },
                        {
                            title: "Retail Asset Finance",
                            description:
                                "Spread the cost of essential equipment and upgrades to keep your retail space modern and efficient.",
                            points: [
                                "Point-of-Sale (POS) terminals",
                                "Warehouse storage and logistics equipment",
                                "Refrigerators and cold storage units",
                                "Digital signage and security tech",
                                "In-store fixtures and fittings",
                                "Furniture, counters and shelving",
                                "Lighting and decor upgrades",
                                "Delivery vehicles and vans",
                            ],
                            url: "",
                        },
                    ]}
                />
                <WhyChooseSolution
                    upperHeader={"Addressing core retail challenges"}
                    header={"Funding that keeps retailers resilient"}
                    content={
                        "In a sector where margins are tight and customer expectations are rising, our retail finance solutions give businesses the flexibility to stay relevant and profitable. We help retailers stay ahead of demand, both online and in-store."
                    }
                    subContent={
                        "From upgrading store technology to scaling your digital presence, our team ensures you have the right funding at the right time."
                    }
                    bottomContent={
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Get Funded Today <ArrowUpRight className="w-4 h-4"/>
                        </Link>
                    }
                    question={""}
                    answers={retailSolutions}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    );
}
