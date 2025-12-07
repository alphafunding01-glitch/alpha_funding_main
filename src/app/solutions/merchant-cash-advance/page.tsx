import NavBar from "../../../components/navbar";
import Footer from "@/sections/common/footer";
import {SolutionsHeaderSection} from "@/sections/solutions/business-loans/solutions-header-sction";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import {Button, buttonVariants} from "@/components/ui/button";
import {ArrowUpRight} from "lucide-react";
import Link from "next/link";


export default function MerchantCashAdvance() {

    const content = [
        {
            point: "Fast Access to Funds",
            content: "Merchant Cash Advances provide quick financing, ideal for businesses that need cash flow support without delay."
        },
        {
            point: "Simple Application Process",
            content: "Our streamlined application requires minimal information—usually just your business sales volume—making approval faster and easier."
        },
        {
            point: "No Collateral Needed",
            content: "With no requirement for assets as security, our refinance solutions reduce risk for businesses lacking significant collateral."
        },
        {
            point: "Flexible Repayment Terms",
            content: "Repayments are based on a percentage of your sales, allowing payments to adjust naturally with your cash flow."
        },
        {
            point: "Freedom to Use Funds",
            content: "There are no restrictions on how you use the funds, giving you complete control to address your business priorities."
        },
        {
            point: "Credit Score Not a Barrier",
            content: "Approval focuses on your business’s sales performance rather than credit scores, making funding accessible even if your credit isn’t perfect."
        },
        {
            point: "Opportunity for Repeat Funding",
            content: "Once repaid, you may qualify for additional advances, providing a reliable source of ongoing working capital."
        }
    ];

    return (
        <div className={"flex flex-col"}>
            <NavBar/>
            <div className={"flex bg-light-gray flex-col"}>
                <SolutionsHeaderSection
                    label={"Merchant Cash Advance"}
                    header={"Flexible Funding to Keep Your Business Moving"}
                    description={"If your business relies on card terminal payments, managing cash flow can be challenging—especially during seasonal fluctuations. A Merchant Cash Advance provides a flexible, revenue-linked funding solution, giving you access to working capital when you need it most—without the pressure of fixed monthly repayments."}
                    image={"https://images.pexels.com/photos/2379886/pexels-photo-2379886.jpeg"}
                    sectorPoints={[
                        "Purchasing inventory and supplies",
                        "Financing expansion or renovation projects",
                        "Upgrading or repairing equipment",
                        "Consolidating existing debts",
                        "Investing in marketing and advertising campaigns",
                        "Covering staff wages and payroll",
                        "Managing day-to-day cash flow fluctuations",
                        "Handling unexpected or emergency expenses"
                    ]}
                    sectorQuestion={"What can a Merchant Cash Advance be used for?"}
                    secondaryHeader={"What is a Merchant Cash Advance?"}
                    secondaryContent={"A Merchant Cash Advance (MCA) is an alternative funding solution designed for businesses that receive payments via card terminals. Unlike a traditional loan, an MCA provides a lump sum of capital in exchange for a fixed percentage of your future card sales. Repayments are automatically deducted as a portion of daily or weekly revenue—making it a flexible option that aligns with your cash flow."}
                />
                <WhyChooseSolution
                    upperHeader={"Your Business, Your Terms"}
                    header={"How Can a Merchant Cash Advance Benefit Your Business?"}
                    content={"A Merchant Cash Advance provides a fast and flexible source of working capital—ideal for retail businesses that rely heavily on card payments. At Alpha Funding, we tailor solutions to fit your unique needs, offering competitive rates and a straightforward application process."}
                    subContent={"This funding option helps you manage cash flow effectively, especially if your business has limited physical assets but consistent card transaction revenue."}
                    bottomContent={(
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Get A Merchant Cash Advance <ArrowUpRight className="w-4 h-4"/>
                        </Link>
                    )}
                    question={"Why Choose Our Refinance Solutions?"}
                    answers={content}
                />
                <CheckEligibleSection/>
            </div>
            <Footer/>
        </div>
    )
}
