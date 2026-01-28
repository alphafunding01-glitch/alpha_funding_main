'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, XCircle, ArrowRight, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

type EligibilityResultProps = {
    companyName: string;
    eligibilityScore: number;
    status: 'high' | 'medium' | 'low';
    recommendedProducts: Array<{
        name: string;
        description: string;
        matchScore: number;
        url: string;
    }>;
    nextStep: string;
    ctaUrl: string;
    ctaText: string;
};

export const EligibilityResult = ({
    companyName,
    eligibilityScore,
    status,
    recommendedProducts,
    nextStep,
    ctaUrl,
    ctaText,
}: EligibilityResultProps) => {
    const statusConfig = {
        high: {
            icon: CheckCircle2,
            color: 'text-green-500',
            bg: 'bg-green-500/10',
            border: 'border-green-500/20',
            label: 'High Likelihood',
            sub: 'Excellent business profile detected.'
        },
        medium: {
            icon: AlertCircle,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/20',
            label: 'Good Potential',
            sub: 'Strong candidate for specialist funding.'
        },
        low: {
            icon: XCircle,
            color: 'text-red-400',
            bg: 'bg-red-500/10',
            border: 'border-red-500/20',
            label: 'Options Available',
            sub: 'Specialist lenders may still assist.'
        },
    };

    const config = statusConfig[status];
    const StatusIcon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel-light p-6 rounded-2xl space-y-6 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-2 opacity-10">
                <StatusIcon className="w-24 h-24 rotate-12" />
            </div>

            {/* Status Header */}
            <div className={`flex items-center gap-4 p-4 rounded-xl ${config.bg} ${config.border} border backdrop-blur-sm relative z-10`}>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <StatusIcon className={`w-8 h-8 ${config.color}`} />
                </div>
                <div>
                    <p className="text-white font-heading text-xl">{config.label}</p>
                    <p className="text-slate-300 text-xs">Reliability Score: <span className="text-brand-cyan font-bold">{eligibilityScore}%</span></p>
                </div>
            </div>

            {/* Recommended Products */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-brand-cyan" />
                    <p className="text-white font-heading text-sm">Targeted Funding Solutions:</p>
                </div>

                {recommendedProducts.map((product, index) => (
                    <motion.div
                        key={product.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                        <Link
                            href={product.url}
                            className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all group relative overflow-hidden hover:border-brand-cyan/30"
                        >
                            <div className="flex justify-between items-start relative z-10">
                                <div className="pr-4">
                                    <p className="text-white font-medium text-sm group-hover:text-brand-cyan transition-colors">{product.name}</p>
                                    <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">{product.description}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <span className="text-brand-cyan text-[10px] font-bold bg-brand-cyan/10 px-2 py-0.5 rounded-full border border-brand-cyan/20">{product.matchScore}% Match</span>
                                    <ArrowRight className="w-3 h-3 text-white/20 mt-2 ml-auto group-hover:text-brand-cyan group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Next Step */}
            <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-3 px-2">
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                    <p className="text-slate-300 text-[13px]">{nextStep}</p>
                </div>
                <Link
                    href={ctaUrl}
                    className="cta-button-primary w-full flex items-center justify-center gap-2 h-12 rounded-xl group"
                >
                    <span className="font-bold">{ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </motion.div>
    );
};
