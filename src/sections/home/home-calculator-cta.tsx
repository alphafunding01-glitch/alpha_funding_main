"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Calculator, Sparkles, ArrowRight, Euro, Landmark } from "lucide-react";

export default function HomeCalculatorCTA() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [1000, 3000], [0, -150]);
    const opacity = useTransform(scrollY, [2000, 2500], [0.8, 1]);

    return (
        <section className="py-32 relative overflow-hidden bg-white">
            {/* Background Parallax Layer */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0 opacity-10"
            >
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/bg-pattern.svg')] bg-repeat opacity-20" />
            </motion.div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="relative max-w-4xl mx-auto">
                    {/* Decorative Elements */}
                    <motion.div
                        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                        className="absolute -top-12 -left-12 w-24 h-24 bg-brand-cyan/10 rounded-3xl blur-xl hidden lg:block"
                    />
                    <motion.div
                        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                        className="absolute -bottom-16 -right-16 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl hidden lg:block"
                    />

                    {/* Main CTA Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="neuromorphic-card-dark p-10 md:p-16 rounded-[48px] bg-brand-midnight border border-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.5)] relative overflow-hidden text-center"
                    >
                        {/* Background mesh-like circles */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                            <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-cyan/20 rounded-full blur-[80px]" />
                            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[80px]" />
                        </div>

                        <div className="relative z-10 space-y-8">
                            <div className="w-20 h-20 bg-white/5 rounded-[24px] flex items-center justify-center mx-auto border border-white/10 group transition-all duration-500 hover:rotate-[360deg] hover:bg-white/10">
                                <Calculator className="w-10 h-10 text-brand-cyan" />
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
                                    Calculate Your Business <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-400">Loan Repayments</span>
                                </h2>
                                <p className="text-slate-400 font-body text-xl max-w-2xl mx-auto leading-relaxed">
                                    Instant estimates. No commitment. No credit check required.
                                    Compare 50+ lenders. Decisions in 24-48 hours. No upfront fees.
                                    Get a clear picture of your funding costs in seconds.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                                <Link href="/calculator" className="cta-button-primary px-10 h-16 flex items-center justify-center gap-3 text-lg font-bold group">
                                    Try Calculator
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link href="/check-eligibility" className="cta-button-ghost px-10 h-16 flex items-center justify-center gap-3 border-white/10 text-white font-bold hover:bg-white/5">
                                    <Sparkles className="w-5 h-5 text-brand-cyan" />
                                    Check Eligibility
                                </Link>
                            </div>

                            <div className="flex items-center justify-center gap-10 pt-8 mt-8 border-t border-white/5 opacity-50">
                                <div className="flex items-center gap-2">
                                    <Landmark className="w-4 h-4 text-brand-cyan" />
                                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">200+ Lenders Scanned</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-brand-cyan" />
                                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">No Credit Impact</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating elements inside card */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-10 left-10 opacity-10"
                        >
                            <Euro className="w-8 h-8 text-white" />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-10 right-10 opacity-10"
                        >
                            <Landmark className="w-8 h-8 text-white" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
