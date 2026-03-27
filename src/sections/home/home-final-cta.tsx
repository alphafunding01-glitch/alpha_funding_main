"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, Users } from "lucide-react";

export default function HomeFinalCTA() {
    const [isBusinessHours, setIsBusinessHours] = useState(false);

    useEffect(() => {
        const checkBusinessHours = () => {
            const now = new Date();
            const ukTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/London" }));
            const day = ukTime.getDay();
            const hour = ukTime.getHours();

            // Mon(1) - Fri(5), 9am - 5pm (17:00)
            const isOpen = day >= 1 && day <= 5 && hour >= 9 && hour < 17;
            setIsBusinessHours(isOpen);
        };

        checkBusinessHours();
        const interval = setInterval(checkBusinessHours, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden py-16 md:py-28 flex items-center bg-[#030f42]">
            {/* Animated Mesh Gradient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-[#000046] via-brand-cyan/20 to-[#67E8F9]/10" />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, 50, 0],
                        y: [0, -50, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 right-0 w-200 h-200 bg-brand-cyan/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, -50, 0],
                        y: [0, 50, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-0 left-0 w-150 h-150 bg-blue-600/10 rounded-full blur-[100px]"
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 py-8 md:py-16">
                <div className="glass-panel-dark p-6 sm:p-12 md:p-20 rounded-3xl md:rounded-[60px] border border-white/5 shadow-2xl relative overflow-hidden text-center max-w-5xl mx-auto backdrop-blur-3xl">
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-brand-cyan to-transparent opacity-20" />
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-brand-cyan to-transparent opacity-20" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="flex justify-center flex-wrap gap-4 sm:gap-8 mb-10 opacity-60 grayscale hover:grayscale-0 transition-all">
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-brand-cyan" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Funding in 24-48hrs</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                                <ShieldCheck className="w-4 h-4 text-brand-cyan" />
                                <span className="text-sm text-slate-200">Trusted Finance UK Broker</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-brand-cyan" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Dedicated Advisors</span>
                            </div>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-white leading-tight">
                            Ready to Grow Your <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan via-cyan-300 to-blue-400">Business Legacy?</span>
                        </h2>

                        <p className="text-slate-300 font-body text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Join UK companies who've secured funding through Alpha Funding.
                            Your dedicated manager is waiting to find your perfect deal.
                        </p>

                        <div className="pt-6">
                            <Link href="/apply-now" className="cta-button-primary px-8 sm:px-16 h-auto text-lg md:text-xl font-black rounded-2xl group relative inline-flex items-center justify-center gap-4 py-4">
                                <span className="relative z-10 tracking-tight">Get Started Today</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative z-10" />
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                            </Link>
                        </div>

                        <p className="text-slate-500 text-sm mt-8 flex items-center justify-center gap-2 flex-wrap">
                            {isBusinessHours ? (
                                <>
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    9 advisors currently online to assist you
                                </>
                            ) : (
                                <>
                                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                                    <span>Leave a message. Advisors available 9-5 Mon-Fri. <Link href="/contact" className="text-brand-cyan hover:underline">Contact Us</Link></span>
                                </>
                            )}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
