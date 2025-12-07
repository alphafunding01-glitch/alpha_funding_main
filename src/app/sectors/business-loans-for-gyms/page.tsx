import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function GymFinance() {
    const content = [
        {
            point: "Get easy access to gym equipment finance",
            content: "Access state-of-the-art equipment with our financing solutions to help clients achieve and exceed their fitness goals."
        },
        {
            point: "Hire and retain the best staff",
            content: "Invest in skilled fitness professionals who drive your gym’s long-term growth and reputation."
        },
        {
            point: "Stay ahead of the competition",
            content: "Secure funding to execute marketing strategies that attract new members and keep your business leading the market."
        },
        {
            point: "Expand and upgrade facilities",
            content: "Use business loans to finance expansions, refurbishments, and improvements to your premises."
        },
        {
            point: "Maintain stable cash flow",
            content: "Manage high operational expenses with flexible merchant cash advance solutions designed to keep finances steady."
        }
    ];

    return (
        <div className={"flex flex-col"}>
            <NavBar />
            <div className={"flex bg-light-gray flex-col"}>
                <SectorsHeaderSection
                    title={"GYMS & FITNESS"}
                    header={"Business Financing to Keep Your Gym in Peak Condition"}
                    description={
                        "Energise your fitness enterprise with our specialised commercial gym equipment financing. Secure the capital you need for vital assets, boost your purchasing power, and accelerate your growth potential."
                    }
                    subHeader={"Dedicated Gym Equipment Leasing and Financing Solutions for the Fitness Sector"}
                    image={"https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg"}
                    subDescription={
                        "Whether you aim to elevate your fitness centre or stand out by offering the latest exercise equipment, our financing specialists can help you find the perfect funding solution.\n\n" +
                        "With fast, cost-effective business loans and asset finance options, you’ll gain the financial leverage to enhance your services and grow your business."
                    }
                    cards={[
                        {
                            title: "Business Loans",
                            description: "Fuel your gym’s growth and surpass your goals with customised loan solutions designed specifically for fitness businesses.",
                            points: [
                                "Relieve pressure on profit margins",
                                "Stay ahead of competitors",
                                "Respond to evolving customer demands",
                                "Expand your facility and services",
                                "Renovate your premises",
                                "Broaden your health and wellness offerings",
                                "Upgrade exercise equipment",
                                "Enhance safety and first aid capabilities",
                                "Recruit or train personal trainers"
                            ],
                            url: ""
                        },
                        {
                            title: "Asset Finance",
                            description: "Build your asset base and expand your gym’s equipment inventory to provide an exceptional fitness experience.",
                            points: [
                                "Treadmills",
                                "Cross trainers",
                                "Stationary bikes",
                                "Rowing machines",
                                "Flooring and matting",
                                "Free weights and dumbbells",
                                "Fitness monitoring devices",
                                "Facility improvements and refurbishments",
                                "Changing room upgrades"
                            ],
                            url: ""
                        }
                    ]}
                />
                <WhyChooseSolution
                    upperHeader={"Addressing Key Industry Challenges"}
                    header={"Navigate Obstacles and Elevate Your Gym with Tailored Financing"}
                    content={
                        "Running a fitness business involves high costs such as rent, staffing, and equipment investments. Our customised business loan solutions are designed to meet these challenges, empowering your gym to reach new levels of success."
                    }
                    subContent={
                        "Access cutting-edge gym equipment, attract and retain top trainers, and maintain a competitive edge with the right financing at the right time."
                    }
                    bottomContent={(
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Get Funded Today <ArrowUpRight className="w-4 h-4"/>
                        </Link>
                    )}
                    question={"Why Choose Our Gym & Fitness Financing?"}
                    answers={content}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    );
}
