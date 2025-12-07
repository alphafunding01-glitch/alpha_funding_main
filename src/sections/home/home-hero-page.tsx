import { Poppins } from "next/font/google";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
})

export default function HomeHeroPage() {

  return (
    <div
      className={
        "flex md:flex-row md:py-9 py-40 flex-col justify-between px-[4%] md:px-[6%] items-center bg-primary text-primary-foreground"
      }
    >
      <div className="flex relative mt-36 flex-col justify-between h-full w-full gap-4">
        <div className="flex flex-col gap-4">
          {/* Small pill – use secondary color to pop */}
          <div className="px-4 py-1 mb-2 rounded-full w-min bg-secondary">
            <p
              className={`text-secondary-foreground text-xs whitespace-nowrap font-bold ${poppins.className}`}
            >
              Fuel Your Growth, Without The Finance Fuss
            </p>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gradient-cyber">
            Start Strong With Finance That Works For You.
          </h1>
        </div>
        <p className={`${poppins.className} text-sm mt-4`}>
          At Alpha Funding, we believe finance should feel like a boost, not a burden. Whether you're just
          getting started or scaling something big, we tailor funding to fit your journey — with flexible
          terms, fast turnaround, and support that's actually supportive.
        </p>
        <div className={"flex mt-8 gap-4"}>
          <Link href={"/apply-now"} className={buttonVariants({
            size: "lg",
            className: "!bg-[#0D9488] text-white hover:!bg-[#0D9488]/90 shadow-lg hover:shadow-xl transition-all duration-300"
          })}>
            Apply Now <ArrowUpRight />
          </Link>
          <Link href={"/calculator"} className={buttonVariants({
            size: "lg", variant: "secondary", className: "md:w-[200px]"
          })} >
            Calculator <ArrowUpRight />
          </Link>
        </div>
        <div className={"md:flex items-center  gap-8 mt-8"}>
          <img src={"/trust-pilot.png"} className={"h-24 w-auto"} alt={"img"} />
        </div>
      </div>
      <div className={"flex w-full pt-20 items-end justify-center flex-col"}>
        <img className={"w-full md:w-[75%]"} src={"./hero-home.png"} alt={"hero-home"} />
      </div>
    </div>
  )
}