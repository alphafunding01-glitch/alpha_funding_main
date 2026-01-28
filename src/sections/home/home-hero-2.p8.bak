"use client";

import { IoCaretForwardOutline, IoCheckmark } from "react-icons/io5";
import { Button, buttonVariants } from "@/components/ui/button";
import { BiCaretRight } from "react-icons/bi";
import { PiCaretRight } from "react-icons/pi";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AiOutlineVerified } from "react-icons/ai";
import { Verified, VerifiedIcon } from "lucide-react";
import { GoVerified } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import Link from "next/link";
import BusinessFinanceSection from "@/sections/home/business-finance-section";


export default function Homehero2() {
    const points = [
        "Decisions in 24–48 hours",
        "No collateral? No problem.",
        "50+ UK lender panel",
        "Built around your cash flow"
    ];


    const websiteContent = [
        {
            title: "Business Loans",
            description: "Secured or unsecured business loans from £10k–£10M. Terms up to 6 years. Decisions from 24 hours.",
            features: [],
            cta: "/solutions/business-loans"
        },
        {
            title: "Working Capital Loans",
            description: "Short-term business loans for cash flow, stock, VAT, or payroll. Keep operations moving.",
            features: [],
            cta: "/solutions/working-capital"
        },
        {
            title: "Asset & Equipment Finance",
            description: "Spread the cost of vehicles, machinery, or tech. Terms up to 7 years. No upfront capital needed.",
            features: [],
            cta: "/solutions/business-asset-equipment-finance"
        },
        {
            title: "Invoice Finance",
            description: "Release up to 90% of unpaid invoices within 24 hours. Scales with your sales.",
            features: [],
            cta: "/solutions/invoice-finance"
        },
        {
            title: "Merchant Cash Advance",
            description: "Convert future card sales into fast capital. No fixed repayments. 90% approval rate.",
            features: [],
            cta: "/solutions/merchant-cash-advance"
        },
        {
            title: "Commercial Property Finance",
            description: "Buy, refinance, or release equity. Up to 80% LTV. Terms up to 30 years.",
            features: [],
            cta: "/solutions/commercial-property-finance"
        },
        {
            title: "Growth Guarantee Scheme",
            description: "Government-backed business loans up to £2M. 70% guaranteed. Use alongside CBILS or BBLs.",
            features: [],
            cta: "/solutions/growth-guarantee-scheme"
        },
        {
            title: "Refinance",
            description: "Consolidate debt or release equity from existing assets. Potentially lower your rates.",
            features: [],
            cta: "/solutions/refinance"
        }
    ];


    return (
        <div className={"flex flex-col"}>
            {/* Intro Stats - Centered Row */}
            <div className="w-full bg-white py-10 flex items-center justify-center">
                <div className={"grid grid-cols-1 md:grid-cols-4 px-[4%] md:px-[6%] w-full gap-5"}>
                    {
                        points.map((point, index) => (
                            <div key={index} className={"flex text-lg items-center justify-center md:justify-start gap-2"}>
                                <MdVerified size={25} className={"text-primary flex-shrink-0"} />
                                <p className={"font-semibold text-sm md:text-base whitespace-nowrap"}>
                                    {point}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>

            <BusinessFinanceSection />

            {/* Intro Block & Product Tiles */}
            <div id={"products"} className={"flex md:flex-col flex-col px-[4%] md:px-[6%] gap-6 pb-20 pt-16"}>

                {/* Intro Block */}
                <div className={"flex flex-col gap-6 text-center items-center mb-10"}>
                    <h2 className={"text-3xl md:text-4xl font-bold text-gradient-primary"}>
                        Business Finance Solutions for UK SMEs
                    </h2>
                    <p className={'text-md text-muted-foreground max-w-2xl'}>
                        Whether you need working capital, equipment, or property finance — we match your business to the right lender. Fast approvals. Flexible repayments. No jargon.
                    </p>
                </div>

                {/* Product Tiles */}
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-5 pb-10"}>
                    {
                        websiteContent.map((item, index) => (
                            <Card key={index} className="flex flex-col justify-between h-full hover:shadow-lg transition-shadow duration-300">
                                <CardHeader>
                                    <CardTitle className={"text-primary text-xl"}>
                                        {item.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm mt-2">
                                        {item.description}
                                    </CardDescription>
                                </CardHeader>
                                {/* Removed Features specific to this tile layout based on request format which emphasizes concise body copy */}
                                <CardFooter>
                                    <Link href={item.cta} className={buttonVariants({
                                        size: "sm", variant: "ghost", className: "p-0 hover:bg-transparent text-primary hover:text-primary/80"
                                    })}>
                                        Learn More <PiCaretRight className="ml-1" />
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}