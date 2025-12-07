import {poppins} from "@/app/fonts/fonts";
import {Button, buttonVariants} from "@/components/ui/button";
import {PiCaretRight} from "react-icons/pi";
import Link from "next/link";


export default function AboutUsMissionVision() {
    return (
        <div className={"flex md:flex-row flex-col px-[6%] bg-white gap-16 items-center justify-between py-20"}>
            <div className={"flex w-full justify-end gap-1 flex-col h-full"}>
                <div className={"px-4 py-1 rounded-full w-min bg-primary"}>
                    <p className={`text-white text-xs whitespace-nowrap font-bold ${poppins.className}`}>
                        Our vision and mission
                    </p>
                </div>
                <h1 className={"text-2xl md:text-3xl font-bold"}>
                    Making Business Finance Accessible, Personal, and Empowering
                </h1>
                <p className={"text-muted-foreground text-sm"}>
                    At Alpha Funding, our mission is simple: to break down the barriers to funding and make business finance
                    work for
                    everyone — not just a few.
                </p>
                <p className={"text-sm mt-4"}>
                    We believe that every business has the potential to grow, and with the right support, that potential
                    can be
                    unlocked. That’s why we offer flexible, tailored finance solutions designed around your goals — not
                    just your
                    numbers.
                </p>
                <p className={"text-sm mt-4"}>
                    Our vision is a world where access to funding isn’t complicated, intimidating, or out of reach. As
                    one of the
                    UK’s leading brokers, we’re proud to help businesses move forward — with clarity, confidence, and
                    the right
                    finance behind them
                </p>
                <Link href={"/#products"} className={buttonVariants({
                    size: "lg", className: "w-min !px-10 mt-8"
                })}>
                    Browse Our Solutions <PiCaretRight/>
                </Link>
            </div>
            <div className={"flex w-full justify-center items-end"}>
                <img src={"https://images.pexels.com/photos/3205570/pexels-photo-3205570.jpeg"}
                     className={"rounded-[18px]"}
                     alt={"team image"}
                />
            </div>
        </div>
    )
}