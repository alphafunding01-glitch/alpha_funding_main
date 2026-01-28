
import { Separator } from "@radix-ui/react-select";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, Star } from "lucide-react";


interface props {
    upperHeader: string,
    header: string,
    content: string,
    subContent: string,
    bottomContent: ReactNode,
    question: string,
    answers: any[]
}


export default function WhyChooseSolution(props: props) {

    return (
        <div className="flex flex-col gap-20 bg-[#E8EDF2] relative pb-32 md:px-[6%] px-[4%]">

            {/* 1. Value Proposition Header */}
            <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="flex w-full md:w-5/12 flex-col gap-6 sticky top-32">
                    {/* Pill - Light Cyan Background + Dark Text (like reference) */}
                    <div className="pill-cyan w-max">
                        {props.upperHeader}
                    </div>

                    {/* Gradient Text Header - Midnight to Cyan */}
                    <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gradient-primary">
                        {props.header}
                    </h2>

                    <p className="text-slate-700 text-lg leading-relaxed">
                        {props.content}
                    </p>

                    <div className="h-px w-full bg-gradient-to-r from-slate-300 to-transparent my-2" />

                    <p className="text-sm font-medium text-slate-600 leading-relaxed">
                        {props.subContent}
                    </p>

                    <div className="mt-4">
                        {props.bottomContent}
                    </div>
                </div>

                {/* 
                  2. ANSWER CARDS
                  Using accent-card with left border hover (like reference)
                */}
                <div className="flex w-full md:w-7/12 flex-col gap-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-[#1CB5E0] rounded-lg text-white shadow-lg">
                            <Star className="w-5 h-5 fill-current" />
                        </div>
                        <h3 className="font-bold text-2xl text-slate-800">
                            {props.question}
                        </h3>
                    </div>

                    <div className="bento-grid">
                        {
                            props.answers.map((item, index) => (
                                <div key={index} className={cn(
                                    "accent-card p-6 flex flex-col gap-4 relative overflow-hidden group",
                                    // Make the first item span full width for emphasis if we have odd number
                                    index === 0 && props.answers.length % 2 !== 0 ? "bento-item-wide" : ""
                                )}>
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-xl font-bold text-[#201130] group-hover:text-[#1CB5E0] transition-colors">
                                            {item.point}
                                        </h4>
                                        <CheckCircle2 className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {item.content}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}