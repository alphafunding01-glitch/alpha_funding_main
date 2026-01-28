// Alpha Funding - Check Eligibility Page
// Design: Glassmorphism + Bento Grid Hybrid
// Date: 2026-01-03

"use client";

import React, { useState } from "react";
import {
    ShieldCheck, Zap, Clock, Lock, ArrowRight,
    CheckCircle2, Sparkles, Building2, User, FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

// ═══════════════════════════════════════════════════════════════
// TYPES & DATA
// ═══════════════════════════════════════════════════════════════

const steps = [
    { id: 1, title: "Business", icon: Building2 },
    { id: 2, title: "Contact", icon: User },
    { id: 3, title: "Review", icon: FileText }
];

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function CheckEligibilityContent() {
    const [currentStep, setCurrentStep] = useState(1);
    const [amount, setAmount] = useState(50000);

    // Simulated ranges based on slider
    const minEst = (amount * 0.85).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });
    const maxEst = (amount * 1.25).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });

    return (
        <section className="min-h-screen bg-gradient-hero relative overflow-hidden flex items-center justify-center p-4 pt-24 lg:pt-32 pb-12">

            {/* ══════════════════════════════════════════════════════════
          BACKGROUND EFFECTS
          ══════════════════════════════════════════════════════════ */}

            {/* Mesh Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-brand-cyan/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-brand-fuchsia/15 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '7s' }} />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.03]" />

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">

                    {/* ══════════════════════════════════════════════════════
              LEFT PANEL: INFO & BENTO GRID
              ══════════════════════════════════════════════════════ */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col gap-8"
                    >
                        {/* Header Content */}
                        <motion.div variants={itemVariants}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 backdrop-blur-sm mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
                                </span>
                                <span className="text-brand-cyan-light text-xs font-bold uppercase tracking-wider">No Credit Check Required</span>
                            </div>

                            <h1 className="font-heading text-4xl lg:text-5xl text-white mb-6 leading-tight">
                                Check Your Funding Eligibility in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-light to-brand-cyan">60 Seconds</span>
                            </h1>

                            <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
                                See how much you could borrow without affecting your credit score.
                                Our AI-driven engine provides instant estimates tailored to your business performance.
                            </p>
                        </motion.div>

                        {/* Bento Grid (2x3 Layout) */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-2 gap-4 mt-4"
                        >
                            {/* Featured Card (Spans 2 cols) */}
                            <div className="col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:bg-white/10 transition-colors">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <ShieldCheck className="w-24 h-24 text-white" />
                                </div>
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-white font-semibold">Bank-Level Security</h3>
                                </div>
                                <p className="text-slate-400 text-sm">Your data is encrypted with 256-bit SSL and never shared without permission.</p>
                            </div>

                            {/* Stat Card 1 */}
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-center items-center text-center hover:bg-white/10 transition-colors">
                                <div className="text-3xl font-heading text-brand-cyan mb-1">92%</div>
                                <div className="text-xs text-slate-400 uppercase tracking-wide">Approval Rate</div>
                            </div>

                            {/* Stat Card 2 */}
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-center items-center text-center hover:bg-white/10 transition-colors">
                                <div className="text-3xl font-heading text-brand-fuchsia-light mb-1">24h</div>
                                <div className="text-xs text-slate-400 uppercase tracking-wide">Decision Time</div>
                            </div>

                            {/* Benefit Card 1 */}
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 hover:bg-white/10 transition-colors">
                                <div className="p-1.5 rounded-full bg-blue-500/20 text-blue-400">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <span className="text-slate-200 text-sm font-medium">Soft Search Only</span>
                            </div>

                            {/* Benefit Card 2 */}
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 hover:bg-white/10 transition-colors">
                                <div className="p-1.5 rounded-full bg-brand-cyan/20 text-brand-cyan">
                                    <Zap className="w-4 h-4" />
                                </div>
                                <span className="text-slate-200 text-sm font-medium">Instant Results</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ══════════════════════════════════════════════════════
              RIGHT PANEL: GLASSMORPHIC FORM
              ══════════════════════════════════════════════════════ */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative"
                    >
                        {/* Floating Badge */}
                        <div className="absolute -top-4 -right-4 z-20 bg-[#10B981] text-[#064E3B] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                            <Lock className="w-3 h-3" />
                            SECURE FORM
                        </div>

                        <div className="bg-white/5 backdrop-blur-[24px] border border-white/10 rounded-[28px] p-8 lg:p-10 relative overflow-hidden shadow-2xl">
                            {/* Inner Glow Effect */}
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[80px] pointer-events-none" />

                            {/* Progress Steps */}
                            <div className="flex justify-between items-center mb-10 relative">
                                {/* Track Line */}
                                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10" />

                                {steps.map((step) => {
                                    const Icon = step.icon;
                                    const isActive = currentStep >= step.id;
                                    const isCurrent = currentStep === step.id;
                                    return (
                                        <div key={step.id} className="flex flex-col items-center gap-2 bg-brand-midnight px-2">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive
                                                    ? 'bg-brand-cyan border-brand-cyan text-brand-midnight'
                                                    : 'bg-brand-midnight border-white/20 text-slate-500'
                                                }`}>
                                                {isActive ? <CheckCircle2 className="w-5 h-5" /> : <span className="font-bold text-sm">{step.id}</span>}
                                            </div>
                                            <span className={`text-xs font-medium transition-colors ${isCurrent ? 'text-white' : 'text-slate-500'}`}>
                                                {step.title}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Form Content */}
                            <div className="space-y-8">

                                {/* Step 1: Amount Slider */}
                                <div className="space-y-4">
                                    <label className="text-slate-300 text-sm font-medium flex justify-between">
                                        Desired Funding Amount
                                        <span className="text-brand-cyan font-bold text-lg">£{amount.toLocaleString()}</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="10000"
                                        max="500000"
                                        step="5000"
                                        value={amount}
                                        onChange={(e) => setAmount(parseInt(e.target.value))}
                                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500 font-mono">
                                        <span>£10k</span>
                                        <span>£500k</span>
                                    </div>
                                </div>

                                {/* AI Estimate Box */}
                                <div className="p-4 rounded-xl border border-brand-cyan/30 bg-brand-cyan/5 relative group">
                                    <div className="absolute -top-3 left-4 bg-brand-midnight px-2 text-brand-cyan text-xs font-bold flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" />
                                        AI ESTIMATE
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="text-slate-400 text-xs mb-1">Estimated Range</div>
                                            <div className="text-white font-heading text-xl">{minEst} - {maxEst}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-slate-400 text-xs mb-1">Rate From</div>
                                            <div className="text-brand-cyan font-bold">2.9%</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Simulated Input Fields */}
                                <div className="grid gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider ml-1">Company Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Acme Trading Ltd"
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/50 transition-all"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider ml-1">Trading Since</label>
                                        <select className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/50 transition-all appearance-none">
                                            <option className="bg-brand-midnight">Less than 6 months</option>
                                            <option className="bg-brand-midnight">6 - 12 months</option>
                                            <option className="bg-brand-midnight">1 - 2 years</option>
                                            <option className="bg-brand-midnight">More than 2 years</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button className="w-full py-4 bg-brand-cyan hover:bg-brand-cyan-light text-brand-midnight font-bold rounded-xl shadow-[0_0_20px_rgba(28,181,224,0.3)] hover:shadow-[0_0_30px_rgba(28,181,224,0.5)] transition-all flex items-center justify-center gap-2 group">
                                    Check Now - No Obligation
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                {/* Security Note */}
                                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                                    <Lock className="w-3 h-3" />
                                    <span>Your data is secure and encrypted.</span>
                                </div>

                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
