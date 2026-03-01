"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Bot, Sparkles } from "lucide-react";

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-[350px] bg-[#030f42]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1CB5E0] to-blue-600 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white">Alpha AI Agent</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                                        <span className="text-[10px] text-slate-400 font-medium">Under Construction</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8 flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 relative">
                                <div className="absolute inset-0 bg-[#1CB5E0]/20 rounded-full blur-xl animate-pulse" />
                                <Sparkles className="w-10 h-10 text-[#1CB5E0] relative z-10" />
                            </div>

                            <h4 className="text-xl font-heading font-bold text-white mb-2">
                                Coming Soon
                            </h4>
                            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                                We're building an intelligent AI assistant to help you with instant funding eligibility and quotes.
                            </p>

                            <div className="w-full p-4 bg-white/5 rounded-xl border border-white/5 text-left">
                                <div className="text-[10px] font-bold text-[#1CB5E0] uppercase tracking-widest mb-2">Capabilities</div>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-xs text-slate-300">
                                        <span className="w-1 h-1 bg-[#1CB5E0] rounded-full" />
                                        Instant Funding Eligibility
                                    </li>
                                    <li className="flex items-center gap-2 text-xs text-slate-300">
                                        <span className="w-1 h-1 bg-[#1CB5E0] rounded-full" />
                                        Real-time Quote Comparisons
                                    </li>
                                    <li className="flex items-center gap-2 text-xs text-slate-300">
                                        <span className="w-1 h-1 bg-[#1CB5E0] rounded-full" />
                                        24/7 Expert Support
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-6 text-[10px] text-slate-500">
                                Expected Live Date: March 2026
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-[#1CB5E0] to-blue-600 shadow-[0_0_30px_rgba(28,181,224,0.4)] flex items-center justify-center relative group"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X className="w-6 h-6 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <MessageSquare className="w-6 h-6 text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Helper Tooltip */}
                {!isOpen && (
                    <span className="absolute right-full mr-4 px-3 py-1.5 bg-[#030f42] border border-[#1CB5E0]/30 rounded-xl text-xs font-bold text-white whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        AI Assistant (Coming Soon)
                    </span>
                )}
            </motion.button>
        </div>
    );
}
