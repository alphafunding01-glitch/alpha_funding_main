"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Landmark, Wallet, Truck, FileText,
    CreditCard, Building, Shield, RefreshCw,
    ArrowRight
} from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

interface ProductProps {
    title: string;
    description: string;
    icon: any;
    href: string;
    isWide?: boolean;
}

const products: ProductProps[] = [
    {
        title: "Business Loans",
        description: "Unsecured & secured funding from £10k to £2M. Decisions in 24 hours with interest rates from 6.9% per annum.",
        icon: Landmark,
        href: "/solutions/business-loans",
        isWide: true
    },
    {
        title: "Invoice Finance",
        description: "Unlock up to 90% of your unpaid invoice value instantly. Perfect for B2B businesses with long payment terms.",
        icon: FileText,
        href: "/solutions/invoice-finance",
        isWide: true
    },
    {
        title: "Working Capital",
        description: "Quick cash injections for daily operations, stock purchases, or seasonal fluctuations.",
        icon: Wallet,
        href: "/solutions/working-capital"
    },
    {
        title: "Asset Finance",
        description: "Spread the cost of new equipment or vehicles over 1-5 years. Tax-efficient and fast.",
        icon: Truck,
        href: "/solutions/business-asset-equipment-finance"
    },
    {
        title: "Merchant Cash Advance",
        description: "Repay only when you sell. Based on your future credit card sales. No fixed monthly terms.",
        icon: CreditCard,
        href: "/solutions/merchant-cash-advance"
    },
    {
        title: "Commercial Property",
        description: "Bridging loans, development finance, and commercial mortgages up to £10M.",
        icon: Building,
        href: "/solutions/commercial-property-finance"
    },
    {
        title: "Growth Guarantee Scheme",
        description: "Government-backed funding to help UK small businesses scale and invest in the future.",
        icon: Shield,
        href: "/solutions/growth-guarantee-scheme"
    },
    {
        title: "Refinance",
        description: "Consolidate existing debts or release equity from owned assets to boost your cash flow.",
        icon: RefreshCw,
        href: "/solutions/refinance"
    }
];

export default function HomeProductsGrid() {
    return (
        <section className="py-28 bg-slate-50 relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-4"
                    >
                        <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest">Our Solutions</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-heading font-bold text-brand-midnight mb-6"
                    >
                        Tailored Finance for <br />
                        <span className="text-[#1CB5E0]">Every Stage of Growth</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-slate-500 font-body text-lg"
                    >
                        We compare 50+ specialist lenders to find the exact funding structure your business needs.
                        No one-size-fits-all, just results.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="bento-grid"
                >
                    {products.map((product, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className={`group ${product.isWide ? 'md:col-span-2' : ''}`}
                        >
                            <Link href={product.href} className="block h-full">
                                <div className="neuromorphic-card p-8 rounded-[32px] bg-white h-full border border-slate-100 hover-glow transition-all duration-500">
                                    <div className="flex flex-col h-full">
                                        <div className="feature-icon-wrapper mb-6 group-hover:bg-[#1CB5E0]/10 transition-colors">
                                            <product.icon className="w-6 h-6 text-[#1CB5E0]" />
                                        </div>
                                        <h3 className="text-xl font-heading font-bold text-brand-midnight mb-3">
                                            {product.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-[#1CB5E0] font-bold text-xs uppercase tracking-widest mt-auto group-hover:gap-4 transition-all">
                                            Learn More
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-16 text-center">
                    <p className="text-slate-400 text-sm mb-6">Can't find what you're looking for?</p>
                    <Link href="/contact" className="cta-button-ghost px-10 h-14 inline-flex items-center justify-center border-brand-midnight/10 text-brand-midnight hover:bg-slate-100">
                        View All Funding Options
                    </Link>
                </div>
            </div>
        </section>
    );
}
