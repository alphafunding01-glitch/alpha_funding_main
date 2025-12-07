import NavBar from "../../../components/navbar";
import Footer from "@/sections/common/footer";
import {SolutionsHeaderSection} from "@/sections/solutions/business-loans/solutions-header-sction";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import {Button, buttonVariants} from "@/components/ui/button";
import {ArrowUpRight} from "lucide-react";
import Link from "next/link";


export default function BusinessLoans() {

    const content = [
        {
            point: "Preserve your cash flow",
            content: "Spread costs into easy monthly instalments rather than locking up large sums of money in equipment purchases."
        },
        {
            point: "Invest without delay",
            content: "Secure quick financing to get the essential machinery and tools your business needs right away, without waiting."
        },
        {
            point: "Predictable repayments",
            content: "Benefit from fixed monthly instalments, giving you certainty in your budgeting and cash flow planning."
        },
        {
            point: "Flexible structures",
            content: "Choose from customised repayment plans, interest options, and terms that adapt to the unique demands of your business."
        },
        {
            point: "Stay ahead with innovation",
            content: "Easily upgrade to the latest equipment and technology, keeping your operations modern and competitive without heavy upfront costs."
        },
        {
            point: "Gain an edge",
            content: "Accessing advanced tools empowers you to outperform competitors who may still rely on outdated resources."
        }
    ];

    return (
        <div className={"flex flex-col"}>
            <NavBar/>
            <div className={"flex bg-light-gray flex-col"}>
                <SolutionsHeaderSection
                    label={"Asset & Equipment Financing"}
                    header={"Empower Your Business with Smart Asset Financing"}
                    description={"Fuel your growth with tailored finance options that make acquiring essential equipment simple and affordable. Access the tools and technology you need to stay agile and competitive."}
                    image={"https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg"}
                    sectorPoints={[
                        "Hard assets include high-value investments like vehicles, industrial machinery, and heavy equipment that drive productivity and retain value for years.",
                        "Soft assets cover everyday essentials such as office furniture, IT infrastructure, telecom systems, and industry-specific tools that enable your teams to perform efficiently."
                    ]}
                    sectorQuestion={"Equipping your people with the right resources for success"}
                    secondaryContent={"Asset finance allows businesses to acquire equipment, vehicles, or technology without making the full purchase upfront—helping you keep operations running smoothly while protecting your working capital."}
                    secondaryHeader={"Understanding asset & equipment finance"}
                />
                <WhyChooseSolution
                    upperHeader={"Finance Designed Around You"}
                    header={"Why does asset financing matter?"}
                    content={"Our financing solutions help you get critical business assets immediately while keeping your budget under control, ensuring your operations never fall behind."}
                    subContent={"Whether it's hire purchase, leasing, or refinancing, our experts design funding solutions that align with your growth ambitions and keep your business moving forward."}
                    bottomContent={(
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                        })}>
                            Apply for Funding <ArrowUpRight className="w-4 h-4"/>
                        </Link>
                    )}
                    question={"Why Partner With Us?"}
                    answers={content}
                />
                <CheckEligibleSection/>
            </div>
            <Footer/>
        </div>
    )
}
