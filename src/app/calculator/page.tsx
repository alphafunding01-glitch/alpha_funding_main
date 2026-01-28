import NavBar from "@/components/navbar";
import Footer from "@/sections/common/footer";
import CalculatorPage from "@/app/calculator/calculator";
import CalculatorEducation from "@/sections/calculator/calculator-education";

export default function Calculator() {
    return (
        <div className={"flex flex-col"}>
            <NavBar />
            <div className={"flex pt-36 pb-20 px-[4%] flex-col"}>
                <CalculatorPage />
                <CalculatorEducation />
            </div>
            <Footer />
        </div>
    )
}