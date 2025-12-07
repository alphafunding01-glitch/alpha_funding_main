"use client";

import {Button} from "@/components/ui/button";
import {PiCaretRight} from "react-icons/pi";
import {Player} from "@lottiefiles/react-lottie-player";
import {Poppins} from "next/font/google";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ArrowUpRight} from "lucide-react";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"],
})

export default function HomeBusinessFinanceWorks() {

    const loans = [
        {
            title: "Working Capital Loans",
            description: "Keep your operations running smoothly—whether it's daily expenses, unexpected hurdles, or surprise growth opportunities. Your business deserves balance, not pressure."
        },
        {
            title: "Unsecured Business Loans",
            description: "No collateral? That’s okay. Let your business performance speak for itself—no need to risk personal or tangible assets."
        },
        {
            title: "Short-Term Business Loans",
            description: "Ideal for urgent needs—cover seasonal costs, stock up inventory, or grab that time-sensitive opportunity before it slips away."
        },
        {
            title: "VAT Loans",
            description: "Stay in control of your cash flow. Spread your VAT payments over three manageable months and stay one step ahead of HMRC."
        }
    ]

    return (
        <div
            className={"flex md:flex-row flex-col justify-between gap-20 px-[4%] md:px-[6%] items-center py-16 bg-white"}>
            <div className={"flex w-full flex-col"}>
                <div className={"flex flex-col gap-2"}>
                    <div className={"px-4 py-1 rounded-full w-min bg-primary"}>
                        <p className={`text-white text-xs whitespace-nowrap font-bold ${poppins.className}`}>
                            Empower Your Business Finances
                        </p>
                    </div>
                    <h1 className={"text-2xl md:text-4xl font-bold"}>
                        Helping You Navigate Lending Options
                    </h1>
                </div>
                <div className={"grid mt-2 md:mt-8 gap-2 md:gap-6 grid-cols-2"}>
                    {
                        loans.map((item, _) => (
                            <div key={_} className={"flex flex-col gap-2"}>
                                <h1 className={`${poppins.className} mt-4`}>{item.title}</h1>
                                <p className={"text-xs text-muted-foreground"}>
                                    {item.description}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={"flex w-full flex-col items-end"}>
                <img src={"https://images.pexels.com/photos/4960341/pexels-photo-4960341.jpeg"}
                     alt={"img"}
                     className={"rounded-[18px]"}
                />
            </div>
        </div>
    )
}
