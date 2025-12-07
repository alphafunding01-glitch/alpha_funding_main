import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function ProfessionalServicesFinance() {
    const keyChallenges = [
        {
            point: "Smooth out cash fluctuations",
            content: "Flexible finance options to cover ongoing expenses and reduce the stress of irregular income cycles.",
        },
        {
            point: "Upgrade to smarter tools",
            content: "Invest in modern software suites, cloud platforms, and automation systems that improve efficiency and accuracy.",
        },
        {
            point: "Win more projects",
            content: "Fund campaigns and client engagement strategies that position your firm as a trusted expert in the marketplace.",
        },
        {
            point: "Build a stronger team",
            content: "Support hiring, training, and retention programs to grow a high-performing workforce that drives client satisfaction.",
        },
        {
            point: "Scale without limits",
            content: "Access growth finance to expand into new regions, broaden your service portfolio, and strengthen long-term competitiveness.",
        },
    ];

    return (
        <div className={"flex flex-col"}>
            <NavBar />
            <div className={"flex bg-[#f8f8f8] flex-col"}>
                <SectorsHeaderSection
                    title={"Professional Services"}
                    header={"Finance Solutions Designed for Professional Service Firms"}
                    description={
                        "Law firms, consultancies, and accountancy practices face unique financial challenges. We provide tailored funding solutions so you can focus on delivering value to your clients."
                    }
                    subHeader={"Flexible funding for firms that thrive on expertise"}
                    image={"https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg"}
                    subDescription={
                        "Growing a professional services firm requires more than expertise—it requires consistent access to capital. Whether you’re balancing client payment cycles, upgrading your infrastructure, or looking to expand, our financial solutions are designed to give your business the resources it needs.\n\n" +
                        "Our tailored loans and asset finance packages enable firms to take control of their financial future, improve client delivery, and focus on long-term growth."
                    }
                    cards={[
                        {
                            title: "Business Loans",
                            description:
                                "Secure working capital and growth funding structured to support your firm’s evolving priorities.",
                            points: [
                                "Bridge gaps in client payments",
                                "Finance growth initiatives",
                                "Fund recruitment drives",
                                "Support compliance and accreditation",
                                "Manage operational overheads",
                                "Enhance service delivery",
                            ],
                            url: "",
                        },
                        {
                            title: "Asset Finance",
                            description:
                                "Access essential resources and tools without draining your cash reserves through tailored asset finance.",
                            points: [
                                "IT infrastructure and servers",
                                "Specialised practice software",
                                "Office fit-outs and furnishings",
                                "Communication systems",
                                "Research databases",
                                "Brand and marketing assets",
                            ],
                            url: "",
                        },
                    ]}
                />
                <WhyChooseSolution
                    subContent={""}
                    upperHeader={"Supporting your sector’s biggest hurdles"}
                    header={"Powering progress for professional service providers"}
                    content={
                        "From regulatory compliance to talent management, we understand the financial hurdles that professional service firms face daily. Our funding solutions are designed to keep your firm agile, competitive, and future-ready."
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
