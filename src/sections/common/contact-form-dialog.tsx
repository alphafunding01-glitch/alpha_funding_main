"use client"

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactFormDialog() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <Dialog onOpenChange={(open) => { if (!open) setSubmitted(false); }}>
            <DialogTrigger asChild className={"text-xs uppercase"}>
                <Button variant={"ghost"} className={"text-xs text-[#201130] hover:text-[#1CB5E0] hover:bg-transparent transition-all hover:translate-y-[-1px] font-medium"}>
                    Contact Us
                </Button>
            </DialogTrigger>
            <DialogContent className={"max-w-[95vw] md:max-w-[900px] p-0 overflow-hidden border-none rounded-2xl shadow-2xl"}>
                <div className="flex flex-col md:flex-row min-h-[500px]">

                    {/* --- LEFT PANEL: Brand Info --- */}
                    <div className="md:w-[40%] bg-gradient-to-br from-[#000428] via-[#004e92] to-[#1CB5E0] text-white p-8 flex flex-col justify-between relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-4 font-heading">Get in Touch</h2>
                            <p className="text-blue-100/80 text-sm leading-relaxed mb-8">
                                Speak with our finance specialists to discover how we can fuel your business growth.
                            </p>

                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-[#1CB5E0]" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] text-blue-200 uppercase font-bold tracking-wider">Call Us</div>
                                        <div className="text-sm font-semibold">020 7078 7446</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-[#1CB5E0]" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] text-blue-200 uppercase font-bold tracking-wider">Email</div>
                                        <div className="text-sm font-semibold">contact@alpha-funding.co.uk</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-[#1CB5E0]" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] text-blue-200 uppercase font-bold tracking-wider">Locations</div>
                                        <div className="text-sm font-semibold">London & Wirral Offices</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-[#1CB5E0]" />
                                <div className="text-[11px] text-blue-100">
                                    Response time: <span className="font-bold text-white">Within 2 Hours</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT PANEL: Form --- */}
                    <div className="md:w-[60%] bg-white p-8 md:p-10 flex flex-col justify-center">
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-10"
                            >
                                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                                <p className="text-slate-500">
                                    Thank you for reaching out. One of our specialists will be in touch shortly.
                                </p>
                                <Button
                                    onClick={() => setSubmitted(false)}
                                    variant="outline"
                                    className="mt-8 border-[#1CB5E0] text-[#1CB5E0] hover:bg-[#1CB5E0]/5"
                                >
                                    Send another message
                                </Button>
                            </motion.div>
                        ) : (
                            <>
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-[#201130] mb-1">Send a Message</h3>
                                    <p className="text-slate-500 text-sm">Tell us how we can help your business today.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="firstName" className="text-xs font-bold text-slate-600">First Name</Label>
                                            <Input id="firstName" placeholder="John" className="focus-visible:ring-[#1CB5E0] bg-slate-50 border-slate-200" required />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="lastName" className="text-xs font-bold text-slate-600">Last Name</Label>
                                            <Input id="lastName" placeholder="Doe" className="focus-visible:ring-[#1CB5E0] bg-slate-50 border-slate-200" required />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="email" className="text-xs font-bold text-slate-600">Work Email</Label>
                                        <Input id="email" type="email" placeholder="john@company.co.uk" className="focus-visible:ring-[#1CB5E0] bg-slate-50 border-slate-200" required />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="company" className="text-xs font-bold text-slate-600">Company Name</Label>
                                        <Input id="company" placeholder="Acme Ltd" className="focus-visible:ring-[#1CB5E0] bg-slate-50 border-slate-200" required />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="description" className="text-xs font-bold text-slate-600">Message</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Briefly describe your funding needs..."
                                            className="min-h-[100px] focus-visible:ring-[#1CB5E0] bg-slate-50 border-slate-200 resize-none"
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-[#1CB5E0] hover:bg-[#1CB5E0]/90 text-[#000428] font-bold h-12 mt-4 shadow-lg hover:shadow-xl transition-all flex gap-2"
                                    >
                                        {loading ? (
                                            <><Loader2 className="animate-spin w-4 h-4" /> Sending...</>
                                        ) : (
                                            <><Send className="w-4 h-4" /> Send Message</>
                                        )}
                                    </Button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}