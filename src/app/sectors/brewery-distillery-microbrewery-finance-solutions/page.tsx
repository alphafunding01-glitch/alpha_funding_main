import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function BrewingDistilling() {
    const content = [
        {
            point: "Upgrade your brewing equipment",
            content:
                "Invest in advanced technology to enhance quality, consistency, and production scale.",
        },
        {
            point: "Keep up with evolving trends",
            content:
                "Respond to demand for sustainable practices, craft beer experiences, and non-alcoholic offerings.",
        },
        {
            point: "Stay on top of compliance",
            content:
                "Meet licensing and regulatory obligations efficiently with finance that gives you breathing space.",
        },
        {
            point: "Smooth out cash flow pressures",
            content:
                "Manage cash flow and operational costs with options like merchant cash advances linked to your sales revenue.",
        },
        {
            point: "Build a distinctive brand",
            content:
                "Free up working capital to invest in storytelling, branding, and customer engagement that sets you apart.",
        },
    ];

    return (
        <div className={"flex flex-col"}>
            <NavBar />
            <div className={"flex bg-light-gray flex-col"}>
                <SectorsHeaderSection
                    title={"BREWING & DISTILLING FINANCE"}
                    header={"Tailored Finance Solutions to Keep Your Brewery Flowing"}
                    description={
                        "Whether you're launching a new brewery, expanding production, or adapting to a changing market, access to the right finance is essential. At Alpha Funding Finance, we offer bespoke brewery finance solutions designed to support every stage of your journey, from grain to glass."
                    }
                    subHeader={"Finance Crafted for the Brewing Industry"}
                    image={
                        "https://images.pexels.com/photos/32727237/pexels-photo-32727237.jpeg"
                    }
                    subDescription={
                        "From raw ingredients to bottling lines and tasting rooms, brewing is both a science and an art. We understand the capital-intensive nature of the business and the need for flexibility in a highly competitive and evolving market. Our funding options help you invest in top-tier equipment, manage day-to-day operations, and stay ahead of consumer trends."
                    }
                    cards={[
                        {
                            title: "Business Loans",
                            description:
                                "Fuel growth and innovation in your brewery. Our loans are structured to support everything from operations to expansion.",
                            points: [
                                "Enter niche or craft beer segments",
                                "Strengthen branding and marketing outreach",
                                "Fund research and product innovation",
                                "Diversify product lines and packaging formats",
                                "Launch or improve your e-commerce platform",
                                "Adopt sustainable and energy-efficient practices",
                                "Build new taprooms or tasting venues",
                            ],
                            url: "",
                        },
                        {
                            title: "Asset & Equipment Finance",
                            description:
                                "Invest in the tools of the trade without tapping out your cash flow. Acquire essential machinery with tailored hire purchase, leasing, or refinance agreements.",
                            points: [
                                "Roller mills and mash systems",
                                "Brew kettles and steam jackets",
                                "Fermentation, bright, and lagering tanks",
                                "Packaging lines and bottling machines",
                                "Cleaning, sterilisation, and sanitation systems",
                            ],
                            url: "",
                        },
                    ]}
                />
                <WhyChooseSolution
                    upperHeader={"Addressing the Challenges Breweries Face"}
                    header={"Practical Finance Solutions for a Competitive Market"}
                    content={
                        "Breweries across the UK are navigating rising operational costs, regulatory requirements, and shifting consumer preferences. Our flexible finance solutions are crafted to help you stay resilient, innovative, and profitable."
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
