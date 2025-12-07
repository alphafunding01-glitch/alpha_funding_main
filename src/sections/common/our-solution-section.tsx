import { poppins } from "@/app/fonts/fonts";
import { PiCaretRight } from "react-icons/pi";
import { Button } from "@/components/ui/button";

export default function OurSolutionSection() {
    return (
        <div className={"flex md:flex-row flex-col justify-between items-center gap-16 py-10 md:px-[6%] px-[4%]"}>
            <div className={"flex gap-3 w-full flex-col"}>
                <div className={"flex flex-col"}>
                    <div className={"px-4 py-1 rounded-full w-min bg-primary"}>
                        <p className={`text-white text-xs whitespace-nowrap font-bold ${poppins.className}`}>
                            Our Solutions
                        </p>
                    </div>
                    <h1 className={"text-3xl md:text-5xl font-bold"}>
                        Flexible financing solutions
                        to secure<span className={"text-brand-orange mx-1"}>future success</span>
                    </h1>
                </div>
                <p className={"text-muted-foreground"}>
                    Our dynamic team of finance experts are committed to your success. Combining experience, know-how
                    and a passion for helping businesses reach their potential, we cater our solutions to your unique
                    needs - read more about the benefits of using a business finance broker.
                </p>
                <Button size={"lg"} className={"!px-10 w-min mt-8"}>
                    Find Your Solution <PiCaretRight />
                </Button>
            </div>
            <div className={"flex w-full justify-center items-end"}>
                <img src={"https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"}
                    className={"rounded-[18px]"}
                    alt={"team image"}
                />
            </div>
        </div>
    )
}