"use client";

import React from 'react';
import NavBar from "@/components/navbar";
import Footer from "@/sections/common/footer";
import CheckEligibilityForm from "@/sections/forms/check-eligibility-form";
import { BreadcrumbJsonLd } from 'next-seo';
import { Clock, Sparkles, ShieldCheck } from 'lucide-react';

export default function CheckEligibility() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-hero">
            <BreadcrumbJsonLd
                items={[
                    {
                        name: 'Home',
                        item: 'https://alpha-funding.co.uk',
                    },
                    {
                        name: 'Check Eligibility',
                        item: 'https://alpha-funding.co.uk/check-eligibility',
                    },
                ]}
            />
            <NavBar />

            <main className="flex-1 relative">
                <div className="container mx-auto px-4 py-20 lg:py-28">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                        {/* Left Column - Hero */}
                        <div className="w-full lg:w-[40%] lg:sticky lg:top-28">
                            <h1 className="font-heading text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#1CB5E0] leading-tight mb-6">
                                Check Your <span className="text-[#1CB5E0]">Funding</span> Eligibility in 60 Seconds
                            </h1>
                            <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-md">
                                Find out what you qualify for — no credit score impact. No obligation.
                            </p>

                            {/* Trust Signals */}
                            <div className="space-y-5">
                                <div className="text-[11px] text-slate-500 uppercase tracking-widest mb-4">
                                    We never share your information without consent.
                                </div>

                                {/* 24h Card */}
                                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#1CB5E0]/10 flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-[#1CB5E0]" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-white mb-0.5">24-48hrs</div>
                                            <div className="text-sm text-slate-400">average time from enquiry to funding decision</div>
                                            <div className="text-[10px] text-slate-500 mt-1">* For loans up to £100,000</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Instant Results Card */}
                                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#D946EF]/10 flex items-center justify-center">
                                            <Sparkles className="w-6 h-6 text-[#D946EF]" />
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-white mb-0.5">Instant Results</div>
                                            <div className="text-sm text-slate-400">Know your options in seconds</div>
                                        </div>
                                    </div>
                                </div>

                                {/* No Credit Check Card */}
                                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                            <ShieldCheck className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-white mb-0.5">No Credit Check</div>
                                            <div className="text-sm text-slate-400">Your credit score stays protected</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className="w-full lg:w-[60%]">
                            <CheckEligibilityForm />
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}