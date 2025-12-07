import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function TechnologyFinance() {
    const keyChallenges = [
        {
            point: "Modernise legacy systems",
            content:
                "Replace ageing infrastructure with financing that covers servers, networks, and the latest productivity tools—without straining your budget.",
        },
        {
            point: "Accelerate innovation cycles",
            content:
                "Bring new products and services to market faster by funding R&D, pilot projects, and emerging technologies with minimal upfront cost.",
        },
        {
            point: "Enable remote-first operations",
            content:
                "Keep your distributed teams connected by financing cloud solutions, communication platforms, and secure IT environments.",
        },
        {
            point: "Expand capacity quickly",
            content:
                "Scale your business in line with customer demand by financing the people, platforms, and systems needed to grow sustainably.",
        },
        {
            point: "Unlock capital from assets",
            content:
                "Refinance IT hardware to free up cash that can be reinvested into growth strategies, innovation, or efficiency improvements.",
        },
    ];

    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="flex bg-[#f9f9f9] flex-col">
                <SectorsHeaderSection
                    title="Technology"
                    header="Finance Solutions for the Digital Future"
                    description="From SaaS firms to IT consultancies, technology businesses need more than great ideas—they need financial agility. Our funding helps you scale, innovate, and stay competitive in a fast-moving market."
                    subHeader="Flexible funding for fast-moving tech businesses"
                    image="https://images.pexels.com/photos/5380649/pexels-photo-5380649.jpeg"
                    subDescription={
                        "Technology is evolving at lightning speed. Whether it’s upgrading data centres, building AI-driven platforms, or hiring world-class engineers, you need the capital to keep momentum.\n\n" +
                        "Our finance solutions give you the freedom to invest when and where it matters most—balancing growth opportunities with financial stability."
                    }
                    cards={[
                        {
                            title: "Business Loans",
                            description:
                                "Secure flexible funding to support day-to-day operations, innovation, and long-term growth.",
                            points: [
                                "Maintain stable working capital",
                                "Fund expansion into new markets",
                                "Support research & product innovation",
                                "Recruit and retain top digital talent",
                                "Launch large-scale technology projects",
                                "Enhance customer experience platforms",
                            ],
                            url: "",
                        },
                        {
                            title: "Asset Finance",
                            description:
                                "Stay ahead of rapid tech changes by financing the tools and equipment your business needs.",
                            points: [
                                "Cloud infrastructure & SaaS platforms",
                                "Servers, storage & networking equipment",
                                "Cybersecurity frameworks",
                                "High-performance laptops & mobile devices",
                                "Specialist software licensing",
                                "Audio-visual & media production systems",
                            ],
                            url: "",
                        },
                    ]}
                />
                <WhyChooseSolution
                    upperHeader="Solving sector-specific challenges"
                    subContent=""
                    header="Tailored finance that matches your pace of innovation"
                    content="We understand that technology companies can’t afford delays. Our solutions are built to help you modernise, scale, and innovate—while protecting cash flow and improving financial resilience."
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
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    );
}
