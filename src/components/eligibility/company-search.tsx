"use client";

import React, { useState, useEffect } from 'react';
import { Search, Building2, Loader2, CheckCircle2, MapPin } from 'lucide-react';
import { searchCompanies, getCompanyProfile } from '@/lib/companies-house';
import { CompanyData } from '@/types/eligibility';

interface CompanySearchProps {
    onSelect: (company: CompanyData) => void;
    selectedCompany: CompanyData | null;
}

export function CompanySearch({ onSelect, selectedCompany }: CompanySearchProps) {
    const [query, setQuery] = useState(selectedCompany?.companyName || '');
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length > 2 && !selectedCompany) {
                setIsLoading(true);
                try {
                    const data = await searchCompanies(query);
                    setResults(data.items || []);
                    setShowDropdown(true);
                } catch (error) {
                    console.error('Search failed', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults([]);
                setShowDropdown(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query, selectedCompany]);

    const handleSelect = async (item: any) => {
        setQuery(item.title);
        setShowDropdown(false);
        setIsLoading(true);

        try {
            const profile = await getCompanyProfile(item.company_number);
            onSelect({
                companyName: profile.company_name,
                companyNumber: profile.company_number,
                incorporationDate: profile.date_of_creation,
                sicCodes: profile.sic_codes,
                status: profile.company_status,
                jurisdiction: profile.jurisdiction
            });
        } catch (error) {
            console.error('Failed to fetch profile', error);
            // Fallback to basic data from search
            onSelect({
                companyName: item.title,
                companyNumber: item.company_number,
                status: item.company_status
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
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
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-[#1CB5E0]" /> : <Building2 className="w-4 h-4" />}
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        if (selectedCompany) onSelect(null as any);
                    }}
                    placeholder="Search your company..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#1CB5E0]/50 focus:bg-white/[0.05] transition-all"
                />
            </div>

            {showDropdown && results.length > 0 && (
                <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-[#030f42]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl max-h-60 overflow-y-auto scrollbar-hide animate-in fade-in slide-in-from-top-2 duration-200">
                    {results.map((item, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleSelect(item)}
                            className="p-4 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0 transition-colors group"
                        >
                            <div className="font-bold text-sm text-white group-hover:text-[#1CB5E0] transition-colors truncate">
                                {item.title}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${item.company_status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                    {item.company_status}
                                </span>
                                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                    <MapPin className="w-2.5 h-2.5" />
                                    {item.address_snippet}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
