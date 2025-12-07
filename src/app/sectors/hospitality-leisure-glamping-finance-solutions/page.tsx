import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function LeisureHospitalityFinance() {
    const content = [
        {
            point: "Grow your venue with confidence",
            content: "Alpha Funding Finance helps you upgrade or expand your space so you can welcome more guests and provide exceptional service."
        },
        {
            point: "Upgrade dining and leisure facilities",
            content: "From kitchens to catering tools, we provide funding for essential equipment to keep your operations running smoothly."
        },
        {
            point: "Hire and retain skilled professionals",
            content: "Whether chefs, cleaners, or concierge staff — great people build great experiences. Our finance makes staffing affordable."
        },
        {
            point: "Smooth out seasonal fluctuations",
            content: "With flexible repayment options, our funding solutions help stabilise cash flow during slower trading months."
        },
        {
            point: "Recover and reinvent post-crisis",
            content: "Hospitality was one of the hardest-hit industries. Alpha Funding Finance supports you with recovery-focused lending so you can bounce back stronger."
        }
    ];

    return (
        <div className={"flex flex-col"}>
            <NavBar />
            <div className={"flex bg-light-gray flex-col"}>
                <SectorsHeaderSection
                    title={"Leisure & Hospitality"}
                    header={"Flexible Hospitality Finance to Keep Your Business Thriving"}
                    description={"Hotels, restaurants, gyms, and event spaces all face unique financial challenges. Alpha Funding Finance provides tailored solutions to help you deliver outstanding customer experiences without compromise."}
                    subHeader={"Funding that grows alongside your ambitions"}
                    image={"https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"}
                    subDescription={
                        "Alpha Funding Finance designs flexible finance packages so leisure and hospitality businesses can stay ahead of changing customer demands. Whether you need to expand your venue, modernise facilities, or hire additional staff, we’re here to fuel your growth.\n\n" +
                        "Our tailored loans and asset finance options allow you to keep cash flow steady, upgrade essential equipment, and create memorable experiences that keep guests returning. We don’t just provide finance — we partner with you to help your business succeed."
                    }
                    cards={[
                        {
                            title: "Hospitality Business Loans",
                            description: "Customisable loans designed for leisure and hospitality businesses of every size.",
                            points: [
                                "Bridge the gap during off-peak months",
                                "Access capital to expand or renovate",
                                "Secure prime locations with upfront funding",
                                "Recruit and train top-quality staff",
                                "Boost your marketing and digital presence",
                                "Renovate, refurbish, or redecorate your venue",
                                "Refinance expensive existing debt",
                                "Cover maintenance and compliance costs",
                                "Stay prepared for unexpected expenses"
                            ],
                            url: ""
                        },
                        {
                            title: "Asset & Equipment Finance",
                            description: "Preserve your working capital by spreading the cost of essential tools and technology.",
                            points: [
                                "Kitchen, barista, and refrigeration equipment",
                                "Hotel and guest accommodation furnishings",
                                "Laundry and cleaning systems",
                                "Modern POS and payment technology",
                                "Branding, signage, and display assets",
                                "Safety, fire, and security systems",
                                "Company and delivery vehicles",
                                "Lighting, sound, and audiovisual equipment"
                            ],
                            url: ""
                        }
                    ]}
                />
                <WhyChooseSolution
                    upperHeader={"Your challenges, solved"}
                    header={"Tailored financial solutions for leisure and hospitality"}
                    content={"The hospitality world moves fast — with fluctuating demand, high competition, and evolving customer expectations. Alpha Funding Finance provides flexible and affordable funding so you can focus on what matters: delighting your guests and growing your business."}
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
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    );
}
