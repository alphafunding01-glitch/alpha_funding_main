import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { poppins } from "@/app/fonts/fonts";
import Footer from "@/sections/common/footer";
import NavBar from "@/components/navbar";
import { ContactForm } from "@/sections/forms/contact-form";
import { LocalBusinessJsonLd, BreadcrumbJsonLd } from 'next-seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with Alpha Funding\'s team of finance specialists. Contact us for bespoke business finance solutions tailored to your company\'s needs.',
    openGraph: {
        url: 'https://www.alpha-funding.co.uk/contact',
        title: 'Contact Alpha Funding - Business Finance Experts',
        description: 'Speak to our friendly team about your business finance needs. Two UK offices ready to help.',
        images: [
            {
                url: 'https://www.alpha-funding.co.uk/og-contact.jpg',
                width: 1200,
                height: 630,
                alt: 'Contact Alpha Funding',
            },
        ],
    },
};

export default function Contact() {
    return (
        <div className={"flex flex-col bg-light-gray"}>
            <LocalBusinessJsonLd
                type="FinancialService"
                name="Alpha Funding"
                description="Business finance solutions provider offering flexible funding options for UK businesses"
                url="https://www.alpha-funding.co.uk"
                telephone="+442070787446"
                address={[
                    {
                        streetAddress: '307 Euston Road',
                        addressLocality: 'London',
                        addressRegion: 'London',
                        postalCode: 'NW1 3AD',
                        addressCountry: 'GB',
                    },
                    {
                        streetAddress: 'Commerce House, Campbeltown Rd, Tranmere',
                        addressLocality: 'Wirral',
                        addressRegion: 'Merseyside',
                        postalCode: 'CH41 9HP',
                        addressCountry: 'GB',
                    },
                ]}
                geo={{
                    latitude: 51.5273,
                    longitude: -0.1335,
                }}

                image="https://www.alpha-funding.co.uk/logo.png"
                priceRange="$$"
                openingHoursSpecification={[
                    {
                        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                        opens: '09:00',
                        closes: '17:00',
                    },
                ]}
            />
            <BreadcrumbJsonLd
                items={[
                    {
                        name: 'Home',
                        item: 'https://www.alpha-funding.co.uk',
                    },
                    {
                        name: 'Contact Us',
                    },
                ]}
            />
            <NavBar />
            <div className={"flex flex-col"}>
                <div
                    className={"flex md:flex-row md:py-0 gap-8 pt-10 flex-col justify-between px-[4%] md:px-[6%] min-h-screen"}>
                    <div className={"flex flex-col mt-48 justify-between h-full w-full gap-1"}>
                        <div className={"flex flex-col gap-2"}>
                            <div className={"px-4 py-1 rounded-full w-min bg-primary"}>
                                <p className={`text-white text-xs whitespace-nowrap font-bold ${poppins.className}`}>
                                    Contact Us
                                </p>
                            </div>
                            <h1 className={"text-3xl md:text-5xl font-bold"}>
                                Contact Alpha Funding Friendly Team of Finance Specialists
                            </h1>
                        </div>
                        <p className={`${poppins.className} text-sm mt-4`}>
                            Looking for bespoke business finance solutions to meet your company's needs and goals? Get
                            in touch with our helpful team of experts.
                        </p>
                    </div>
                    <div className={"flex w-full md:pt-20 items-end justify-center flex-col"}>
                        <ContactForm />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}