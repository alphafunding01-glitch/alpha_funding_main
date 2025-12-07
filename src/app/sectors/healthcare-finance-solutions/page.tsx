import NavBar from "@/components/navbar";
import SectorsHeaderSection from "@/sections/sectors/sector-header-section";
import {Button, buttonVariants} from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import Footer from "@/sections/common/footer";
import Link from "next/link";

export default function HealthcareFinance() {
    const content = [
        {
            point: "Invest in Modern Medical Equipment",
            content:
                "Obtain funding for essential technology and devices critical for quality healthcare delivery."
        },
        {
            point: "Expand Treatment Capabilities",
            content:
                "Broaden your range of services to provide more comprehensive preventive and therapeutic care."
        },
        {
            point: "Enhance Your Environment",
            content:
                "Upgrade your practice’s physical spaces to create welcoming, calming atmospheres for patients and visitors."
        },
        {
            point: "Improve Patient Access",
            content:
                "Invest in communications and outreach to increase service availability and patient engagement."
        },
        {
            point: "Release Capital from Existing Assets",
            content:
                "Unlock funds tied up in your equipment and facilities through refinancing, providing vital cash flow support."
        }
    ];

    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="flex bg-light-gray flex-col">
                <SectorsHeaderSection
                    title={"Healthcare"}
                    header={"Healthcare Finance Solutions to Enhance Quality Care Delivery"}
                    description={
                        "As demand for private healthcare services rises, tailored business loans enable healthcare professionals to capitalise on emerging opportunities and expand their impact."
                    }
                    subHeader={"Adaptable Financing for Healthcare Operations and Equipment"}
                    image={"https://images.pexels.com/photos/1350560/pexels-photo-1350560.jpeg"}
                    subDescription={
                        "From medical clinics and dental practices to optometry and residential care facilities, delivering superior care requires continual investment. We provide tailored financial support that helps you maintain your facilities, acquire specialised tools, and deliver compassionate, high-quality treatment.\n\nOur flexible loans and asset financing are designed around your specific goals, ensuring your practice remains equipped and ready to serve."
                    }
                    cards={[
                        {
                            title: "Business Loans",
                            description:
                                "Quick and competitively priced financing solutions made to meet the distinct demands of healthcare businesses.",
                            points: [
                                "Maintain steady cash flow regardless of seasonality",
                                "Grow your clinic, practice, or care services",
                                "Employ qualified healthcare personnel",
                                "Comply with safety and regulatory standards",
                                "Adopt the latest advancements in medical technology",
                                "Cover insurance premiums and liability-related expenses",
                                "Support the acquisition of additional healthcare operations"
                            ],
                            url: ""
                        },
                        {
                            title: "Asset Finance",
                            description:
                                "Extensive financing options to secure essential medical and support equipment.",
                            points: [
                                "Diagnostic and imaging devices",
                                "Rehabilitation and treatment apparatus",
                                "Equipment for optical, dental, and pharmaceutical services",
                                "Surgical tools and devices",
                                "Waiting area and reception furnishings",
                                "Communication and IT infrastructure",
                                "Sterilisation and hygiene systems"
                            ],
                            url: ""
                        }
                    ]}
                />

                <WhyChooseSolution
                    upperHeader={"Meeting Industry Challenges"}
                    header={"Focus on Patient Wellbeing with Tailored Healthcare Funding"}
                    content={
                        "Recognising the unique pressures on healthcare operators running independent practices or facilities, we offer financing solutions that let you concentrate on delivering outstanding care while we manage your capital needs."
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
