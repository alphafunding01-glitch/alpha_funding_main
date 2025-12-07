"use client";

import {IoCaretForwardOutline, IoCheckmark} from "react-icons/io5";
import {Button, buttonVariants} from "@/components/ui/button";
import {BiCaretRight} from "react-icons/bi";
import {PiCaretRight} from "react-icons/pi";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {AiOutlineVerified} from "react-icons/ai";
import {Verified, VerifiedIcon} from "lucide-react";
import {GoVerified} from "react-icons/go";
import {MdVerified} from "react-icons/md";
import Link from "next/link";
import BusinessFinanceSection from "@/sections/home/business-finance-section";


export default function Homehero2() {
    const points = [
        "Services Across UK",
        "Funding available from £10k - £10M",
        "Flexible repayment terms",
        "Low interest rates available",
        "Fast decisions within 24 - 48 hours",
        "Dedicated Account Manager"
    ];


    const websiteContent = [
        {
            title: "BUSINESS LOANS",
            description: "Simple, scalable finance for any business purpose.",
            features: [
                "Funding from £10k–£10M",
                "Secured or unsecured",
                "Terms up to 6 years",
                "Decisions as fast as 24 hours"
            ],
            cta: "/solutions/business-loans"
        },
        {
            title: "GROWTH GUARANTEE SCHEME",
            description: "Government-backed support to move your business forward.",
            features: [
                "70% guaranteed by the government",
                "Borrow up to £2M",
                "Can be used alongside CBILs & BBLs"
            ],
            cta: "/solutions/growth-guarantee-scheme"
        },
        {
            title: "ASSET & EQUIPMENT FINANCE",
            description: "Get the gear you need — without straining your cash flow.",
            features: [
                "Fund almost any asset",
                "Simple, fast applications",
                "Terms up to 7 Years"
            ],
            cta: "/solutions/business-asset-equipment-finance"
        },
        // {
        //     title: "VEHICLE FINANCE",
        //     description: "From fleets to one-off dream drives, we’ve got the wheels turning.",
        //     features: [
        //         "Flexible deposits",
        //         "Balloon payments tailored to you",
        //         "Hire purchase, lease, or refinance options"
        //     ],
        //     cta: "LEARN MORE"
        // },
        {
            title: "REFINANCE",
            description: "Unlock value or restructure what you already have.",
            features: [
                "Release equity from existing equipment",
                "Consolidate debt",
                "Potentially lower interest rates"
            ],
            cta: "/solutions/refinance"
        },
        {
            title: "MERCHANT CASH ADVANCE",
            description: "Convert future card sales into fast capital — no interest attached.",
            features: [
                "No fixed repayments",
                "Borrow up to 2x your monthly card revenue",
                "90% approval rate"
            ],
            cta: "/solutions/merchant-cash-advance"
        },
        {
            title: "COMMERCIAL PROPERTY FINANCE",
            description: "Big plans for bricks and mortar? We can help.",
            features: [
                "Repayments terms up to 30 years",
                "interest-only options",
                "Up to 80% LTV or 100% with extra security",
            ],
            cta: "/solutions/commercial-property-finance"
        },
        {
            title: "INVOICE FINANCE",
            description: "Waiting to get paid? Let’s fast-track your funds.",
            features: [
                "Access up to 90% of invoice values",
                "Facility scales with your business",
                "Immediate cash release"
            ],
            cta: "/solutions/invoice-finance"
        }
    ];


    return (
        <div className={"flex flex-col min-h-screen "}>
            <div className={"grid grid-cols-1 md:grid-cols-3 px-[4%] md:px-[6%] w-full gap-5"}>
                {
                    points.map((point, index) => (
                        <div key={index} className={"flex text-lg items-center gap-2"}>
                            <MdVerified size={25} className={"text-primary"}/>
                            <p className={"font-semibold"}>
                                {point}
                            </p>
                        </div>
                    ))
                }
            </div>
            <BusinessFinanceSection/>
            <div id={"products"} className={"flex md:flex-row flex-col px-[4%] md:px-[6%] gap-6 pb-20"}>
                <div className={"flex flex-col gap-20 justify-between"}>
                    <div className={"flex sticky top-40 max-w-4xl flex-col gap-4"}>
                        <h1 className={"text-4xl text-primary font-semibold"}>
                            Browse our range of business finance options to fuel your growth.
                        </h1>
                        <div className={"h-[1px] bg-primary w-1/2"}/>
                        <p className={'text-md text-muted-foreground'}>
                            Alpha Funding offers <span className={"!text-blue"}>
                            <a>
                                business finance solutions
                            </a>
                        </span> customised to any funding requirement or
                            business type. With us, you can enjoy flexible repayment terms, competitive interest rates
                            and hassle-free business finance.
                        </p>
                    </div>
                </div>
                <div className={"grid grid-cols-1 w-full gap-5 pb-10"}>
                    {
                        websiteContent.map((item, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className={"text-primary"}>
                                        {item.title}
                                    </CardTitle>
                                    <CardDescription>
                                        {item.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className={"flex flex-wrap gap-3"}>
                                    {
                                        item.features.map((feature, _) => (
                                            <div key={_} className={"flex text-primary text-sm gap-3 items-center"}>
                                                <IoCheckmark/>
                                                <p>{feature}</p>
                                            </div>
                                        ))
                                    }
                                </CardContent>
                                <CardFooter>
                                    <Link href={item.cta} className={buttonVariants({
                                        size: "sm", variant: "ghost"
                                    })}>
                                        Learn More <PiCaretRight/>
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