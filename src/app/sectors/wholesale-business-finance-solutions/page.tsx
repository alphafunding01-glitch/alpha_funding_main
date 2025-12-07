import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import {ArrowUpRight} from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function WholesaleFinance() {
    const keyChallenges = [
        {
            point: "Secure bulk orders without draining capital",
            content:
                "Access finance to purchase large stock volumes upfront while protecting your working cash reserves.",
        },
        {
            point: "Recruit and retain skilled staff",
            content:
                "From supply chain managers to warehouse operatives, flexible funding helps cover recruitment and training costs.",
        },
        {
            point: "Upgrade distribution hubs and warehouses",
            content:
                "Modern storage facilities and streamlined stock management systems reduce delays and limit costly errors.",
        },
        {
            point: "Stabilise finances during slower trading periods",
            content:
                "Invoice finance, credit lines and merchant cash advances smooth out seasonal or irregular revenue dips.",
        },
        {
            point: "Fuel long-term growth and market reach",
            content:
                "Whether expanding into new territories or diversifying into new product categories, funding empowers bold moves.",
        },
    ];

    return (
        <div className="flex flex-col">
            <NavBar/>
            <div className="flex bg-[#f9f9f9] flex-col">
                <SectorsHeaderSection
                    title="Wholesale"
                    header="Flexible Finance for Wholesalers to Stay Ahead of Demand"
                    description={
                        "Our wholesale finance solutions unlock capital to help you manage procurement, inventory, logistics and staffing with confidence."
                    }
                    subHeader="Empowering wholesalers to scale, streamline and succeed"
                    image="https://images.pexels.com/photos/7203721/pexels-photo-7203721.jpeg"
                    subDescription={
                        "Wholesalers sit at the heart of the supply chain, balancing the needs of both manufacturers and retailers. With high-volume purchasing and tight margins, financial flexibility is essential.\n\n" +
                        "We provide tailored loans and asset finance packages designed for the wholesale industry. Whether you’re looking to expand storage facilities, update equipment or smooth out cash flow, we’ll help you secure the funds needed to keep your operations moving and your shelves stocked."
                    }
                    cards={[
                        {
                            title: "Business Loans",
                            description:
                                "Designed to meet the diverse demands of wholesalers, our loans provide the capital needed to keep pace with market shifts.",
                            points: [
                                "Bulk purchasing power",
                                "Boosting working capital",
                                "Expanding into new markets",
                                "Hiring and training staff",
                                "Logistics and transport upgrades",
                                "Covering unexpected costs",
                            ],
                            url: "",
                        },
                        {
                            title: "Asset Finance",
                            description:
                                "Free up capital while accessing the equipment and systems needed to optimise wholesale operations.",
                            points: [
                                "Delivery vehicles",
                                "Material handling machinery",
                                "Packaging and sorting equipment",
                                "Inventory control software",
                                "Warehouse shelving and systems",
                                "IT and office technology",
                            ],
                            url: "",
                        },
                    ]}
                />
                <WhyChooseSolution
                    subContent=""
                    upperHeader="Tackling wholesale challenges head-on"
                    header="Finance built to keep your supply chain in motion"
                    content={
                        "Wholesale businesses rely on efficiency and agility. Our funding solutions support wholesalers by improving cash flow, enabling technology adoption and powering expansion. From bulk buying to better stock management, our finance ensures you’re always ready to deliver."
                    }
                    bottomContent={
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Get Funded Today <ArrowUpRight className="w-4 h-4"/>
                        </Link>
                    }
                    question=""
                    answers={keyChallenges}
                />
                <CheckEligibleSection/>
            </div>
            <Footer/>
        </div>
    );
}
