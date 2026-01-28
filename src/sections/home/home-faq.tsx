"use client";

import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "How do I get a business loan in the UK?",
        answer: "Apply online with basic financials. As a business finance broker, we compare lenders and present your best options — usually within 24–48 hours."
    },
    {
        question: "Can I get a business loan with bad credit?",
        answer: "Some lenders focus on trading performance over credit history. We'll review your situation and match you with lenders open to adverse credit applications."
    },
    {
        question: "What documents do I need?",
        answer: "Typically: 3–6 months of bank statements, basic company info, and details on how you'll use the funds."
    },
    {
        question: "Is there a credit check?",
        answer: "Our initial eligibility check has no impact on your credit score. Full checks happen only after you proceed with a lender."
    },
    {
        question: "How much can I borrow?",
        answer: "UK SMEs can access business loans from £10,000 to £10 million, depending on trading history and affordability."
    },
    {
        question: "How quickly can I receive funds?",
        answer: "Most of our clients receive funds within 48-72 hours of approval. Some products like Merchant Cash Advances can fund same-day."
    },
    {
        question: "What types of businesses do you work with?",
        answer: "We work with UK-registered businesses across all industries — from retail and hospitality to construction and professional services. Whether you're a sole trader or limited company, we can help."
    }
];

export default function HomeFaq() {
    return (
        <section className="py-24 bg-white relative">
            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })
                }}
            />

            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-6"
                    >
                        <HelpCircle className="w-4 h-4 text-[#1CB5E0]" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Help Center</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-heading font-bold text-brand-midnight mb-6"
                    >
                        Common Questions <br />
                        <span className="text-[#1CB5E0]">About Business Finance</span>
                    </motion.h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto space-y-4"
                >
                    <Accordion type="single" collapsible className="w-full space-y-6">
                        {faqs.map((faq, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <AccordionItem
                                    value={`item-${index}`}
                                    className="neuromorphic-card p-2 rounded-2xl bg-white border-none shadow-soft overflow-hidden group data-[state=open]:border-l-4 data-[state=open]:border-l-[#1CB5E0] transition-all"
                                >
                                    <AccordionTrigger className="text-left font-heading font-bold text-lg md:text-xl py-4 px-6 hover:no-underline hover:text-[#1CB5E0] transition-colors">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-500 font-body text-base px-6 pb-6 leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
