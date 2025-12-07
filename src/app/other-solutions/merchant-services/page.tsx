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
    title: 'Merchant Services',
    description: 'Accept credit card payments securely in person, online, or over the phone. Card machines, online payments, EPOS systems, and payment gateways for UK businesses.',
    openGraph: {
        url: 'https://www.alpha-funding.co.uk/other-solutions/merchant-services',
        title: 'Merchant Services - Payment Processing Solutions | Alpha Funding',
        description: 'Enable your business to accept payments anywhere. Secure card machines, online gateways, and EPOS systems.',
        images: [
            {
                url: 'https://www.alpha-funding.co.uk/og-merchant-services.jpg',
                width: 1200,
                height: 630,
                alt: 'Merchant Services',
            },
        ],
    },
};

export default function MerchantServices() {

    const content = [
        {
            point: "Card Machines",
            content: "Range of credit card machines to improve revenue acquisition. Accept contactless, chip & PIN, and magnetic stripe payments with modern, reliable terminals."
        },
        {
            point: "Online Payments",
            content: "Using a secure payment gateway, take credit card payments online. Enable ecommerce with trusted, PCI-compliant online payment processing."
        },
        {
            point: "Phone Payments",
            content: "Let customers pay conveniently over the phone. Secure telephon payment solutions for mail-order and remote sales businesses."
        },
        {
            point: "EPOS Systems",
            content: "All-in-one EPOS system for businesses to run more efficiently. Integrated point-of-sale solutions combining payment processing with inventory and sales management."
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
                        name: 'Merchant Services',
                    },
                ]}
            />
            <FAQJsonLd
                questions={[
                    {
                        question: 'What are merchant services?',
                        answer: 'Merchant services are payment processing solutions that enable you to accept debit and credit card payments. Customer information is transmitted through phone, ecommerce portals, or point of sale terminals for verification and approval.',
                    },
                    {
                        question: 'How do merchant service fees work?',
                        answer: 'Merchants are charged a fee for each transaction, and these prices vary significantly. It is critical to obtain estimates from multiple merchant service providers to make an informed decision.',
                    },
                    {
                        question: 'What payment methods can I accept?',
                        answer: 'You can accept credit card payments in person (card machines), online (payment gateways), over the phone (MOTO), and through EPOS systems. This includes contactless, chip & PIN, and magnetic stripe payments.',
                    },
                    {
                        question: 'Are merchant services secure?',
                        answer: 'Yes, merchant services protect merchants from fraudulent activity and provide purchasers with a trustworthy and safe method of purchasing goods and services through PCI-compliant processing.',
                    },
                ]}
            />
            <NavBar />
            <div className={"flex bg-light-gray flex-col"}>
                <SolutionsHeaderSection
                    label={"Merchant Services"}
                    header={"Accept payments securely from customers anywhere"}
                    description={"A suite of merchant services that enables your business to securely accept credit card payments from customers in person, online, or over the phone. Unlock better cash flow, easy transaction management, and quick, safe payments."}
                    image={"https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg"}
                    sectorPoints={[
                        "Card machines for in-store payments",
                        "Secure online payment gateways",
                        "Phone payment processing (MOTO)",
                        "Integrated EPOS systems",
                        "NO EXTRA COSTS - Virtually-free service",
                        "TRUSTED PROVIDERS - Verified payment processors",
                        "COMPLETE TRANSPARENCY - Clear pricing",
                        "SPECIALIST SUPPORT - Expert guidance"
                    ]}
                    sectorQuestion={"Why Your Business Needs Merchant Services"}
                    secondaryContent={"A lot has changed in the way that people shop in the last decade. Retailers worldwide have had to adapt to contactless payments and online shopping. Customers want to pay with credit or debit cards in stores, over the phone, by email, and through web portals. Your business needs to address these challenges head-on to stay competitive."}
                    secondaryHeader={"Modern Payment Solutions for Modern Business"}
                />
                <WhyChooseSolution
                    upperHeader={"Complete Payment Processing Suite"}
                    header={"Accept Payments Everywhere Your Customers Are"}
                    content={"You can start taking credit card payments from customers in person, online, or over the phone, no matter what kind of business you have. Merchant services protect you from fraudulent activity while providing customers with trustworthy and safe purchasing methods."}
                    subContent={"The merchant is paid a fee for each transaction, and these prices vary significantly. Merchant services can help your business get more customers and give them a better experience. We help you compare multiple providers to find the best rates and features."}
                    bottomContent={(
                        <Link href={"/contact"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Get Started <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    )}
                    question={"Merchant Service Options"}
                    answers={content}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    )
}
