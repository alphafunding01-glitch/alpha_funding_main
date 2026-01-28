
"use client";
import React, { useState, useEffect } from "react";
import { CompanyExpertSection } from "@/components/company-expert";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    Phone,
    Mail,
    MapPin,
    Clock,
    FileText,
    ArrowRight,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    first_name: z.string().min(2, "First name is required"),
    middle_names: z.string().optional(),
    sur_name: z.string().min(2, "Surname is required"),
    email: z.string().email("Invalid email address"),
    contact: z.string().min(10, "Valid contact number is required"),
    company_name: z.string().min(2, "Company name is required"),
    nature_of_business: z.string().optional(),
    trading_since: z.string().optional(),
    business_address: z.string().optional(),
    business_city: z.string().optional(),
    business_postcode: z.string().optional(),
    job_title: z.string().min(1, "Please select your job title"),
    borrow_amount: z.string().min(1, "Borrow amount is required"),
    message: z.string().optional(),
    internal_risk: z.any().optional(),
});

export default function ApplyNowContent() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<any>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "",
            middle_names: "",
            sur_name: "",
            email: "",
            contact: "",
            company_name: "",
            nature_of_business: "",
            trading_since: "",
            business_address: "",
            business_city: "",
            business_postcode: "",
            job_title: "",
            borrow_amount: "",
            message: "",
            internal_risk: {},
        },
    });

    const companyName = form.watch("company_name");

    // Companies House Search Logic
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (companyName && companyName.length > 2 && !selectedCompany) {
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
    }, [companyName, selectedCompany]);

    const handleSelectCompany = (company: any) => {
        setSelectedCompany(company);
        form.setValue("company_name", company.title);
        setShowResults(false);
    };

    const [availableDirectors, setAvailableDirectors] = useState<any[]>([]);

    const handleDirectorSelect = (name: string) => {
        const parts = name.split(',').map(p => p.trim());
        if (parts.length >= 2) {
            form.setValue("sur_name", parts[0]);
            form.setValue("first_name", parts[1].split(' ')[0]);
            form.setValue("job_title", "director");
        }
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            const response = await fetch("/api/send-enquiry-mail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "Application",
                    ...values,
                    company_details: selectedCompany
                }),
            });

            if (response.ok) {
                setSubmitted(true);
                form.reset();
            } else {
                console.error("Submission failed");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    }

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-heading font-bold text-[#201130]">Application Sent!</h2>
                    <p className="text-slate-500 max-w-md mx-auto">
                        Thank you, {form.getValues("first_name")}. Our funding experts will review your details and contact you within 2 hours.
                    </p>
                </div>
                <Button asChild className="bg-[#1CB5E0] hover:bg-[#004e92] text-white">
                    <Link href="/">Back to Homepage</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* --- LEFT PANEL --- */}
            <div className="lg:w-[45%] bg-[#000428] text-white p-6 lg:p-12 xl:p-20 relative overflow-hidden flex flex-col justify-between">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#1CB5E0]/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                <div className="relative z-10">
                    <Link href="/" className="inline-block mb-12">
                        <div className="text-2xl font-heading font-black tracking-tighter flex items-center gap-2">
                            <span className="text-white">ALPHA</span>
                            <span className="text-[#1CB5E0]">FUNDING</span>
                        </div>
                    </Link>

                    <div className="space-y-8">
                        <h1 className="text-4xl xl:text-5xl font-heading font-bold leading-tight">
                            Your Business <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1CB5E0] via-blue-400 to-cyan-300">
                                Growth Starts Here
                            </span>
                        </h1>
                        <p className="text-lg text-blue-100/70 max-w-md">
                            Join hundreds of UK businesses that have secured funding through our streamlined application process.
                        </p>

                        <div className="space-y-6 pt-6">
                            {[
                                "Fast approval in under 2 hours",
                                "Funding up to £5,000,000",
                                "Tailored repayment plans",
                                "Dedicated account manager"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1CB5E0]/20 flex items-center justify-center">
                                        <CheckCircle2 className="w-3 h-3 text-[#1CB5E0]" />
                                    </div>
                                    <span className="text-sm font-medium text-blue-100">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mt-12 pt-12 border-t border-white/10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#1CB5E0] transition-colors duration-300">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-sm text-blue-200">Need help?</div>
                                <a href="tel:02070787446" className="text-xl font-bold hover:text-[#1CB5E0]">020 7078 7446</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#1CB5E0] transition-colors duration-300">
                                <Clock className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-sm text-blue-200">Processing</div>
                                <div className="text-xl font-bold">2 Hours</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- RIGHT PANEL --- */}
            <div className="lg:w-[55%] bg-slate-50 p-6 lg:p-12 xl:p-20 flex pt-32 lg:pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-2xl"
                >
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-slate-100">
                        <div className="mb-8">
                            <h2 className="text-2xl font-heading font-bold text-[#201130]">Business Finance Application</h2>
                            <p className="text-slate-500">Fast application tracking enabled.</p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div className="space-y-5">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center w-full">Personal Details</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="md:col-span-3">
                                            {availableDirectors.length > 1 && (
                                                <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <FormLabel className="text-[#1CB5E0] text-[11px] font-bold uppercase mb-1.5 block">Select Your Name (From Registered Directors)</FormLabel>
                                                    <Select onValueChange={handleDirectorSelect}>
                                                        <SelectTrigger className="border-[#1CB5E0]/30 bg-blue-50/10">
                                                            <SelectValue placeholder="Are you one of the directors?" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {availableDirectors.map((d, i) => (
                                                                <SelectItem key={i} value={d.name}>{d.name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            )}
                                        </div>
                                        <FormField control={form.control} name="first_name" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name <span className="text-red-500">*</span></FormLabel>
                                                <FormControl><Input {...field} placeholder="John" /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="middle_names" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Middle Name</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="sur_name" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Surname <span className="text-red-500">*</span></FormLabel>
                                                <FormControl><Input {...field} placeholder="Doe" /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField control={form.control} name="email" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email Address <span className="text-red-500">*</span></FormLabel>
                                                <FormControl><Input {...field} placeholder="john@example.com" /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="contact" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Contact Number <span className="text-red-500">*</span></FormLabel>
                                                <FormControl><Input {...field} placeholder="07123 456789" /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <div className="flex items-center gap-4 mb-4 pt-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center w-full">Business Details</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                                        <div className="md:col-span-2">
                                            <FormField control={form.control} name="company_name" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex justify-between items-center">
                                                        <span>Company Name <span className="text-red-500">*</span></span>
                                                        {selectedCompany && (
                                                            <span className="text-[10px] text-green-600 flex items-center gap-1 font-bold bg-green-50 px-1.5 py-0.5 rounded-full border border-green-100">
                                                                <CheckCircle2 className="w-2.5 h-2.5" /> VERIFIED
                                                            </span>
                                                        )}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input
                                                                {...field}
                                                                className={cn("focus-visible:ring-[#1CB5E0]", selectedCompany && "border-green-200 bg-green-50/10")}
                                                                placeholder="Search your company..."
                                                                onChange={(e) => {
                                                                    field.onChange(e);
                                                                    if (selectedCompany) setSelectedCompany(null);
                                                                }}
                                                            />
                                                            {isSearching && <Loader2 className="absolute right-3 top-2.5 w-4 h-4 animate-spin text-slate-400" />}
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />

                                            {showResults && searchResults.length > 0 && (
                                                <div className="absolute z-50 left-0 right-0 top-[85px] mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-48 overflow-y-auto w-full">
                                                    {searchResults.map((company, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0"
                                                            onClick={() => handleSelectCompany(company)}
                                                        >
                                                            <div className="font-bold text-sm text-slate-900 truncate">{company.title}</div>
                                                            <div className="text-[10px] text-slate-500 truncate">{company.address_snippet}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {selectedCompany && (
                                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                                                <div className="md:col-span-2">
                                                    <FormField control={form.control} name="business_address" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Business Address (Pre-filled)</FormLabel>
                                                            <FormControl><Input {...field} placeholder="Business address..." /></FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                </div>
                                                <FormField control={form.control} name="business_city" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>City</FormLabel>
                                                        <FormControl><Input {...field} placeholder="City..." /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name="business_postcode" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Postcode</FormLabel>
                                                        <FormControl><Input {...field} placeholder="Postcode..." /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />

                                                <FormField control={form.control} name="nature_of_business" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Inferred Industry</FormLabel>
                                                        <FormControl><Input {...field} placeholder="e.g. Construction" /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />

                                                <FormField control={form.control} name="trading_since" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Trading Since</FormLabel>
                                                        <FormControl><Input {...field} placeholder="YYYY-MM-DD" /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>
                                        )}

                                        <FormField control={form.control} name="job_title" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Job Title <span className="text-red-500">*</span></FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="director">Director</SelectItem>
                                                        <SelectItem value="director_shareholder">Director & Shareholder</SelectItem>
                                                        <SelectItem value="sole_trader">Sole Trader</SelectItem>
                                                        <SelectItem value="partner">Partner</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        {selectedCompany && (
                                            <div className="md:col-span-2">
                                                <CompanyExpertSection
                                                    company={selectedCompany}
                                                    onUpdateFields={(data) => {
                                                        if (data.prefill) {
                                                            if (data.prefill.first_name) form.setValue("first_name", data.prefill.first_name);
                                                            if (data.prefill.sur_name) form.setValue("sur_name", data.prefill.sur_name);
                                                            if (data.prefill.first_name || data.prefill.sur_name) {
                                                                form.setValue("job_title", "director");
                                                            }
                                                        }
                                                        if (data.nature_of_business) form.setValue("nature_of_business", data.nature_of_business);
                                                        if (data.inferred_industry) form.setValue("nature_of_business", data.inferred_industry);
                                                        if (data.incorporation_date) form.setValue("trading_since", data.incorporation_date);
                                                        if (data.directors) setAvailableDirectors(data.directors);
                                                        if (data.address) {
                                                            form.setValue("business_address", data.address.line1);
                                                            form.setValue("business_city", data.address.city);
                                                            form.setValue("business_postcode", data.address.postcode);
                                                        }
                                                        if (data.internal_risk) {
                                                            form.setValue("internal_risk", data.internal_risk);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <FormField control={form.control} name="borrow_amount" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Required Borrow Amount <span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">£</span>
                                                    <Input {...field} type="number" className="pl-7" placeholder="50000" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="message" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Funding Purpose / Message (Optional)</FormLabel>
                                            <FormControl><Textarea {...field} placeholder="Briefly describe what the funding is for..." /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                <Button type="submit" disabled={loading} className="w-full h-14 bg-gradient-to-r from-[#000428] to-[#004e92] hover:from-[#004e92] hover:to-[#1CB5E0] text-white font-bold text-lg rounded-xl shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] group">
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Complete Application"}
                                    {!loading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
