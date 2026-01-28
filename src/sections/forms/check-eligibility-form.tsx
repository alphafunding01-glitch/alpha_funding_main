"use client"

import Link from "next/link"
import React, { useState, useEffect } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Loader2, Search, Building2, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CompanyExpertSection } from "@/components/company-expert"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

const formSchema = z.object({
    company_name: z.string().min(1, "Company name is required"),
    company_number: z.string().optional(),
    nature_of_business: z.string().optional(),
    incorporation_date: z.string().optional(),
    if_not_company: z.boolean().default(false).optional(),
    borrow_amount: z.string(),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    contact_number: z.string().min(1, "Phone number is required"),
    email_address: z.string().email("Invalid email address"),
    privacy_policy: z.boolean().refine(val => val === true, {
        message: "You must accept the privacy policy"
    }),
    terms_of_business: z.boolean().refine(val => val === true, {
        message: "You must accept the terms of business"
    })
});

export default function CheckEligibilityForm() {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<any>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company_name: "",
            company_number: "",
            nature_of_business: "",
            incorporation_date: "",
            if_not_company: false,
            privacy_policy: false,
            terms_of_business: false
        }
    })

    const companyName = form.watch("company_name");
    const isNotCompany = form.watch("if_not_company");

    // Companies House Search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (companyName && companyName.length > 2 && !selectedCompany && !isNotCompany) {
                setIsSearching(true);
                try {
                    const res = await fetch(`/api/companies-house/search?q=${encodeURIComponent(companyName)}`);
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
    }, [companyName, selectedCompany, isNotCompany]);

    const handleSelectCompany = (company: any) => {
        setSelectedCompany(company);
        form.setValue("company_name", company.title);
        form.setValue("company_number", company.company_number);
        setShowResults(false);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            const res = await fetch("/api/send-enquiry-mail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                toast.success("✅ Application submitted! We'll be in touch shortly.");
                form.reset();
                setSelectedCompany(null);
            } else {
                toast.error(data.error || "❌ Submission failed. Please try again.");
            }
        } catch (error) {
            toast.error("❌ Something went wrong. Please check your connection.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="w-full shadow-lg border-slate-200">
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto">

                        <div className="relative">
                            <FormField
                                control={form.control}
                                name="company_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between items-center">
                                            <FormLabel className="text-slate-700 font-semibold text-base">Company Name</FormLabel>
                                            {selectedCompany && (
                                                <span className="text-xs text-green-600 flex items-center gap-1 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                                                    <CheckCircle2 className="w-3 h-3" /> Verified by Companies House
                                                </span>
                                            )}
                                        </div>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    {...field}
                                                    placeholder="Start typing your company name..."
                                                    className={cn(
                                                        "h-12 border-slate-200 focus:ring-[#1CB5E0] transition-all",
                                                        selectedCompany && "border-green-200 bg-green-50/10 pr-10"
                                                    )}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        if (selectedCompany) setSelectedCompany(null);
                                                    }}
                                                    disabled={isNotCompany}
                                                />
                                                {isSearching && (
                                                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-slate-400" />
                                                )}
                                                {!isSearching && !selectedCompany && (
                                                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                )}
                                                {selectedCompany && (
                                                    <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Search Results Dropdown */}
                            {showResults && searchResults.length > 0 && (
                                <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto overflow-x-hidden animate-in fade-in slide-in-from-top-2">
                                    {searchResults.map((company, idx) => (
                                        <div
                                            key={idx}
                                            className="p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0 transition-colors"
                                            onClick={() => handleSelectCompany(company)}
                                        >
                                            <div className="font-bold text-slate-900 truncate">{company.title}</div>
                                            <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                                                <span className="bg-slate-100 px-1.5 py-0.5 rounded font-mono uppercase">
                                                    {company.company_number}
                                                </span>
                                                <span className="truncate">{company.address_snippet}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedCompany && (
                                <CompanyExpertSection
                                    company={selectedCompany}
                                    onUpdateFields={(data) => {
                                        if (data.company_number) form.setValue("company_number", data.company_number);
                                        if (data.nature_of_business) form.setValue("nature_of_business", data.nature_of_business);
                                        if (data.incorporation_date) form.setValue("incorporation_date", data.incorporation_date);
                                    }}
                                />
                            )}
                        </div>

                        <FormField
                            control={form.control}
                            name="if_not_company"
                            render={({ field }) => (
                                <FormItem
                                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-slate-100 p-4 bg-slate-50/50">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-sm font-medium text-slate-600">Tick here if not a Company (Sole Trader / Freelance)</FormLabel>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="borrow_amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700 font-semibold text-base">How much would you like to borrow?</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">£</span>
                                            <Input
                                                placeholder="e.g. 50,000"
                                                type="number"
                                                className="h-12 pl-7 border-slate-200"
                                                {...field} />
                                        </div>
                                    </FormControl>
                                    <FormDescription className="text-xs font-medium text-[#1CB5E0]">Min: £10,000 | Max: £5,000,000</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-6">
                                <FormField
                                    control={form.control}
                                    name="first_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-700 font-semibold">First Name</FormLabel>
                                            <FormControl>
                                                <Input className="h-11 border-slate-200" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="col-span-6">
                                <FormField
                                    control={form.control}
                                    name="last_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-700 font-semibold">Last Name</FormLabel>
                                            <FormControl>
                                                <Input className="h-11 border-slate-200" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="contact_number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700 font-semibold">Contact Number</FormLabel>
                                    <FormControl>
                                        <Input className="h-11 border-slate-200" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email_address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700 font-semibold">Email Address</FormLabel>
                                    <FormControl>
                                        <Input type="email" className="h-11 border-slate-200" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-3 pt-2">
                            <FormField
                                control={form.control}
                                name="privacy_policy"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-1">
                                        <FormControl>
                                            <Checkbox
                                                checked={!!field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="leading-none">
                                            <FormLabel className="text-xs text-slate-500 font-normal">
                                                I accept the <Link href="/privacy" className="text-[#1CB5E0] hover:underline">privacy policy</Link>
                                            </FormLabel>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="terms_of_business"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-1">
                                        <FormControl>
                                            <Checkbox
                                                checked={!!field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="leading-none">
                                            <FormLabel className="text-xs text-slate-500 font-normal">
                                                I accept the <Link href="/terms" className="text-[#1CB5E0] hover:underline">terms of business</Link>
                                            </FormLabel>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <p className="text-[10px] text-slate-400 italic">
                            Alpha Funding Business Finance is a broker, not a lender. We will only use your personal information to administer your account and provide the services you requested.
                        </p>

                        <Button
                            disabled={loading}
                            type="submit"
                            className="w-full h-12 text-lg font-bold bg-[#1CB5E0] hover:bg-[#004e92] transition-colors shadow-lg"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" /> Processing Application...
                                </span>
                            ) : "Check My Eligibility"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}