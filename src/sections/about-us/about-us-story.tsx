import {IoCheckmark} from "react-icons/io5";
import {poppins} from "@/app/fonts/fonts";
import {Button} from "@/components/ui/button";
import {PiCaretRight} from "react-icons/pi";

export default function AboutUsStory() {

    const points = [
        "Services Across UK",
        "Funding available from £10k - £10M",
        "Flexible repayment terms",
        "Low interest rates available",
        "Fast decisions within 24 - 48 hours",
        "Dedicated Account Manager"
    ];

    return (
        <div className={"flex md:pt-0 pt-20 flex-col"}>
            <div className={"grid grid-cols-1 md:grid-cols-3 px-[4%] md:px-[6%] w-full gap-5"}>
                {
                    points.map((point, index) => (
                        <div key={index} className={"flex text-lg items-center gap-2"}>
                            <IoCheckmark size={30} className={"text-secondary"}/>
                            <p className={"font-semibold"}>
                                {point}
                            </p>
                        </div>
                    ))
                }
            </div>
            <div className={"flex px-[6%] gap-16 md:flex-row flex-col items-center justify-between py-20"}>
                <div className={"flex w-full justify-center items-end"}>
                    <img src={"https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg"}
                         className={"rounded-[18px]"}
                         alt={"team image"}
                    />
                </div>
                <div className={"flex w-full justify-end gap-1 flex-col h-full"}>
                    <div className={"px-4 py-1 rounded-full w-min bg-primary"}>
                        <p className={`text-white text-xs whitespace-nowrap font-bold ${poppins.className}`}>
                            Our Story
                        </p>
                    </div>
                    <h1 className={"text-3xl md:text-3xl font-bold"}>
                        We Started Alpha Funding to Make Business Finance Feel Less Like a Fight.
                    </h1>
                    <p className={"text-muted-foreground text-xs"}>
                        We Started Alpha Funding to Make Business Finance Feel Less Like a Fight.
                        Back in 2020, we saw too many business owners spending weeks chasing the right finance — juggling
                        paperwork, vague offers, and radio silence from lenders. We knew things had to change.
                        So, we built Alpha Funding.
                        With over 60 years of combined experience behind us, our team set out to make finance straightforward,
                        honest, and built around your goals — not someone else’s checklist.
                        Since then, we’ve helped businesses across the UK secure the funding they need to invest, grow, and move
                        forward with confidence. Simple as that.
                    </p>
                </div>
            </div>
        </div>
    )
}