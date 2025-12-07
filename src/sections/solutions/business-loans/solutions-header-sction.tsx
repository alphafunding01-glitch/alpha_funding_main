import {poppins} from "@/app/fonts/fonts";
import {IoCheckmark} from "react-icons/io5";
import {Button, buttonVariants} from "@/components/ui/button";
import {ArrowUpRight, Check} from "lucide-react";
import {cn} from "@/lib/utils";
import Link from "next/link";


interface props {
    header: string,
    description: string,
    image: string,
    label: string,
    secondaryHeader: string,
    secondaryContent: string,
    sectorPoints: string[],
    sectorQuestion: string,
}

export const SolutionsHeaderSection = (props: props) => {
    return (
        <div className="flex flex-col">
            {/* Hero Section - Improved spacing and alignment */}
            <div className="flex px-[6%] gap-16 pt-40 pb-20 items-center md:flex-row flex-col md:justify-between">
                <div className="flex w-full flex-col gap-2 h-full">
                    <div className="px-4 py-1 rounded-full w-min bg-primary">
                        <p className="text-white text-xs whitespace-nowrap font-bold">
                            {props.label}
                        </p>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                        {props.header}
                    </h1>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-lg">
                        {props.description}
                    </p>
                    <Link href={"/check-eligibility"} className={buttonVariants({
                        size: "lg", className: "w-min mt-6"
                    })}>
                        Check For Eligibility <ArrowUpRight className="w-4 h-4"/>
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
                        {props.secondaryHeader}
                    </h1>
                    <p className="text-sm mt-2 leading-relaxed">
                        {props.secondaryContent}
                    </p>
                    <Link href={"/check-eligibility"} className={buttonVariants({
                        size: "lg", className:"w-min mt-6", variant:"outline"
                    })} >
                        Secure Your Funding <ArrowUpRight className="w-4 h-4"/>
                    </Link>
                </div>

                {/* Right Column - Benefits Section */}
                <div className="flex w-full lg:w-1/2 flex-col space-y-6">
                    <h1 className="font-medium text-lg">
                        {props.sectorQuestion}
                    </h1>

                    {/* Improved grid layout for better responsiveness */}
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        {props.sectorPoints.map((point, index) => (
                            <div key={index}
                                 className={cn("flex gap-3", point.length > 40 ? "items-start" : "items-center")}>
                                <div
                                    className="flex h-8 w-8 rounded-full flex-shrink-0 items-center justify-center bg-gray-200">
                                    <Check className="text-primary w-4 h-4"/>
                                </div>
                                <p className="text-sm">{point}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}