"use client";

import React, { useState } from "react";
import NavBar from "@/components/navbar";
import Footer from "@/sections/common/footer";
import { BreadcrumbJsonLd } from 'next-seo';
import Link from "next/link";
import { ArrowRight, TrendingUp, Wallet, RefreshCw, Building2, LifeBuoy, CreditCard } from "lucide-react";
import { FaHandshake, FaHome, FaCogs, FaBuilding, FaFileInvoiceDollar } from 'react-icons/fa';
import { motion } from "framer-motion";

const aboutItems = [
    {
        label: "Business Loans",
        url: "/solutions/business-loans",
        description: "Quick secured and unsecured Business Loan Solutions",
        icon: FaHandshake
    },
    {
        label: "Refinance",
        url: "/solutions/refinance",
        description: "Refinance solutions to unlock equity in owned assets",
        icon: FaHome
    },
    {
        label: "Growth Guarantee Scheme",
        url: "/solutions/growth-guarantee-scheme",
        description: "Growth Guarantee Scheme empowers businesses to grow",
        icon: TrendingUp
    },
    {
        label: "Merchant Cash Advance",
        url: "/solutions/merchant-cash-advance",
        description: "Keep your working capital stable with a Merchant Cash Advance",
        icon: CreditCard
    },
    {
        label: "Asset & Equity Finance",
        url: "/solutions/business-asset-equipment-finance",
        description: "Finance your business much-needed assets and equipment",
        icon: FaCogs
    },
    {
        label: "Commercial Property Finance",
        url: "/solutions/commercial-property-finance",
        description: "Flexible commercial property finance to help your businesses expand",
        icon: FaBuilding
    },
    {
        label: "Invoice Finance",
        url: "/solutions/invoice-finance",
        description: "Invoice Finance solutions to maintain a healthy cash flow",
        icon: FaFileInvoiceDollar
    },
    {
        label: "Recovery Loan Scheme",
        url: "/solutions/recovery-loan-scheme",
        description: "Government-backed funding for pandemic-affected businesses",
        icon: LifeBuoy
    },
    {
        label: "Property Finance",
        url: "/solutions/property-finance",
        description: "Real estate development and management funding solutions",
        icon: Building2
    },
    {
        label: "Business Cash Advance",
        url: "/solutions/business-cash-advance",
        description: "Revenue-based cash advance with flexible repayments",
        icon: Wallet
    },
    {
        label: "Revolving Credit Facility",
        url: "/solutions/revolving-credit-facility",
        description: "On-demand credit facility for flexible working capital",
        icon: RefreshCw
    },
];

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
    >
        {children}
    </motion.div>
);

export default function SolutionsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <BreadcrumbJsonLd
                items={[
                    {
                        name: 'Home',
                        item: 'https://www.alpha-funding.co.uk',
                    },
                    {
                        name: 'Funding Options',
                    },
                ]}
            />
            <NavBar />
            <main className="flex-grow bg-slate-50 pt-36 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <FadeIn>
                            <h1 className="text-4xl md:text-5xl font-bold text-[#000428] mb-6">Funding Options</h1>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Explore our comprehensive range of business finance solutions designed to help your business grow.</p>
                        </FadeIn>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {aboutItems.map((item, index) => (
                            <FadeIn key={index} delay={index * 0.05}>
                                <Link href={item.url} className="block group h-full">
                                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all h-full flex flex-col hover:-translate-y-1">
                                        <div className="w-12 h-12 bg-[#1CB5E0]/10 rounded-xl flex items-center justify-center text-[#1CB5E0] mb-6 group-hover:bg-[#1CB5E0] group-hover:text-white transition-colors">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#000428] mb-3">{item.label}</h3>
                                        <p className="text-slate-600 mb-6 flex-grow">{item.description}</p>
                                        <div className="text-[#1CB5E0] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Learn More <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
