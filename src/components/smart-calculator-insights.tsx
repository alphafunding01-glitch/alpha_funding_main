"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, ArrowRight, CheckCircle2, Zap, Shield, Calculator as CalcIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SmartCalculatorInsightsProps {
    amount: number | null;
    months: number | null;
    monthlyPayment: number;
    totalInterest: number;
    totalPayable: number;
    annualRate: number;
    className?: string; // Allow styling overrides
}

// Dynamic insight templates
const INSIGHT_TEMPLATES = {
    competitive: [
        "At {apr}% APR over {months} months, this is a competitive rate for unsecured business funding.",
        "Your monthly payment of £{monthly} is well within typical repayment ranges for a {amount} loan.",
        "Based on current market rates, {apr}% APR positions you competitively among UK businesses.",
        "This structure gives you predictable payments of £{monthly}/month with no surprises.",
    ],
    savings: [
        "This is £{savings}/month less than the UK average for similar business loans.",
        "You'll save approximately £{totalSavings} compared to lenders charging market average rates.",
        "At this rate, you're paying {percentLess}% less interest than many alternative lenders.",
        "Compared to short-term options, this saves you approximately £{savings} in fees.",
    ],
    productMatch: [
        "For £{amount} over {months} months, a **Business Loan** typically offers the best value.",
        "Your requirements match well with **Revolving Credit** for maximum flexibility.",
        "Based on this amount, **Merchant Cash Advance** could fund you within 24 hours.",
        "Consider **Asset Finance** if you're purchasing equipment – potentially tax-efficient!",
    ],
    timeframe: [
        "At this payment level, you'll be debt-free in {months} months.",
        "Total cost of £{total} over {months} months – that's {perYear}/year effectively.",
        "This term balances affordability (£{monthly}/month) with total cost efficiency.",
        "Shorter terms available if you can stretch to £{higherPayment}/month.",
    ],
    encouragement: [
        "Great progress! These numbers show healthy funding capacity.",
        "This calculation looks promising – let's make it happen.",
        "You're in a strong position to secure competitive terms.",
        "These figures suggest multiple funding options are available.",
    ],
    fallback: [
        "Adjust the sliders above to see how different terms affect your payments.",
        "Our calculator helps you compare options before applying.",
        "Explore different scenarios to find your ideal payment structure.",
        "Ready when you are – complete the form to get actual quotes.",
    ],
};

function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function formatCurrency(val: number): string {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${Math.round(val / 1000)}k`;
    return val.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export const SmartCalculatorInsights: React.FC<SmartCalculatorInsightsProps> = ({
    amount,
    months,
    monthlyPayment,
    totalInterest,
    totalPayable,

    annualRate,
    className,
}) => {
    const [phase, setPhase] = useState<'idle' | 'analyzing' | 'calculating' | 'done'>('idle');
    const [displayMonthly, setDisplayMonthly] = useState(0);
    const [insights, setInsights] = useState<string[]>([]);
    const [visibleInsights, setVisibleInsights] = useState(0);
    const [recommendedProduct, setRecommendedProduct] = useState<{ name: string; href: string } | null>(null);

    const hasData = amount && months && amount > 0 && months > 0;

    // Generate insights based on calculations
    const generateInsights = (): string[] => {
        if (!hasData) return [pickRandom(INSIGHT_TEMPLATES.fallback)];

        const results: string[] = [];

        // Average market rate comparison (assume 18% average)
        const avgMonthlyPayment = (amount! * (0.18 / 12) * Math.pow(1 + 0.18 / 12, months!)) /
            (Math.pow(1 + 0.18 / 12, months!) - 1);
        const savings = avgMonthlyPayment - monthlyPayment;
        const totalSavings = savings * months!;
        const percentLess = ((avgMonthlyPayment - monthlyPayment) / avgMonthlyPayment * 100);

        // Competitive rate insight
        let competitiveInsight = pickRandom(INSIGHT_TEMPLATES.competitive)
            .replace(/{apr}/g, annualRate.toFixed(1))
            .replace(/{months}/g, String(months))
            .replace(/{monthly}/g, formatCurrency(monthlyPayment))
            .replace(/{amount}/g, `£${formatCurrency(amount!)}`);
        results.push(competitiveInsight);

        // Savings insight (only if actually saving)
        if (savings > 50) {
            let savingsInsight = pickRandom(INSIGHT_TEMPLATES.savings)
                .replace(/{savings}/g, formatCurrency(Math.abs(savings)))
                .replace(/{totalSavings}/g, formatCurrency(Math.abs(totalSavings)))
                .replace(/{percentLess}/g, Math.abs(percentLess).toFixed(0));
            results.push(savingsInsight);
        }

        // Timeframe insight
        const perYear = totalPayable / (months! / 12);
        const higherPayment = (amount! * (annualRate / 100 / 12) * Math.pow(1 + annualRate / 100 / 12, Math.max(6, months! - 6))) /
            (Math.pow(1 + annualRate / 100 / 12, Math.max(6, months! - 6)) - 1);
        let timeInsight = pickRandom(INSIGHT_TEMPLATES.timeframe)
            .replace(/{months}/g, String(months))
            .replace(/{total}/g, `£${formatCurrency(totalPayable)}`)
            .replace(/{perYear}/g, `£${formatCurrency(perYear)}`)
            .replace(/{monthly}/g, formatCurrency(monthlyPayment))
            .replace(/{higherPayment}/g, formatCurrency(higherPayment));
        results.push(timeInsight);

        // Encouragement
        results.push(pickRandom(INSIGHT_TEMPLATES.encouragement));

        return results;
    };

    // Determine recommended product
    const getRecommendedProduct = () => {
        if (!amount) return null;
        if (amount <= 50000) {
            return { name: 'Business Loan', href: '/solutions/business-loans' };
        } else if (amount <= 100000) {
            return { name: 'Revolving Credit Facility', href: '/solutions/revolving-credit-facility' };
        } else if (amount <= 250000) {
            return { name: 'Secured Business Loan', href: '/solutions/business-loans' };
        } else {
            return { name: 'Commercial Finance', href: '/solutions/commercial-property-finance' };
        }
    };

    // Trigger animation when inputs change
    useEffect(() => {
        if (!hasData) {
            setPhase('idle');
            setInsights([pickRandom(INSIGHT_TEMPLATES.fallback)]);
            return;
        }

        setPhase('analyzing');
        setVisibleInsights(0);

        // Phase 1: Analyzing
        const timer1 = setTimeout(() => setPhase('calculating'), 400);

        // Phase 2: Calculate and count up
        const timer2 = setTimeout(() => {
            // Count up animation
            const duration = 600;
            const startTime = Date.now();
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                setDisplayMonthly(Math.round(monthlyPayment * ease));
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setInsights(generateInsights());
                    setRecommendedProduct(getRecommendedProduct());
                    setPhase('done');
                }
            };
            requestAnimationFrame(animate);
        }, 800);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [amount, months, monthlyPayment]);

    // Reveal insights one by one
    useEffect(() => {
        if (phase !== 'done' || visibleInsights >= insights.length) return;

        const timer = setTimeout(() => {
            setVisibleInsights(v => v + 1);
        }, 200);

        return () => clearTimeout(timer);
    }, [phase, visibleInsights, insights.length]);

    const isProcessing = phase === 'analyzing' || phase === 'calculating';

    const phaseLabels: Record<string, string> = {
        idle: 'AI INSIGHTS',
        analyzing: 'Analyzing your requirements...',
        calculating: 'Calculating optimal terms...',
        done: 'AI INSIGHTS',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={cn(
                "relative overflow-hidden rounded-2xl border p-5 mt-6",
                "bg-gradient-to-br from-[#1CB5E0]/5 via-transparent to-[#D946EF]/5",
                isProcessing ? "border-[#1CB5E0]/40" : "border-[#1CB5E0]/20",
                className
            )}
        >
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1CB5E0] to-[#D946EF]" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Sparkles className={cn(
                        "w-4 h-4 text-[#1CB5E0]",
                        isProcessing && "animate-pulse"
                    )} />
                    <span className="text-[11px] font-bold text-[#1CB5E0] uppercase tracking-wider">
                        {phaseLabels[phase]}
                    </span>
                </div>
                {phase === 'done' && (
                    <span className="text-[10px] text-slate-400 px-2 py-1 bg-slate-100 rounded-full">
                        Based on your inputs
                    </span>
                )}
            </div>

            {/* Main Display */}
            {hasData && (
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                        <p className="text-xs text-slate-500 mb-1">Smart Monthly Estimate</p>
                        <motion.div
                            className="text-3xl font-black text-[#000428]"
                            animate={isProcessing ? { opacity: [0.5, 1, 0.5] } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            {isProcessing ? (
                                <span className="blur-[2px]">£{formatCurrency(monthlyPayment)}</span>
                            ) : (
                                <>£{displayMonthly.toLocaleString('en-GB')}<span className="text-base text-slate-400">/mo</span></>
                            )}
                        </motion.div>
                    </div>

                    {/* Product Recommendation Badge */}
                    {recommendedProduct && phase === 'done' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-right"
                        >
                            <p className="text-[10px] text-slate-400 mb-1">RECOMMENDED</p>
                            <Link
                                href={recommendedProduct.href}
                                className="inline-flex items-center gap-1 text-sm font-bold text-[#1CB5E0] hover:underline"
                            >
                                {recommendedProduct.name}
                                <ArrowRight className="w-3 h-3" />
                            </Link>
                        </motion.div>
                    )}
                </div>
            )}

            {/* Insights List */}
            {phase === 'done' && insights.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-slate-100">
                    {insights.slice(0, visibleInsights).map((insight, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-start gap-2 text-sm text-slate-600"
                        >
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                            <span dangerouslySetInnerHTML={{ __html: insight.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#1CB5E0]">$1</strong>') }} />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* CTA */}
            {phase === 'done' && hasData && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 pt-3 border-t border-slate-100"
                >
                    <Link href="/check-eligibility">
                        <button className="w-full py-3 px-4 bg-gradient-to-r from-[#1CB5E0] to-[#22D3EE] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#1CB5E0]/25 transition-all">
                            <Zap className="w-4 h-4" />
                            Get Your Actual Quote
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                    <p className="text-[10px] text-slate-400 text-center mt-2">
                        No impact on credit score • 2 minute check
                    </p>
                </motion.div>
            )}

            {/* Idle state */}
            {!hasData && (
                <div className="text-center py-4 text-slate-400">
                    <CalcIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">{insights[0] || "Adjust the sliders to see AI insights"}</p>
                </div>
            )}
        </motion.div>
    );
};

export default SmartCalculatorInsights;
