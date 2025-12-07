import NavBar from "../../../components/navbar";
import Footer from "@/sections/common/footer";
import { SolutionsHeaderSection } from "@/sections/solutions/business-loans/solutions-header-sction";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import { buttonVariants } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BreadcrumbJsonLd, FAQJsonLd } from 'next-seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Machinery & Vehicle Asset Finance',
    description: 'Finance business machinery and vehicles with flexible leasing and hire purchase options. Equipment finance for UK businesses without upfront costs.',
    openGraph: {
        url: 'https://www.alpha-funding.co.uk/other-solutions/machinery-vehicle-finance',
        title: 'Machinery & Vehicle Finance - Equipment Leasing | Alpha Funding',
        description: 'Acquire costly equipment and vehicles without capital outlay. Flexible leasing and contract hire for businesses.',
        images: [
            {
                url: 'https://www.alpha-funding.co.uk/og-machinery-finance.jpg',
                width: 1200,
                height: 630,
                alt: 'Machinery & Vehicle Finance',
            },
        ],
    },
};

export default function MachineryVehicleFinance() {

    const content = [
        {
            point: "Machinery Finance Flexibility",
            content: "Acquire costly equipment your firm needs to thrive through leasing. Essentially rent assets for specified periods, spreading costs over time without permanent ownership commitment."
        },
        {
            point: "Immediate Equipment Access",
            content: "Begin using equipment immediately while spreading costs over a predetermined period. No need to wait to save capital - start generating revenue with new assets from day one."
        },
        {
            point: "Upgrade Options",
            content: "At lease end, renew, purchase outright (after accumulated debt), upgrade on new lease, or simply return equipment. Stay current with technology without being locked into obsolete assets."
        },
        {
            point: "Wide Equipment Range",
            content: "Business owners are astounded by the breadth of equipment available on lease - from heavy machinery to vehicles, IT systems to manufacturing equipment. Perfect for contractors with short-term project backlogs."
        },
        {
            point: "Vehicle Contract Hire",
            content: "Rent vehicles for specified time and mileage with fixed monthly rentals. No purchase option - return to leasing firm at term end or purchase at fair market value."
        },
        {
            point: "Cash Flow Protection",
            content: "Protect your cash flow by avoiding large capital outlays. Asset finance options preserve working capital for core business operations while still accessing essential equipment."
        }
    ];

    return (
        <div className={"flex flex-col"}>
            <BreadcrumbJsonLd
                items={[
                    {
                        name: 'Home',
                        item: 'https://www.alpha-funding.co.uk',
                    },
                    {
                        name: 'Other Solutions',
                        item: 'https://www.alpha-funding.co.uk/other-solutions',
                    },
                    {
                        name: 'Machinery & Vehicle Finance',
                    },
                ]}
            />
            <FAQJsonLd
                questions={[
                    {
                        question: 'What is machinery finance?',
                        answer: 'Machinery finance is a form of asset-based financing that enables you to acquire costly equipment through leasing. You begin using equipment immediately while spreading costs over time, without necessarily retaining ownership at period end.',
                    },
                    {
                        question: 'How does equipment leasing differ from hire purchase?',
                        answer: 'Both spread costs over time, but hire purchase leads to ownership. With leasing, at term end you can renew, purchase outright, upgrade on new lease, or return the equipment. Leasing offers more flexibility.',
                    },
                    {
                        question: 'What is contract hire for vehicles?',
                        answer: 'Contract hire lets you rent vehicles for specified time and mileage with fixed monthly rentals. No purchase option exists - vehicles return to the leasing firm at term end, though you may purchase at fair market value.',
                    },
                    {
                        question: 'What equipment can I finance?',
                        answer: 'The breadth is extensive: heavy machinery, commercial vehicles, IT systems, manufacturing equipment, construction tools, and more. Perfect for businesses needing equipment for specific projects or wanting to stay current with technology.',
                    },
                ]}
            />
            <NavBar />
            <div className={"flex bg-light-gray flex-col"}>
                <SolutionsHeaderSection
                    label={"Machinery & Vehicle Finance"}
                    header={"Acquire assets without the capital outlay"}
                    description={"We provide a variety of machinery and vehicle financing alternatives designed to enable you to invest in new assets that help your business grow while safeguarding your cash flow. Access essential equipment without large upfront costs."}
                    image={"https://images.pexels.com/photos/1267337/pexels-photo-1267337.jpeg"}
                    sectorPoints={[
                        "Machinery finance through flexible leasing",
                        "Vehicle contract hire with fixed rentals",
                        "Immediate equipment access with spread costs",
                        "Upgrade options at lease end",
                        "Wide range of equipment available",
                        "Cash flow protection - no large outlays",
                        "Perfect for short-term projects"
                    ]}
                    sectorQuestion={"Why Choose Asset Finance?"}
                    secondaryContent={"Machinery Finance can be an effective method of acquiring costly equipment your firm requires. Leasing is essentially renting an asset for a specified time - it is not permanent. Like hire purchase, equipment leasing is asset-based financing enabling immediate use while spreading costs over time. The distinction: you don't necessarily retain ownership at period end."}
                    secondaryHeader={"Machinery & Vehicle Finance Explained"}
                />
                <WhyChooseSolution
                    upperHeader={"Flexible Asset Acquisition"}
                    header={"Finance Equipment & Vehicles That Drive Growth"}
                    content={"Equipment leasing benefits are significant: at agreed period end, you can upgrade or replace purchases to meet business demands. For instance, you may need a larger truck, new technology may become available, or you may require additional machinery. However, consider your timeline - ensure you're not repaying a loan on assets you're no longer using."}
                    subContent={"Contract hire (operational lease) is the most common vehicle financing method. Monthly rentals are calculated using total vehicle cost (registration, road tax), term of usage, agreed mileage, financing costs, and forecast residual value. Vehicles can be purchased at fair market price at term end."}
                    bottomContent={(
                        <Link href={"/contact"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Get Asset Finance <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    )}
                    question={"Key Benefits of Machinery & Vehicle Finance"}
                    answers={content}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    )
}
