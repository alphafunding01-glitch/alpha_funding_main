import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function BeautyAndWellbeing() {
    const content = [
        {
            point: "Upgrade your salon without the upfront strain",
            content: "Acquire the latest tools and treatment tech with manageable payment plans."
        },
        {
            point: "Plan ahead with fixed monthly repayments",
            content: "Our finance options provide predictable costs so you can budget with clarity and confidence."
        },
        {
            point: "Smooth out cash flow with a merchant cash advance",
            content: "Access capital now, with repayments that flex with your daily card sales."
        },
        {
            point: "Expert support from beauty finance specialists",
            content: "Our experienced team will guide you to the right financial solution for your unique needs."
        },
        {
            point: "Affordable funding for long-term success",
            content: "Enhance your offering, grow your client base, and build profitability without large initial investments."
        }
    ];

    return (
        <div className={"flex flex-col"}>
            <NavBar />
            <div className={"flex bg-light-gray flex-col"}>
                <SectorsHeaderSection
                    title={"Beauty & Wellbeing Finance"}
                    header={"Flexible Funding for Salons, Clinics, and Wellness Businesses"}
                    description={
                        "In a fast-moving industry where trends evolve quickly and customer expectations are high, having the right financial support is essential. At Alpha Funding Finance, we offer bespoke beauty and wellbeing finance solutions to help your business stay ahead, whether you're launching, expanding, or refreshing your offerings."
                    }
                    subHeader={"Finance That Elevates Your Brand"}
                    image={"https://images.pexels.com/photos/8534275/pexels-photo-8534275.jpeg"}
                    subDescription={
                        "From salons and spas to wellness studios and aesthetic clinics, we understand the unique demands of the beauty industry. Our financing options—ranging from unsecured loans to tailored asset finance—are designed to help you grow your business, attract more clients, and deliver exceptional experiences."
                    }
                    cards={[
                        {
                            title: "Business Loans",
                            description: "Support for every stage of your growth journey, from start-up to expansion.",
                            points: [
                                "Launch a new beauty or wellness business",
                                "Invest in marketing to increase visibility",
                                "Expand your space or open additional locations",
                                "Recruit and train top talent",
                                "Stay current with emerging beauty trends and technology",
                                "Introduce new treatments and services to your portfolio"
                            ],
                            url: ""
                        },
                        {
                            title: "Asset & Equipment Finance",
                            description: "Invest in the tools that keep you competitive while preserving cash flow.",
                            points: [
                                "Hair styling chairs and equipment",
                                "Nail care, skincare, and beauty treatment devices",
                                "Makeup and cosmetic application tools",
                                "Spa essentials: massage tables, warmers, etc.",
                                "Reception and salon furniture",
                                "Cleaning and sanitation systems"
                            ],
                            url: ""
                        }
                    ]}
                />
                <WhyChooseSolution
                    upperHeader={"Meeting Industry Challenges with Confidence"}
                    header={"Finance Solutions That Work as Hard as You Do"}
                    content={
                        "The beauty and wellbeing sector is fast-paced and competitive, with shifting regulations, seasonal fluctuations, and rising costs. Our tailored finance products are built to support your business, whatever the challenge."
                    }
                    subContent={
                        "Our finance solutions provide predictable repayments, flexible cash flow tools, and expert support—helping you thrive in a constantly evolving market."
                    }
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
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    );
}
