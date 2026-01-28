"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    Users,
    Handshake,
    ArrowRight,
    Lock,
    Loader2,
    Target,
    Zap,
    TrendingUp
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
import { cn } from "@/lib/utils";

const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid email"),
    contactNo: z.string().min(5, "Contact number is required"),
    jobProfile: z.string().min(1, "Job profile is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
});

export default function PartnerContent() {
    const [status, setStatus] = useState<{ type: "success" | "error" | ""; msg: string }>({ type: "", msg: "" });
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            contactNo: "",
            jobProfile: "",
            description: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        setStatus({ type: "", msg: "" });

        try {
            const res = await fetch("/api/send-partner-mail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setStatus({ type: "success", msg: "Application received! Our partnership team will contact you shortly." });
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
        <div className="min-h-screen flex flex-col lg:flex-row font-body bg-white">
            {/* --- LEFT PANEL --- */}
            <div className="lg:w-[45%] bg-gradient-to-br from-[#000428] via-[#004e92] to-[#1CB5E0] text-white p-8 lg:p-16 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>

                <div className="relative z-10 max-w-lg mx-auto lg:mx-0">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-[#1CB5E0]/20 text-[#1CB5E0] text-sm font-bold tracking-wide mb-8 border border-[#1CB5E0]/30 backdrop-blur-sm">
                        PARTNER PROGRAM
                    </span>

                    <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                        Grow With <span className="text-[#1CB5E0]">Alpha.</span>
                    </h1>

                    <p className="text-lg text-blue-50/80 mb-10 leading-relaxed">
                        Join our network of successful partners and offer your clients industry-leading finance solutions. Empower your sales and build long-term revenue.
                    </p>

                    <div className="space-y-6 mb-12">
                        {[
                            { icon: TrendingUp, text: "Increase your sales conversion rates" },
                            { icon: Target, text: "Bespoke solutions for every client" },
                            { icon: Zap, text: "Rewarding referral incentives" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                    <item.icon className="w-6 h-6 text-[#1CB5E0]" />
                                </div>
                                <span className="text-lg font-medium">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="h-px w-full bg-white/10 mb-10"></div>

                    <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#1CB5E0] transition-colors duration-300">
                            <Handshake className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="text-sm text-blue-200">Partnership Support</div>
                            <div className="text-xl font-bold">Dedicated Account Manager</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- RIGHT PANEL --- */}
            <div className="lg:w-[55%] bg-slate-50 p-6 lg:p-12 xl:p-20 flex items-center justify-center pt-32 lg:pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-2xl"
                >
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-slate-100">
                        <div className="mb-8">
                            <h2 className="text-2xl font-heading font-bold text-[#201130]">Become a Partner</h2>
                            <p className="text-slate-500">Provide your details to explore partnership opportunities.</p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField control={form.control} name="firstName" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name <span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <Input {...field} className="focus-visible:ring-[#1CB5E0]" placeholder="Jane" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="lastName" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name <span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <Input {...field} className="focus-visible:ring-[#1CB5E0]" placeholder="Smith" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Work Email <span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <Input {...field} type="email" className="focus-visible:ring-[#1CB5E0]" placeholder="jane@company.com" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="contactNo" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number <span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <Input {...field} className="focus-visible:ring-[#1CB5E0]" placeholder="07XXX XXXXXX" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                <FormField control={form.control} name="jobProfile" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Title / Position <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input {...field} className="focus-visible:ring-[#1CB5E0]" placeholder="Sales Director" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="description" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tell us about your business <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Textarea {...field} className="focus-visible:ring-[#1CB5E0] min-h-[120px] resize-none" placeholder="How do you plan to refer clients?" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-[#1CB5E0] hover:bg-[#1CB5E0]/90 text-[#000428] font-bold text-lg h-14 rounded-lg shadow-lg hover:shadow-xl transition-all"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Submitting...</span>
                                        ) : (
                                            <span className="flex items-center gap-2">Submit Application <ArrowRight className="w-5 h-5" /></span>
                                        )}
                                    </Button>

                                    <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 text-sm">
                                        <Lock className="w-4 h-4" />
                                        <span>Your data is protected by 256-bit encryption.</span>
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
