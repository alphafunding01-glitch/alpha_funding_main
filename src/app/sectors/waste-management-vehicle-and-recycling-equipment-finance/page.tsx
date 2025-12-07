import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function RecyclingWasteManagementFinance() {
    const keyChallenges = [
        {
            point: "Transition to greener operations",
            content:
                "Finance the adoption of sustainable equipment and eco-friendly technology to stay ahead of tightening regulations.",
        },
        {
            point: "Manage rising disposal costs",
            content:
                "Secure working capital to offset fluctuating disposal fees and keep your cash flow steady.",
        },
        {
            point: "Replace outdated machinery",
            content:
                "Access flexible asset finance to upgrade vehicles, processing plants, and handling systems without draining reserves.",
        },
        {
            point: "Seize new growth opportunities",
            content:
                "Diversify into waste-to-energy, plastics recovery, or innovative reuse initiatives with tailored business loans.",
        },
        {
            point: "Stay resilient in seasonal demand",
            content:
                "Bridge revenue gaps during slower collection cycles with funding that flexes around your business needs.",
        },
    ];

    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="flex bg-[#f7f7f7] flex-col">
                <SectorsHeaderSection
                    title={"Recycling & Waste Management"}
                    header={"Finance That Fuels a Circular Economy"}
                    description={
                        "Helping recycling and waste management businesses invest in cleaner technologies, modern infrastructure, and smarter systems to build a sustainable future."
                    }
                    subHeader={"Tailored funding for a cleaner tomorrow"}
                    image={
                        "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg"
                    }
                    subDescription={
                        "The recycling and waste management industry sits at the core of the UK’s sustainability ambitions.\n\n" +
                        "From upgrading plants to scaling recycling capacity, our finance solutions are designed to help your organisation meet environmental standards while remaining profitable. Whether you need loans for growth or asset finance for equipment upgrades, we ensure your business can thrive while driving positive change."
                    }
                    cards={[
                        {
                            title: "Business Loans",
                            description:
                                "Support your growth initiatives and maintain operational stability with flexible funding options.",
                            points: [
                                "Expand collection and processing capacity",
                                "Invest in waste-to-energy projects",
                                "Fund technology upgrades",
                                "Launch community recycling initiatives",
                                "Recruit and train specialised staff",
                                "Access working capital for daily operations",
                            ],
                            url: "",
                        },
                        {
                            title: "Asset Finance",
                            description:
                                "Upgrade or acquire essential equipment with structured finance that protects cash flow.",
                            points: [
                                "Recycling trucks and transport vehicles",
                                "Material sorting machinery",
                                "Shredders, balers, and compactors",
                                "Automated conveyor systems",
                                "On-site energy recovery equipment",
                                "Storage and collection containers",
                            ],
                            url: "",
                        },
                    ]}
                />
                <WhyChooseSolution
                    upperHeader={"Addressing sector challenges"}
                    subContent={""}
                    header={"Sustainable finance for sustainable businesses"}
                    content={
                        "The future of recycling and waste management relies on continuous investment in innovation and greener practices.\n\n" +
                        "Our finance solutions give your business the flexibility to modernise infrastructure, invest in new opportunities, and strengthen resilience—helping you stay compliant and competitive while supporting the UK’s net-zero journey."
                    }
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
