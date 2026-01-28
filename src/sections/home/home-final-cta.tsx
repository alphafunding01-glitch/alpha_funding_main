"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, Users } from "lucide-react";

export default function HomeFinalCTA() {
    return (
        <section className="relative overflow-hidden min-h-[500px] flex items-center bg-[#030f42]">
            {/* Animated Mesh Gradient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#000046] via-[#1CB5E0]/20 to-[#67E8F9]/10" />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, 50, 0],
                        y: [0, -50, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1CB5E0]/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, -50, 0],
                        y: [0, 50, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]"
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 py-24">
                <div className="glass-panel-dark p-12 md:p-20 rounded-[60px] border border-white/5 shadow-2xl relative overflow-hidden text-center max-w-5xl mx-auto backdrop-blur-3xl">
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1CB5E0] to-transparent opacity-20" />
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1CB5E0] to-transparent opacity-20" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="flex justify-center flex-wrap gap-8 mb-10 opacity-60 grayscale hover:grayscale-0 transition-all">
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-[#1CB5E0]" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Funding in 24h</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                                <ShieldCheck className="w-4 h-4 text-[#1CB5E0]" />
                                <span className="text-sm text-slate-200">Authorised under applicable regulations</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-[#1CB5E0]" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Dedicated Advisors</span>
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight">
                            Ready to Grow Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1CB5E0] via-cyan-300 to-blue-400">Business Legacy?</span>
                        </h2>

                        <p className="text-slate-300 font-body text-xl max-w-2xl mx-auto leading-relaxed">
                            Join 2,000+ UK companies who've secured funding through Alpha Funding.
                            Your dedicated advisor is waiting to find your perfect deal.
                        </p>

                        <div className="pt-6">
                            <Link href="/apply-now" className="cta-button-primary px-16 h-18 text-xl font-black rounded-2xl group relative inline-flex items-center justify-center gap-4 py-4">
                                <span className="relative z-10 tracking-tight">Get Started Today</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative z-10" />
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                            </Link>
                        </div>

                        <p className="text-slate-500 text-sm mt-8 flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            9 advisors currently online to assist you
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
