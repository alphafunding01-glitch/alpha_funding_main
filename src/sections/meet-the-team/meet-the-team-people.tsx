import {poppins} from "@/app/fonts/fonts";
import {IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoTwitter} from "react-icons/io";


export default function MeetTheTeamPeople() {

    const people = [
        {
            name: "John Doe",
            designation: "CEO",
            image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Jese drives the technical strategy of the flowbite platform and brand."
        },
        {
            name: "John Doe",
            designation: "CEO",
            image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600",
            role: "Jese drives the technical strategy of the flowbite platform and brand."
        },
        {
            name: "John Doe",
            designation: "CEO",
            image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
            role: "Jese drives the technical strategy of the flowbite platform and brand."
        },
        {
            name: "John Doe",
            designation: "CEO",
            image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
            role: "Jese drives the technical strategy of the flowbite platform and brand."
        }
    ]

    return (
        <div className={"flex flex-col px-[4%] md:px-[6%] py-10"}>
            <div className={"flex flex-col items-center justify-center self-center"}>
                <div className={"px-4 py-1 rounded-full w-min bg-primary"}>
                    <p className={`text-white text-xs whitespace-nowrap font-bold ${poppins.className}`}>
                        Our People
                    </p>
                </div>
                <h1 className={"text-2xl text-center max-w-3xl md:text-4xl font-bold"}>
                    Introducing the people
                    empowering business growth
                </h1>
            </div>
            <div className="grid grid-cols-1 gap-8 mt-9 mb-6 lg:mb-16 md:grid-cols-2">
                {
                    people.map((item, _) => (
                        <div
                            key={_}
                            className="flex flex-col items-center bg-gray-50 sm:flex-row rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                            <a href="#" className={"h-[200px] w-full md:w-[250px]"}>
                                <img className="w-full object-cover h-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                                     src={item.image}
                                     alt="Bonnie Avatar"/>
                            </a>
                            <div className="p-5">
                                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <a href="#">{item.name}</a>
                                </h3>
                                <span className="text-gray-500 dark:text-gray-400">{item.designation}</span>
                                <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                                    {item.role}
                                </p>
                                <ul className="flex space-x-4 sm:mt-0">
                                    <li>
                                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                            <IoLogoFacebook/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                            <IoLogoTwitter/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                            <IoLogoInstagram/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                            <IoLogoLinkedin/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}