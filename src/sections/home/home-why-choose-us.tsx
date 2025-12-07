"use client";

import { Poppins } from "next/font/google";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Search, FileText, CheckCircle2, Wallet } from "lucide-react"; // icons

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"],
});

export default function HomeWhyChooseUs() {
    const steps = [
        {
            title: "Enquiry",
            description:
                "See what you’re eligible for — no impact on your credit score.",
            icon: <Search className="w-6 h-6" />,
        },
        {
            title: "Application",
            description:
                "We research the market, handle the paperwork, and find your perfect fit.",
            icon: <FileText className="w-6 h-6" />,
        },
        {
            title: "Approval",
            description:
                "Once approved, you’ll get your offer and agreement — clear and simple.",
            icon: <CheckCircle2 className="w-6 h-6" />,
        },
        {
            title: "Payout",
            description:
                "Sign, seal, and get your funding. Then? Time to go make things happen.",
            icon: <Wallet className="w-6 h-6" />,
        },
    ];

    return (
        <div className="bg-white px-[4%] md:px-[6%] py-16 flex flex-col items-center text-center gap-8 relative overflow-hidden">
            {/* Heading */}
            <h1
                className={`text-2xl md:text-4xl font-bold z-10 ${poppins.className}`}
            >
                Here’s How We Support Your Journey
            </h1>
            <p className="max-w-2xl text-sm md:text-base text-muted-foreground z-10">
                When Alpha Funding launched, we set out to make finance more transparent, more
                human, and more accessible — especially for small and medium
                businesses. That’s still our mission. We cut the jargon, ditch the red
                tape, and give you the answers you actually need.
            </p>
            <Link
                href={"/apply-now"}
                className={buttonVariants({
                    size: "lg",
                })}
            >
                Let's Get Started
            </Link>

            {/* Roadmap */}
            <div className="relative w-full mt-16">
                {/* Road only visible on md+ */}
                <svg
                    viewBox="0 0 1000 200"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute hidden md:block top-0 left-0 w-full h-48 md:h-64 z-0"
                >
                    {/* Road Base */}
                    <path
                        d="M 0 100 Q 250 0, 500 100 T 1000 100"
                        stroke="url(#roadGradient)"
                        strokeWidth="40"
                        fill="none"
                        strokeLinecap="round"
                    />
                    {/* White Dashed Line */}
                    <path
                        d="M 0 100 Q 250 0, 500 100 T 1000 100"
                        stroke="#fff"
                        strokeWidth="6"
                        strokeDasharray="25,25"
                        fill="none"
                    />
                    {/* Gradient Definition */}
                    <defs>
                        <linearGradient id="roadGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#444" />
                            <stop offset="100%" stopColor="#222" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Steps */}
                <div className="relative flex flex-col md:flex-row md:justify-between items-center w-full z-10 gap-12 md:gap-0">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center text-center max-w-[260px] md:max-w-[220px] transition-all duration-300 ${index % 2 === 0
                                    ? "md:mt-[-120px]" // alternate on desktop
                                    : "md:mt-[140px]"
                                }`}
                        >
                            {/* Circle with Icon */}
                            <div className="bg-brand-purple text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
                                {step.icon}
                            </div>
                            {/* Card */}
                            <div className="mt-4 bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-xl">
                                <h2
                                    className={`text-base md:text-lg font-semibold ${poppins.className} text-gray-800`}
                                >
                                    {step.title}
                                </h2>
                                <p className="text-sm text-muted-foreground mt-2">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
