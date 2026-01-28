"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, ArrowRight, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { QualificationResult } from '@/types/eligibility';
import Link from 'next/link';

interface QualificationResultViewProps {
    result: QualificationResult;
    onReset: () => void;
}

export function QualificationResultView({ result, onReset }: QualificationResultViewProps) {
    const isHigh = result.status === 'high';
    const isMedium = result.status === 'medium';
    const isLow = result.status === 'low';
    const isIneligible = result.status === 'ineligible';

    const getStatusColor = () => {
        if (isHigh) return 'from-emerald-400 to-cyan-400';
        if (isMedium) return 'from-amber-400 to-orange-400';
        return 'from-red-400 to-pink-400';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Score Ring */}
            <div className="flex flex-col items-center justify-center py-4">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                        <circle
                            cx="64"
                            cy="64"
                            r="58"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            className="text-white/5"
                        />
                        <motion.circle
                            cx="64"
                            cy="64"
                            r="58"
                            fill="none"
                            stroke="url(#score-gradient)"
                            strokeWidth="8"
                            strokeDasharray="364.4"
                            initial={{ strokeDashoffset: 364.4 }}
                            animate={{ strokeDashoffset: 364.4 - (364.4 * result.score) / 100 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            strokeLinecap="round"
                        />
                        <defs>
                            <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#1CB5E0" />
                                <stop offset="100%" stopColor="#0ea5e9" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-white">{result.score}%</span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Match Score</span>
                    </div>
                </div>
            </div>

            {/* Message Card */}
            <div className={`p-5 rounded-2xl bg-white/5 border border-white/10`}>
                <div className="flex gap-4">
                    <div className={`mt-1 p-2 rounded-lg bg-gradient-to-br ${getStatusColor()} flex-shrink-0`}>
                        {isHigh ? <Zap className="w-4 h-4 text-white" /> : <AlertCircle className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg mb-1">{isHigh ? 'Strong Eligibility' : isMedium ? 'Good Potential' : 'Review Required'}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">{result.message}</p>
                    </div>
                </div>
            </div>

            {/* Factors */}
            <div className="space-y-3">
                <h5 className="text-[11px] font-bold text-[#1CB5E0] uppercase tracking-widest px-1">Key Insights</h5>
                {result.factors.map((factor, idx) => (
                    <div key={idx} className="flex gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                        <div className={`p-1.5 rounded-md ${factor.impact === 'positive' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'} flex-shrink-0`}>
                            {factor.impact === 'positive' ? <TrendingUp className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        </div>
                        <div>
                            <p className="text-white text-xs font-bold">{factor.label}</p>
                            <p className="text-slate-500 text-[10px] mt-0.5">{factor.details}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recommended Products */}
            {!isIneligible && result.recommendedProducts.length > 0 && (
                <div className="space-y-3 pt-2">
                    <h5 className="text-[11px] font-bold text-[#1CB5E0] uppercase tracking-widest px-1">Top Matches</h5>
                    <div className="grid grid-cols-2 gap-3">
                        {result.recommendedProducts.map((product, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-[#1CB5E0]/5 border border-[#1CB5E0]/10 text-center">
                                <span className="text-white text-[11px] font-bold">{product}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="pt-4 space-y-3">
                {!isIneligible ? (
                    <Link href="/check-eligibility" className="cta-button-primary w-full h-12 flex items-center justify-center gap-2 font-bold text-sm shadow-lg">
                        Proceed to Full Application
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                ) : null}

                <button
                    onClick={onReset}
                    className="w-full h-12 rounded-xl bg-white/5 border border-white/10 text-slate-400 font-bold text-sm hover:bg-white/10 transition-all"
                >
                    Start New Assessment
                </button>
            </div>
        </motion.div>
    );
}
