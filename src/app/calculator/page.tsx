import NavBar from "@/components/navbar";
import Footer from "@/sections/common/footer";
import CalculatorPage from "@/app/calculator/calculator";

export default function Calculator() {
    return (
        <div className={"flex flex-col"}>
            <NavBar/>
            <div className={"flex py-28 px-[4%] flex-col"}>
                <CalculatorPage/>
            </div>
            <Footer/>
        </div>
    )
}