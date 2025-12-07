import {Button} from "@/components/ui/button";
import {PiCaretRight} from "react-icons/pi";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {IoCheckmark} from "react-icons/io5";
import {poppins} from "@/app/fonts/fonts";


export default function AboutUsValues() {

    const websiteContent = [
        {
            title: "Fuelled by Ambition",
            description: "We’re on a mission to revolutionize business finance—making it faster, fairer, and accessible for businesses of every size and stage."
        },
        {
            title: "Built on Integrity",
            description: "You can rely on us to prioritize your best interests. We deliver tailored solutions that align with your goals—no shortcuts, no compromises."
        },
        {
            title: "Committed to Clarity",
            description: "No hidden fees, no surprises. Just straightforward advice and clear, honest communication from start to finish."
        },
        {
            title: "Focused on Your Future",
            description: "We take the time to truly understand your business, your challenges, and your vision—so we can be your steadfast partner every step of the way."
        },
        {
            title: "Passion that Drives Growth",
            description: "Your success drives us. We’re deeply committed to helping UK businesses thrive, channelling that passion into every relationship we build."
        }
    ];

    return (
        <div className={"flex md:flex-row flex-col px-[4%] md:px-[12%] gap-6 py-20"}>
            <div className={"flex flex-col gap-20 justify-between"}>
                <div className={"flex sticky top-40 max-w-4xl flex-col gap-4"}>
                    <div className={"px-4 py-1 rounded-full w-min bg-primary"}>
                        <p className={`text-white text-xs whitespace-nowrap font-bold ${poppins.className}`}>
                            Our values
                        </p>
                    </div>
                    <h1 className={"text-3xl font-semibold"}>
                        More Than Just Brokers
                    </h1>
                    <div className={"h-[1px] bg-primary w-1/2"}/>
                    <p className={'text-md text-muted-foreground'}>
                        At Alpha Funding, we’re not just brokers — we’re long-term
                        partners in your business journey. Our values guide
                        everything we do and shape how we work with every
                        client.
                    </p>
                </div>
            </div>
            <div className={"grid grid-cols-1 w-full pb-10"}>
                {
                    websiteContent.map((item, index) => (
                        <div key={index} className={"flex border-b border-black/20 py-6 flex-col gap-1"}>
                            <h1 className={"text-xl font-semibold text-primary"}>
                                {item.title}
                            </h1>
                            <p className={"text-muted-foreground"}>
                                {item.description}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}