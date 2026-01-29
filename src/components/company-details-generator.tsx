"use client"

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Shield, CheckCircle2, AlertCircle, Users, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypewriterField } from '@/components/ui/typewriter-field';

interface CompanyProfile {
    company_name: string;
    company_number: string;
    company_status: string;
    date_of_creation: string;
    sic_codes: string[];
    has_charges: boolean;
    registered_office_address: {
        address_line_1?: string;
        address_line_2?: string;
        locality?: string;
        postal_code?: string;
        country?: string;
    };
}

interface Officer {
    name: string;
    officer_role: string;
    appointed_on: string;
}

interface CompanyDetailsGeneratorProps {
    company: any; // From search results
    profile: CompanyProfile | null;
    officers: Officer[];
    isLoading: boolean;
    onSelectDirector?: (director: Officer) => void;
    selectedDirector?: Officer | null;
}

// SIC code to industry name mapping
const SIC_INDUSTRIES: { [key: string]: string } = {
    '62': 'Information Technology',
    '63': 'Information Services',
    '69': 'Legal & Accounting',
    '70': 'Management Consultancy',
    '71': 'Architecture & Engineering',
    '72': 'Scientific R&D',
    '73': 'Advertising & Marketing',
    '74': 'Professional Services',
    '85': 'Education',
    '86': 'Healthcare',
    '45': 'Motor Trade',
    '46': 'Wholesale',
    '47': 'Retail',
    '55': 'Hospitality',
    '56': 'Food & Beverage',
    '41': 'Construction',
    '68': 'Real Estate',
};

function getSicIndustry(sicCodes: string[]): string {
    if (!sicCodes || sicCodes.length === 0) return 'Business Services';
    const prefix = sicCodes[0].substring(0, 2);
    return SIC_INDUSTRIES[prefix] || 'Business Services';
}

function formatTradingSince(dateStr: string): string {
    if (!dateStr) return 'Unknown';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function CompanyDetailsGenerator({
    company,
    profile,
    officers,
    isLoading,
    onSelectDirector,
    selectedDirector
}: CompanyDetailsGeneratorProps) {
    const [phase, setPhase] = useState<'hidden' | 'header' | 'card' | 'fields' | 'complete'>('hidden');
    const [headerText, setHeaderText] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const fullHeaderText = 'ALPHA INTELLIGENCE';

    // Animation phases
    useEffect(() => {
        if (!company) {
            setPhase('hidden');
            return;
        }

        // Phase 1: Show header with typewriter
        setPhase('header');
        let charIndex = 0;
        const headerInterval = setInterval(() => {
            charIndex++;
            setHeaderText(fullHeaderText.slice(0, charIndex));
            if (charIndex >= fullHeaderText.length) {
                clearInterval(headerInterval);
                setTimeout(() => setPhase('card'), 300);
            }
        }, 30);

        return () => clearInterval(headerInterval);
    }, [company?.company_number]);

    useEffect(() => {
        if (phase === 'card' && profile) {
            setTimeout(() => setPhase('fields'), 600);
        }
    }, [phase, profile]);

    useEffect(() => {
        if (phase === 'fields') {
            setTimeout(() => setPhase('complete'), 1500);
        }
    }, [phase]);

    if (!company) return null;

    const address = profile?.registered_office_address || {};
    const fullAddress = [
        address.address_line_1,
        address.address_line_2
    ].filter(Boolean).join(', ') || company.address_snippet || 'Address loading...';

    const hasMultipleDirectors = officers.length > 1;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={cn(
                    "relative rounded-2xl p-5 mt-4",
                    "bg-gradient-to-br from-[#1CB5E0]/8 to-[#D946EF]/5",
                    "border transition-all duration-300 overflow-visible",
                    phase === 'header' || phase === 'card'
                        ? "border-[#1CB5E0]/30 animate-[border-pulse_1s_ease-in-out_infinite]"
                        : "border-[#1CB5E0]/20"
                )}
            >
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <motion.div
                            initial={{ opacity: 0, rotate: -180 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                        >
                            <Sparkles className={cn(
                                "w-4 h-4 text-[#1CB5E0]",
                                phase === 'header' && "animate-spin"
                            )} />
                        </motion.div>
                        <span className="text-[11px] font-bold text-[#1CB5E0] uppercase tracking-wider">
                            {headerText}
                            {phase === 'header' && headerText.length < fullHeaderText.length && (
                                <span className="animate-[blink_0.5s_infinite]">|</span>
                            )}
                        </span>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-1.5 text-[10px] text-emerald-400"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE CH.LINK
                    </motion.div>
                </div>

                {/* Company Card */}
                {phase !== 'hidden' && phase !== 'header' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-4 mb-5 p-4 rounded-xl bg-white/[0.03] border border-white/5"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="w-12 h-12 rounded-xl bg-[#1CB5E0]/10 flex items-center justify-center flex-shrink-0"
                        >
                            <Shield className="w-6 h-6 text-[#1CB5E0]" />
                        </motion.div>

                        <div className="flex-1 min-w-0">
                            <div className="font-bold text-white text-sm truncate">
                                {company.title || profile?.company_name}
                            </div>
                            <div className="text-xs text-slate-500 mb-2">
                                Reg: {company.company_number || profile?.company_number}
                            </div>

                            {/* Status Badges */}
                            <div className="flex flex-wrap gap-2">
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                                >
                                    <CheckCircle2 className="w-2.5 h-2.5" />
                                    HEALTH CLEAR
                                </motion.span>

                                {officers.length > 0 && (
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/20"
                                    >
                                        <Users className="w-2.5 h-2.5" />
                                        {officers.length} DIRECTOR{officers.length > 1 ? 'S' : ''}
                                    </motion.span>
                                )}

                                {profile?.has_charges && (
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/20"
                                    >
                                        <AlertCircle className="w-2.5 h-2.5" />
                                        ACTIVE CHARGES
                                    </motion.span>
                                )}
                            </div>
                        </div>

                        {/* Status message */}
                        <div className="hidden sm:block text-right">
                            <div className="text-xs text-emerald-400 leading-relaxed max-w-[180px]">
                                Secure intelligence link established. High eligibility detected.
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Detail Fields with Typewriter */}
                {(phase === 'fields' || phase === 'complete') && (
                    <div className="space-y-4">
                        {/* Registered Address */}
                        <TypewriterField
                            label="Registered Address"
                            value={fullAddress}
                            delay={0}
                            speed={15}
                        />

                        {/* City & Postcode */}
                        <div className="grid grid-cols-2 gap-4">
                            <TypewriterField
                                label="City"
                                value={address.locality || 'Loading...'}
                                delay={300}
                                speed={25}
                            />
                            <TypewriterField
                                label="Postcode"
                                value={address.postal_code || '...'}
                                delay={400}
                                speed={30}
                            />
                        </div>

                        {/* Industry & Trading Since */}
                        <div className="grid grid-cols-2 gap-4">
                            <TypewriterField
                                label="Inferred Industry"
                                value={profile?.sic_codes ? `Codes: ${profile.sic_codes.join(', ')}` : 'Loading...'}
                                delay={600}
                                speed={20}
                            />
                            <TypewriterField
                                label="Trading Since"
                                value={formatTradingSince(profile?.date_of_creation || company.date_of_creation)}
                                delay={700}
                                speed={25}
                            />
                        </div>

                        {/* Director Selection (if multiple) */}
                        {hasMultipleDirectors && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ delay: 0.8 }}
                                className="pt-2"
                            >
                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Select Primary Contact
                                </label>
                                <div className="relative" style={{ zIndex: 9999 }}>
                                    <button
                                        type="button"
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className={cn(
                                            "w-full py-3 px-4 rounded-xl text-sm text-left bg-white/5 border transition-all",
                                            "flex items-center justify-between",
                                            showDropdown
                                                ? "border-[#1CB5E0]/30"
                                                : "border-white/10 hover:border-white/20"
                                        )}
                                    >
                                        <span className={selectedDirector ? "text-white" : "text-slate-500"}>
                                            {selectedDirector
                                                ? `${selectedDirector.name} - ${selectedDirector.officer_role}`
                                                : "Choose a director..."}
                                        </span>
                                        <ChevronDown className={cn(
                                            "w-4 h-4 text-slate-500 transition-transform",
                                            showDropdown && "rotate-180"
                                        )} />
                                    </button>

                                    {showDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute left-0 right-0 top-full mt-1 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl max-h-60 overflow-y-auto"
                                            style={{ zIndex: 99999 }}
                                        >
                                            {officers.map((officer, idx) => (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    className={cn(
                                                        "w-full p-3 text-left text-sm border-b border-white/5 last:border-0",
                                                        "hover:bg-white/5 transition-colors",
                                                        selectedDirector?.name === officer.name && "bg-[#1CB5E0]/10"
                                                    )}
                                                    onClick={() => {
                                                        onSelectDirector?.(officer);
                                                        setShowDropdown(false);
                                                    }}
                                                >
                                                    <div className="font-medium text-white">{officer.name}</div>
                                                    <div className="text-xs text-slate-500 capitalize">{officer.officer_role}</div>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-4">
                        <div className="w-3 h-3 border-2 border-[#1CB5E0]/30 border-t-[#1CB5E0] rounded-full animate-spin" />
                        Fetching company intelligence...
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}

export default CompanyDetailsGenerator;
