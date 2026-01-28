"use client";

import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Download, CheckCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LeadMagnetDialog({ className, children }: { className?: string, children?: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setLoading(false);
        setSubmitted(true);

        // Trigger download
        const link = document.createElement('a');
        link.href = '/guide.pdf';
        link.download = 'Alpha-Funding-Guide.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button
                        size="lg"
                        className={cn("bg-[#1CB5E0] text-[#000428] hover:bg-[#1CB5E0]/90 text-lg px-8 py-6 h-auto font-bold rounded-full shadow-lg shadow-[#1CB5E0]/20", className)}
                    >
                        Download Free Guide
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#000428]">
                        {submitted ? "Your Guide is Ready!" : "Get Your Free Funding Guide"}
                    </DialogTitle>
                    <DialogDescription>
                        {submitted ? "Your download should start automatically. Check your email for a copy." : "Enter your email to download our comprehensive guide to UK business finance."}
                    </DialogDescription>
                </DialogHeader>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6 py-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" placeholder="John Doe" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="john@company.com" required />
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-[#000428] text-white hover:bg-[#000428]/90" disabled={loading}>
                            {loading ? "Processing..." : (
                                <span className="flex items-center gap-2">
                                    Download Now <Download className="w-4 h-4" />
                                </span>
                            )}
                        </Button>
                        <p className="text-xs text-slate-500 text-center">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </form>
                ) : (
                    <div className="py-8 text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-3">
                            <FileText className="w-8 h-8 text-[#1CB5E0]" />
                            <div className="text-left">
                                <p className="font-semibold text-[#000428]">Complete Guide to Business Funding.pdf</p>
                                <p className="text-xs text-slate-500">2.4 MB</p>
                            </div>
                        </div>
                        <Button variant="outline" onClick={() => setOpen(false)} className="w-full">
                            Close
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
