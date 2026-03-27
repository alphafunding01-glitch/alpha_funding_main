"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Search, BarChart3, CheckCircle2, Banknote, ArrowRight } from "lucide-react";
import Link from "next/link";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

const steps = [
    {
        id: 1,
        title: "Check Eligibility",
        icon: Search,
        description: "Submit a 60-second online check. No impact on your credit score and no upfront fees.",
        badge: "1"
    },
    {
        id: 2,
        title: "Compare Options",
        icon: BarChart3,
        description: "We search 50+ lenders to find the best rates and terms for your specific profile.",
        badge: "2"
    },
    {
        id: 3,
        title: "Get Approved",
        icon: CheckCircle2,
        description: "Receive formal offers within 24-48 hours. Your dedicated expert handles the paperwork.",
        badge: "3"
    },
    {
        id: 4,
        title: "Receive Funds",
        icon: Banknote,
        description: "Sign your documents digitally. Funds are typically deposited in your account same-day.",
        badge: "4"
    }
];

export default function HomeHowItWorks() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} className="py-16 md:py-28 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-10 md:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-midnight mb-6"
                    >
                        Get Funded in <span className="text-[#1CB5E0]">4 Simple Steps</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-slate-500 font-body text-lg"
                    >
                        We compare 50+ specialist lenders to find the exact funding structure your business needs.
                        No one-size-fits-all, just results.
                    </motion.p>
                    <p className="text-slate-500 font-body text-lg">
                        No jargon. No endless paperwork. Just fast, transparent funding.
                        Our process is designed for busy SME owners.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Vertical connecting line for mobile / background for desktop */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-100 -translate-x-1/2 hidden md:block" />
                    <motion.div
                        className="absolute left-8 md:left-1/2 top-0 w-[4px] bg-[#1CB5E0] -translate-x-1/2 hidden md:block origin-top rounded-full shadow-[0_0_15px_rgba(28,181,224,0.5)] z-10"
                        style={{ scaleY, height: "100%" }}
                    />

                    <div className="space-y-16 md:space-y-24">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="flex-1 w-full">
                                    <div className={`glass-panel p-8 rounded-3xl border border-slate-100 shadow-xl relative group hover:border-[#1CB5E0]/30 transition-all ${idx % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <div className={`w-12 h-12 rounded-2xl bg-[#1CB5E0] text-white flex items-center justify-center font-black text-xl mb-6 shadow-[0_5px_15px_rgba(28,181,224,0.3)] absolute -top-6 ${idx % 2 !== 0 ? 'md:right-8 md:left-auto left-8' : 'left-8'}`}>
                                            {step.badge}
                                        </div>
                                        <div className={`feature-icon-wrapper mb-4 ${idx % 2 !== 0 ? 'md:ml-auto' : ''}`}>
                                            <step.icon className="w-6 h-6 text-[#1CB5E0]" />
                                        </div>
                                        <h3 className="text-2xl font-heading font-bold text-brand-midnight mb-3">{step.title}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                                        <p className="text-slate-400 text-sm italic">Accessing 50+ lender criteria panels...</p>
                                    </div>
                                </div>
                                <div className="w-16 h-16 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center z-20 relative hidden md:flex">
                                    <div className={`w-4 h-4 rounded-full transition-colors duration-500 ${idx === 0 ? 'bg-[#1CB5E0]' : 'bg-slate-200'}`} />
                                </div>
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 md:mt-24 text-center">
                    <Link href="/apply-now" className="cta-button-primary px-12 h-16 inline-flex items-center justify-center gap-3 text-lg font-bold">
                        Start Your Application
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
