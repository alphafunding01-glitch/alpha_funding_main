import {Button, buttonVariants} from "@/components/ui/button";
import {ArrowUpRight, Check} from "lucide-react";
import {cn} from "@/lib/utils";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";

interface props {
    title: string,
    header: string,
    description: string,
    subHeader: string,
    image: string,
    subDescription: string,
    cards: card[]
}

export interface card {
    title: string,
    description: string,
    points: string[],
    url: string
}

export default function SectorsHeaderSection(props: props) {
    return (
        <div className="flex flex-col">
            {/* Hero Section - Improved spacing and alignment */}
            <div className="flex px-[6%] gap-16 pt-40 pb-20 items-center md:flex-row flex-col md:justify-between">
                <div className="flex w-full flex-col gap-2 h-full">
                    <div className="px-4 py-1 rounded-full w-min bg-primary">
                        <p className="text-white text-xs whitespace-nowrap font-bold">
                            {props.title}
                        </p>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                        {props.header}
                    </h1>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-lg">
                        {props.description}
                    </p>
                    <Link href={"/check-eligibility"} className={buttonVariants({
                        size: "lg", variant: "secondary", className: "w-min !px-10 mt-6"
                    })}>
                        Check Eligibility <ArrowUpRight className="w-4 h-4"/>
                    </Link>
                </div>
                <div className="flex w-full justify-center items-center">
                    <img
                        src={props.image}
                        className="rounded-[18px] max-h-[350px] w-full max-w-xl object-cover"
                        alt="team image"
                    />
                </div>
            </div>

            {/* Content Section - Better responsive layout */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 md:px-[6%] px-[4%] pb-20">
                {/* Left Column - Business Loan Section */}
                <div className="flex flex-col w-full lg:w-1/2 space-y-4">
                    <h1 className="text-3xl font-bold leading-tight">
                        {props.subHeader}
                    </h1>
                    <p className="text-sm mt-2 leading-relaxed">
                        {props.subDescription}
                    </p>
                </div>

                {/* Right Column - Benefits Section */}
                <div className="flex lg:flex-row flex-col w-full gap-4 space-y-6">
                    {
                        props.cards.map((card, _) => (
                            <Card key={_} className={"w-full h-full"}>
                                <CardHeader>
                                    <CardTitle>
                                        {card.title}
                                    </CardTitle>
                                    <CardDescription>
                                        {card.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className={"flex flex-col gap-3"}>
                                    {
                                        card.points.map((point, _) => (
                                            <div key={_}
                                                 className={cn("flex gap-3", point.length > 40 ? "items-start" : "items-center")}>
                                                <div
                                                    className="flex h-8 w-8 rounded-full flex-shrink-0 items-center justify-center bg-gray-200">
                                                    <Check className="text-primary w-4 h-4"/>
                                                </div>
                                                <p className="text-sm">{point}</p>
                                            </div>
                                        ))
                                    }
                                </CardContent>
                                <CardFooter className={"items-end justify-end h-full"}>
                                    <Link href={"/contact"} className={buttonVariants({
                                        size: "lg", className: "w-full"
                                    })}>
                                        Learn More <ArrowUpRight/>
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