
import {Separator} from "@radix-ui/react-select";
import {ReactNode} from "react";


interface props {
    upperHeader : string,
    header: string,
    content: string,
    subContent : string,
    bottomContent : ReactNode,
    question : string,
    answers : any[]
}


export default function WhyChooseSolution(props: props) {

    return (
        <div className={"flex md:flex-row flex-col gap-16 bg-white py-20 md:px-[6%] px-[4%]"}>
            <div className={"flex flex-col w-full"}>
                <div className="flex w-full flex-col gap-2 sticky top-40">
                    <div className="px-4 py-1 rounded-full w-min bg-primary">
                        <p className="text-white text-xs whitespace-nowrap font-bold">
                            {props.upperHeader}
                        </p>
                    </div>
                    <h1 className="text-xl md:text-3xl font-bold leading-tight">
                        {props.header}
                    </h1>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
                        {props.content}
                    </p>
                    <Separator/>
                    <p className={"text-sm leading-relaxed"}>
                        {props.subContent}
                    </p>
                    {props.bottomContent}
                </div>
            </div>
            <div className={"flex flex-col w-full"}>
                <h1 className={"font-bold text-lg"}>
                    {props.question}
                </h1>
                <div className={"flex flex-col"}>
                    {
                        props.answers.map((item, index) => (
                            <div key={index} className={"flex border-b border-black/20 py-6 flex-col gap-1"}>
                                <h1 className={"text-xl font-semibold text-primary"}>
                                    {item.point}
                                </h1>
                                <p className={"text-muted-foreground"}>
                                    {item.content}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}