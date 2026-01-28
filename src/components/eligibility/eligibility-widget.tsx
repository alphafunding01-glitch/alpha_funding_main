'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles, Building2, Wallet, Landmark, CheckCircle2 } from 'lucide-react';
import { EligibilityResult } from './eligibility-result';
import { CompanyExpertSection } from '@/components/company-expert';

export default function EligibilityWidget() {
    const [formData, setFormData] = useState({
        companyName: '',
        monthlyRevenue: '',
        fundingAmount: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showResult, setShowResult] = useState(false);

    // CH Search State
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<any>(null);

    const { messages, append, isLoading, setMessages } = useChat({
        api: '/api/eligibility',
    } as any) as any;

    // Companies House Search Logic
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (formData.companyName && formData.companyName.length > 2 && !selectedCompany) {
                setIsSearching(true);
                try {
                    const res = await fetch(`/api/companies-house/search?q=${encodeURIComponent(formData.companyName)}`);
                    const data = await res.json();
                    setSearchResults(data.items || []);
                    setShowResults(true);
                } catch (error) {
                    console.error("Search error", error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
                setShowResults(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [formData.companyName, selectedCompany]);

    const handleSelectCompany = (company: any) => {
        setSelectedCompany(company);
        setFormData(prev => ({ ...prev, companyName: company.title }));
        setShowResults(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setShowResult(true);
        setMessages([]); // Clear previous

        const prompt = `Check funding eligibility for:
    - Company: ${formData.companyName}
    - Monthly Revenue: ${formData.monthlyRevenue}
    - Funding Required: ${formData.fundingAmount}`;

        await append({ role: 'user', content: prompt });
        setIsSubmitting(false);
    };

    const isCalculating = isLoading || isSubmitting;

    return (
        <div className="glass-panel-dark p-6 md:p-8 rounded-3xl max-w-xl mx-auto border-[#1CB5E0]/20 shadow-[0_0_50px_rgba(28,181,224,0.1)] relative overflow-hidden backdrop-blur-xl">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#1CB5E0]/10 rounded-full blur-3xl opacity-50" />

            {!showResult || messages.length === 0 ? (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
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
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative">
                            <label className="block text-[11px] font-bold text-[#1CB5E0] uppercase tracking-widest mb-2 px-1 flex justify-between items-center">
                                <span>Registered Company Name</span>
                                {selectedCompany && (
                                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                        <CheckCircle2 className="w-2.5 h-2.5" /> VERIFIED
                                    </span>
                                )}
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#1CB5E0] transition-colors">
                                    <Building2 className="w-4 h-4" />
                                </div>
                                <input
                                    type="text"
                                    value={formData.companyName}
                                    onChange={(e) => {
                                        setFormData({ ...formData, companyName: e.target.value });
                                        if (selectedCompany) setSelectedCompany(null);
                                    }}
                                    placeholder="e.g. Acme Solutions Ltd"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#1CB5E0]/50 focus:bg-white/[0.05] transition-all"
                                    required
                                />
                                {isSearching && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        <Loader2 className="w-4 h-4 animate-spin text-[#1CB5E0]" />
                                    </div>
                                )}
                            </div>

                            {showResults && searchResults.length > 0 && (
                                <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-[#030f42]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl max-h-48 overflow-y-auto overflow-x-hidden">
                                    {searchResults.map((company, idx) => (
                                        <div
                                            key={idx}
                                            className="p-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0 transition-colors"
                                            onClick={() => handleSelectCompany(company)}
                                        >
                                            <div className="font-bold text-sm text-white truncate">{company.title}</div>
                                            <div className="text-[10px] text-slate-400 truncate">{company.address_snippet}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedCompany && (
                                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <CompanyExpertSection
                                        company={selectedCompany}
                                        isDark={true}
                                        onUpdateFields={(data) => {
                                            // Optional: Show some "Fetched" highlights
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-[11px] font-bold text-[#1CB5E0] uppercase tracking-widest mb-2 px-1">Monthly Revenue</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#1CB5E0] transition-colors">
                                        <Wallet className="w-4 h-4" />
                                    </div>
                                    <select
                                        value={formData.monthlyRevenue}
                                        onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
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
                                        onChange={(e) => setFormData({ ...formData, fundingAmount: e.target.value })}
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
                            disabled={isCalculating}
                            className="cta-button-primary w-full flex items-center justify-center gap-3 h-14 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_10px_30px_rgba(28,181,224,0.3)] mt-2"
                        >
                            {isCalculating ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    <span className="font-bold underline-offset-4 decoration-2">Calculating Probability...</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                    <span className="font-bold text-lg">Check Eligibility</span>
                                </>
                            )}
                        </button>

                        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2 opacity-40">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <span className="text-[10px] uppercase font-bold tracking-tighter text-white">Secure Link</span>
                            </div>
                            <div className="flex items-center gap-2 opacity-40">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span className="text-[10px] uppercase font-bold tracking-tighter text-white">No Credit Check</span>
                            </div>
                        </div>
                    </form>
                </motion.div>
            ) : (
                <AnimatePresence mode="wait">
                    {messages.map((message: any) => (
                        <div key={message.id}>
                            {/* Only show assistant messages containing tool-calls */}
                            {message.role === 'assistant' && (
                                <div className="space-y-4">
                                    {/* Handle tool results */}
                                    {message.toolInvocations?.map((invoc: any, index: number) => {
                                        if (invoc.toolName === 'checkEligibility') {
                                            if (invoc.state === 'result') {
                                                return (
                                                    <EligibilityResult
                                                        key={invoc.toolCallId}
                                                        {...invoc.result}
                                                    />
                                                );
                                            }
                                            return (
                                                <motion.div
                                                    key={invoc.toolCallId}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                                                >
                                                    <div className="p-4 rounded-full bg-[#1CB5E0]/10 border border-[#1CB5E0]/20 animate-pulse">
                                                        <Loader2 className="w-10 h-10 animate-spin text-[#1CB5E0]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-heading text-lg">Analyzing Business Data</p>
                                                        <p className="text-slate-400 text-sm italic">Accessing 50+ lender criteria panels...</p>
                                                    </div>
                                                </motion.div>
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Reset Button */}
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        onClick={() => {
                                            setShowResult(false);
                                            setMessages([]);
                                        }}
                                        className="text-slate-500 hover:text-[#1CB5E0] text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 mx-auto pt-4 transition-colors"
                                    >
                                        Start New Assessment
                                    </motion.button>
                                </div>
                            )}
                        </div>
                    ))}
                </AnimatePresence>
            )}
        </div>
    );
}
