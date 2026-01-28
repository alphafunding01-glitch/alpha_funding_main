import React from 'react';
import { Facebook, Linkedin, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button";

const companyLinks = [
    { url: '/contact', label: 'Contact Us' },
    { url: '/about-us', label: 'About' },
    {
        label: "Join Our Team",
        url: "/careers",
    },
];

const financeSolutions = [
    {
        label: "Business Loans",
        url: "/solutions/business-loans",
        description: "Quick secured and unsecured Business Loan Solutions"
    },
    {
        label: "Refinance",
        url: "/solutions/refinance",
        description: "Refinance solutions to unlock equity in owned assets"
    },
    {
        label: "Growth Guarantee Scheme",
        url: "/solutions/growth-guarantee-scheme",
        description: "Growth Guarantee Scheme empowers businesses to grow"
    },
    {
        label: "Merchant Cash Advance",
        url: "/solutions/merchant-cash-advance",
        description: "Keep your working capital stable with a Merchant Cash Advance"
    },
    {
        label: "Asset & Equity Finance",
        url: "/solutions/business-asset-equipment-finance",
        description: "Finance your business much-needed assets and equipment"
    },
    {
        label: "Commercial Property Finance",
        url: "/solutions/commercial-property-finance",
        description: "Flexible commercial property finance to help your businesses expand"
    },
    {
        label: "Invoice Finance",
        url: "/solutions/invoice-finance",
        description: "Invoice Finance solutions to maintain a healthy cash flow"
    },
];

const sectors = [
    { url: '/sectors/agriculture', label: 'Agriculture' },
    { url: '/sectors/gaming', label: 'Amusements & Gaming' },
    { url: '/sectors/beauty', label: 'Beauty & Wellbeing' },
    { url: '/sectors/brewing', label: 'Brewing' },
    { url: '/sectors/construction', label: 'Construction' },
    { url: '/sectors/energy', label: 'Energy & Renewables' },
    { url: '/sectors/franchising', label: 'Franchising' },
    { url: '/sectors/fitness', label: 'Gyms & Fitness' },
    { url: '/sectors/healthcare', label: 'Healthcare' },
    { url: '/sectors/automotive', label: 'Garage & Car Sales' },
    { url: '/sectors/hospitality', label: 'Hotels, Catering & Hospitality' },
    { url: '/sectors/manufacturing', label: 'Manufacturing & Engineering' },
    { url: '/sectors/plant-hire', label: 'Plant & Vehicle Hire' },
    { url: '/sectors/printing', label: 'Printing & Packaging' },
    { url: '/sectors/professional', label: 'Professional Services' },
    { url: '/sectors/recycling', label: 'Recycling & Waste Management' },
    { url: '/sectors/retail', label: 'Retail' },
    { url: '/sectors/technology', label: 'Technology & Media' },
    { url: '/sectors/transport', label: 'Transport & Logistics' },
    { url: '/sectors/wholesale', label: 'Wholesale' }
];

const knowledgeHub = [
    { url: '/success-stories', label: 'Success Stories' },
    { url: '/insights', label: 'Industry Insights' },
    { url: '/guides', label: 'Solution Guides' },
    { url: '/calculator', label: 'Finance Calculator' }
];

const ctaButtons = [
    { label: 'CALCULATOR', variant: 'primary', url: '/calculator' },
    { label: 'CHECK ELIGIBILITY', variant: 'secondary', url: '/check-eligibility' },
    { label: 'APPLY NOW', variant: 'accent', url: '/apply-now' }
];

const socialLinks = [
    { icon: Facebook, url: 'https://www.facebook.com/people/Alpha-Funding/61572807916206/#', label: 'Facebook' },
    { icon: Linkedin, url: 'https://www.linkedin.com/company/alpha-funding-ltd', label: 'LinkedIn' },
    { icon: Instagram, url: 'https://www.instagram.com/alph.afunding/', label: 'Instagram' }
];

export default function Footer() {
    return (
        <footer className="bg-[#F0F4F8] px-[4%] md:px-[6%] border-t-2 border-l-2 border-white/80 border-b-2 border-r-2 border-b-slate-200/50 border-r-slate-200/50 relative">
            {/* Neuromorphic Container */}
            <div className="container mx-auto py-8 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

                    {/* Company Info & CTA */}
                    <div className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1">
                        <div className="space-y-2">
                            <h2 className="text-lg sm:text-xl font-semibold text-[#0F172A]">Start your</h2>
                            <h2 className="text-lg sm:text-xl font-semibold text-gradient-primary">finance journey</h2>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                            {ctaButtons.map((button, index) => (
                                <a
                                    key={index}
                                    href={button.url}
                                    className={`block w-full px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base text-center
                    ${button.variant === 'primary'
                                            ? 'bg-[#030f42] text-white hover:shadow-lg hover:translate-y-[-2px]'
                                            : button.variant === 'secondary'
                                                ? 'bg-[#1CB5E0] text-[#030f42] hover:shadow-lg hover:translate-y-[-2px]'
                                                : 'bg-white text-[#030f42] border border-slate-200 shadow-[4px_4px_8px_rgba(163,177,198,0.25),-4px_-4px_8px_rgba(255,255,255,0.7)] hover:shadow-[6px_6px_12px_rgba(163,177,198,0.3),-6px_-6px_12px_rgba(255,255,255,0.8)] hover:translate-y-[-2px]'}`}
                                >
                                    {button.label}
                                </a>
                            ))}
                        </div>

                        <div className="flex space-x-4 pt-2">
                            {socialLinks.map((social, index) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.url}
                                        aria-label={social.label}
                                        className="text-slate-500 hover:text-[#1CB5E0] transition-colors p-2 rounded-lg bg-white shadow-[3px_3px_6px_rgba(163,177,198,0.2),-3px_-3px_6px_rgba(255,255,255,0.7)] hover:shadow-[4px_4px_8px_rgba(163,177,198,0.3),-4px_-4px_8px_rgba(255,255,255,0.8)]"
                                    >
                                        <IconComponent className="h-5 w-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="space-y-3 sm:space-y-4">
                        <h3 className="font-semibold text-[#0F172A] border-b-2 border-[#1CB5E0] pb-1 text-sm sm:text-base w-max">Welcome to Company</h3>
                        <ul className="space-y-1 sm:space-y-2">
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.url}
                                        className="text-slate-600 hover:text-[#0891B2] transition-all hover:translate-x-1 inline-block text-sm">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="">
                        <h4 className="font-semibold text-[#0F172A] border-b-2 border-[#1CB5E0] pb-1 mb-2 text-sm sm:text-base w-max">Finance solutions</h4>
                        <ul className="space-y-1 sm:space-y-2">
                            {financeSolutions.map((solution, index) => (
                                <li key={index}>
                                    <a href={solution.url}
                                        className="text-slate-600 hover:text-[#0891B2] transition-all hover:translate-x-1 inline-block text-sm">
                                        {solution.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Partner Finance & Knowledge Hub */}
                    <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
                        <h3 className="font-semibold text-[#0F172A] border-b-2 border-[#1CB5E0] pb-1 text-sm sm:text-base w-max">Partner Finance</h3>
                        <Link href="/partner" className="text-slate-600 hover:text-[#0891B2] text-sm transition-all hover:pl-1">Offer finance to your
                            customers</Link>

                        <div className="pt-4 sm:pt-6">
                            <h4 className="font-semibold text-[#0F172A] mb-3 sm:mb-4 text-sm sm:text-base">Contact details</h4>
                            <div className="space-y-2 sm:space-y-3">
                                <div className="flex items-center space-x-2">
                                    <div className="p-1.5 rounded-lg bg-[#1CB5E0]/10">
                                        <Phone className="h-4 w-4 text-[#1CB5E0] flex-shrink-0" />
                                    </div>
                                    <a href="tel:02070787446"
                                        className="text-slate-600 hover:text-[#1CB5E0] transition-colors text-sm">
                                        020 7078 7446
                                    </a>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="p-1.5 rounded-lg bg-[#1CB5E0]/10">
                                        <Mail className="h-4 w-4 text-[#1CB5E0] flex-shrink-0" />
                                    </div>
                                    <a href="mailto:contact@alpha-funding.co.uk"
                                        className="text-slate-600 hover:text-[#1CB5E0] transition-colors text-sm">
                                        contact@alpha-funding.co.uk
                                    </a>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <div className="p-1.5 rounded-lg bg-[#1CB5E0]/10 mt-0.5">
                                        <MapPin className="h-4 w-4 text-[#1CB5E0] flex-shrink-0" />
                                    </div>
                                    <div className="text-sm text-slate-600">
                                        <p className="font-medium text-[#0F172A]">London Office</p>
                                        <p>307 Euston Road, London NW1 3AD</p>
                                        <p className="font-medium mt-2 text-[#0F172A]">Wirral Office</p>
                                        <p>Commerce House, Campbeltown Rd, Tranmere, Wirral, CH41 9HP</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Neuromorphic Card */}
                <div className={"flex flex-col gap-4 text-center items-center justify-center pb-8 px-4 mt-8 pt-8 rounded-xl bg-white shadow-[4px_4px_8px_rgba(163,177,198,0.2),-4px_-4px_8px_rgba(255,255,255,0.7)]"}>
                    <p className={"text-xs text-slate-500 max-w-2xl"}>
                        Disclaimer : Alpha Funding Finance helps UK based businesses access business finance by working directly
                        with businesses and their appointed representative. We are a broker and do not provide finance or
                        loans ourselves. Quotes are subject to verifying applicant's circumstances and creditworthiness.
                    </p>
                    <div className={"flex items-center justify-center gap-2 flex-wrap"}>
                        <Link href={"/terms"} className="text-slate-600 hover:text-[#1CB5E0] transition-colors text-sm px-3 py-1">
                            Terms & Conditions
                        </Link>
                        <span className="text-slate-300">|</span>
                        <Link href={"/policy"} className="text-slate-600 hover:text-[#1CB5E0] transition-colors text-sm px-3 py-1">
                            Privacy Policy
                        </Link>
                        <span className="text-slate-300">|</span>
                        <Link href={"/cookie-policy"} className="text-slate-600 hover:text-[#1CB5E0] transition-colors text-sm px-3 py-1">
                            Cookie Policy
                        </Link>
                    </div>
                    <p className="text-xs text-slate-400">© {new Date().getFullYear()} Alpha Funding. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}