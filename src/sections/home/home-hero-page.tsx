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
        "flex md:flex-row md:py-9 py-40 flex-col justify-between px-[4%] md:px-[6%] items-center bg-[#f0f0f0] text-primary"
      }
    >
      <div className="flex relative mt-36 flex-col justify-between h-full md:w-[45%] w-full gap-4">
        <div className="flex flex-col gap-4">
          {/* Small pill – use secondary color to pop */}
          <div className="px-4 py-1 mb-2 rounded-full w-min bg-gradient-to-r from-[#000428] to-[#1CB5E0]">
            <p
              className={`text-white text-xs whitespace-nowrap font-bold ${poppins.className}`}
            >
              Business finance solutions from £10k to £10M.
            </p>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gradient-primary">
            Fast Business Loans UK
          </h1>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <p className={`${poppins.className} text-sm md:text-base font-medium text-black`}>
            • Secured & unsecured options
          </p>
          <p className={`${poppins.className} text-sm md:text-base font-medium text-black`}>
            • Whole-of-market broker access
          </p>
          <p className={`${poppins.className} text-sm md:text-base font-medium text-black`}>
            • Tailored to your cash flow
          </p>
        </div>
        <div className={"flex mt-8 gap-4"}>
          <Link href={"/apply-now"} className={buttonVariants({
            size: "lg",
            className: "!bg-[#1CB5E0] text-white hover:!bg-[#1CB5E0]/90 shadow-lg hover:shadow-xl transition-all duration-300"
          })}>
            Apply Now <ArrowUpRight />
          </Link>
          <Link href={"/check-eligibility"} className={buttonVariants({
            size: "lg", variant: "secondary", className: "md:w-[200px] !bg-gradient-to-r from-[#000428] to-[#1CB5E0] text-white shadow-lg hover:shadow-xl transition-all duration-300"
          })} >
            Check Eligibility <ArrowUpRight />
          </Link>
        </div>
        <div className={"md:flex items-center  gap-8 mt-8"}>
          <img src={"/trust-pilot.png"} className={"h-24 w-auto"} alt={"img"} />
        </div>
      </div>
      <div className={"flex md:w-[55%] w-full pt-10 items-end justify-center flex-col"}>
        <img className={"w-full"} src={"./hero-home.png"} alt={"hero-home"} />
      </div>
    </div>
  )
}