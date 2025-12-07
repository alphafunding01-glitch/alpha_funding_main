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
    title: 'Revolving Credit Facility',
    description: 'On-demand credit loan whenever you need it. Access capital flexibly with revolving credit for UK businesses. Withdraw and repay as needed.',
    openGraph: {
        url: 'https://www.alpha-funding.co.uk/solutions/revolving-credit-facility',
        title: 'Revolving Credit Facility - On-Demand Business Finance | Alpha Funding',
        description: 'Flexible rolling finance agreement for SMEs. Withdraw cash whenever required with convenient repayment cycles.',
        images: [
            {
                url: 'https://www.alpha-funding.co.uk/og-rcf.jpg',
                width: 1200,
                height: 630,
                alt: 'Revolving Credit Facility',
            },
        ],
    },
};

export default function RevolvingCreditFacility() {

    const content = [
        {
            point: "Rolling Agreement",
            content: "RCF does not require renewal or modifications every time you withdraw, repay, and re-withdraw. It lays down clear conditions at the onset which are followed without needing to reapply."
        },
        {
            point: "Same-Day Withdrawals",
            content: "In many cases, if you prove to be an ideal borrower, lenders allow you to withdraw cash on the day of your application. RCF is one of the faster finance instruments available."
        },
        {
            point: "Better Cash Flow Management",
            content: "By availing RCF, businesses can improve their cash flow management and use immediately available cash for all business operations. Access finance whenever you want."
        },
        {
            point: "Short-Term Commitments",
            content: "Unlike traditional credit facilities, you're not tied to long-duration agreements. RCF is an on-demand facility - discontinue the finance cycle whenever you wish."
        },
        {
            point: "Compounding Relationships",
            content: "Lenders tend to increase the sanctioned amount and spending limit if you promptly adhere to withdrawal and repayment conditions, building trust for easier future borrowing."
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
                        name: 'Solutions',
                        item: 'https://www.alpha-funding.co.uk/solutions',
                    },
                    {
                        name: 'Revolving Credit Facility',
                    },
                ]}
            />
            <FAQJsonLd
                questions={[
                    {
                        question: 'What is a Revolving Credit Facility?',
                        answer: 'A Revolving Credit Facility is a rolling finance agreement that allows businesses to withdraw cash whenever required and engage in cyclic withdrawal and repayment at agreed periods and interest rates. It is more access-friendly than overdraft facilities.',
                    },
                    {
                        question: 'How does RCF differ from traditional loans?',
                        answer: 'RCF is dynamic unlike static loans. You pay interest only on the amount withdrawn, not the total loan amount. The facility is replenished after repayment without needing to reapply, offering continuous access to funds.',
                    },
                    {
                        question: 'What are the key benefits of RCF?',
                        answer: 'Rolling agreement without renewal needs, same-day withdrawals availability, better cash flow management, short-term commitments with flexibility to discontinue, and compounding relationships that can increase your borrowing limit.',
                    },
                    {
                        question: 'Who can apply for a Revolving Credit Facility?',
                        answer: 'Small and large businesses in the United Kingdom can apply. Key requirement is being a UK-based company with active business operations principally in the UK. Proper documentation including management accounts, business plans, and asset records is required.',
                    },
                ]}
            />
            <NavBar />
            <div className={"flex bg-light-gray flex-col"}>
                <SolutionsHeaderSection
                    label={"Revolving Credit Facility"}
                    header={"Looking for an on-demand credit loan whenever you want?"}
                    description={"Get access to capital whenever your business needs it. Revolving Credit Facility is one of the alternative flexible finance options that allows for on-demand money withdrawal and convenient repayment as and when needed."}
                    image={"https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg"}
                    sectorPoints={[
                        "Payroll management and wages",
                        "Cash flow stabilization",
                        "Working capital requirements",
                        "Unexpected business expenses",
                        "Renovation and maintenance costs",
                        "Inventory and stock management",
                        "Seasonal business fluctuations"
                    ]}
                    sectorQuestion={"What can you use Revolving Credit Facility for?"}
                    secondaryContent={"Revolving Credit Facility is a dynamic form of business loan different from static options like overdrafts or secured loans. The funding limit, repayment cycle terms and conditions are agreed upon between borrower and lender before undertaking RCF. One distinct feature is paying interest only on the amount withdrawn from the total loan amount. The cycle replenishes after repayment without needing to reapply."}
                    secondaryHeader={"What is a Revolving Credit Facility?"}
                />
                <WhyChooseSolution
                    upperHeader={"Dynamic Finance for Modern Businesses"}
                    header={"Flexible Access to Working Capital"}
                    content={"Revolving Credit Facility is more suited for working capital needs of small and medium-sized businesses. SMEs can take advantage of RCF to fulfill all sorts of legitimate business purposes - from payrolls to renovation and maintenance. Any cash needs of your business are well taken care of by availing this flexible facility."}
                    subContent={"Use Revolving Credit to pay back only on the amount of money used. The convenience of immediate access, combined with the ability to withdraw, repay, and re-withdraw without reapplication makes RCF one of the most popular alternative financing options among UK businesses."}
                    bottomContent={(
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Apply For RCF <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    )}
                    question={"Salient features of Revolving Credit Facility"}
                    answers={content}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    )
}
