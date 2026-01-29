"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, AlertCircle, TrendingUp, Shield, Building2, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

// Score factor definitions
interface ScoreFactor {
    id: string;
    label: string;
    points: number;
    icon: React.ElementType;
    positive: boolean;
}

interface LeadScoreProps {
    companyAge: number | null;
    hasCharges: boolean | null;
    sicCodes: string[];
    numberOfDirectors: number;
    companyStatus: string | null;
    borrowAmount: number;
}

// Low-risk SIC codes
const LOW_RISK_SIC = ['62', '63', '69', '70', '71', '72', '73', '74', '85', '86', '87', '88'];
const HIGH_RISK_SIC = ['92', '64', '66'];

// Dynamic templates for score messaging
const SCORE_MESSAGES = {
    excellent: [
        "Exceptional profile! You're in the top 10% of applicants.",
        "Outstanding! Lenders will compete for your business.",
        "Excellent fundability! Expect multiple offers.",
        "Premium profile detected. Priority processing available.",
    ],
    good: [
        "Strong profile! You're in the top 25% of applicants.",
        "Good fundability score. Multiple options available.",
        "Solid business profile. Expect competitive terms.",
        "Above average! Several lenders match your profile.",
    ],
    average: [
        "Decent fundability. Options available through our network.",
        "Standard profile. We have lenders for your situation.",
        "Fair score. Let's find the right fit for you.",
        "Moderate fundability. Specialist lenders available.",
    ],
    belowAverage: [
        "Funding available through alternative routes.",
        "We work with lenders for businesses like yours.",
        "Specialist options exist. Let's explore together.",
        "Alternative funding routes are available.",
    ],
    unknown: [
        "Complete your profile for a personalized score.",
        "We're ready to assess your funding potential.",
        "Submit details to unlock your fundability score.",
        "Let's discover your funding options together.",
    ],
};

function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function calculateScore(props: LeadScoreProps): { score: number; factors: ScoreFactor[] } {
    const factors: ScoreFactor[] = [];
    let totalPoints = 50; // Base score

    // Company Age Factor
    if (props.companyAge !== null) {
        if (props.companyAge >= 10) {
            factors.push({ id: 'age', label: `${props.companyAge}+ years trading`, points: 20, icon: Building2, positive: true });
            totalPoints += 20;
        } else if (props.companyAge >= 5) {
            factors.push({ id: 'age', label: `${props.companyAge} years established`, points: 15, icon: Building2, positive: true });
            totalPoints += 15;
        } else if (props.companyAge >= 2) {
            factors.push({ id: 'age', label: `${props.companyAge} years trading`, points: 10, icon: Building2, positive: true });
            totalPoints += 10;
        } else if (props.companyAge >= 1) {
            factors.push({ id: 'age', label: 'Early-stage business', points: 0, icon: Building2, positive: true });
        } else {
            factors.push({ id: 'age', label: 'Start-up (<1 year)', points: -10, icon: AlertCircle, positive: false });
            totalPoints -= 10;
        }
    }

    // Industry Risk Factor
    if (props.sicCodes && props.sicCodes.length > 0) {
        const primarySic = props.sicCodes[0]?.substring(0, 2) || '';
        if (LOW_RISK_SIC.includes(primarySic)) {
            factors.push({ id: 'sector', label: 'Low-risk sector', points: 15, icon: Shield, positive: true });
            totalPoints += 15;
        } else if (HIGH_RISK_SIC.includes(primarySic)) {
            factors.push({ id: 'sector', label: 'Higher-risk sector', points: -10, icon: AlertCircle, positive: false });
            totalPoints -= 10;
        } else {
            factors.push({ id: 'sector', label: 'Standard sector', points: 5, icon: Shield, positive: true });
            totalPoints += 5;
        }
    }

    // Charges Factor
    if (props.hasCharges !== null) {
        if (props.hasCharges) {
            factors.push({ id: 'charges', label: 'Existing finance (refinanceable)', points: -5, icon: AlertCircle, positive: false });
            totalPoints -= 5;
        } else {
            factors.push({ id: 'charges', label: 'No existing charges', points: 10, icon: CheckCircle2, positive: true });
            totalPoints += 10;
        }
    }

    // Director Factor
    if (props.numberOfDirectors >= 2) {
        factors.push({ id: 'directors', label: `${props.numberOfDirectors} directors (shared liability)`, points: 5, icon: Users, positive: true });
        totalPoints += 5;
    }

    // Company Status Factor
    if (props.companyStatus) {
        if (props.companyStatus.toLowerCase() === 'active') {
            factors.push({ id: 'status', label: 'Active company status', points: 5, icon: CheckCircle2, positive: true });
            totalPoints += 5;
        }
    }

    // Amount Factor
    if (props.borrowAmount > 0) {
        if (props.borrowAmount <= 50000) {
            factors.push({ id: 'amount', label: 'Standard funding range', points: 5, icon: TrendingUp, positive: true });
            totalPoints += 5;
        } else if (props.borrowAmount <= 100000) {
            factors.push({ id: 'amount', label: 'Growth funding range', points: 0, icon: TrendingUp, positive: true });
        } else {
            factors.push({ id: 'amount', label: 'Larger funding (may need security)', points: -5, icon: AlertCircle, positive: false });
            totalPoints -= 5;
        }
    }

    // Cap score between 0-100
    const finalScore = Math.max(0, Math.min(100, totalPoints));

    return { score: finalScore, factors };
}

function getScoreMessage(score: number, hasData: boolean): string {
    if (!hasData) return pickRandom(SCORE_MESSAGES.unknown);
    if (score >= 85) return pickRandom(SCORE_MESSAGES.excellent);
    if (score >= 70) return pickRandom(SCORE_MESSAGES.good);
    if (score >= 50) return pickRandom(SCORE_MESSAGES.average);
    return pickRandom(SCORE_MESSAGES.belowAverage);
}

function getScoreColor(score: number): string {
    if (score >= 85) return 'text-emerald-400';
    if (score >= 70) return 'text-[#1CB5E0]';
    if (score >= 50) return 'text-amber-400';
    return 'text-orange-400';
}

function getBarColor(score: number): string {
    if (score >= 85) return 'from-emerald-500 to-emerald-400';
    if (score >= 70) return 'from-[#1CB5E0] to-[#D946EF]';
    if (score >= 50) return 'from-amber-500 to-amber-400';
    return 'from-orange-500 to-orange-400';
}

export const LeadScoreVisualization: React.FC<LeadScoreProps> = (props) => {
    const [phase, setPhase] = useState<'idle' | 'analyzing' | 'calculating' | 'revealing' | 'done'>('idle');
    const [displayScore, setDisplayScore] = useState(0);
    const [visibleFactors, setVisibleFactors] = useState(0);
    const [message, setMessage] = useState('');

    const hasData = props.companyAge !== null || props.sicCodes.length > 0 || props.hasCharges !== null;
    const { score, factors } = calculateScore(props);

    // Trigger animation when data changes
    useEffect(() => {
        if (!hasData) {
            setPhase('idle');
            return;
        }

        setPhase('analyzing');
        setDisplayScore(0);
        setVisibleFactors(0);

        // Phase 1: Analyzing (500ms)
        const timer1 = setTimeout(() => setPhase('calculating'), 500);

        // Phase 2: Calculating (1000ms) - count up score
        const timer2 = setTimeout(() => {
            setPhase('revealing');
            // Count up animation
            const duration = 800;
            const startTime = Date.now();
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                setDisplayScore(Math.round(score * ease));
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setMessage(getScoreMessage(score, hasData));
                    setPhase('done');
                }
            };
            requestAnimationFrame(animate);
        }, 1500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [props.companyAge, props.hasCharges, props.sicCodes.join(','), props.numberOfDirectors, props.borrowAmount]);

    // Reveal factors one by one
    useEffect(() => {
        if (phase !== 'done' || visibleFactors >= factors.length) return;

        const timer = setTimeout(() => {
            setVisibleFactors(v => v + 1);
        }, 150);

        return () => clearTimeout(timer);
    }, [phase, visibleFactors, factors.length]);

    const phaseLabels: Record<string, string> = {
        idle: 'FUNDING READINESS',
        analyzing: 'Analyzing profile...',
        calculating: 'Calculating score...',
        revealing: 'FUNDING READINESS',
        done: 'FUNDING READINESS',
    };

    const isProcessing = phase === 'analyzing' || phase === 'calculating';

    return (
        <div className={cn(
            "relative overflow-hidden rounded-2xl border p-5 my-4",
            "bg-gradient-to-br from-emerald-500/5 to-[#1CB5E0]/5",
            isProcessing ? "border-emerald-500/30 animate-[border-pulse_1s_ease-in-out_infinite]" : "border-emerald-500/20"
        )}>
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 to-[#1CB5E0]" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <TrendingUp className={cn(
                        "w-4 h-4 text-emerald-400",
                        isProcessing && "animate-pulse"
                    )} />
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                        {phaseLabels[phase]}
                    </span>
                </div>
                {phase === 'done' && (
                    <span className="text-[11px] text-slate-500">Based on Companies House data</span>
                )}
            </div>

            {/* Score Display */}
            <div className="flex items-center gap-4 mb-4">
                <motion.div
                    className={cn("text-4xl font-bold font-heading", getScoreColor(displayScore))}
                    animate={phase === 'revealing' ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                >
                    {isProcessing ? (
                        <span className="blur-[1px] opacity-50">{Math.floor(Math.random() * 30 + 50)}</span>
                    ) : (
                        displayScore
                    )}
                    <span className="text-lg text-slate-500">/100</span>
                </motion.div>

                {/* Score Bar */}
                <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className={cn("h-full rounded-full bg-gradient-to-r", getBarColor(displayScore))}
                        initial={{ width: 0 }}
                        animate={{ width: `${displayScore}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                </div>
            </div>

            {/* Score Message */}
            {message && phase === 'done' && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-slate-400 mb-4"
                >
                    {message}
                </motion.p>
            )}

            {/* Factors List */}
            {phase === 'done' && factors.length > 0 && (
                <div className="space-y-2 mt-3 pt-3 border-t border-white/5">
                    {factors.slice(0, visibleFactors).map((factor, i) => (
                        <motion.div
                            key={factor.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center justify-between text-sm"
                        >
                            <div className="flex items-center gap-2">
                                <factor.icon className={cn(
                                    "w-4 h-4",
                                    factor.positive ? "text-emerald-400" : "text-amber-400"
                                )} />
                                <span className="text-slate-300">{factor.label}</span>
                            </div>
                            <span className={cn(
                                "text-xs font-bold",
                                factor.points > 0 ? "text-emerald-400" : factor.points < 0 ? "text-amber-400" : "text-slate-500"
                            )}>
                                {factor.points > 0 ? `+${factor.points}` : factor.points}
                            </span>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Placeholder when no data */}
            {!hasData && (
                <div className="text-center py-4 text-slate-400">
                    <p className="text-sm">Select a company to see your funding readiness score</p>
                </div>
            )}
        </div>
    );
};

export default LeadScoreVisualization;
