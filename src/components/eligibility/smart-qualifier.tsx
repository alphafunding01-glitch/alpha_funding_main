"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wallet, Landmark, Loader2, ShieldCheck, Zap } from 'lucide-react';
import { CompanySearch } from './company-search';
import { QualificationResultView } from './qualification-result-view';
import { calculateEligibility } from '@/lib/eligibility-calculator';
import { QualificationFormData, QualificationResult, CompanyData } from '@/types/eligibility';

export default function SmartQualifier() {
    const [step, setStep] = useState<'form' | 'loading' | 'result'>('form');
    const [formData, setFormData] = useState<QualificationFormData>({
        company: null,
        monthlyRevenue: '',
        fundingAmount: '',
    });
    const [result, setResult] = useState<QualificationResult | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('loading');

        // Simulate calculation time for "AI" feel
        setTimeout(() => {
            const res = calculateEligibility(formData);
            setResult(res);
            setStep('result');
        }, 1500);
    };

    const handleReset = () => {
        setFormData({
            company: null,
            monthlyRevenue: '',
            fundingAmount: '',
        });
        setResult(null);
        setStep('form');
    };

    return (
        <div className="glass-panel-dark p-6 md:p-8 rounded-3xl max-w-xl mx-auto border-[#1CB5E0]/20 shadow-[0_0_50px_rgba(28,181,224,0.1)] relative overflow-hidden backdrop-blur-xl min-h-[500px] flex flex-col">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#1CB5E0]/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

            <AnimatePresence mode="wait">
                {step === 'form' && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex-1 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1CB5E0] to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(28,181,224,0.3)]">
                                <Sparkles className="w-6 h-6 text-white animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-white font-heading text-2xl">Smart Qualifier</h3>
                                <p className="text-slate-400 text-sm">Instant results • No credit impact</p>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                            <CompanySearch
                                selectedCompany={formData.company}
                                onSelect={(company) => setFormData({ ...formData, company })}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-[11px] font-bold text-[#1CB5E0] uppercase tracking-widest mb-2 px-1">Monthly Revenue</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#1CB5E0] transition-colors">
                                            <Wallet className="w-4 h-4" />
                                        </div>
                                        <select
                                            value={formData.monthlyRevenue}
                                            onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value as any })}
                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#1CB5E0]/50 focus:bg-white/[0.05] transition-all appearance-none"
                                            required
                                        >
                                            <option value="" className="bg-brand-midnight">Select revenue...</option>
                                            <option value="under-10k" className="bg-brand-midnight">Under £10,000</option>
                                            <option value="10k-50k" className="bg-brand-midnight">£10,000 - £50,000</option>
                                            <option value="50k-100k" className="bg-brand-midnight">£50,000 - £100,000</option>
                                            <option value="100k-500k" className="bg-brand-midnight">£100,000 - £500,000</option>
                                            <option value="500k-plus" className="bg-brand-midnight">£500,000+</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold text-[#1CB5E0] uppercase tracking-widest mb-2 px-1">Funding Needed</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#1CB5E0] transition-colors">
                                            <Landmark className="w-4 h-4" />
                                        </div>
                                        <select
                                            value={formData.fundingAmount}
                                            onChange={(e) => setFormData({ ...formData, fundingAmount: e.target.value as any })}
                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#1CB5E0]/50 focus:bg-white/[0.05] transition-all appearance-none"
                                            required
                                        >
                                            <option value="" className="bg-brand-midnight">Select amount...</option>
                                            <option value="10k-50k" className="bg-brand-midnight">£10k - £50k</option>
                                            <option value="50k-100k" className="bg-brand-midnight">£50k - £100k</option>
                                            <option value="100k-250k" className="bg-brand-midnight">£100k - £250k</option>
                                            <option value="250k-500k" className="bg-brand-midnight">£250k - £500k</option>
                                            <option value="500k-1m" className="bg-brand-midnight">£500k - £1m</option>
                                            <option value="1m-plus" className="bg-brand-midnight">£1m +</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="cta-button-primary w-full flex items-center justify-center gap-3 h-14 rounded-xl shadow-[0_10px_30px_rgba(28,181,224,0.3)] mt-auto group transition-all"
                            >
                                <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                <span className="font-bold text-lg">Check Eligibility</span>
                            </button>

                            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-white/5 text-slate-500">
                                <span className="text-[10px] uppercase font-bold tracking-tighter flex items-center gap-1.5">
                                    <ShieldCheck className="w-3 h-3" /> No Credit Check
                                </span>
                                <span className="text-[10px] uppercase font-bold tracking-tighter flex items-center gap-1.5">
                                    <Zap className="w-3 h-3" /> Instant Result
                                </span>
                            </div>
                        </form>
                    </motion.div>
                )}

                {step === 'loading' && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center py-12 gap-6 text-center"
                    >
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full border-2 border-[#1CB5E0]/20 border-t-[#1CB5E0] animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Sparkles className="w-8 h-8 text-[#1CB5E0] animate-pulse" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-white font-heading text-xl">Analyzing Business Data</h4>
                            <p className="text-slate-400 text-sm italic">Scanning 50+ lender criteria panels...</p>
                        </div>
                    </motion.div>
                )}

                {step === 'result' && result && (
                    <QualificationResultView
                        result={result}
                        onReset={handleReset}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
