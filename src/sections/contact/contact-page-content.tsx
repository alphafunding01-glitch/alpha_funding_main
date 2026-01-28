"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    Phone,
    Mail,
    ArrowRight,
    Lock,
    MapPin,
    Loader2
} from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Schema matching existing contact form logic but adapted for this page
const formSchema = z.object({
    first_name: z.string().min(2, "First name is required"),
    middle_names: z.string().optional(),
    sur_name: z.string().min(2, "Surname is required"),
    email: z.string().email("Invalid email address"),
    contact: z.string().min(5, "Contact number is required"),
    company_name: z.string().min(2, "Company name is required"),
    job_title: z.string().min(2, "Job title is required"),
    website_link: z.string().optional(),
    message: z.string().optional(),
});

export default function ContactPageContent() {
    const [status, setStatus] = useState<{ type: "success" | "error" | ""; msg: string }>({ type: "", msg: "" });
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "",
            middle_names: "",
            sur_name: "",
            email: "",
            contact: "",
            company_name: "",
            job_title: "",
            website_link: "",
            message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        setStatus({ type: "", msg: "" });

        try {
            const res = await fetch("/api/send-contact-mail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setStatus({ type: "success", msg: "Request received! We'll be in touch shortly." });
                form.reset();
            } else {
                setStatus({ type: "error", msg: data.error || "Something went wrong." });
            }
        } catch (error) {
            setStatus({ type: "error", msg: "Failed to send. Please try again." });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row font-body">
            {/* --- LEFT PANEL (45%) --- */}
            <div className="lg:w-[45%] bg-gradient-to-br from-[#000428] via-[#004e92] to-[#1CB5E0] text-white p-8 lg:p-16 flex flex-col justify-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>

                <div className="relative z-10 max-w-lg mx-auto lg:mx-0">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-[#1CB5E0]/20 text-[#1CB5E0] text-sm font-bold tracking-wide mb-8 border border-[#1CB5E0]/30 backdrop-blur-sm">
                        FREE CONSULTATION
                    </span>

                    <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                        Let's Talk About <span className="text-[#1CB5E0]">Your Funding.</span>
                    </h1>

                    <p className="text-lg text-blue-50/80 mb-10 leading-relaxed">
                        Tell us about your business and funding needs. A specialist will reach out within 2 hours during business hours to discuss your options.
                    </p>

                    <div className="space-y-4 mb-12">
                        {[
                            "No obligation consultation",
                            "No impact on your credit score",
                            "Response within 2 hours"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 text-[#1CB5E0] shrink-0" />
                                <span className="text-lg font-medium">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="h-px w-full bg-white/10 mb-10"></div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#1CB5E0] transition-colors duration-300">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-sm text-blue-200">Call us directly</div>
                                <a href="tel:02070787446" className="text-xl font-bold hover:text-[#1CB5E0] transition-colors">
                                    020 7078 7446
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#1CB5E0] transition-colors duration-300">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-sm text-blue-200">Email our team</div>
                                <a href="mailto:contact@alpha-funding.co.uk" className="text-xl font-bold hover:text-[#1CB5E0] transition-colors">
                                    contact@alpha-funding.co.uk
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- RIGHT PANEL (55%) --- */}
            <div className="lg:w-[55%] bg-slate-50 p-6 lg:p-12 xl:p-20 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-2xl"
                >
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-slate-100">
                        <div className="mb-8">
                            <h2 className="text-2xl font-heading font-bold text-[#201130]">Tell Us About Your Business</h2>
                            <p className="text-slate-500">Fill in the details below to get started.</p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                {/* SECTION 1: YOUR DETAILS */}
                                <div className="space-y-5">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="h-px bg-slate-200 flex-grow"></div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Details</span>
                                        <div className="h-px bg-slate-200 flex-grow"></div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <FormField control={form.control} name="first_name" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="focus-visible:ring-[#1CB5E0]" placeholder="John" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="middle_names" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Middle Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="focus-visible:ring-[#1CB5E0]" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="sur_name" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Surname <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="focus-visible:ring-[#1CB5E0]" placeholder="Doe" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField control={form.control} name="email" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email Address <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="email" className="focus-visible:ring-[#1CB5E0]" placeholder="john@company.com" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="contact" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="focus-visible:ring-[#1CB5E0]" placeholder="07123 456789" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                </div>

                                {/* SECTION 2: YOUR BUSINESS */}
                                <div className="space-y-5">
                                    <div className="flex items-center gap-4 mb-4 pt-2">
                                        <div className="h-px bg-slate-200 flex-grow"></div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Business</span>
                                        <div className="h-px bg-slate-200 flex-grow"></div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField control={form.control} name="company_name" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Company Name <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="focus-visible:ring-[#1CB5E0]" placeholder="Acme Corp Ltd" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="job_title" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Job Title <span className="text-red-500">*</span></FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="focus:ring-[#1CB5E0]">
                                                            <SelectValue placeholder="Select..." />
                                                        </SelectTrigger>
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
                                    </div>

                                    <FormField control={form.control} name="website_link" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Website (Optional)</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="focus-visible:ring-[#1CB5E0]" placeholder="www.example.com" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>


                                {/* SECTION 3: MESSAGE */}
                                <div className="space-y-5">
                                    <div className="flex items-center gap-4 mb-4 pt-2">
                                        <div className="h-px bg-slate-200 flex-grow"></div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</span>
                                        <div className="h-px bg-slate-200 flex-grow"></div>
                                    </div>

                                    <FormField control={form.control} name="message" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>How can we help?</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} className="min-h-[120px] resize-y focus-visible:ring-[#1CB5E0]" placeholder="Tell us about your funding requirements..." />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-[#1CB5E0] hover:bg-[#1CB5E0]/90 text-[#000428] font-bold text-lg h-14 rounded-lg shadow-lg hover:shadow-xl transition-all"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Sending...</span>
                                        ) : (
                                            <span className="flex items-center gap-2">Request My Free Consultation <ArrowRight className="w-5 h-5" /></span>
                                        )}
                                    </Button>

                                    <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 text-sm">
                                        <Lock className="w-4 h-4" />
                                        <span>Your data is secure and encrypted.</span>
                                    </div>

                                    {status.msg && (
                                        <div className={cn("mt-4 p-4 rounded-lg text-center font-medium", status.type === 'success' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700")}>
                                            {status.msg}
                                        </div>
                                    )}
                                </div>
                            </form>
                        </Form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
