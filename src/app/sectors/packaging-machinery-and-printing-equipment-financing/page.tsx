import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function PrintingPackagingFinance() {
    const content = [
        {
            point: "Modernise your production line",
            content: "Upgrade to faster, more precise machinery to increase efficiency and reduce downtime."
        },
        {
            point: "Scale into new territories",
            content: "Expand operations into new geographic markets with the right financial backing."
        },
        {
            point: "Enhance sustainability",
            content: "Switch to recyclable materials and energy-efficient technology to stay ahead of green regulations."
        },
        {
            point: "Strengthen supply chains",
            content: "Secure funds to keep raw materials flowing and reduce the risk of bottlenecks."
        },
        {
            point: "Adapt to shifting demand",
            content: "Finance innovation to diversify product formats and meet customer-driven packaging trends."
        }
    ];

    return (
        <div className={"flex flex-col"}>
            <NavBar/>
            <div className={"flex bg-[#f9f9f9] flex-col"}>
                <SectorsHeaderSection
                    title={"Printing & Packaging"}
                    header={"Financing Solutions for the Print and Packaging Industry"}
                    description={
                        "Whether it’s packaging for global brands or local print services, your business needs the financial freedom to evolve, adapt, and grow."
                    }
                    subHeader={"Custom Finance for Printers and Packagers"}
                    image={"https://images.pexels.com/photos/6334096/pexels-photo-6334096.jpeg"}
                    subDescription={
                        "From small print houses to large-scale packaging manufacturers, this sector faces pressure from innovation, sustainability goals, and consumer-driven change. \n\n" +
                        "Our tailored loans and asset finance options ensure you have the capital to invest in cutting-edge machinery, boost productivity, and deliver exceptional results without straining cash flow."
                    }
                    cards={[
                        {
                            title: "Business Loans",
                            description: "Flexible loans designed to give you the working capital your print or packaging business needs to thrive.",
                            points: [
                                "Stabilise cash flow during seasonal demand shifts",
                                "Expand facilities or open new production sites",
                                "Recruit skilled staff and fund training",
                                "Launch new product or service lines",
                                "Strengthen marketing and distribution reach",
                                "Maintain compliance with industry standards"
                            ],
                            url: ""
                        },
                        {
                            title: "Asset Finance",
                            description: "Acquire advanced printing and packaging technology while protecting day-to-day working capital.",
                            points: [
                                "High-speed printing presses",
                                "Packaging and folding equipment",
                                "Automated labelling and cutting machines",
                                "Energy-efficient drying and finishing systems",
                                "Digital and variable data printers",
                                "Sustainable packaging machinery",
                                "Robotics for automated assembly and fulfilment"
                            ],
                            url: ""
                        }
                    ]}
                />
                <WhyChooseSolution
                    upperHeader={"Overcome industry challenges"}
                    header={"Finance that keeps your presses running and your packaging sharp"}
                    content={
                        "With growing environmental pressures, technological disruption, and rising customer expectations, the print and packaging industry demands agility. Our financing ensures you can stay competitive and deliver consistent quality without financial strain."
                    }
                    subContent={""}
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
                <CheckEligibleSection/>
            </div>
            <Footer/>
        </div>
    );
}
