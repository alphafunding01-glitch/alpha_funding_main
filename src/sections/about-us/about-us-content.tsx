"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, TrendingUp, Users, Clock, ShieldCheck, Phone, Handshake, FileText, Zap, Award, Target } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LeadMagnetDialog from "@/sections/common/lead-magnet-dialog";

// --- Components ---

const FadeIn = ({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className={className}
    >
        {children}
    </motion.div>
);

const Section = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => (
    <section id={id} className={cn("py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto", className)}>
        {children}
    </section>
);

// --- Sections ---

const Hero = () => (
    // Updated background gradient as requested (matching Home Page / Brand Theme)
    <section className="relative bg-linear-to-br from-[#000428] via-[#004e92] to-brand-cyan text-white py-32 md:py-40 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
            <FadeIn>
                <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white text-sm font-semibold mb-6 border border-white/20">
                    UK Commercial Finance Broker
                </span>
            </FadeIn>
            <FadeIn delay={0.1}>
                <h1 className="text-5xl md:text-7xl font-heading mb-8 leading-tight text-white drop-shadow-sm">
                    You Built Your Business.<br />
                    <span className="text-[#67E8F9]">We Help You Fund What's Next.</span>
                </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
                <p className="text-xl md:text-2xl text-slate-100 max-w-3xl mx-auto mb-10 font-body leading-relaxed">
                    Alpha Funding connects UK businesses with the right finance—fast. No runaround. No radio silence. Just expert guidance and funding decisions in 24-48 hours.
                </p>
            </FadeIn>
            <FadeIn delay={0.3} className="flex flex-wrap justify-center gap-4">
                {/* Replaced "Get Your Free Consultation" with Lead Magnet Trigger */}
                <LeadMagnetDialog>
                    <Button
                        size="lg"
                        className={cn("bg-brand-cyan text-[#000428] hover:bg-brand-cyan/90 text-lg px-8 py-6 h-auto font-bold rounded-full shadow-lg shadow-brand-cyan/20 transition-transform hover:scale-105")}
                    >
                        Download Free Guide
                    </Button>
                </LeadMagnetDialog>
                {/* Updated Phone Number link */}
                <Link href="tel:+4402070787446" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "border-white text-primary bg-white hover:bg-white/90 text-lg px-8 py-6 h-auto font-bold rounded-full")}>
                    Call Us
                </Link>
            </FadeIn>
        </div>
    </section>
);

const StatsBar = () => {
    const stats = [
        { label: "Funding Available", value: "£10k – £10M", icon: TrendingUp },
        { label: "Fast Decisions", value: "24-48hrs", icon: Clock },
        { label: "Combined Experience", value: "60+ Years", icon: Award },
        { label: "Lender Partners", value: "50+", icon: Handshake },
    ];

    return (
        <div className="bg-white border-b border-slate-100 shadow-sm relative z-20 -mt-8 mx-4 md:mx-auto max-w-6xl rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
                <FadeIn key={index} delay={index * 0.1} className="flex items-center gap-4 justify-center md:justify-start">
                    <div className="p-3 bg-[#000428]/5 rounded-xl text-[#000428]">
                        <stat.icon className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-[#000428] font-heading">{stat.value}</div>
                        <div className="text-slate-500 font-medium text-sm">{stat.label}</div>
                    </div>
                </FadeIn>
            ))}
        </div>
    );
};

const OurStory = () => (
    <Section className="grid lg:grid-cols-2 gap-16 items-center">
        <FadeIn>
            <h2 className="text-4xl md:text-5xl font-heading text-[#000428] mb-6">
                We Started Alpha Funding Because Getting Business Finance Shouldn't Feel Like a Fight
            </h2>
            <div className="space-y-6 text-lg text-slate-600 font-body leading-relaxed">
                <p>
                    In 2020, we saw the same story play out too many times: business owners spending weeks chasing finance—filling out endless forms, fielding vague offers, and waiting by the phone for lenders who never called back.
                </p>
                <p>
                    Meanwhile, the bills kept coming. Opportunities slipped away. And too many good businesses heard "no" from their bank—even when they had strong cases.
                </p>
                <p className="font-bold text-[#000428] text-xl">
                    We knew there had to be a better way.
                </p>
                <p>
                    So we built Alpha Funding. With over 60 years of combined experience in commercial finance, our team set out to do something different: make business funding straightforward, honest, and actually built around your goals.
                </p>
                <p>
                    Since then, we've helped businesses across the UK—from London to Manchester, Birmingham to Glasgow—secure the funding they needed to invest, grow, and move forward with confidence.
                </p>
            </div>
        </FadeIn>
        <FadeIn delay={0.2}>
            <div className="bg-[#000428] text-white p-10 rounded-3xl relative overflow-hidden">
                <div className="relative z-10">
                    <QuoteIcon className="w-12 h-12 text-brand-cyan mb-6 opacity-50" />
                    <blockquote className="text-2xl font-heading leading-relaxed mb-6">
                        "32% of UK SMEs successfully funded through commercial finance brokers had previously been declined funding elsewhere. We specialise in turning those 'no's into 'yes's."
                    </blockquote>
                    <cite className="not-italic text-brand-cyan font-semibold block">
                        — NACFB Industry Report, 2024
                    </cite>
                </div>
                {/* Abstract Background Shape */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D946EF]/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
            </div>
        </FadeIn>
    </Section>
);

const WhatWeDo = () => {
    const cards = [
        {
            title: "Access Funding You Can't Get Directly",
            content: "Many specialist lenders—including challenger banks with competitive rates—only work through brokers. We open doors your bank simply won't.",
            icon: Target
        },
        {
            title: "Skip the Paperwork Maze",
            content: "One conversation with us replaces dozens of applications. We know which lenders suit your situation—and which ones will waste your time.",
            icon: FileText
        },
        {
            title: "Get Expert Negotiation",
            content: "We don't just find funding—we negotiate better rates and terms on your behalf. Our relationships with lenders mean deals you couldn't get alone.",
            icon: Handshake
        }
    ];

    return (
        <div className="bg-slate-50 py-24">
            <Section>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-heading text-[#000428] mb-6">What We Actually Do <span className="text-slate-400 block text-3xl mt-2">(And Why It Matters)</span></h2>
                        <p className="text-xl text-slate-600">We're not a bank. We're not a lender. We're your guide through the UK's £38 billion commercial finance market—matching your business with the right funding from our network of 50+ specialist lenders.</p>
                    </FadeIn>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {cards.map((card, i) => (
                        <FadeIn key={i} delay={i * 0.1} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                            <div className="w-14 h-14 bg-brand-cyan/10 rounded-xl flex items-center justify-center text-brand-cyan mb-6 group-hover:scale-110 transition-transform duration-300">
                                <card.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#000428] mb-4 font-heading">{card.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">{card.content}</p>
                        </FadeIn>
                    ))}
                </div>
            </Section>
        </div>
    );
}

const Values = () => {
    const values = [
        { title: "Radical Transparency", desc: "No hidden fees. No surprise charges. We'll tell you exactly what funding will cost before you commit.", icon: ShieldCheck },
        { title: "Speed That Respects Your Time", desc: "Business doesn't wait. We provide lending decisions within 24-48 hours—not weeks.", icon: Zap },
        { title: "Solutions, Not Products", desc: "We don't push products to hit quotas. We match the solution to your actual needs.", icon: Target },
        { title: "Your Success Is How We're Measured", desc: "We only get paid when you get funded. Our incentive is to find you the right deal.", icon: Trophy }
    ];

    return (
        <Section className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="sticky top-24">
                <FadeIn>
                    <h2 className="text-4xl md:text-6xl font-heading text-[#000428] mb-8">How We Work</h2>
                    <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                        Every funding conversation starts with understanding your business—not just your numbers. These principles guide how we work with every client.
                    </p>
                    {/* Updated Link to Contact */}
                    <Link href="/contact" className={cn(buttonVariants({ variant: "default" }), "bg-[#000428] text-white hover:bg-[#000428]/90 text-lg px-8 py-6 h-auto rounded-full")}>
                        Start Your Journey
                    </Link>
                </FadeIn>
            </div>
            <div className="space-y-8">
                {values.map((val, i) => (
                    <FadeIn key={i} delay={i * 0.1} className="flex gap-6 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-brand-cyan/30 transition-colors">
                        <div className="shrink-0 p-4 bg-[#000428]/5 rounded-full h-fit text-[#000428]">
                            <val.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[#000428] mb-2 font-heading">{val.title}</h3>
                            <p className="text-slate-600 text-lg">{val.desc}</p>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </Section>
    )
}

const Services = () => {
    //  Updated Links to point to specific solution pages
    const services = [
        { title: "Cash Flow Finance", desc: "Keep your business moving when payments are delayed. Invoice finance, factoring, and working capital solutions from £10,000 to £10 million.", icon: TrendingUp, href: "/solutions/invoice-finance" },
        { title: "Business Cash Advance", desc: "Fast, flexible funding based on your card sales. Repay as a small percentage of daily takings—when times are slow, so are your repayments.", icon: Zap, href: "/solutions/business-cash-advance" },
        { title: "Property & Asset Finance", desc: "Bridging loans, commercial mortgages, and development finance. Unlock capital tied up in property or fund your next acquisition.", icon: Users, href: "/solutions/property-finance" },
    ];

    return (
        // Updated background to gradient to "keep it for next sections as well"
        <div className="bg-linear-to-br from-[#000428] to-[#0F172A] text-white py-24 relative overflow-hidden">
            {/* Subtle background element to match theme */}
            <div className="absolute top-0 right-0 w-125 h-125 bg-brand-cyan/5 rounded-full blur-3xl -mr-64 -mt-64"></div>

            <Section className="relative z-10">
                <div className="text-center mb-16">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-heading mb-6">Funding Solutions for Every Business Challenge</h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">Whether you need to bridge a cash flow gap, invest in equipment, or seize a growth opportunity, we connect you with the right finance.</p>
                    </FadeIn>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((svc, i) => (
                        <FadeIn key={i} delay={i * 0.1} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors backdrop-blur-sm group">
                            <div className="w-14 h-14 bg-brand-cyan rounded-xl flex items-center justify-center text-[#000428] mb-8 group-hover:scale-110 transition-transform">
                                <svc.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 font-heading">{svc.title}</h3>
                            <p className="text-slate-300 mb-8 h-24">{svc.desc}</p>
                            <Link href={svc.href} className="text-brand-cyan font-bold flex items-center gap-2 hover:gap-3 transition-all group-hover:text-white">
                                Explore Solution <ArrowRight className="w-4 h-4" />
                            </Link>
                        </FadeIn>
                    ))}
                </div>
                <div className="mt-16 text-center">
                    {/* Updated Link to Solutions Index Page */}
                    <Link href="/solutions" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "bg-transparent border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-[#000428] text-lg px-8 py-6 h-auto font-bold rounded-full")}>
                        Explore All Solutions
                    </Link>
                </div>
            </Section>
        </div>
    )
}

const CTA = () => (
    <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
                <h2 className="text-4xl md:text-6xl font-heading text-[#000428] mb-8">Ready to Talk Funding?</h2>
                <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                    No obligation. No pressure. Just an honest conversation about your options. Find out in minutes what funding you could access—without affecting your credit score.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    {/* Replaced CTA with Lead Magnet Trigger */}
                    <LeadMagnetDialog>
                        <Button
                            size="lg"
                            className={cn("bg-brand-cyan text-[#000428] hover:bg-brand-cyan/90 text-lg px-8 py-6 h-auto font-bold rounded-full shadow-lg shadow-brand-cyan/20 transition-transform hover:scale-105")}
                        >
                            Download Free Guide
                        </Button>
                    </LeadMagnetDialog>
                    {/* Updated Phone Number link */}
                    <Link href="tel:+4402070787446" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "bg-white text-[#000428] border-slate-200 hover:bg-slate-50 text-lg px-8 py-6 h-auto font-bold rounded-full")}>
                        Call Us: 020 7078 7446
                    </Link>
                </div>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-slate-500 font-medium opacity-80">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-brand-cyan" /> Authorised under applicable regulations
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-brand-cyan" /> No Upfront Fees
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {/* Simple visual representation of UK map or just text */}
                            <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>
                            <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white"></div>
                        </div>
                        London Based, UK Wide
                    </div>
                </div>
            </FadeIn>
        </div>
    </section>
)

// --- Icons ---

const QuoteIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 21L14.017 18C14.017 16.896 14.353 15.925 15.025 15.087C15.697 14.249 16.863 13.535 18.523 12.945L18.885 13.06L17.555 12.261L18.17 11.238C17.408 11.259 16.732 11.168 16.142 10.965C15.552 10.762 15.109 10.457 14.813 10.05C14.516 9.643 14.368 9.155 14.368 8.586C14.368 7.973 14.598 7.457 15.058 7.039C15.518 6.621 16.121 6.412 16.867 6.412C17.653 6.412 18.271 6.643 18.721 7.105C19.171 7.567 19.396 8.163 19.396 8.894C19.396 9.771 19.166 10.669 18.706 11.588C18.246 12.507 17.57 13.435 16.678 14.372C15.786 15.309 14.899 16.096 14.017 16.733L14.017 21ZM6.009 21L6.009 18C6.009 16.896 6.345 15.925 7.017 15.087C7.689 14.249 8.855 13.535 10.515 12.945L10.877 13.06L9.547 12.261L10.162 11.238C9.4 11.259 8.724 11.168 8.134 10.965C7.544 10.762 7.101 10.457 6.805 10.05C6.508 9.643 6.36 9.155 6.36 8.586C6.36 7.973 6.59 7.457 7.05 7.039C7.51 6.621 8.113 6.412 8.859 6.412C9.645 6.412 10.263 6.643 10.713 7.105C11.163 7.567 11.388 8.163 11.388 8.894C11.388 9.771 11.158 10.669 10.698 11.588C10.238 12.507 9.562 13.435 8.67 14.372C7.778 15.309 6.891 16.096 6.009 16.733L6.009 21Z" /></svg>
)

const Trophy = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
)


export default function AboutUsContent() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Hero />
            <StatsBar />
            <OurStory />
            <WhatWeDo />
            <Values />
            <Services />
            <CTA />
        </div>
    );
}
