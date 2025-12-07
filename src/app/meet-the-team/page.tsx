import MeetTheTeamHero from "@/sections/meet-the-team/meet-the-team-hero";
import NavBar from "@/components/navbar";
import MeetTheTeamPeople from "@/sections/meet-the-team/meet-the-team-people";
import OurSolutionSection from "@/sections/common/our-solution-section";
import Footer from "@/sections/common/footer";
import CheckEligibleSection from "@/sections/common/find-eligible-section";


export default function MeetTheTeam(){
    return(
        <div className={"flex flex-col"}>
            <NavBar/>
            <div className={"flex bg-light-gray flex-col"}>
                <MeetTheTeamHero/>
                <MeetTheTeamPeople/>
                <CheckEligibleSection/>
                <OurSolutionSection/>
            </div>
            <Footer/>
        </div>
    )
}