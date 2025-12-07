import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import {ArrowUpRight} from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function AgricultureSector() {

    const content = [
        {
            point: "Offset rising interest rates",
            content: "Access finance for new or used farming equipment with manageable repayment plans."
        },
        {
            point: "Smooth out seasonal cash flow",
            content: "Our flexible loan structures are designed to align with the natural rhythms of farming income."
        },
        {
            point: "Predictable payment terms",
            content: "Enjoy the stability of fixed monthly repayments to support long-term planning."
        },
        {
            point: "Unlock equity from existing assets",
            content: "Refinance owned equipment to release capital for reinvestment into your business."
        },
        {
            point: "Stay ahead of the curve",
            content: "Invest in modern machinery and technology to improve productivity and maintain a competitive edge."
        }
    ];

    return (
        <div className={"flex flex-col"}>
            <NavBar/>
            <div className={"flex bg-light-gray flex-col"}>
                <SectorsHeaderSection
                    title={"Agriculture Finance Solutions"}
                    header={"Empowering Growth in Farming and Agribusiness"}
                    description={
                        "At Alpha Funding, we understand the unique demands of the agriculture sector. Our specialised finance solutions are designed to support farmers and agribusinesses through every season—whether it's securing essential equipment, managing cash flow fluctuations, or funding growth opportunities."
                    }
                    subHeader={"Tailored Financing for Modern Farming"}
                    image={"https://images.pexels.com/photos/1482101/pexels-photo-1482101.jpeg"}
                    subDescription={
                        "Whether you're upgrading to advanced machinery or need working capital for operational expenses, our expert team is here to craft a finance package that aligns with your goals. Alpha Funding’s agriculture loans and asset finance options help you stay productive, competitive, and financially resilient."
                    }
                    cards={[
                        {
                            title: "Business Loans",
                            description: "Flexible funding for growth and stability, designed to meet a wide range of agricultural needs.",
                            points: [
                                "Maintain healthy cash flow during off-peak seasons",
                                "Explore and invest in new revenue streams",
                                "Upgrade infrastructure to increase efficiency",
                                "Invest in sustainable and innovative technologies",
                                "Expand storage and processing facilities"
                            ],
                            url: ""
                        },
                        {
                            title: "Asset & Equipment Finance",
                            description: "Preserve working capital while acquiring the tools you need to operate at your best.",
                            points: [
                                "Tractors and harvesters",
                                "Irrigation and water systems",
                                "Livestock and dairy equipment",
                                "Feeding and watering systems",
                                "Material handling equipment",
                                "Sprayers, crop balers, and more"
                            ],
                            url: ""
                        }
                    ]}
                />
                <WhyChooseSolution
                    upperHeader={"Addressing Agriculture’s Biggest Challenges"}
                    header={"Solutions That Work as Hard as You Do"}
                    content={
                        "Agriculture businesses often face pressure from seasonal cycles, interest rate fluctuations, and equipment costs. Our tailored finance products help you overcome these challenges with confidence."
                    }
                    subContent={""}
                    bottomContent={(
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Get Funded Today <ArrowUpRight className="w-4 h-4"/>
                        </Link>
                    )}
                    question={"Why Choose Our Agriculture Finance?"}
                    answers={content}
                />
                <CheckEligibleSection/>
            </div>
            <Footer/>
        </div>
    )
}
