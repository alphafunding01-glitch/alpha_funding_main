import { poppins } from "@/app/fonts/fonts";
import {
    FaPercentage,
    FaClipboardCheck,
    FaExchangeAlt,
    FaCogs,
    FaUserTie,
    FaClock
} from "react-icons/fa";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function WhyAlphaFunding() {
    const loans = [
        {
            title: "50+ UK Lenders",
            description: "One search. Best rate found.",
            icon: <FaPercentage className="text-primary text-lg" />
        },
        {
            title: "24-Hour Decisions",
            description: "Green light today, cash tomorrow.",
            icon: <FaClock className="text-primary text-lg" />
        },
        {
            title: "Apply in Minutes",
            description: "Online, simple, no paperwork pile.",
            icon: <FaClipboardCheck className="text-primary text-lg" />
        },
        {
            title: "Repay Your Way",
            description: "Schedules that fit your cash flow.",
            icon: <FaExchangeAlt className="text-primary text-lg" />
        },
        {
            title: "Finance That Fits",
            description: "Matched to how your business runs.",
            icon: <FaCogs className="text-primary text-lg" />
        },
        {
            title: "One Point of Contact",
            description: "Your advisor from start to funded.",
            icon: <FaUserTie className="text-primary text-lg" />
        }
    ];

    return (
        <div
            className="flex md:flex-row flex-col justify-between gap-20 px-[4%] md:px-[6%] items-center py-16 bg-white">
            <div className="flex w-full flex-col">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl md:text-4xl font-bold text-gradient-primary">
                        Why UK SMEs Choose Alpha Funding
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        We launched Alpha Funding Business Finance to simplify access to funding for small and medium-sized
                        businesses.
                        Our goal is to remove complexity and offer smart, transparent solutions. Here’s how we deliver
                        real value to your business.
                    </p>
                    <Link href={"/calculator"} className={buttonVariants({
                        variant: "secondary", className: "w-[250px] mt-8", size: "lg"
                    })}>
                        Try our Calculator <ArrowUpRight />
                    </Link>
                </div>
            </div>
            <div className="flex w-full flex-col items-end">
                <div className="grid mt-2 md:mt-8 gap-6 md:gap-6 md:grid-cols-2 grid-cols-1">
                    {loans.map((item, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                {item.icon}
                                <h1 className={`${poppins.className}`}>{item.title}</h1>
                            </div>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
