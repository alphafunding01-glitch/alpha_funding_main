"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedFundingDashboard from '@/components/hero/animated-funding-dashboard';
import { TrendingUp, Clock, CheckCircle2, Zap, Shield, ArrowRight } from 'lucide-react';
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function HomeHeroSection() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative min-h-[90vh] flex items-center pt-36 pb-20 overflow-hidden bg-[#030f42]">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1CB5E0]/10 rounded-full blur-[120px] -mr-48 -mt-48 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -ml-32 -mb-32" />
                <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-cyan-400/5 rounded-full blur-[80px]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="flex flex-col gap-8"
                    >
                        <motion.div variants={itemVariants}>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-cyan-light text-[10px] font-bold uppercase tracking-widest whitespace-nowrap max-w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                                Faster Funding for UK SMEs
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.2] md:leading-[1.1]"
                        >
                            You Built The Business.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1CB5E0] via-cyan-400 to-blue-400">
                                We'll Help You To Scale It.
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-slate-300 max-w-lg leading-relaxed"
                        >
                            Stop chasing lenders. Alpha Funding connects you with <span className="text-[#1CB5E0] font-bold">50+ specialist lenders</span>. Decisions in 24-48 hours<Link href="/terms" className="text-[#1CB5E0] hover:underline">*</Link>.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-4">
                            <Link
                                href="/apply-now"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#1CB5E0] text-brand-midnight font-bold rounded-xl transition-all hover:bg-cyan-400 hover:-translate-y-1 shadow-[0_8px_30px_rgba(28,181,224,0.3)] group"
                            >
                                Start Your Application
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/solutions"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 transition-all hover:bg-white/10 hover:-translate-y-1"
                            >
                                Explore Solutions
                            </Link>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex items-center gap-6 mt-4"
                        >
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#030f42] bg-slate-800 flex items-center justify-center p-0.5">
                                        <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-700 to-slate-900" />
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-[#030f42] bg-brand-cyan flex items-center justify-center text-[10px] font-bold text-brand-midnight">
                                    500+
                                </div>
                            </div>
                            <div className="text-xs">
                                <div className="flex items-center gap-1 text-yellow-400 font-bold">
                                    <TrendingUp className="w-3 h-3" />
                                    <span>TRUSTED BY UK COMPANIES</span>
                                </div>
                                <p className="text-slate-500 font-medium">£50M+ in funding facilitated</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Visual (Animated Dashboard) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                        className="relative w-full flex justify-center lg:justify-end z-10"
                    >
                        <div className="w-full max-w-[420px]">
                            <AnimatedFundingDashboard />
                        </div>

                        {/* Background glow behind visual */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#1CB5E0]/5 rounded-full blur-[100px] z-0 pointer-events-none" />
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#1CB5E0] to-transparent" />
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Scroll to Explore</span>
            </motion.div>
        </section>
    );
}
