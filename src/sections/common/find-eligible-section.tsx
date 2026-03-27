import { Button, buttonVariants } from "@/components/ui/button";
import { PiCaretRight } from "react-icons/pi";
import Link from "next/link";

export default function CheckEligibleSection() {
    return (
        <div className={"flex flex-col md:px-[6%] px-[4%] py-20"}>
            <div className={"flex flex-col relative h-64 sm:h-80 md:h-100 rounded-2xl"}>
                <img src={"https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg"}
                    className={"h-full rounded-2xl absolute w-full object-cover"}
                    alt={"finance"}
                />
                <div
                    className={"absolute rounded-2xl w-full h-full bg-linear-to-r from-primary/90 to-[#62c1a5]/60"} />
                <div className={"flex gap-2 absolute w-full md:w-1/2 h-full justify-center p-6 md:p-10 flex-col"}>
                    <h1 className={"text-xl sm:text-2xl md:text-3xl text-white font-bold"}>
                        Business Loan Calculator UK
                    </h1>
                    <p className={"text-white"}>
                        Estimate your monthly repayments in seconds. No commitment. No credit check.
                    </p>
                    <div className={"flex md:flex-row flex-col gap-3"}>
                        <Link href={"/calculator"} className={buttonVariants({
                            size: "lg", variant: 'outline', className: "w-min !px-10 mt-8"
                        })}>
                            Try Calculator <PiCaretRight />
                        </Link>
                        <Link href={"/check-eligibility"} className={buttonVariants({
                            size: "lg", variant: 'outline', className: "w-min !px-10 mt-8"
                        })}>
                            Check Eligibility <PiCaretRight />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}