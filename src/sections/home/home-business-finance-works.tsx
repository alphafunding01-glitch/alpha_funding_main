"use client";

import { Button } from "@/components/ui/button";
import { PiCaretRight } from "react-icons/pi";
import { Player } from "@lottiefiles/react-lottie-player";
import { Poppins } from "next/font/google";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"],
})

export default function HomeBusinessFinanceWorks() {

    const loans = [
        {
            title: "Working Capital Loans",
            description: "Cover daily costs, seasonal gaps, or unexpected expenses."
        },
        {
            title: "Unsecured Business Loans",
            description: "No collateral required. Based on business performance."
        },
        {
            title: "Short-Term Business Loans",
            description: "Fast funding for urgent needs — VAT, stock, or time-sensitive opportunities."
        },
        {
            title: "VAT Loans",
            description: "Spread HMRC payments over 3 months. Stay ahead of tax deadlines."
        }
    ]

    return (
        <div
            className={"flex md:flex-row flex-col justify-between gap-20 px-[4%] md:px-[6%] items-center py-16 bg-white"}>
            <div className={"flex w-full flex-col"}>
                <div className={"flex flex-col gap-2"}>
                    <h1 className={"text-2xl md:text-4xl font-bold text-gradient-primary"}>
                        Which Business Finance Option Is Right for You?
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
                <img src={"/portrait-of-industrial-worker-indoors-in-factory-2025-03-18-20-26-25-utc.png"}
                    alt={"img"}
                    className={"rounded-[18px]"}
                />
            </div>
        </div>
    )
}
