"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Building2, Percent, TrendingUp } from "lucide-react";

interface StatProps {
    icon: any;
    value: string;
    label: string;
    suffix?: string;
}

function Counter({ value, suffix }: { value: string, suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Extract number from string (e.g., "200+" -> 200, "97%" -> 97)
    // For ranges like 24-48, we just return the string to avoid weird counting
    if (value.includes("-") || value.includes(".")) {
        return <span ref={ref} className="text-3xl font-heading font-black text-brand-midnight">{value}</span>;
    }

    const target = parseInt(value.replace(/[^0-9]/g, ""));
    const match = value.match(/^([^0-9]*)([0-9]+)(.*)$/);
    const prefix = match ? match[1] : "";
    const computedSuffix = match ? match[3] : "";

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const end = target;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isInView, target]);

    return (
        <span ref={ref} className="text-3xl font-heading font-black text-brand-midnight">
            {prefix}{count}{computedSuffix}
        </span>
    );
}


import Link from "next/link";

function StatCard({ icon: Icon, value, label }: StatProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="neuromorphic-card p-6 rounded-2xl flex flex-col items-center text-center gap-4 bg-white"
        >
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shadow-inner border border-slate-50">
                <Icon className="w-6 h-6 text-[#1CB5E0]" />
            </div>
            <div>
                {label.includes("Decision") ? (
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-heading font-black text-brand-midnight">24-48 hr</span>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                            Amount under £100,000<Link href="/terms" className="text-[#1CB5E0]">*</Link>
                        </span>
                    </div>
                ) : (
                    <>
                        {label === "Lender Partners" ? (
                            <p className="text-3xl font-heading font-black text-brand-midnight">50+</p>
                        ) : (
                            <Counter value={value} />
                        )}
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{label}</p>
                    </>
                )}
            </div>
        </motion.div>
    );
}

export default function HomeTrustBar() {
    const stats = [
        { icon: Clock, value: "24-48 hr", label: "Average Decision Time" },
        { icon: Percent, value: "6.9%", label: "Interest rate starting from" },
        { icon: TrendingUp, value: "£370M+", label: "Approval to Date" },
        { icon: Building2, value: "50+", label: "Lender Partners" },
    ];

    return (
        <section className="py-12 bg-white relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, idx) => (
                        <StatCard key={idx} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
}
