import { poppins } from "@/app/fonts/fonts";
import { IoCheckmark } from "react-icons/io5";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
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
        <div className="flex flex-col w-full">
            {/* 
               HERO SECTION 
               Dark Gradient Background with Glowing White Text
            */}
            <div className="solutions-hero w-full">
                <div className="solutions-hero-content flex flex-col md:flex-row px-[6%] gap-12 pt-40 pb-24 items-center justify-between">

                    {/* Text Content */}
                    <div className="flex w-full md:w-1/2 flex-col gap-6 h-full z-10">
                        {/* Pill Label - Cyan Background for visibility on dark */}
                        <div className="glass-pill-strong px-5 py-2 rounded-full w-max">
                            <p className="text-sm font-bold tracking-wider uppercase">
                                {props.label}
                            </p>
                        </div>

                        {/* Main Header - WHITE GLOWING TEXT (not dark grey!) */}
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-glow-white">
                            {props.header}
                        </h1>

                        <p className="text-slate-200 text-lg leading-relaxed max-w-xl">
                            {props.description}
                        </p>

                        <div className="flex gap-4 mt-4">
                            <Link href={"/check-eligibility"} className="cta-button-primary flex items-center gap-2">
                                Check For Eligibility <ArrowUpRight className="w-5 h-5" />
                            </Link>
                        </div>

                        {/* Trust Indicator */}
                        <div className="flex items-center gap-2 mt-4 text-sm text-slate-300">
                            <ShieldCheck className="w-4 h-4 text-cyan-400" />
                            <span>No credit footprint check</span>
                        </div>
                    </div>

                    {/* Image / Visual - Glassmorphism Container */}
                    <div className="flex w-full md:w-1/2 justify-center items-center relative">
                        {/* Decorative Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/20 blur-[100px] rounded-full -z-10 pointer-events-none" />

                        <div className="glass-panel p-2 transform rotate-2 hover:rotate-0 transition-all duration-500">
                            <img
                                src={props.image}
                                className="rounded-2xl max-h-[450px] w-full object-cover shadow-2xl"
                                alt="team image"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 
               SECONDARY CONTENT 
               Light Background with Dark/Gradient Text
            */}
            <div className="flex flex-col lg:flex-row gap-16 md:px-[6%] px-[4%] py-24 bg-[#E8EDF2] relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl -z-10" />

                {/* Left Column - Business Loan Section */}
                <div className="flex flex-col w-full lg:w-1/2 space-y-6">
                    {/* Gradient Header Text on Light Background */}
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight text-gradient-primary">
                        {props.secondaryHeader}
                    </h2>
                    <div className="w-20 h-1 bg-[#1CB5E0] rounded-full" />
                    <p className="text-slate-700 text-lg leading-relaxed">
                        {props.secondaryContent}
                    </p>
                    {/* Dark Button for Light Background */}
                    <Link href={"/check-eligibility"} className="cta-button-dark w-max mt-4 flex items-center gap-2">
                        Secure Your Funding <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Right Column - Benefits Grid */}
                <div className="flex w-full lg:w-1/2 flex-col space-y-8">
                    <h3 className="font-semibold text-xl text-slate-800 flex items-center gap-3">
                        <div className="glow-dot" />
                        {props.sectorQuestion}
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {props.sectorPoints.map((point, index) => (
                            <div key={index}
                                className="accent-card flex items-center gap-4 p-4">
                                <div className="flex h-8 w-8 rounded-full flex-shrink-0 items-center justify-center bg-[#1CB5E0]/20">
                                    <Check className="text-[#1CB5E0] w-4 h-4" />
                                </div>
                                <p className="text-sm font-medium text-slate-700 leading-snug">{point}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}