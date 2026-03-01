"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie, ShieldCheck, Sparkles, Settings } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type CookiePreferences = {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
};

const defaultPreferences: CookiePreferences = {
    essential: true, // Always true
    analytics: false,
    marketing: false,
};

export default function CookiesBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [showCustomize, setShowCustomize] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

    // Check for existing consent on mount
    useEffect(() => {
        const savedConsent = localStorage.getItem("alpha-cookie-consent");
        if (!savedConsent) {
            // Delay slightly for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        const allAllowed = { essential: true, analytics: true, marketing: true };
        savePreferences(allAllowed);
    };

    const handleRejectAll = () => {
        const minimal = { essential: true, analytics: false, marketing: false };
        savePreferences(minimal);
    };

    const savePreferences = (prefs: CookiePreferences) => {
        localStorage.setItem("alpha-cookie-consent", JSON.stringify(prefs));
        setIsVisible(false);
        // Dispatch event for other components to listen (e.g. analytics scripts)
        window.dispatchEvent(new Event("cookie-consent-updated"));
    };

    const handleCustomizeClick = () => {
        setIsGenerating(true);
        // Simulate AI "Thinking" / "Generating" UI
        setTimeout(() => {
            setIsGenerating(false);
            setShowCustomize(true);
        }, 2000);
    };

    const togglePreference = (key: keyof CookiePreferences) => {
        if (key === "essential") return; // Cannot toggle essential
        setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="fixed bottom-4 left-4 right-4 md:bottom-8 md:right-8 md:left-auto md:w-[420px] z-[100]"
                >
                    <div className="glass-panel-dark border border-white/10 shadow-2xl rounded-[24px] overflow-hidden backdrop-blur-3xl bg-[#030f42]/95">
                        {/* Header Gradient Line */}
                        <div className="h-1 w-full bg-gradient-to-r from-[#1CB5E0] via-purple-500 to-[#1CB5E0] opacity-50" />

                        <div className="p-6 relative">
                            {/* Close Button (absolute) */}
                            <button
                                onClick={() => setIsVisible(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* Content Switcher */}
                            {!showCustomize && !isGenerating ? (
                                // STATE 1: Initial View
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 pr-8">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                                            <Cookie className="w-6 h-6 text-[#1CB5E0]" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-bold text-white font-heading">
                                                We Value Your Privacy
                                            </h3>
                                            <p className="text-xs text-slate-300 leading-relaxed">
                                                We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={handleAcceptAll}
                                            className="w-full py-3 bg-[#1CB5E0] hover:bg-[#159cc2] text-white rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(28,181,224,0.3)] hover:shadow-[0_0_30px_rgba(28,181,224,0.5)]"
                                        >
                                            Accept All Cookies
                                        </button>

                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={handleCustomizeClick}
                                                className="py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-medium text-xs transition-all flex items-center justify-center gap-2 group"
                                            >
                                                <Settings className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                                                Customize
                                            </button>
                                            <button
                                                onClick={handleRejectAll}
                                                className="py-2.5 bg-transparent hover:bg-white/5 text-slate-400 hover:text-white border border-transparent hover:border-white/10 rounded-xl font-medium text-xs transition-all"
                                            >
                                                Reject All
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-[10px] text-slate-500 text-center">
                                        Read our <Link href="/policy" className="underline hover:text-white">Privacy Policy</Link>.
                                    </div>
                                </div>
                            ) : isGenerating ? (
                                // STATE 2: AI Generating Animation
                                <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="relative">
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className="absolute inset-0 bg-[#1CB5E0]/20 rounded-full blur-xl"
                                        />
                                        <div className="w-16 h-16 rounded-full bg-[#1CB5E0]/10 flex items-center justify-center relative z-10 border border-[#1CB5E0]/30">
                                            <Sparkles className="w-8 h-8 text-[#1CB5E0]" />
                                        </div>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="absolute -inset-1 rounded-full border-t-2 border-[#1CB5E0] opacity-50"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base font-bold text-white">Generating Preferences...</h3>
                                        <p className="text-xs text-slate-400">AI Analysis of compliance requirements</p>
                                    </div>
                                </div>
                            ) : (
                                // STATE 3: Customization View
                                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                            <ShieldCheck className="w-5 h-5 text-[#1CB5E0]" />
                                            Cookie Preferences
                                        </h3>
                                        <button
                                            onClick={() => setShowCustomize(false)}
                                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {/* Essential */}
                                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4 cursor-not-allowed opacity-60">
                                            <div>
                                                <div className="font-bold text-white text-xs mb-0.5">Essential</div>
                                                <p className="text-[10px] text-slate-400">Required for the website to function.</p>
                                            </div>
                                            <div className="w-8 h-5 rounded-full bg-[#1CB5E0]/50 relative flex-shrink-0">
                                                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                                            </div>
                                        </div>

                                        {/* Analytics */}
                                        <div
                                            onClick={() => togglePreference('analytics')}
                                            className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/10 transition-colors"
                                        >
                                            <div>
                                                <div className="font-bold text-white text-xs mb-0.5">Analytics</div>
                                                <p className="text-[10px] text-slate-400">Help us improve our website.</p>
                                            </div>
                                            <div className={cn(
                                                "w-9 h-5 rounded-full relative transition-colors duration-300 flex-shrink-0",
                                                preferences.analytics ? "bg-[#1CB5E0]" : "bg-slate-700"
                                            )}>
                                                <motion.div
                                                    animate={{ x: preferences.analytics ? 18 : 2 }}
                                                    className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* Marketing */}
                                        <div
                                            onClick={() => togglePreference('marketing')}
                                            className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/10 transition-colors"
                                        >
                                            <div>
                                                <div className="font-bold text-white text-xs mb-0.5">Marketing</div>
                                                <p className="text-[10px] text-slate-400">Personalized offers & ads.</p>
                                            </div>
                                            <div className={cn(
                                                "w-9 h-5 rounded-full relative transition-colors duration-300 flex-shrink-0",
                                                preferences.marketing ? "bg-[#1CB5E0]" : "bg-slate-700"
                                            )}>
                                                <motion.div
                                                    animate={{ x: preferences.marketing ? 18 : 2 }}
                                                    className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => savePreferences(preferences)}
                                        className="w-full py-3 bg-white text-[#030f42] hover:bg-slate-200 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
                                    >
                                        Save Preferences
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
