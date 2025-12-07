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
            title: "Market-leading rates",
            description: "Access highly competitive interest rates that help your business grow while keeping borrowing costs low.",
            icon: <FaPercentage className="text-primary text-lg" />
        },
        {
            title: "Effortless application",
            description: "Apply online in just a few clicks—no long forms, no waiting around. It’s quick, secure, and seamless.",
            icon: <FaClipboardCheck className="text-primary text-lg" />
        },
        {
            title: "Flexible repayment plans",
            description: "We align repayment schedules with your business cash flow—giving you control and peace of mind.",
            icon: <FaExchangeAlt className="text-primary text-lg" />
        },
        {
            title: "Tailored financial solutions",
            description: "Every business is different. That’s why we build personalised finance options to match your exact needs.",
            icon: <FaCogs className="text-primary text-lg" />
        },
        {
            title: "Personalised support",
            description: "Your dedicated Account Manager will guide you throughout—offering expert support and business insight.",
            icon: <FaUserTie className="text-primary text-lg" />
        },
        {
            title: "Fast-track funding",
            description: "Approved today, funded tomorrow. Get access to funds within 24 hours so you never miss a business opportunity.",
            icon: <FaClock className="text-primary text-lg" />
        }
    ];

    return (
        <div
            className="flex md:flex-row flex-col justify-between gap-20 px-[4%] md:px-[6%] items-center py-16 bg-white">
            <div className="flex w-full flex-col">
                <div className="flex flex-col gap-2">
                    <div className="px-4 py-1 rounded-full w-min bg-primary">
                        <p className={`text-white text-xs whitespace-nowrap font-bold ${poppins.className}`}>
                            Why Choose Us?
                        </p>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold">
                        Partner with Confidence, Partner with Alpha Funding
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
