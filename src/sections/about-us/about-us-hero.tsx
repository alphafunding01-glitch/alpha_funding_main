import {poppins} from "@/app/fonts/fonts";

export default function AboutUsHero() {
    return (
        <div
            className={"flex md:flex-row flex-col md:pt-0 pt-40 px-[6%] gap-16 items-center justify-between min-h-screen"}>
            <div className={"flex w-full justify-end gap-1 flex-col h-full"}>
                <div className={"px-4 py-1 rounded-full w-min bg-primary"}>
                    <p className={`text-white text-xs whitespace-nowrap font-bold ${poppins.className}`}>
                        About Alpha Funding Business Finance
                    </p>
                </div>
                <h1 className={"text-3xl md:text-5xl font-bold"}>
                    Real Support.
                    <span className={"text-brand-teal mx-1.5"}> Real Businesses.</span> Funding That Moves You
                    <span className={"text-brand-orange mx-1.5"}>  Forward.</span>
                </h1>
                <p className={"text-muted-foreground"}>
                    You’ve built something great! Now it’s time to take it further.
                    At Alpha Funding Business Finance, we’re not just lenders. We’re listeners, problem-solvers, and growth
                    partners.
                    We help UK businesses get the funding they need without the stress, the fluff, or the endless forms.
                    Just
                    smart, flexible finance — tailored to your goals, not someone else’s checklist.
                    Because we believe when businesses thrive, communities do too.
                </p>
                <div className={"flex gap-8 mt-8"}>
                    <img src={"/trust-pilot.png"}
                         className={"w-20 md:w-40"} alt={"trust pilot"}
                    />
                </div>
            </div>
            <div className={"flex w-full justify-center items-end"}>
                <img src={"https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg"}
                     className={"rounded-[18px]"}
                     alt={"team image"}
                />
            </div>
        </div>
    )
}