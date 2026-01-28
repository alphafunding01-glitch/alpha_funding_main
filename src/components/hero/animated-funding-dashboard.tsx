'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2,
    Building2,
    TrendingUp,
    Banknote,
    ShieldCheck,
    Zap,
    Clock,
    ArrowRight,
    Sparkles,
} from 'lucide-react';

// Stage type definition
type Stage = 'submit' | 'verify' | 'match' | 'approve' | 'funded';

const STAGES: Stage[] = ['submit', 'verify', 'match', 'approve', 'funded'];

const STAGE_TIMINGS: Record<Stage, number> = {
    submit: 2500,
    verify: 3000,
    match: 3000,
    approve: 3000,
    funded: 4000,
};

const PROGRESS_MAP: Record<Stage, number> = {
    submit: 20,
    verify: 40,
    match: 60,
    approve: 80,
    funded: 100,
};

// Fake company names for rotation
const COMPANY_NAMES = [
    'Northern Steel Ltd',
    'Brighton Hospitality Group',
    'Manchester Digital Solutions',
    'Thames Valley Logistics',
    'Edinburgh Tech Ventures',
];

const FUNDING_AMOUNTS = [85000, 250000, 175000, 320000, 150000];

// Helper to mask company name e.g. "Northern Steel" -> "N*******n S***l"
const maskCompanyName = (name: string) => {
    return name.split(' ').map(part => {
        if (part.length <= 2) return part;
        return part[0] + '*'.repeat(part.length - 2) + part[part.length - 1];
    }).join(' ');
};

export default function AnimatedFundingDashboard() {
    const [stage, setStage] = useState<Stage>('submit');
    const [progress, setProgress] = useState(20);
    const [companyIndex, setCompanyIndex] = useState(0);
    const [lenderCount, setLenderCount] = useState(0);
    const [fundingAmount, setFundingAmount] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    // Dynamic Stats
    const [timeElapsed, setTimeElapsed] = useState(0.5); // Starts at 0.5hr

    // Use ref to track current stage index across renders
    const stageIndexRef = useRef(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Advance to next stage
    const advanceStage = useCallback(() => {
        const nextIndex = (stageIndexRef.current + 1) % STAGES.length;

        // If completing a full cycle, reset with new company
        if (nextIndex === 0) {
            setIsVisible(false);

            setTimeout(() => {
                setCompanyIndex((prev) => (prev + 1) % COMPANY_NAMES.length);
                setLenderCount(0);
                setFundingAmount(0);
                setTimeElapsed(0.5); // Reset time
                stageIndexRef.current = 0;
                setStage('submit');
                setProgress(20);
                setIsVisible(true);
            }, 500);
        } else {
            stageIndexRef.current = nextIndex;
            const nextStage = STAGES[nextIndex];
            setStage(nextStage);
            setProgress(PROGRESS_MAP[nextStage]);
        }
    }, []);

    // Main animation loop
    useEffect(() => {
        const scheduleNextStage = () => {
            const currentStage = STAGES[stageIndexRef.current];
            const duration = STAGE_TIMINGS[currentStage];

            // Update Time Elapsed based on stage to simulate progress
            // Simple logic: Increase time as we move through stages
            // Submit (0.5h) -> Verify (2h) -> Match (24h) -> Approve (26h) -> Funded (48h)
            let targetTime = 0.5;
            if (currentStage === 'verify') targetTime = 2.4;
            if (currentStage === 'match') targetTime = 24.0;
            if (currentStage === 'approve') targetTime = 26.5;
            if (currentStage === 'funded') targetTime = 48.0;

            // Animate time update slightly
            setTimeElapsed(targetTime);

            timeoutRef.current = setTimeout(() => {
                advanceStage();
                scheduleNextStage();
            }, duration);
        };

        scheduleNextStage();

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [advanceStage]);

    // Lender count animation during match stage
    useEffect(() => {
        if (stage === 'match') {
            setLenderCount(0);
            const interval = setInterval(() => {
                setLenderCount((prev) => {
                    if (prev >= 12) {
                        clearInterval(interval);
                        return 12;
                    }
                    return prev + 1;
                });
            }, 200);
            return () => clearInterval(interval);
        }
    }, [stage]);

    // Funding amount counter during approve/funded stages
    useEffect(() => {
        if (stage === 'approve' || stage === 'funded') {
            const targetAmount = FUNDING_AMOUNTS[companyIndex];
            const duration = 1500;
            const steps = 30;
            const increment = targetAmount / steps;
            let current = 0;

            const interval = setInterval(() => {
                current += increment;
                if (current >= targetAmount) {
                    setFundingAmount(targetAmount);
                    clearInterval(interval);
                } else {
                    setFundingAmount(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(interval);
        }
    }, [stage, companyIndex]);

    const currentCompany = COMPANY_NAMES[companyIndex];
    const maskedName = maskCompanyName(currentCompany);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-[420px]"
        >
            {/* Main Dashboard Container */}
            <div className="glass-panel-dark rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                {/* Dashboard Header */}
                <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                        </div>
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest ml-3">How it works</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#1CB5E0] animate-pulse" />
                        <span className="text-[#1CB5E0] text-[10px] font-bold uppercase tracking-wider">Active Process</span>
                    </div>
                </div>

                {/* Dashboard Content */}
                <AnimatePresence mode="wait">
                    {isVisible && (
                        <motion.div
                            key={`${companyIndex}-${stage}`}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.4 }}
                            className="p-6 space-y-6"
                        >
                            {/* Company Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-[#1CB5E0]/10 border border-[#1CB5E0]/20 flex items-center justify-center">
                                        <Building2 className="w-6 h-6 text-[#1CB5E0]" />
                                    </div>
                                    <div>
                                        <motion.p
                                            key={currentCompany}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-white font-bold text-base"
                                        >
                                            {maskedName}
                                        </motion.p>
                                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-tight">Case ID: ALPHA-{String(companyIndex + 1042).padStart(4, '0')}</p>
                                    </div>
                                </div>
                                <StageIndicator stage={stage} />
                            </div>

                            {/* Stage Content */}
                            <div className="min-h-[160px] flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    {stage === 'submit' && <SubmitStage key="submit" />}
                                    {stage === 'verify' && <VerifyStage key="verify" />}
                                    {stage === 'match' && <MatchStage key="match" lenderCount={lenderCount} />}
                                    {stage === 'approve' && <ApproveStage key="approve" amount={fundingAmount} />}
                                    {stage === 'funded' && <FundedStage key="funded" amount={fundingAmount} company={maskedName} />}
                                </AnimatePresence>
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                                    <span className="text-slate-500">Processing Status</span>
                                    <span className="text-[#1CB5E0]">{progress}% Complete</span>
                                </div>
                                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-[#1CB5E0] to-cyan-300 rounded-full shadow-[0_0_10px_rgba(28,181,224,0.5)]"
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1, ease: 'easeInOut' }}
                                    />
                                </div>
                            </div>

                            {/* Bottom Stats */}
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                                <StatBox
                                    label="Time Elapsed"
                                    value={`${timeElapsed} Hrs`}
                                    icon={Clock}
                                    highlight={stage === 'funded'}
                                />
                                <StatBox
                                    label="Interest Rate"
                                    value="From 6.9%"
                                    icon={TrendingUp}
                                    highlight={stage === 'approve'}
                                />
                                <StatBox
                                    label="Lenders"
                                    value="50+"
                                    icon={ShieldCheck}
                                    highlight={stage === 'match'}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Background Glow Effects */}
            <motion.div
                animate={{
                    opacity: stage === 'funded' ? 0.35 : 0.15,
                    scale: stage === 'funded' ? 1.05 : 1,
                }}
                transition={{ duration: 0.6 }}
                className="absolute -inset-6 bg-[#1CB5E0]/20 rounded-[2.5rem] blur-3xl -z-10"
            />
        </motion.div>
    );
}

// Stage Indicator Badge
function StageIndicator({ stage }: { stage: Stage }) {
    const config: Record<Stage, { label: string; color: string; bg: string }> = {
        submit: { label: 'Application', color: 'text-blue-400', bg: 'bg-blue-500/20' },
        verify: { label: 'Verifying', color: 'text-amber-400', bg: 'bg-amber-500/20' },
        match: { label: 'Matching', color: 'text-purple-400', bg: 'bg-purple-500/20' },
        approve: { label: 'Approved', color: 'text-[#1CB5E0]', bg: 'bg-[#1CB5E0]/20' },
        funded: { label: 'Funded', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    };

    const { label, color, bg } = config[stage];

    return (
        <motion.span
            key={stage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${color} ${bg} border border-current/10`}
        >
            <span className="flex items-center gap-2">
                {stage !== 'approve' && stage !== 'funded' ? (
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full"
                    />
                ) : (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                )}
                {label}
            </span>
        </motion.span>
    );
}

// Submit Stage Content
function SubmitStage() {
    return (
        <motion.div className="space-y-3">
            {['Company Data Refined', 'Eligibility Predicted', 'Application Secured'].map((field, i) => (
                <motion.div
                    key={field}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5"
                >
                    <span className="text-slate-400 text-xs font-medium">{field}</span>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.2 + 0.3, type: 'spring' }}
                        className="text-[#1CB5E0]"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                    </motion.div>
                </motion.div>
            ))}
        </motion.div>
    );
}

// Verify Stage Content
function VerifyStage() {
    const checks = [
        { label: 'CH Profile', status: 'done' },
        { label: 'Active Status', status: 'done' },
        { label: 'Solvency Check', status: 'done' },
        { label: 'Lender Match-v1', status: 'pending' },
    ];

    return (
        <motion.div className="space-y-4">
            <div className="flex items-center gap-2 text-[#1CB5E0]">
                <Zap className="w-4 h-4 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Security Clearance</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {checks.map((check, i) => (
                    <motion.div
                        key={check.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className={`p-3 rounded-xl text-[10px] font-bold uppercase tracking-tight flex items-center gap-2 border ${check.status === 'done'
                            ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10'
                            : 'bg-white/5 text-slate-400 border-white/10'
                            }`}
                    >
                        {check.status === 'done' ? (
                            <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                        ) : (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                className="w-3 h-3 border-2 border-current border-t-transparent rounded-full flex-shrink-0"
                            />
                        )}
                        <span className="truncate">{check.label}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// Match Stage Content
function MatchStage({ lenderCount }: { lenderCount: number }) {
    return (
        <motion.div className="space-y-5 text-center">
            <div className="flex items-center justify-center gap-2 text-purple-400">
                <Sparkles className="w-5 h-5" />
                <span className="text-[11px] font-bold uppercase tracking-widest">Optimizing Panels</span>
            </div>

            <div className="flex justify-center -space-x-3">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5, x: 20 }}
                        animate={{
                            opacity: i < lenderCount / 2 ? 1 : 0.2,
                            scale: 1,
                            x: 0,
                            y: [0, i % 2 === 0 ? -5 : 5, 0]
                        }}
                        transition={{
                            delay: i * 0.1,
                            y: { repeat: Infinity, duration: 3 + i, ease: "easeInOut" }
                        }}
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center backdrop-blur-md"
                    >
                        <Building2 className="w-5 h-5 text-[#1CB5E0]" />
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="inline-block px-6 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/20"
            >
                <span className="text-2xl font-black text-purple-400">{lenderCount}</span>
                <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest ml-3">Strategic Matches</span>
            </motion.div>
        </motion.div>
    );
}

// Approve Stage Content
function ApproveStage({ amount }: { amount: number }) {
    return (
        <motion.div className="space-y-5 text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                transition={{ type: 'spring', damping: 10 }}
            >
                <div className="w-16 h-16 rounded-full bg-[#1CB5E0]/20 flex items-center justify-center mx-auto mb-4 border border-[#1CB5E0]/30 shadow-[0_0_20px_rgba(28,181,224,0.3)]">
                    <Zap className="w-8 h-8 text-[#1CB5E0]" />
                </div>
                <p className="text-[#1CB5E0] text-[11px] font-bold uppercase tracking-[0.2em] mb-2">Offer Confirmed</p>
                <motion.p
                    className="text-4xl font-black text-white"
                >
                    £{amount.toLocaleString()}
                </motion.p>
            </motion.div>

            <div className="flex justify-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5">
                    <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider mb-1">Interest</p>
                    <p className="text-white text-xs font-bold">6.9% APR</p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5">
                    <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider mb-1">Duration</p>
                    <p className="text-white text-xs font-bold">36 Months</p>
                </div>
            </div>
        </motion.div>
    );
}

// Funded Stage Content
function FundedStage({ amount, company }: { amount: number; company: string }) {
    return (
        <motion.div className="space-y-5 text-center relative">
            {/* Success Decoration */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 pointer-events-none"
            >
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, x: 0, y: 0 }}
                        animate={{
                            scale: [0, 1, 0],
                            x: (i % 2 === 0 ? 1 : -1) * (30 + i * 20),
                            y: -50 - i * 10
                        }}
                        transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                        className="absolute left-1/2 top-1/2 w-1 h-1 bg-yellow-400 rounded-full"
                    />
                ))}
            </motion.div>

            <div className="space-y-2">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/40 rotate-12">
                    <Banknote className="w-10 h-10 text-brand-midnight -rotate-12" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <p className="text-emerald-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-1">Transfer Complete</p>
                    <p className="text-3xl font-black text-white">£{amount.toLocaleString()}</p>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-tighter mt-1">{company} • Secured</p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center justify-center gap-3 py-2 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
            >
                <ArrowRight className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Funds successfully deployed</span>
            </motion.div>
        </motion.div>
    );
}

// Stat Box Component
function StatBox({
    label,
    value,
    icon: Icon,
    highlight
}: {
    label: string;
    value: string;
    icon: any;
    highlight: boolean;
}) {
    return (
        <motion.div
            animate={{
                backgroundColor: highlight ? 'rgba(28, 181, 224, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                borderColor: highlight ? 'rgba(28, 181, 224, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            }}
            className="p-3 rounded-2xl border text-center transition-all duration-300"
        >
            <Icon className={`w-4 h-4 mx-auto mb-2 ${highlight ? 'text-[#1CB5E0]' : 'text-slate-600'}`} />
            <p className={`text-sm font-black ${highlight ? 'text-[#1CB5E0]' : 'text-white'}`}>{value}</p>
            <p className="text-slate-600 text-[9px] font-bold uppercase tracking-tighter mt-1">{label}</p>
        </motion.div>
    );
}
