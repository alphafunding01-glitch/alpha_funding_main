"use client";

import React from "react";
import {
    Calculator,
    Percent,
    TrendingUp,
    Info,
    HelpCircle,
    Scale,
    FileText,
    AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CalculatorEducation() {
    return (
        <section className="py-20 space-y-20">
            {/* Definitions Section - Bento Grid */}
            <div className="space-y-8">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-midnight">
                        Definitions of Business Loan Rates
                    </h2>
                    <p className="text-slate-600">
                        We’ve provided the following key definitions to give you a better understanding of your funding options
                        and allow you to make an informed decision.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Annual Interest Rate */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="neuromorphic-card p-6 space-y-4 group hover:border-[#1CB5E0]/50"
                    >
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1CB5E0] flex items-center justify-center group-hover:bg-[#1CB5E0] group-hover:text-white transition-colors duration-300">
                            <Percent className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-brand-midnight">Annual Interest Rate</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            The annual rate charged on a loan. Expressed as a percentage, it represents the actual yearly cost of funding over the term.
                            Annual interest is calculated by multiplying the monthly rate charged by the number of payment periods in a year
                            (e.g., Annual Rate = Monthly Rate × 12).
                        </p>
                    </motion.div>

                    {/* Yield */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="neuromorphic-card p-6 space-y-4 group hover:border-[#D946EF]/50"
                    >
                        <div className="w-12 h-12 rounded-xl bg-fuchsia-50 text-[#D946EF] flex items-center justify-center group-hover:bg-[#D946EF] group-hover:text-white transition-colors duration-300">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-brand-midnight">Yield</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Yield denotes the total interest paid in a year as a percentage of the loan amount.
                            It is calculated by dividing the total amount of interest paid in one year by the funded amount.
                            For example, if £2,500 interest was paid on £10,000 funding, the yield would be 25%.
                        </p>
                    </motion.div>

                    {/* Factor Rate */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="neuromorphic-card p-6 space-y-4 group hover:border-cyan-400/50"
                    >
                        <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-500 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300">
                            <Calculator className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-brand-midnight">Factor Rate</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Commonly associated with Merchant Cash Advances. Instead of a percentage, it's written as a decimal,
                            typically ranging from 1.1 to 1.5. To find the total repayable, multiply the advance amount by the factor rate.
                            (e.g., £10,000 × 1.5 = £15,000 total repayable).
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Why & How Section - Glass Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
                {/* Decorative background element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-gradient-to-r from-[#1CB5E0]/10 to-[#000428]/5 blur-3xl rounded-full -z-10" />

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <Card className="h-full bg-white/60 backdrop-blur-md border border-white/40 shadow-xl rounded-2xl">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-[#000428] text-white">
                                    <HelpCircle className="w-5 h-5" />
                                </div>
                                <CardTitle className="text-2xl font-bold text-brand-midnight">Why did we create this tool?</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-slate-700 leading-relaxed space-y-4">
                            <p>
                                At Alpha Funding, we believe business loans should be priced fairly and transparently.
                                Since much of SME lending is unregulated, providers aren't always obliged to disclose comparable rates,
                                making it difficult for businesses to compare quotes effectively.
                            </p>
                            <p>
                                We created this rate comparison tool to offer much-needed clarity. By revealing the true cost of finance,
                                we ensure business owners like you can make the best funding decisions for your company's growth
                                without hidden surprises.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <Card className="h-full bg-white/60 backdrop-blur-md border border-white/40 shadow-xl rounded-2xl">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-[#1CB5E0] text-white">
                                    <Scale className="w-5 h-5" />
                                </div>
                                <CardTitle className="text-2xl font-bold text-brand-midnight">How does the tool work?</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-slate-700 leading-relaxed space-y-4">
                            <p>
                                Our rate comparison tool uses a bespoke algorithm that automatically converts your business loan quote
                                into a range of other common rate types. This allows you to compare apples to apples, even if lenders
                                present their costs differently.
                            </p>
                            <p>
                                Input your loan amount, term, rate, and any fees, and we'll break down exactly what that means in terms of
                                Annual Rate, Yield, Daily Interest, and total payable amount.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Disclaimer / Additional Info - Dark Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden"
            >
                <div className="absolute inset-0 bg-[#000428]" />
                <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-5" />
                <div className="relative z-10 p-8 md:p-12 text-slate-300 space-y-8">
                    <div className="flex items-center gap-3 text-[#1CB5E0]">
                        <AlertCircle className="w-6 h-6" />
                        <h3 className="text-xl font-bold uppercase tracking-wider">Important Information</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed">
                        <ul className="space-y-4 list-disc pl-5 marker:text-[#1CB5E0]">
                            <li>
                                <strong>Estimates Only:</strong> This tool provides an estimate of the cost of a loan and doesn’t take specific lending criteria of various lenders into account.
                            </li>
                            <li>
                                <strong>Personal Circumstances:</strong> Results are based solely on the information provided and don’t account for your specific business history or credit score.
                            </li>
                            <li>
                                <strong>Eligibility:</strong> This tool is not a measure of your eligibility for a loan, just the estimated cost. You will still need to meet the lending criteria of your chosen lender(s).
                            </li>
                        </ul>
                        <ul className="space-y-4 list-disc pl-5 marker:text-[#1CB5E0]">
                            <li>
                                <strong>Payment Assumption:</strong> Calculations assume payments will be the same each month (standard for most business finance).
                            </li>
                            <li>
                                <strong>Fee Assumption:</strong> We assume all arrangement fees will be absorbed into (added to) your loan principal.
                            </li>
                            <li>
                                <strong>Rate Stability:</strong> This tool assumes rates won’t change for the duration of the loan.
                            </li>
                            <li>
                                <strong>Seek Advice:</strong> We recommend taking advice from a licensed finance professional before making major financial decisions.
                            </li>
                        </ul>
                    </div>

                    <div className="pt-8 border-t border-white/10 text-center">
                        <p className="text-xs text-slate-500">
                            Alpha Funding is a trading name of ALPHA FUNDING LIMITED, registered in England and Wales.
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
