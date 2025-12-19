import { Button, buttonVariants } from "@/components/ui/button";
import { PiCaretRight } from "react-icons/pi";
import Link from "next/link";


export default function BusinessBannerSection() {
    return (
        <div className={"flex flex-col md:px-[6%] px-[4%] pb-20 pt-10"}>
            <div className={"flex flex-col relative h-[500px] items-center text-center md:h-[400px] rounded-[18%]"}>
                <img src={"https://images.pexels.com/photos/3796810/pexels-photo-3796810.jpeg"}
                    className={"h-full rounded-[18px] absolute w-full object-cover"}
                    alt={"finance"}
                />
                <div
                    className={"absolute rounded-[18px] items-center w-full h-full bg-gradient-to-r from-[#000428]/90 to-[#1CB5E0]/60"} />
                <div
                    className={"flex gap-2 items-center absolute w-full md:w-1/2 h-full justify-center p-10 flex-col "}>
                    <h1 className={"text-2xl md:text-3xl text-white font-bold"}>
                        Find the perfect finance solution tailored to your business needs.
                    </h1>
                    <p className={"text-white"}>
                        Business finance can be complicated. To help you make sense of the options available, we've
                        created a free comprehensive business finance guide.
                    </p>
                    <Link href={"/apply-now"} className={buttonVariants({
                        size: "lg", variant: 'outline', className: "w-min !px-10 mt-8"
                    })}>
                        Apply Now
                    </Link>
                </div>
            </div>
        </div>
    )
}