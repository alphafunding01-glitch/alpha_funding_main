import React from 'react';
import { Facebook, Linkedin, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button";

const companyLinks = [
    { url: '/contact', label: 'Contact Us' },
    { url: '/about-us', label: 'About' },
    {
        label: "Join Our Team",
        url: "/contact",
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
    { icon: Facebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, url: 'https://instagram.com', label: 'Instagram' }
];

export default function Footer() {
    return (
        <footer className="bg-white px-[4%] md:px-[6%] border-t">
            <div className="container mx-auto py-8 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

                    {/* Company Info & CTA */}
                    <div className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1">
                        <div className="space-y-2">
                            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Start your</h2>
                            <h2 className="text-lg sm:text-xl font-semibold text-primary">finance journey</h2>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                            {ctaButtons.map((button, index) => (
                                <a
                                    key={index}
                                    href={button.url}
                                    className={`block w-full px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-colors text-sm sm:text-base text-center
                    ${button.variant === 'primary' ? 'bg-primary text-primary-foreground hover:bg-primary/90' :
                                            button.variant === 'secondary' ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' :
                                                'bg-accent text-accent-foreground hover:bg-accent/80'}`}
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
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        <IconComponent className="h-5 w-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="space-y-3 sm:space-y-4">
                        <h3 className="font-semibold text-foreground border-b border-primary pb-1 text-sm sm:text-base">Welcome
                            to Company</h3>
                        <ul className="space-y-1 sm:space-y-2">
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.url}
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="">
                        <h4 className="font-semibold text-foreground border-b border-primary pb-1 mb-2 text-sm sm:text-base">Finance
                            solutions</h4>
                        <ul className="space-y-1 sm:space-y-2">
                            {financeSolutions.map((solution, index) => (
                                <li key={index}>
                                    <a href={solution.url}
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                        {solution.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Partner Finance & Knowledge Hub */}
                    <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
                        <h3 className="font-semibold text-foreground border-b border-primary pb-1 text-sm sm:text-base">Partner
                            Finance</h3>
                        <Link href="/partner" className="text-muted-foreground text-sm">Offer finance to your
                            customers</Link>

                        <div className="pt-4 sm:pt-6">
                            <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Contact
                                details</h4>
                            <div className="space-y-2 sm:space-y-3">
                                <div className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                    <a href="tel:02070787446"
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                        020 7078 7446
                                    </a>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                    <a href="mailto:contact@alpha-funding.co.uk"
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                        contact@alpha-funding.co.uk
                                    </a>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-muted-foreground">
                                        <p className="font-medium">London Office</p>
                                        <p>307 Euston Road, London NW1 3AD</p>
                                        <p className="font-medium mt-2">Wirral Office</p>
                                        <p>Commerce House, Campbeltown Rd, Tranmere, Wirral, CH41 9HP</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className={"flex flex-col gap-4 text-center items-center justify-center pb-8 px-4 mt-8 border-t pt-8"}>
                    <p className={"text-xs text-muted-foreground max-w-2xl"}>
                        Disclaimer : Alpha Funding Finance helps UK based businesses access business finance by working directly
                        with businesses and their appointed representative. We are a broker and do not provide finance or
                        loans ourselves. Quotes are subject to verifying applicant's circumstances and creditworthiness.
                    </p>
                    <div className={"flex items-center justify-center gap-2"}>
                        <Link href={"/terms"} className={buttonVariants({ variant: "link", size: "sm" })}>
                            Terms & Conditions
                        </Link>
                        <Link href={"/policy"} className={buttonVariants({ variant: "link", size: "sm" })}>
                            Privacy Policy
                        </Link>
                        <Link href={"/policy"} className={buttonVariants({ variant: "link", size: "sm" })}>
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}