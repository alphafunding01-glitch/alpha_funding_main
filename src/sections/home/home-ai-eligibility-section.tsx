'use client';

import { motion } from 'framer-motion';
import SmartQualifier from '@/components/eligibility/smart-qualifier';
import { ShieldCheck, Zap, BarChart3, Target } from 'lucide-react';
import { fadeUp, containerVariants, itemVariants } from '@/lib/animation-variants';

export default function HomeAIEligibilitySection() {
    return (
        <section className="py-24 bg-brand-midnight relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1CB5E0]/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                        className="text-left"
                    >
                        <motion.p variants={itemVariants} className="text-slate-300 text-lg mb-4 max-w-lg leading-relaxed">
                            Compare 50+ lenders. Decisions in 24 hours. <br className="hidden md:block" />
                        </motion.p>
                        <motion.div variants={itemVariants} className="inline-block py-1 px-3 rounded-full bg-[#1CB5E0]/10 border border-[#1CB5E0]/20 mb-4">
                            <span className="text-[10px] font-bold text-[#1CB5E0] uppercase tracking-widest">Instant Qualification</span>
                        </motion.div>

                        <motion.h2 variants={itemVariants} className="font-heading text-4xl md:text-5xl text-white mb-6 leading-tight">
                            See If You Qualify in{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1CB5E0] to-cyan-400">60 Seconds</span>
                        </motion.h2>

                        <motion.p variants={itemVariants} className="text-slate-300 text-lg mb-10 max-w-lg leading-relaxed">
                            Our Smart Eligibility Engine analyzes your business footprint in real-time to match you
                            with the best rates from 50+ specialist UK lenders.
                        </motion.p>

                        <motion.div variants={itemVariants} className="space-y-6">
                            {[
                                { icon: ShieldCheck, text: 'No credit check required to verify', sub: 'Completely anonymous until you apply.' },
                                { icon: Zap, text: 'Instant AI-driven likelihood score', sub: 'Know exactly where you stand in seconds.' },
                                { icon: BarChart3, text: 'Matched to 50+ lender criteria', sub: 'Real-time syncing with active funding panels.' },
                                { icon: Target, text: 'Personalized product matching', sub: 'Only see products you are eligible for.' },
                            ].map((item, index) => (
                                <div key={index} className="flex gap-4 group">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#1CB5E0]/10 group-hover:border-[#1CB5E0]/30 transition-all">
                                        <item.icon className="w-5 h-5 text-[#1CB5E0]" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm tracking-tight">{item.text}</p>
                                        <p className="text-slate-400 text-xs mt-0.5">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right: Widget */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
                    >
                        <SmartQualifier />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
