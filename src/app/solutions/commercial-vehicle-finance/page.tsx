import NavBar from "../../../components/navbar";
import Footer from "@/sections/common/footer";
import {SolutionsHeaderSection} from "@/sections/solutions/business-loans/solutions-header-sction";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import {Button} from "@/components/ui/button";
import {ArrowUpRight} from "lucide-react";


export default function CommercialPropertyFinance() {

    const content = [
        {
            point: "Easy to access funds",
            content: "Access funds to purchase vehicles that are essential to your business operations."
        },
        {
            point: "Preserved capital",
            content: "Preserve your working capital for other important needs."
        },
        {
            point: "Fixed payments",
            content: "Fixed monthly payments, providing you with predictable expenses and the ability to plan cash flow."
        },
        {
            point: "Flexible financing terms",
            content: "We shape repayment terms and financing periods to fit your needs."
        },
        {
            point: "Competitive advantage",
            content: "Access the vehicles to improve your business' efficiency and gain advantage over competitors."
        },
        {
            point: "Maintenance and repair cost savings",
            content: "Purchasing new commercial vehicles can often reduce long-term maintenance and repair costs, compared to older, outdated vehicles."
        }
    ];

    return (
        <div className={"flex flex-col"}>
            <NavBar/>
            <div className={"flex bg-light-gray flex-col"}>
                <SolutionsHeaderSection
                    label={"Commercial Vehicle Finance"}
                    header={"Commercial Vehicle Finance for Any Business Need"}
                    description={"We understand every company has unique logistic and transport requirements. Our commercial vehicle finance solutions cater for all sorts of needs, from vans, lorries and coaches to high-end supercars."}
                    image={"https://images.pexels.com/photos/575897/pexels-photo-575897.jpeg"}
                    sectorPoints={[
                        "Purchasing new vehicles",
                        "Leasing vehicles",
                        "Upgrading existing vehicles",
                        "Managing seasonal fluctuations",
                        "Expanding the fleet",
                        "Covers prestige and supercars"
                    ]}
                    sectorQuestion={"What is commercial vehicle finance?"}
                    secondaryContent={"Commercial vehicle finance is a type of financing that is specifically designed for businesses that need to purchase vehicles for their commercial operations and can help in the following ways:"}
                    secondaryHeader={"Keep moving forward with business vehicle loans and commercial truck financing"}
                />
                <WhyChooseSolution
                    upperHeader={"Your Business, Your Terms"}
                    header={"How can Alpha Funding vehicle finance help your business?"}
                    content={"Alpha Funding is a specialist UK commercial vehicle finance provider. Our dedicated team of experts can match you with the perfect solution for your business. No matter your needs or requirements, our bespoke approach to vehicle finance ensures we can secure the best possible deal for you."}
                    subContent={"Beyond our flexible hire purchase and lease finance solutions, you can also release equity from existing lease agreements, either to unlock value to reinvest elsewhere or to get better repayment terms. Learn more on our refinancing solutions page.\n" +
                        "\n" +
                        "From arranging logistics, transport and haulage business finance to business car loans we'll get your new wheels on the road."}
                    bottomContent={(
                        <Button size="lg" variant={"secondary"} className="w-min !px-10 mt-6">
                            Blog <ArrowUpRight className="w-4 h-4"/>
                        </Button>
                    )}
                    question={"Why Choose Our Business Loans?"}
                    answers={content}
                />
                <CheckEligibleSection/>
            </div>
            <Footer/>
        </div>
    )
}