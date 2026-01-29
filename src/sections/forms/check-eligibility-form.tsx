"use client"

import Link from "next/link"
import React, { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { 
    Loader2, Search, Building2, CheckCircle2, Sparkles, 
    ArrowRight, ArrowLeft, Check, Edit2, Shield, Lock, Banknote, ExternalLink 
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCompletion } from "@ai-sdk/react"
import { CompanyDetailsGenerator } from "@/components/company-details-generator"
import { LeadScoreVisualization } from "@/components/lead-score-visualization"

// --- Type Definitions ---
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
    };
}

interface Officer {
    name: string;
    officer_role: string;
    appointed_on: string;
}

// --- Validation Schema ---
const formSchema = z.object({
    company_name: z.string().min(1, "Company name is required"),
    company_number: z.string().optional(),
    company_address: z.string().optional(),
    city: z.string().optional(),
    postcode: z.string().optional(),
    nature_of_business: z.string().optional(),
    incorporation_date: z.string().optional(),
    if_not_company: z.boolean().default(false).optional(),
    borrow_amount: z.string(),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    contact_number: z.string().min(10, "Please enter a valid phone number"),
    email_address: z.string().email("Please enter a valid email address"),
    privacy_policy: z.boolean(),
    terms_of_business: z.boolean(),
    purpose_of_funding: z.string().optional(),
    urgency: z.string().optional(),
    annual_revenue: z.string().optional(),
    final_consent: z.boolean().optional()
});

type FormValues = z.infer<typeof formSchema>;

const formatCurrency = (val: number) => {
    if (val >= 1000000) return `£${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `£${Math.round(val / 1000).toLocaleString()}k`;
    return `£${val.toLocaleString()}`;
};

// --- Glass Input Component ---
const GlassInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => (
        <input
            ref={ref}
            className={cn(
                "w-full py-3.5 px-4 bg-white/5 border border-white/10 rounded-xl",
                "text-[15px] text-white placeholder-slate-500",
                "focus:outline-none focus:border-[#1CB5E0] focus:bg-[#1CB5E0]/5 focus:ring-[3px] focus:ring-[#1CB5E0]/15",
                "transition-all duration-200",
                className
            )}
            {...props}
        />
    )
);
GlassInput.displayName = "GlassInput";

// --- Glass Select Component ---
const GlassSelect = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
    ({ className, children, ...props }, ref) => (
        <select
            ref={ref}
            className={cn(
                "w-full py-3.5 px-4 bg-white/5 border border-white/10 rounded-xl",
                "text-[15px] text-white appearance-none cursor-pointer",
                "focus:outline-none focus:border-[#1CB5E0] focus:bg-[#1CB5E0]/5 focus:ring-[3px] focus:ring-[#1CB5E0]/15",
                "transition-all duration-200",
                className
            )}
            {...props}
        >
            {children}
        </select>
    )
);
GlassSelect.displayName = "GlassSelect";

// --- Step Circle Component ---
const StepCircle = ({ active, completed, number }: { active: boolean, completed: boolean, number: number }) => {
    const base = "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2";
    
    if (completed) {
        return (
            <div className={cn(base, "bg-emerald-500/20 border-emerald-500 text-emerald-400")}>
                <Check className="w-4 h-4" />
            </div>
        );
    }
    if (active) {
        return (
            <div className={cn(base, "bg-[#1CB5E0] border-[#1CB5E0] text-white shadow-[0_0_20px_rgba(28,181,224,0.3)]")}>
                {number}
            </div>
        );
    }
    return (
        <div className={cn(base, "bg-white/5 border-white/10 text-slate-500")}>
            {number}
        </div>
    );
};

// --- Enhanced AI Estimate Box Component ---
const AIEstimateBox = ({ 
    amount, 
    selectedCompany = null,
    companyAge = null,
    sicCodes = [],
    hasCharges = null,
    numberOfDirectors = 1
}: { 
    amount: number;
    selectedCompany?: any;
    companyAge?: number | null;
    sicCodes?: string[];
    hasCharges?: boolean | null;
    numberOfDirectors?: number;
}) => {
    const [displayMin, setDisplayMin] = useState(0);
    const [displayMax, setDisplayMax] = useState(0);
    const [phase, setPhase] = useState<'idle' | 'analyzing' | 'processing' | 'calculating' | 'revealing' | 'text' | 'done'>('idle');
    const [reasoning, setReasoning] = useState("");
    const [visibleWords, setVisibleWords] = useState(0);
    const [tags, setTags] = useState<string[]>([]);
    const [visibleTags, setVisibleTags] = useState(0);
    const [progressWidth, setProgressWidth] = useState(0);
    const [recommendedProduct, setRecommendedProduct] = useState<{ name: string; href: string; note?: string } | null>(null);
    const [alternativeProduct, setAlternativeProduct] = useState<{ name: string; href: string; note?: string } | null>(null);

    // Scramble effect state
    const [scrambleMin, setScrambleMin] = useState(0);
    const [scrambleMax, setScrambleMax] = useState(0);

    const { complete, completion, isLoading } = useCompletion({
        api: '/api/ai-estimate',
        streamProtocol: 'text',
    });

    const phaseLabels: Record<string, string> = {
        'idle': 'AI ESTIMATE',
        'analyzing': 'Analyzing...',
        'processing': 'Processing data...',
        'calculating': 'Calculating range...',
        'revealing': 'AI ESTIMATE',
        'text': 'AI ESTIMATE',
        'done': 'AI ESTIMATE'
    };

    // Trigger estimation on input change (debounced) - only if company selected
    useEffect(() => {
        if (amount <= 0 || !selectedCompany) return;
        
        const timer = setTimeout(() => {
            setPhase('analyzing');
            setProgressWidth(0);
            setReasoning("");
            setVisibleWords(0);
            setTags([]);
            setVisibleTags(0);
            setRecommendedProduct(null);
            setAlternativeProduct(null);
            
            // Send full data for realistic calculation
            complete(JSON.stringify({
                amount,
                companyAge,
                sicCodes,
                hasCharges,
                numberOfDirectors
            }));
        }, 300);

        return () => clearTimeout(timer);
    }, [amount, selectedCompany, companyAge, sicCodes.join(','), hasCharges, numberOfDirectors]);

    // Progress bar animation
    useEffect(() => {
        if (phase === 'idle' || phase === 'done') return;
        
        const targetProgress = {
            'analyzing': 25,
            'processing': 50,
            'calculating': 75,
            'revealing': 95,
            'text': 100
        }[phase] || 0;

        const interval = setInterval(() => {
            setProgressWidth(prev => {
                if (prev >= targetProgress) {
                    clearInterval(interval);
                    return targetProgress;
                }
                return prev + 2;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [phase]);

    // Phase transitions
    useEffect(() => {
        if (phase === 'analyzing') {
            const timer = setTimeout(() => setPhase('processing'), 800);
            return () => clearTimeout(timer);
        }
        if (phase === 'processing') {
            const timer = setTimeout(() => setPhase('calculating'), 1200);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    // Scramble animation during processing/calculating
    useEffect(() => {
        if (phase !== 'processing' && phase !== 'calculating') return;

        const interval = setInterval(() => {
            const baseMin = amount * 0.3;
            const baseMax = amount * 0.8;
            setScrambleMin(Math.round(baseMin + Math.random() * amount * 0.4));
            setScrambleMax(Math.round(baseMax + Math.random() * amount * 0.5));
        }, 40);

        return () => clearInterval(interval);
    }, [phase, amount]);

    // Parse completion when stream ends
    useEffect(() => {
        if (completion && !isLoading && (phase === 'calculating' || phase === 'processing')) {
            try {
                const data = JSON.parse(completion);
                setPhase('revealing');
                
                // Count up animation
                const duration = 500;
                const startTime = Date.now();
                const startMin = scrambleMin;
                const startMax = scrambleMax;
                const finalMin = data.min;
                const finalMax = data.max;
                
                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 3);
                    
                    setDisplayMin(Math.round(startMin + (finalMin - startMin) * ease));
                    setDisplayMax(Math.round(startMax + (finalMax - startMax) * ease));
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        setReasoning(data.reasoning || "");
                        setTags(data.tags || []);
                        setRecommendedProduct(data.recommendedProduct || null);
                        setAlternativeProduct(data.alternativeProduct || null);
                        setPhase('text');
                    }
                };
                
                requestAnimationFrame(animate);
            } catch {
                // Fallback to simple calculation
                const min = Math.round(amount * 0.5 / 1000) * 1000;
                const max = Math.round(amount * 1.0 / 1000) * 1000;
                setDisplayMin(min);
                setDisplayMax(max);
                setReasoning("Based on similar business funding patterns.");
                setTags(["Funding Amount", "UK SME Data"]);
                setPhase('done');
            }
        }
    }, [completion, isLoading, phase]);

    // Word-by-word text reveal
    useEffect(() => {
        if (phase !== 'text' || !reasoning) return;
        
        const words = reasoning.split(' ');
        if (visibleWords >= words.length) {
            setTimeout(() => setPhase('done'), 200);
            return;
        }

        const timer = setTimeout(() => {
            setVisibleWords(v => v + 1);
        }, 25);

        return () => clearTimeout(timer);
    }, [phase, visibleWords, reasoning]);

    // Tags reveal
    useEffect(() => {
        if (phase !== 'done' || visibleTags >= tags.length) return;

        const timer = setTimeout(() => {
            setVisibleTags(v => v + 1);
        }, 80);

        return () => clearTimeout(timer);
    }, [phase, visibleTags, tags.length]);

    // Show placeholder if no company selected or amount is 0
    const showPlaceholder = !selectedCompany || amount <= 0;

    if (showPlaceholder) {
        return (
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#1CB5E0]/5 to-[#D946EF]/5 p-6 my-6 opacity-70">
                {/* Top accent line - dimmer */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1CB5E0]/30 to-[#D946EF]/30 rounded-t-2xl" />
                
                {/* Badge - grayed out */}
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        AI Estimate
                    </span>
                </div>
                
                {/* Placeholder message */}
                <div className="text-center py-4">
                    <p className="text-slate-400 text-sm">
                        {!selectedCompany 
                            ? "Select a company above to see your AI-powered funding estimate"
                            : "Adjust the funding amount to calculate your estimate"
                        }
                    </p>
                    <div className="flex justify-center items-center gap-2 mt-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg border border-white/10">
                            <Building2 className="w-3 h-3" /> Company
                        </span>
                        <span className="text-white/30">+</span>
                        <span className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg border border-white/10">
                            <Banknote className="w-3 h-3" /> Amount
                        </span>
                        <span className="text-white/30">=</span>
                        <span className="flex items-center gap-1 px-2 py-1 bg-[#1CB5E0]/10 rounded-lg border border-[#1CB5E0]/20 text-[#1CB5E0]">
                            <Sparkles className="w-3 h-3" /> Estimate
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    const words = reasoning.split(' ');
    const isProcessing = phase === 'analyzing' || phase === 'processing' || phase === 'calculating';

    return (
        <div className={cn(
            "relative overflow-hidden rounded-2xl border p-6 my-6",
            "bg-gradient-to-br from-[#1CB5E0]/10 to-[#D946EF]/10",
            isProcessing ? "border-[#1CB5E0]/30 animate-[border-pulse_1s_ease-in-out_infinite]" : "border-[#1CB5E0]/20"
        )}>
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1CB5E0] to-[#D946EF]" />
            
            {/* Progress bar */}
            {isProcessing && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
                    <motion.div 
                        className="h-full bg-gradient-to-r from-[#1CB5E0] to-[#D946EF]"
                        style={{ width: `${progressWidth}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            )}
            
            {/* Badge row */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Sparkles className={cn(
                        "w-4 h-4 text-[#1CB5E0]",
                        isProcessing && "animate-spin"
                    )} />
                    <span className="text-[11px] font-bold text-[#1CB5E0] uppercase tracking-wider">
                        {phaseLabels[phase]}
                    </span>
                </div>
                {!isProcessing && phase !== 'idle' && (
                    <span className="text-[13px] text-slate-400">Based on similar businesses</span>
                )}
                {isProcessing && (
                    <span className="text-[11px] text-slate-500">Checking 200+ lenders...</span>
                )}
            </div>
            
            {/* Estimate display */}
            <div className="flex items-baseline gap-2 flex-wrap">
                {isProcessing ? (
                    // Scramble effect
                    <span className="font-heading text-3xl font-bold text-[#1CB5E0]/60 blur-[0.5px]">
                        {formatCurrency(scrambleMin)} - {formatCurrency(scrambleMax)}
                    </span>
                ) : phase === 'idle' ? (
                    // Skeleton
                    <div className="h-9 w-64 rounded-lg bg-white/5 ai-skeleton" />
                ) : (
                    // Final values
                    <motion.span 
                        className="font-heading text-3xl font-bold text-white"
                        initial={{ scale: 1 }}
                        animate={{ scale: phase === 'revealing' ? [1, 1.05, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {formatCurrency(displayMin)} - {formatCurrency(displayMax)}
                    </motion.span>
                )}
                <span className={cn(
                    "text-sm text-slate-400 transition-opacity duration-300",
                    phase === 'idle' || isProcessing ? "opacity-0" : "opacity-100"
                )}>
                    likely approval range
                </span>
            </div>
            
            {/* Reasoning text */}
            {reasoning && !isProcessing && (
                <div className="mt-3 text-sm text-slate-400 leading-relaxed">
                    {words.slice(0, visibleWords).map((word, i) => (
                        <span 
                            key={i} 
                            className="inline-block mr-1 animate-[word-reveal_0.2s_ease-out_forwards]"
                        >
                            {word}
                        </span>
                    ))}
                    {phase === 'text' && visibleWords < words.length && (
                        <span className="inline-block text-[#1CB5E0] animate-[blink_0.6s_infinite]">|</span>
                    )}
                </div>
            )}
            
            {/* Tags */}
            {tags.length > 0 && phase === 'done' && (
                <div className="flex flex-wrap gap-2 mt-4">
                    {tags.slice(0, visibleTags).map((tag, i) => (
                        <span 
                            key={i}
                            className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-bold text-slate-400 animate-[word-reveal_0.2s_ease-out_forwards]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
            
            {/* Product Recommendation */}
            {phase === 'done' && recommendedProduct && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-5 space-y-3"
                >
                    {/* Primary Product */}
                    <a 
                        href={recommendedProduct.href} 
                        className="flex items-center justify-between p-3 rounded-xl bg-[#1CB5E0]/10 border border-[#1CB5E0]/20 hover:bg-[#1CB5E0]/15 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#1CB5E0]/20 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-[#1CB5E0]" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-[#1CB5E0] uppercase tracking-wide">Recommended</div>
                                <div className="text-sm font-medium text-white">{recommendedProduct.name}</div>
                            </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#1CB5E0] group-hover:translate-x-1 transition-transform" />
                    </a>
                    
                    {/* Alternative Product (for higher amounts) */}
                    {alternativeProduct && alternativeProduct.note && (
                        <a 
                            href={alternativeProduct.href} 
                            className="flex items-center justify-between p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 hover:bg-amber-500/10 transition-all group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                    <Shield className="w-4 h-4 text-amber-400" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wide">{alternativeProduct.note}</div>
                                    <div className="text-sm font-medium text-white">{alternativeProduct.name}</div>
                                </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                        </a>
                    )}
                </motion.div>
            )}
            
            {/* Disclaimer */}
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-500">
                Indicative estimate only. Actual funding depends on business assessment.
            </div>
        </div>
    );
};

// --- Main Form Component ---
export default function CheckEligibilityForm() {
    const [step, setStep] = useState<1 | 2 | 3 | 'SUCCESS'>(1);
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<any>(null);
    const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
    const [officers, setOfficers] = useState<Officer[]>([]);
    const [selectedDirector, setSelectedDirector] = useState<Officer | null>(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);
    const [referenceId, setReferenceId] = useState("");

    // Checkbox states (native)
    const [privacyChecked, setPrivacyChecked] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);
    const [finalConsentChecked, setFinalConsentChecked] = useState(false);
    const [soleTraderChecked, setSoleTraderChecked] = useState(false);

    const form = useForm<FormValues>({
        defaultValues: {
            company_name: "", 
            borrow_amount: "50000", 
            if_not_company: false,
            privacy_policy: false, 
            terms_of_business: false,
            purpose_of_funding: "", 
            urgency: "", 
            annual_revenue: "",
            final_consent: false,
            first_name: "",
            last_name: "",
            contact_number: "",
            email_address: "",
        },
        mode: "onChange"
    });

    const companyName = form.watch("company_name");
    const borrowAmount = parseInt(form.watch("borrow_amount")) || 0;

    // Calculate company age for AI estimate (null if no data available)
    const companyAge = companyProfile?.date_of_creation 
        ? Math.floor((Date.now() - new Date(companyProfile.date_of_creation).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
        : null;

    // Company Search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (companyName && companyName.length > 2 && !selectedCompany && !soleTraderChecked) {
                setIsSearching(true);
                try {
                    const res = await fetch(`/api/companies-house/search?q=${encodeURIComponent(companyName)}`);
                    const data = await res.json();
                    setSearchResults(data.items || []);
                    setShowResults(true);
                } catch { } finally { setIsSearching(false); }
            } else { 
                setSearchResults([]); 
                setShowResults(false); 
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [companyName, selectedCompany, soleTraderChecked]);

    // Fetch company profile and officers when company is selected
    const fetchCompanyData = useCallback(async (companyNumber: string) => {
        setIsLoadingProfile(true);
        try {
            // Parallel fetch
            const [profileRes, officersRes] = await Promise.all([
                fetch(`/api/companies-house/profile?number=${companyNumber}`),
                fetch(`/api/companies-house/officers?number=${companyNumber}`)
            ]);
            
            const profile = await profileRes.json();
            const officersData = await officersRes.json();
            
            setCompanyProfile(profile);
            setOfficers(officersData.items || []);

            // Auto-fill form fields
            const address = profile.registered_office_address || {};
            form.setValue("company_address", [address.address_line_1, address.address_line_2].filter(Boolean).join(', '));
            form.setValue("city", address.locality || '');
            form.setValue("postcode", address.postal_code || '');
            form.setValue("incorporation_date", profile.date_of_creation || '');
            
            // If only one director, auto-select
            if (officersData.items?.length === 1) {
                const director = officersData.items[0];
                setSelectedDirector(director);
                const [lastName, firstName] = director.name.split(', ');
                form.setValue("first_name", firstName || '');
                form.setValue("last_name", lastName || '');
            }
        } catch (error) {
            console.error("Failed to fetch company data:", error);
        } finally {
            setIsLoadingProfile(false);
        }
    }, [form]);

    const handleSelectCompany = (company: any) => {
        setSelectedCompany(company);
        form.setValue("company_name", company.title);
        form.setValue("company_number", company.company_number);
        setShowResults(false);
        
        // Fetch full profile
        if (company.company_number) {
            fetchCompanyData(company.company_number);
        }
    };

    const handleSelectDirector = (director: Officer) => {
        setSelectedDirector(director);
        const [lastName, firstName] = director.name.split(', ');
        form.setValue("first_name", firstName || '');
        form.setValue("last_name", lastName || '');
    };

    const generateReferenceId = () => `ALF-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Step 1 Submit
    const handleStep1Submit = async () => {
        const isValid = await form.trigger(["company_name", "borrow_amount", "first_name", "last_name", "contact_number", "email_address"]);
        
        if (!isValid) {
            toast.error("Please fill all required fields");
            return;
        }
        
        if (!privacyChecked || !termsChecked) {
            toast.error("Please accept the privacy policy and terms of business");
            return;
        }

        setLoading(true);
        const newRefId = generateReferenceId();
        setReferenceId(newRefId);

        try {
            const values = form.getValues();
            await fetch("/api/send-enquiry-mail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...values,
                    sic_codes: companyProfile?.sic_codes?.join(', ') || '',
                    has_charges: companyProfile?.has_charges || false,
                    privacy_policy: privacyChecked,
                    terms_of_business: termsChecked,
                    reference_id: newRefId, 
                    submission_type: "PARTIAL",
                    ai_estimate_min: Math.round(borrowAmount * 0.5 / 1000),
                    ai_estimate_max: Math.round(borrowAmount * 1.0 / 1000)
                }),
            });
            setStep(2);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch { 
            toast.error("Network error. Please try again."); 
        } finally { 
            setLoading(false); 
        }
    };

    // Step 2 Submit
    const handleStep2Submit = async () => {
        const isValid = await form.trigger(["purpose_of_funding", "urgency"]);
        if (!isValid) {
            toast.error("Please fill all required fields");
            return;
        }
        setStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Final Submit
    const handleFinalSubmit = async () => {
        if (!finalConsentChecked) {
            toast.error("Please confirm your consent");
            return;
        }

        setLoading(true);
        try {
            const values = form.getValues();
            const res = await fetch("/api/send-enquiry-mail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...values,
                    sic_codes: companyProfile?.sic_codes?.join(', ') || '',
                    has_charges: companyProfile?.has_charges || false,
                    privacy_policy: privacyChecked,
                    terms_of_business: termsChecked,
                    final_consent: finalConsentChecked,
                    reference_id: referenceId, 
                    submission_type: "COMPLETE",
                    ai_estimate_min: Math.round(borrowAmount * 0.5 / 1000),
                    ai_estimate_max: Math.round(borrowAmount * 1.0 / 1000)
                }),
            });
            if (res.ok) { 
                setStep('SUCCESS'); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
            } else { 
                toast.error("Submission failed. Please try again."); 
            }
        } catch { 
            toast.error("Something went wrong."); 
        } finally { 
            setLoading(false); 
        }
    };

    // Success View
    if (step === 'SUCCESS') {
        return (
            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-10 lg:p-16 text-center">
                <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 bg-[#1CB5E0] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(28,181,224,0.3)]"
                >
                    <Check className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="font-heading text-3xl text-white mb-3">Application Received!</h2>
                <p className="text-slate-400 max-w-md mx-auto mb-8">
                    We'll be in touch within 2 hours during business hours.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-xl py-3 px-6 inline-block mb-8">
                    <span className="text-sm text-slate-400">Your reference: </span>
                    <span className="font-mono font-bold text-white">{referenceId}</span>
                </div>
                <div className="max-w-sm mx-auto text-left space-y-4">
                    {["We'll review your details", "Match you with lenders", "Contact you to discuss options"].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                            <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <Check className="w-3 h-3 text-emerald-400" />
                            </div>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 lg:p-10 shadow-[0_25px_50px_rgba(0,0,0,0.25)] relative overflow-hidden">
            {/* Secure badge */}
            <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-medium">
                <Shield className="w-3.5 h-3.5" />
                Secure Form
            </div>

            {/* Header */}
            <div className="mb-8">
                <h2 className="font-heading text-2xl text-white mb-2">Tell Us About Your Business</h2>
                <p className="text-[15px] text-slate-400">Complete this quick form to see your options</p>
            </div>

            {/* Step Progress */}
            <div className="relative flex justify-between items-center mb-8">
                <div className="absolute top-4 left-4 right-4 h-[2px] bg-white/10" />
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2 relative z-10">
                        <StepCircle active={step === s} completed={typeof step === 'number' && step > s} number={s} />
                        <span className={cn(
                            "text-[11px] font-medium",
                            step >= s ? "text-white" : "text-slate-500"
                        )}>
                            {s === 1 ? "Business" : s === 2 ? "Contact" : "Review"}
                        </span>
                    </div>
                ))}
            </div>

            {/* Form Content */}
            <div className="space-y-6">
                <AnimatePresence mode="wait">
                    {/* STEP 1 */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            {/* Company Name */}
                            <div className="relative">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-[13px] font-medium text-slate-200">
                                        Company Name <span className="text-[#1CB5E0]">*</span>
                                    </label>
                                    {selectedCompany && (
                                        <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                            <CheckCircle2 className="w-2.5 h-2.5" /> VERIFIED
                                        </span>
                                    )}
                                </div>
                                <div className="relative">
                                    <GlassInput
                                        placeholder="Start typing your company name..."
                                        value={companyName}
                                        disabled={soleTraderChecked}
                                        onChange={(e) => {
                                            form.setValue("company_name", e.target.value);
                                            if (selectedCompany) {
                                                setSelectedCompany(null);
                                                setCompanyProfile(null);
                                                setOfficers([]);
                                                setSelectedDirector(null);
                                            }
                                        }}
                                        className={selectedCompany ? "border-emerald-500/30 bg-emerald-500/5" : ""}
                                    />
                                    {isSearching && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-[#1CB5E0]" />}
                                    {!isSearching && !selectedCompany && <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />}
                                    {selectedCompany && <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />}
                                </div>

                                {/* Search Results Dropdown */}
                                {showResults && searchResults.length > 0 && (
                                    <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
                                        {searchResults.map((company, idx) => (
                                            <div
                                                key={idx}
                                                className="p-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0"
                                                onClick={() => handleSelectCompany(company)}
                                            >
                                                <div className="font-bold text-sm text-white truncate">{company.title}</div>
                                                <div className="text-[10px] text-slate-400 truncate">{company.company_number} • {company.address_snippet}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Company Details Generator */}
                            {selectedCompany && (
                                <CompanyDetailsGenerator
                                    company={selectedCompany}
                                    profile={companyProfile}
                                    officers={officers}
                                    isLoading={isLoadingProfile}
                                    onSelectDirector={handleSelectDirector}
                                    selectedDirector={selectedDirector}
                                />
                            )}

                            {/* Sole Trader Checkbox */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="sole-trader"
                                    checked={soleTraderChecked}
                                    onChange={(e) => {
                                        setSoleTraderChecked(e.target.checked);
                                        form.setValue("if_not_company", e.target.checked);
                                        if (e.target.checked) {
                                            setSelectedCompany(null);
                                            setCompanyProfile(null);
                                            setOfficers([]);
                                        }
                                    }}
                                    className="w-5 h-5 accent-[#1CB5E0] cursor-pointer"
                                    style={{ position: 'relative', zIndex: 9999 }}
                                />
                                <label htmlFor="sole-trader" className="text-sm text-slate-300 cursor-pointer">
                                    I am a sole trader / not a limited company
                                </label>
                            </div>

                            {/* Funding Amount */}
                            <div>
                                <label className="block text-[13px] font-medium text-slate-200 mb-2">
                                    How much would you like to borrow? <span className="text-[#1CB5E0]">*</span>
                                </label>
                                <div className="relative mb-4">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">£</span>
                                    <GlassInput
                                        type="text"
                                        value={borrowAmount.toLocaleString()}
                                        className="pl-9 font-mono"
                                        readOnly
                                    />
                                </div>
                                <input
                                    type="range"
                                    min="10000"
                                    max="500000"
                                    step="5000"
                                    value={borrowAmount}
                                    onChange={(e) => form.setValue("borrow_amount", e.target.value)}
                                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#1CB5E0]"
                                />
                                <div className="flex justify-between text-xs text-slate-500 mt-2">
                                    <span>£10,000</span>
                                    <span>£500,000+</span>
                                </div>
                            </div>

                            {/* AI Estimate with company data */}
                            <AIEstimateBox 
                                amount={borrowAmount}
                                selectedCompany={selectedCompany || soleTraderChecked}
                                companyAge={companyAge}
                                sicCodes={companyProfile?.sic_codes || []}
                                hasCharges={companyProfile?.has_charges ?? null}
                                numberOfDirectors={officers.length || 1}
                            />

                            {/* Lead Score Visualization */}
                            <LeadScoreVisualization
                                companyAge={companyAge}
                                hasCharges={companyProfile?.has_charges ?? null}
                                sicCodes={companyProfile?.sic_codes || []}
                                numberOfDirectors={officers.length || 1}
                                companyStatus={companyProfile?.company_status || null}
                                borrowAmount={borrowAmount}
                            />

                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[13px] font-medium text-slate-200 mb-2">
                                        First Name <span className="text-[#1CB5E0]">*</span>
                                    </label>
                                    <GlassInput
                                        placeholder="John"
                                        {...form.register("first_name")}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[13px] font-medium text-slate-200 mb-2">
                                        Last Name <span className="text-[#1CB5E0]">*</span>
                                    </label>
                                    <GlassInput
                                        placeholder="Smith"
                                        {...form.register("last_name")}
                                    />
                                </div>
                            </div>

                            {/* Contact Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[13px] font-medium text-slate-200 mb-2">
                                        Contact Number <span className="text-[#1CB5E0]">*</span>
                                    </label>
                                    <GlassInput
                                        type="tel"
                                        placeholder="07XXX XXXXXX"
                                        {...form.register("contact_number")}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[13px] font-medium text-slate-200 mb-2">
                                        Email Address <span className="text-[#1CB5E0]">*</span>
                                    </label>
                                    <GlassInput
                                        type="email"
                                        placeholder="john@company.co.uk"
                                        {...form.register("email_address")}
                                    />
                                </div>
                            </div>

                            {/* Consent Checkboxes */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="privacy-policy"
                                        checked={privacyChecked}
                                        onChange={(e) => setPrivacyChecked(e.target.checked)}
                                        className="w-5 h-5 accent-[#1CB5E0] cursor-pointer"
                                        style={{ position: 'relative', zIndex: 9999 }}
                                    />
                                    <label htmlFor="privacy-policy" className="text-sm text-slate-300 cursor-pointer">
                                        I have read and accept the <Link href="/privacy" className="text-[#1CB5E0] hover:underline">privacy policy</Link>
                                    </label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="terms-business"
                                        checked={termsChecked}
                                        onChange={(e) => setTermsChecked(e.target.checked)}
                                        className="w-5 h-5 accent-[#1CB5E0] cursor-pointer"
                                        style={{ position: 'relative', zIndex: 9999 }}
                                    />
                                    <label htmlFor="terms-business" className="text-sm text-slate-300 cursor-pointer">
                                        I have read and accept the <Link href="/terms" className="text-[#1CB5E0] hover:underline">terms of business</Link>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="button"
                                onClick={handleStep1Submit}
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-[#1CB5E0] to-[#0ea5e9] text-white font-semibold rounded-xl shadow-[0_4px_20px_rgba(28,181,224,0.3)] hover:shadow-[0_8px_30px_rgba(28,181,224,0.4)] hover:-translate-y-[2px] active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2.5"
                            >
                                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : null}
                                Check My Eligibility
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            {/* Security Note */}
                            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                                <Lock className="w-4 h-4 opacity-60" />
                                Your information is encrypted and secure
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-white">A Few More Details</h3>
                                <p className="text-sm text-slate-400">Help us find the best options for you</p>
                            </div>

                            {/* Purpose of Funding */}
                            <div>
                                <label className="block text-[13px] font-medium text-slate-200 mb-2">
                                    What do you need funding for? <span className="text-[#1CB5E0]">*</span>
                                </label>
                                <GlassSelect {...form.register("purpose_of_funding")}>
                                    <option value="" className="bg-slate-900">Select purpose...</option>
                                    {["Working capital", "Stock/Inventory", "Equipment", "Property", "Expansion", "Refinancing", "Other"].map(opt => (
                                        <option key={opt} value={opt} className="bg-slate-900">{opt}</option>
                                    ))}
                                </GlassSelect>
                            </div>

                            {/* Urgency */}
                            <div>
                                <label className="block text-[13px] font-medium text-slate-200 mb-2">
                                    How soon do you need funding? <span className="text-[#1CB5E0]">*</span>
                                </label>
                                <div className="space-y-2">
                                    {["Immediately (1 week)", "Soon (1 month)", "Planning ahead (1-3 months)", "Just exploring"].map(opt => (
                                        <div
                                            key={opt}
                                            onClick={() => form.setValue("urgency", opt)}
                                            className={cn(
                                                "p-4 rounded-xl border cursor-pointer transition-all",
                                                form.watch("urgency") === opt 
                                                    ? "border-[#1CB5E0] bg-[#1CB5E0]/10" 
                                                    : "border-white/10 bg-white/5 hover:border-white/20"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                                                    form.watch("urgency") === opt ? "border-[#1CB5E0]" : "border-slate-500"
                                                )}>
                                                    {form.watch("urgency") === opt && (
                                                        <div className="w-2 h-2 rounded-full bg-[#1CB5E0]" />
                                                    )}
                                                </div>
                                                <span className="text-sm text-white">{opt}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Annual Revenue */}
                            <div>
                                <label className="block text-[13px] font-medium text-slate-200 mb-2">
                                    Annual Revenue (Optional)
                                </label>
                                <GlassSelect {...form.register("annual_revenue")}>
                                    <option value="" className="bg-slate-900">Select range...</option>
                                    {["Under £50k", "£50k-£100k", "£100k-£250k", "£250k-£500k", "£500k-£1M", "Over £1M"].map(opt => (
                                        <option key={opt} value={opt} className="bg-slate-900">{opt}</option>
                                    ))}
                                </GlassSelect>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="flex-1 py-3.5 border border-white/20 text-white rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleStep2Submit}
                                    className="flex-1 py-3.5 bg-gradient-to-r from-[#1CB5E0] to-[#0ea5e9] text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                    Continue <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-white">Review Your Application</h3>
                                <p className="text-sm text-slate-400">Confirm your details are correct</p>
                            </div>

                            {/* Summary Cards */}
                            <div className="space-y-4">
                                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-bold text-sm text-white">Business</span>
                                        <button type="button" onClick={() => setStep(1)} className="text-xs text-[#1CB5E0] flex items-center gap-1 hover:underline">
                                            <Edit2 className="w-3 h-3" /> Edit
                                        </button>
                                    </div>
                                    <div className="text-sm text-slate-400">{form.getValues().company_name || "Not provided"}</div>
                                    {companyProfile && (
                                        <div className="text-xs text-slate-500 mt-1">
                                            {companyProfile.sic_codes?.length ? `SIC: ${companyProfile.sic_codes[0]}` : ''}{' '}
                                            • {companyAge} years trading
                                        </div>
                                    )}
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-bold text-sm text-white">Funding</span>
                                        <button type="button" onClick={() => setStep(2)} className="text-xs text-[#1CB5E0] flex items-center gap-1 hover:underline">
                                            <Edit2 className="w-3 h-3" /> Edit
                                        </button>
                                    </div>
                                    <div className="text-sm text-slate-400">
                                        £{parseInt(form.getValues().borrow_amount).toLocaleString()} • {form.getValues().purpose_of_funding || "Not selected"}
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-bold text-sm text-white">Contact</span>
                                        <button type="button" onClick={() => setStep(1)} className="text-xs text-[#1CB5E0] flex items-center gap-1 hover:underline">
                                            <Edit2 className="w-3 h-3" /> Edit
                                        </button>
                                    </div>
                                    <div className="text-sm text-slate-400">
                                        {form.getValues().first_name} {form.getValues().last_name} • {form.getValues().email_address}
                                    </div>
                                </div>
                            </div>

                            {/* Final Consent */}
                            <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                                <input
                                    type="checkbox"
                                    id="final-consent"
                                    checked={finalConsentChecked}
                                    onChange={(e) => setFinalConsentChecked(e.target.checked)}
                                    className="w-5 h-5 accent-[#1CB5E0] cursor-pointer mt-0.5"
                                    style={{ position: 'relative', zIndex: 9999 }}
                                />
                                <label htmlFor="final-consent" className="text-sm text-slate-300 cursor-pointer leading-relaxed">
                                    I confirm the information above is accurate and I consent to Alpha Funding contacting me about funding options.
                                </label>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="flex-1 py-3.5 border border-white/20 text-white rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleFinalSubmit}
                                    disabled={loading}
                                    className="flex-1 py-3.5 bg-gradient-to-r from-[#1CB5E0] to-[#0ea5e9] text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Submit Application"}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}