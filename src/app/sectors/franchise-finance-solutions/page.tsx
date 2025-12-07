import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function Franchising() {
    const content = [
        {
            point: "Finance Your Franchise Fees",
            content: "Secure the capital needed to cover franchise buy-in and start your business on solid footing."
        },
        {
            point: "Fit Out Your Premises",
            content: "Equip and furnish your new location with tailored asset and equipment finance solutions."
        },
        {
            point: "Cover Early Operating Costs",
            content: "Access the funding you need to handle startup costs without slowing your momentum."
        },
        {
            point: "Hire and Train from Day One",
            content: "Recruit and onboard staff confidently—without the burden of large upfront wage expenses."
        },
        {
            point: "Maintain Healthy Cash Flow",
            content: "Our merchant cash advance solutions help you manage working capital, with repayments tied to your revenue stream."
        }
    ];

    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="flex bg-light-gray flex-col">
                <SectorsHeaderSection
                    title={"FRANCHISING"}
                    header={"Strategic Franchise Financing to Unlock Growth Opportunities"}
                    description={
                        "Turn your franchise ambitions into reality with tailored financing solutions from Alpha Funding Business Finance. Our funding options are designed to cover all upfront and ongoing costs, giving you the financial foundation to launch, operate, and grow your franchise with confidence."
                    }
                    subHeader={"Franchise Loans That Launch and Grow Your Business"}
                    image={"https://images.pexels.com/photos/1147865/pexels-photo-1147865.jpeg"}
                    subDescription={
                        "Franchising presents a powerful route to business ownership—but securing the right funding can be a key challenge. At Alpha Funding Business Finance, we provide tailored franchise finance solutions to help you get started and scale confidently. From start-up costs and equipment purchases to ongoing operational needs, we ensure you have access to the capital required to build a successful franchise from day one."
                    }
                    cards={[
                        {
                            title: "Business Loans",
                            description:
                                "Flexible secured and unsecured loans designed to meet the unique demands of franchising.",
                            points: [
                                "Fit out, refurbish, or upgrade your premises",
                                "Cover franchise fees, rent deposits, and legal costs",
                                "Recruit, train, and retain staff",
                                "Support expansion and growth strategies",
                                "Fund marketing and advertising campaigns",
                                "Maintain optimal inventory levels",
                                "Manage short-term cash flow fluctuations"
                            ],
                            url: ""
                        },
                        {
                            title: "Asset Finance",
                            description:
                                "Acquire the essential equipment and infrastructure needed to operate and grow your franchise effectively.",
                            points: [
                                "Complete fit-outs for restaurants, retail, or office spaces",
                                "Point-of-sale (POS) systems",
                                "Indoor and outdoor furniture",
                                "Cleaning and sanitation equipment",
                                "Branded signage, fixtures, and visual assets",
                                "Security and surveillance systems",
                                "Delivery vans and branded vehicles"
                            ],
                            url: ""
                        }
                    ]}
                />

                <WhyChooseSolution
                    upperHeader={"Solving Key Industry Challenges"}
                    header={"Franchise Financing to Seize Opportunity and Build Momentum"}
                    content={
                        "Launching a franchise is a major step—one that requires smart financial planning and timely access to funding. At Alpha Funding, we understand the real-world challenges involved: from outfitting your premises and hiring your team to managing early operational costs. That’s why our franchise finance solutions are designed to meet your specific needs and give your business the best possible start."
                    }
                    subContent={"Industry Insight: Read our guide — “A Quick Guide to Franchise Lending”"}
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
