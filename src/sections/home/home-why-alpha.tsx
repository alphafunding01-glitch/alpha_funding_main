"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Building2, Clock, FileCheck,
    UserCheck, ShieldCheck, Repeat,
    ArrowRight
} from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

const features = [
    {
        icon: Building2,
        title: "50+ Lender Panel",
        description: "One application. Multiple options. We cover the entire market."
    },
    {
        icon: Clock,
        title: "Decisions in 24-48 hrs",
        description: "For funding up to £100,000. Get answers fast while you focus on operations."
    },
    {
        icon: FileCheck,
        title: "No Upfront Fees",
        description: "Total transparency. We only get paid by the lender when you get funded."
    },
    {
        icon: UserCheck,
        title: "Dedicated Account Manager",
        description: "One point of contact from start to finish. Human support when you need it."
    },
    {
        icon: ShieldCheck,
        title: "Soft Credit Check",
        description: "Check eligibility without affecting your credit score or transparency."
    },
    {
        icon: Repeat,
        title: "Services across UK",
        description: "We find funding solutions when traditional banks say no."
    }
];

export default function HomeWhyAlpha() {
    return (
        <section className="py-24 bg-[#f8fafc] relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-5 gap-16 items-center">
                    {/* Left Side */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="lg:col-span-2 space-y-8"
                    >
                        <motion.div variants={itemVariants}>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-midnight leading-tight">
                                Why 5000+ UK <br />
                                <span className="text-[#1CB5E0]">Businesses Trust</span> <br />
                                Alpha Funding
                            </h2>
                        </motion.div>

                        <motion.p variants={itemVariants} className="text-slate-500 font-body text-lg leading-relaxed">
                            We're not a bank. We're not a single lender. We're your dedicated funding partner
                            — searching the entire market to find you the best deal, fastest.
                        </motion.p>

                        <motion.div variants={itemVariants}>
                            <Link href="/check-eligibility" className="cta-button-primary px-10 h-14 inline-flex items-center justify-center gap-3 text-lg font-bold">
                                Check If You Qualify
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>

                        {/* Social Proof Mini Section */}
                        <motion.div variants={itemVariants} className="pt-8 flex flex-wrap gap-8 opacity-60">
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-brand-midnight">£200M+</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Approved</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-black text-brand-midnight">Services</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">across UK</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Bento Feature Grid */}
                    <div className="lg:col-span-3">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="grid sm:grid-cols-2 gap-6"
                        >
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    whileHover={{ y: -8, scale: 1.01 }}
                                    className="neuromorphic-card p-6 rounded-3xl bg-white border border-slate-50 group hover:border-[#1CB5E0]/20 transition-all duration-300"
                                >
                                    <div className="feature-icon-wrapper mb-4 group-hover:scale-110 transition-transform">
                                        <feature.icon className="w-5 h-5 text-[#1CB5E0]" />
                                    </div>
                                    <h3 className="text-lg font-heading font-bold text-brand-midnight mb-2">{feature.title}</h3>
                                    {idx === 0 ? ( // Apply this specific change only to the first feature (Lender Panel)
                                        <>
                                            <p className="text-slate-400 text-sm">Matched to 50+ lenders</p>
                                            <p className="text-slate-500 text-xs leading-relaxed">{feature.description}</p>
                                        </>
                                    ) : (
                                        <p className="text-slate-500 text-xs leading-relaxed">{feature.description}</p>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
