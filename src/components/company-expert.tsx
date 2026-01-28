
"use client"

import React, { useEffect, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Sparkles, Loader2, Building2, User, CheckCircle2 } from "lucide-react";


interface CompanyExpertProps {
    company: any;
    onUpdateFields: (data: any) => void;
    isDark?: boolean;
}

export function CompanyExpertSection({ company, onUpdateFields, isDark = false }: CompanyExpertProps) {
    const [hasTriggered, setHasTriggered] = useState(false);
    const [isFetchingDetail, setIsFetchingDetail] = useState(false);
    const [intel, setIntel] = useState<any>(null);

    const chat = useChat() as any;
    const { messages, append, isLoading } = chat;

    useEffect(() => {
        async function fetchFullDetails() {
            if (!company || hasTriggered) return;

            setHasTriggered(true);
            setIsFetchingDetail(true);

            try {
                const response = await fetch(`/api/companies-house/company/${company.company_number}`);
                if (response.ok) {
                    const details = await response.json();

                    // 1. Filter only for directors/active decision makers
                    const decisionMakers = (details.officers || []).filter((o: any) =>
                        (o.officer_role?.toLowerCase().includes('director') ||
                            o.officer_role?.toLowerCase().includes('member')) &&
                        !o.resigned_on
                    );

                    // 2. Extracts SIC codes and nature of business
                    const sicCodes = details.sic_codes || [];
                    const nature = sicCodes.length > 0 ? `Codes: ${sicCodes.join(', ')}` : (details.type || "Private Limited Company");

                    // 3. Extracts Address
                    const addr = details.registered_office_address || {};
                    const fullAddressLines = [addr.address_line_1, addr.address_line_2].filter(Boolean).join(', ');

                    // 4. Extract Risk Metadata (Internal)
                    const activeCharges = (details.charges || []).filter((c: any) => c.status === 'outstanding').length;
                    const hasInsolvency = !!details.insolvency;

                    // 5. Extract first primary director for pre-fill
                    const primaryDirector = decisionMakers[0];
                    let directorNames = { first: "", last: "" };

                    if (primaryDirector && primaryDirector.name) {
                        const parts = primaryDirector.name.split(',').map((p: string) => p.trim());
                        if (parts.length >= 2) {
                            directorNames.last = parts[0];
                            directorNames.first = parts[1].split(' ')[0];
                        }
                    }

                    const intelData = {
                        charges_count: activeCharges,
                        has_insolvency: hasInsolvency,
                        psc_count: (details.pscs || []).length,
                        is_active: details.company_status === 'active'
                    };
                    setIntel(intelData);

                    onUpdateFields({
                        company_number: company.company_number,
                        nature_of_business: nature,
                        incorporation_date: details.date_of_creation || "",
                        directors: decisionMakers,
                        address: {
                            line1: fullAddressLines,
                            city: addr.locality || "",
                            postcode: addr.postal_code || ""
                        },
                        internal_risk: {
                            ...intelData,
                            sic_codes: sicCodes
                        },
                        prefill: {
                            first_name: directorNames.first,
                            sur_name: directorNames.last
                        }
                    });

                    if (append) {
                        const directorSummary = decisionMakers.length > 0
                            ? `Directors found: ${decisionMakers.map((d: any) => d.name).join(', ')}.`
                            : 'No active directors listed.';

                        const pscSummary = (details.pscs || []).length > 0
                            ? `Ownership: ${(details.pscs || []).map((p: any) => `${p.name} (${(p.natures_of_control || []).join(', ')})`).join('; ')}.`
                            : '';

                        append({
                            role: 'user',
                            content: `Analyzed company: ${details.company_name}. Status: ${details.company_status}. Incorporated on ${details.date_of_creation}. ${directorSummary} ${pscSummary} Industry SIC: ${sicCodes.join(', ')}.

                            TASK: 
                            1. CONVERT SIC codes into a human-readable industry name (e.g. "Software Development" instead of 62010).
                            2. RECOMMEND A FINANCIAL PRODUCT clearly (e.g. Asset Finance, Invoice Finance, R&D tax credits, or Working Capital Loan). BOLD the product name.
                            3. Summarize health (charges/insolvency) and ownership structure.
                            
                            IMPORTANT: Your response MUST start with exact format:
                            INDUSTRY: [Industry Name]
                            [Analysis continues...]`
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching CH details:", error);
            } finally {
                setIsFetchingDetail(false);
            }
        }

        fetchFullDetails();
    }, [company, hasTriggered, append, onUpdateFields]);

    // Extract Industry Name from AI Response if available
    const analysisMessage = messages?.find((m: any) => m.role === 'assistant')?.content;

    useEffect(() => {
        if (analysisMessage) {
            // More robust match for "INDUSTRY: [Name]"
            const match = analysisMessage.match(/^INDUSTRY:\s*(.+)$/m);
            if (match && match[1]) {
                const name = match[1].trim();
                // Avoid capturing the rest of the message if it's all on one line
                const cleanName = name.split('\n')[0].trim();
                if (cleanName && cleanName.length < 60 && !cleanName.match(/^\d+$/)) {
                    onUpdateFields({ inferred_industry: cleanName });
                }
            }
        }
    }, [analysisMessage, onUpdateFields]);

    if (!company) return null;

    const textColor = isDark ? "text-white" : "text-slate-900";
    const subTextColor = isDark ? "text-slate-300" : "text-slate-500";
    const cardBg = isDark ? "bg-white/[0.04]" : "bg-blue-50/20";
    const boxBg = isDark ? "bg-white/[0.06]" : "bg-white/60";

    return (
        <Card className={`border-[#1CB5E0]/30 ${cardBg} overflow-hidden mt-4 animate-in fade-in slide-in-from-top-4 duration-500 backdrop-blur-md`}>
            <div className={`bg-[#1CB5E0]/10 p-2 flex items-center justify-between border-b border-[#1CB5E0]/20`}>
                <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#1CB5E0]" />
                    <span className="text-[10px] font-bold text-[#1CB5E0] uppercase tracking-wider">Alpha Intelligence</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                    <span className="text-[10px] text-green-500 font-bold uppercase tracking-tighter">Live CH Link</span>
                </div>
            </div>
            <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex gap-3 flex-grow">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${isDark ? 'bg-white/10' : 'bg-white'} shadow-sm flex items-center justify-center border border-white/10`}>
                            {isFetchingDetail || isLoading ? (
                                <Loader2 className="w-6 h-6 text-[#1CB5E0] animate-spin" />
                            ) : (
                                <ShieldCheck className="w-6 h-6 text-[#1CB5E0]" />
                            )}
                        </div>
                        <div className="flex-grow">
                            <h4 className={`font-bold ${textColor} leading-tight text-sm`}>{company.title}</h4>
                            <p className={`text-[11px] ${subTextColor} font-mono mt-0.5`}>Reg: {company.company_number}</p>

                            {/* Intelligence Badges */}
                            {intel && !isFetchingDetail && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold border ${intel.has_insolvency ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-green-500/10 border-green-500/30 text-green-500'}`}>
                                        <Building2 className="w-2.5 h-2.5" />
                                        {intel.has_insolvency ? 'INSOLVENCY RISK' : 'HEALTH: CLEAR'}
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-500/10 border border-blue-500/30 text-blue-400 uppercase">
                                        <User className="w-2.5 h-2.5" />
                                        {intel.psc_count} Major Owner(s)
                                    </div>
                                    {intel.charges_count > 0 && (
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 border border-amber-500/30 text-amber-500 uppercase">
                                            {intel.charges_count} Active Charge(s)
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:w-full mt-1">
                        <div className={`text-[11px] ${isDark ? 'text-slate-200' : 'text-slate-600'} ${boxBg} p-3 rounded-lg border border-[#1CB5E0]/20 min-h-[50px] relative shadow-inner`}>
                            {isFetchingDetail ? (
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-[#1CB5E0] font-bold animate-pulse">
                                        <Loader2 className="w-3 h-3 animate-spin" /> Synchronizing registrar data...
                                    </div>
                                    <div className="h-2 w-2/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                                </div>
                            ) : isLoading ? (
                                <div className="flex items-center gap-2 italic text-[#1CB5E0] font-medium">
                                    <Sparkles className="w-3 h-3 animate-pulse" /> Analyzing business footprint & ownership...
                                </div>
                            ) : (
                                <div className="leading-relaxed">
                                    {analysisMessage ? (
                                        <div className="whitespace-pre-line">
                                            {analysisMessage.replace(/INDUSTRY:.*?\n/, '').trim()}
                                        </div>
                                    ) : (
                                        <span className="text-green-500 font-bold flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" /> Secure intelligence link established. High eligibility detected.
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}


