import NavBar from "../../../components/navbar";
import Footer from "@/sections/common/footer";
import { SolutionsHeaderSection } from "@/sections/solutions/business-loans/solutions-header-sction";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import {Button, buttonVariants} from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function InvoiceFinance() {

    const content = [
        {
            point: "Quick Access to Funds",
            content: "Invoice financing delivers rapid access to cash, helping businesses manage operational costs, employee salaries, and unforeseen expenses."
        },
        {
            point: "Enhanced Cash Flow",
            content: "This solution boosts cash flow, allowing you to seize growth opportunities that might otherwise be unavailable."
        },
        {
            point: "Maintain Control",
            content: "You keep full control over your invoicing and collections, as the lender does not communicate directly with your customers."
        },
        {
            point: "Customized to Your Requirements",
            content: "Our financing options can be tailored to suit your unique business needs, including selective invoice financing and spot factoring."
        },
        {
            point: "No Restrictions on Fund Usage",
            content: "Funds can be used freely without limitations, providing you with the flexibility to allocate money where your business requires it most."
        },
        {
            point: "No Credit Score Conditions",
            content: "Approval typically depends on your business’s sales volume, offering a viable option for those with less-than-perfect credit histories."
        }
    ];

    return (
        <div className={"flex flex-col"}>
            <NavBar />
            <div className={"flex bg-light-gray flex-col"}>
                <SolutionsHeaderSection
                    label={"Invoice Finance"}
                    header={"Invoice Finance Solutions to Maintain Strong Cash Flow"}
                    description={
                        "Late payments from clients can disrupt your business’s cash flow. Fortunately, our invoice finance options provide quicker access to funds tied up in unpaid invoices, helping you keep your operations running smoothly."
                    }
                    image={"https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg"}
                    sectorPoints={[
                        "Purchasing inventory and supplies",
                        "Business expansion or facility renovations",
                        "Upgrading or repairing equipment",
                        "Consolidating existing debts",
                        "Funding marketing and advertising campaigns",
                        "Covering employee salaries",
                        "Managing day-to-day cash flow",
                        "Handling unexpected expenses, such as tax payments"
                    ]}
                    sectorQuestion={"What Are Common Uses for Invoice Financing?"}
                    secondaryHeader={"What is Invoice Financing?"}
                    secondaryContent={
                        "Invoice financing is a funding method where a business uses its outstanding invoices as collateral to obtain immediate cash from a lender. This approach offers fast access to funds, helping cover day-to-day expenses, stabilize cash flow, and support business growth initiatives."
                    }
                />
                <WhyChooseSolution
                    upperHeader={"Stabilise Cash Flow, Unlock Growth"}
                    header={"In What Ways Can Invoice Finance Benefit Your Business?"}
                    content={
                        "For many UK businesses, maintaining steady cash flow poses a greater challenge than profitability. Invoice finance provides the essential working capital needed to keep your operations running smoothly, even when invoice payments are delayed."
                    }
                    subContent={
                        "We bridge the gap in your cash flow, ensuring you have the funds necessary to drive growth and invest in new opportunities."
                    }
                    bottomContent={(
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Ease Your Cash Flow <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    )}
                    question={"Reasons to Choose Our Business Loans"}
                    answers={content}
                />
                <CheckEligibleSection />
            </div>
            <Footer />
        </div>
    )
}
