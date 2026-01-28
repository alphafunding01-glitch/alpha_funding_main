// Alpha Funding - Careers / Join Our Team Page
// Neuromorphic Design System
// Next.js + Tailwind CSS

"use client";

import { useState } from "react";
import {
    Layers, Zap, Users, DollarSign, CheckCircle, Calendar,
    MapPin, Briefcase, Clock, ArrowRight, Mail,
    Home, Heart, Star, Bell, Phone
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// NEUROMORPHIC STYLE CONSTANTS
// ═══════════════════════════════════════════════════════════════

const nmStyles = {
    // Light mode raised card
    raised: {
        background: '#E8EDF2',
        boxShadow: '8px 8px 16px rgba(15, 23, 42, 0.15), -8px -8px 16px rgba(255, 255, 255, 0.8)',
    },
    // Light mode pressed/inset
    pressed: {
        background: '#E8EDF2',
        boxShadow: 'inset 4px 4px 8px rgba(15, 23, 42, 0.15), inset -4px -4px 8px rgba(255, 255, 255, 0.8)',
    },
    // Dark mode raised
    darkRaised: {
        background: 'linear-gradient(145deg, #041250, #020d38)',
        boxShadow: '8px 8px 20px rgba(0, 0, 0, 0.4), -8px -8px 20px rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.03)',
    },
    // Floating (high elevation)
    float: {
        background: 'linear-gradient(145deg, #f0f5fa, #dfe4e9)',
        boxShadow: '20px 20px 40px rgba(15, 23, 42, 0.25), -20px -20px 40px rgba(255, 255, 255, 0.8)',
    },
};

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════

const stats = [
    { number: "60+", label: "Years Combined Experience" },
    { number: "50+", label: "Lender Partners" },
    { number: "£10M+", label: "Funding Facilitated" },
    { number: "24hrs", label: "Average Decision Time" },
];

const cultureItems = [
    { icon: Layers, title: "Real Impact", description: "Help UK businesses access the funding they need to grow. Every deal you close changes someone's life." },
    { icon: Zap, title: "Move Fast", description: "No red tape. No endless meetings. We make decisions quickly and trust our people to execute." },
    { icon: Users, title: "Great People", description: "Work alongside experienced professionals who are generous with their knowledge and time." },
    { icon: DollarSign, title: "Competitive Earnings", description: "Base salary plus uncapped commission. Top performers earn significantly above market rate." },
    { icon: CheckCircle, title: "Growth Path", description: "Clear progression from entry level to senior roles. We promote from within whenever possible." },
    { icon: Calendar, title: "Flexibility", description: "Hybrid working options. We care about results, not where you sit." },
];

const jobs = [
    { id: 1, title: "Business Development Manager", location: "London / Hybrid", department: "Sales", type: "Full-time" },
    { id: 2, title: "Senior Account Manager", location: "London / Hybrid", department: "Sales", type: "Full-time" },
    { id: 3, title: "Operations Coordinator", location: "London", department: "Operations", type: "Full-time" },
];

const perks = [
    { icon: DollarSign, title: "Uncapped Commission", desc: "No ceiling on your earnings" },
    { icon: Home, title: "Hybrid Working", desc: "Office + remote flexibility" },
    { icon: CheckCircle, title: "Training Programme", desc: "Learn from industry experts" },
    { icon: Calendar, title: "25 Days Holiday", desc: "Plus bank holidays" },
    { icon: Heart, title: "Health Benefits", desc: "Private healthcare options" },
    { icon: Users, title: "Team Events", desc: "Regular socials & away days" },
    { icon: Star, title: "Performance Bonuses", desc: "Quarterly recognition awards" },
    { icon: Bell, title: "Early Friday Finish", desc: "4pm finish on Fridays" },
];

const processSteps = [
    { number: 1, title: "Apply Online", description: "Submit your CV and a brief note about why you're interested." },
    { number: 2, title: "Quick Call", description: "20-minute chat with our team to learn more about each other." },
    { number: 3, title: "Meet the Team", description: "In-person or video interview with your potential manager." },
    { number: 4, title: "Offer & Start", description: "Fast decisions. Usually within 48 hours of final interview." },
];

const filters = ["All Roles", "Sales", "Operations", "Marketing", "Technology"];

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
    return (
        <div
            className={`p-7 text-center rounded-2xl transition-all duration-300 hover:-translate-y-1 ${index === 1 || index === 3 ? 'translate-y-5' : ''
                }`}
            style={{
                ...nmStyles.darkRaised,
                animation: `float 6s ease-in-out infinite`,
                animationDelay: `${index * 0.5}s`,
            }}
        >
            <div className="font-heading text-4xl bg-gradient-to-r from-brand-cyan to-brand-cyan-light bg-clip-text text-transparent mb-1">
                {stat.number}
            </div>
            <div className="text-sm text-slate-200">{stat.label}</div>
        </div>
    );
}

function CultureCard({ item }: { item: typeof cultureItems[0] }) {
    const Icon = item.icon;
    return (
        <div
            className="p-9 rounded-3xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
            style={nmStyles.raised}
        >
            {/* Hover accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan to-brand-cyan-light opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Inset icon */}
            <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={nmStyles.pressed}
            >
                <Icon className="w-7 h-7 text-brand-cyan" />
            </div>

            <h3 className="font-heading text-xl text-brand-midnight mb-3">{item.title}</h3>
            <p className="text-slate-gray text-[15px] leading-relaxed">{item.description}</p>
        </div>
    );
}

function JobCard({ job }: { job: typeof jobs[0] }) {
    return (
        <a
            href={`/careers/${job.id}`}
            className="grid grid-cols-[1fr_auto] items-center gap-6 p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 group"
            style={nmStyles.darkRaised}
        >
            <div>
                <h3 className="font-heading text-xl text-white mb-2">{job.title}</h3>
                <div className="flex gap-4 flex-wrap">
                    <span className="text-slate-300 text-sm flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 opacity-70" />
                        {job.location}
                    </span>
                    <span className="text-slate-300 text-sm flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 opacity-70" />
                        {job.department}
                    </span>
                    <span className="text-slate-300 text-sm flex items-center gap-1.5">
                        <Clock className="w-4 h-4 opacity-70" />
                        {job.type}
                    </span>
                </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan transition-all group-hover:bg-brand-cyan group-hover:text-brand-midnight">
                <ArrowRight className="w-5 h-5" />
            </div>
        </a>
    );
}

function PerkCard({ perk }: { perk: typeof perks[0] }) {
    const Icon = perk.icon;
    return (
        <div
            className="p-8 text-center rounded-2xl transition-all duration-300 hover:-translate-y-1"
            style={nmStyles.raised}
        >
            <div
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-5"
                style={nmStyles.pressed}
            >
                <Icon className="w-7 h-7 text-brand-cyan" />
            </div>
            <h4 className="font-heading text-base text-brand-midnight mb-2">{perk.title}</h4>
            <p className="text-sm text-slate-gray">{perk.desc}</p>
        </div>
    );
}

function ProcessStep({ step, isLast }: { step: typeof processSteps[0]; isLast: boolean }) {
    return (
        <div className="flex flex-col items-center text-center relative z-10 flex-1">
            <div
                className="w-20 h-20 rounded-full flex items-center justify-center font-heading text-3xl text-brand-cyan mb-5 transition-all duration-300 hover:bg-brand-cyan hover:text-white hover:shadow-[0_8px_30px_rgba(28,181,224,0.4)] cursor-pointer"
                style={nmStyles.raised}
            >
                {step.number}
            </div>
            <h4 className="font-heading text-lg text-brand-midnight mb-2">{step.title}</h4>
            <p className="text-sm text-slate-gray max-w-[180px]">{step.description}</p>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function CareersPageContent() {
    const [activeFilter, setActiveFilter] = useState("All Roles");

    const filteredJobs = activeFilter === "All Roles"
        ? jobs
        : jobs.filter(job => job.department === activeFilter);

    return (
        <main>
            {/* ════════════════════════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════════════════════════ */}
            <section className="bg-gradient-hero min-h-[70vh] flex items-center relative overflow-hidden">
                {/* Background glows */}
                <div className="absolute top-[-50%] right-[-20%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(28,181,224,0.1)_0%,transparent_70%)] rounded-full" />
                <div className="absolute bottom-[-30%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(217,70,239,0.08)_0%,transparent_70%)] rounded-full" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center py-20">
                        {/* Left: Content */}
                        <div>
                            {/* Badge */}
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan-light text-sm font-medium mb-6">
                                <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" />
                                We're Hiring
                            </span>

                            <h1 className="font-heading text-5xl lg:text-6xl text-white mb-5 leading-tight">
                                Build the Future of<br />
                                <span className="bg-gradient-to-r from-brand-cyan to-brand-cyan-light bg-clip-text text-transparent">
                                    Business Finance
                                </span>
                            </h1>

                            <p className="text-lg text-slate-200 mb-8 max-w-lg">
                                Join a team that's transforming how UK businesses access funding.
                                We're looking for ambitious people who want to make a real impact.
                            </p>

                            <div className="flex gap-4 flex-wrap">
                                <a href="#positions" className="inline-flex items-center gap-2 px-7 py-4 bg-brand-cyan text-brand-midnight font-semibold rounded-xl transition-all hover:bg-brand-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(28,181,224,0.4)]">
                                    View Open Roles
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                                <a href="#culture" className="inline-flex items-center gap-2 px-7 py-4 border border-white/20 text-white font-medium rounded-xl transition-all hover:bg-white/5 hover:border-white/30">
                                    Learn About Us
                                </a>
                            </div>
                        </div>

                        {/* Right: Stat cards */}
                        <div className="grid grid-cols-2 gap-5">
                            {stats.map((stat, i) => (
                                <StatCard key={i} stat={stat} index={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════
          WHY JOIN US SECTION
          ════════════════════════════════════════════════════════════ */}
            <section id="culture" className="py-24" style={{ background: '#E8EDF2' }}>
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span
                            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-4"
                            style={nmStyles.pressed}
                        >
                            Why Alpha Funding
                        </span>
                        <h2 className="font-heading text-4xl text-brand-midnight mb-4">
                            More Than Just a Job
                        </h2>
                        <p className="text-lg text-slate-gray max-w-xl mx-auto">
                            We're building something special — a company where great people
                            do meaningful work and grow together.
                        </p>
                    </div>

                    {/* Culture Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cultureItems.map((item, i) => (
                            <CultureCard key={i} item={item} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════
          OPEN POSITIONS SECTION
          ════════════════════════════════════════════════════════════ */}
            <section id="positions" className="py-24 bg-gradient-hero">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-brand-cyan-light bg-brand-cyan/10 border border-brand-cyan/20 mb-4">
                            Open Positions
                        </span>
                        <h2 className="font-heading text-4xl text-white mb-4">
                            Find Your Role
                        </h2>
                        <p className="text-lg text-slate-200 max-w-xl mx-auto">
                            Explore current opportunities to join the Alpha Funding team.
                        </p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex justify-center gap-3 mb-12 flex-wrap">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeFilter === filter
                                    ? 'bg-brand-cyan text-brand-midnight shadow-[0_4px_20px_rgba(28,181,224,0.3)]'
                                    : 'text-slate-300 hover:text-white'
                                    }`}
                                style={activeFilter !== filter ? nmStyles.darkRaised : {}}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Jobs Grid */}
                    <div className="flex flex-col gap-5 max-w-3xl mx-auto">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))
                        ) : (
                            <div className="text-center py-16">
                                <div
                                    className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6"
                                    style={nmStyles.darkRaised}
                                >
                                    <Briefcase className="w-9 h-9 text-brand-cyan" />
                                </div>
                                <h3 className="font-heading text-2xl text-white mb-3">
                                    No Open Positions Right Now
                                </h3>
                                <p className="text-slate-300 mb-6">
                                    We're not currently hiring for this department, but we're always interested in meeting talented people.
                                </p>
                                <a href="#cta" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-cyan text-brand-midnight font-semibold rounded-xl">
                                    Send Speculative Application
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════
          PERKS SECTION
          ════════════════════════════════════════════════════════════ */}
            <section className="py-24" style={{ background: '#E8EDF2' }}>
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span
                            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-4"
                            style={nmStyles.pressed}
                        >
                            Benefits
                        </span>
                        <h2 className="font-heading text-4xl text-brand-midnight mb-4">
                            Perks of the Job
                        </h2>
                        <p className="text-lg text-slate-gray max-w-xl mx-auto">
                            We take care of our team so they can focus on taking care of our clients.
                        </p>
                    </div>

                    {/* Perks Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {perks.map((perk, i) => (
                            <PerkCard key={i} perk={perk} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════
          HIRING PROCESS SECTION
          ════════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-slate-tint">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span
                            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-4"
                            style={nmStyles.pressed}
                        >
                            How It Works
                        </span>
                        <h2 className="font-heading text-4xl text-brand-midnight mb-4">
                            Our Hiring Process
                        </h2>
                        <p className="text-lg text-slate-gray max-w-xl mx-auto">
                            Simple, fast, and respectful of your time. Most candidates complete the process within 2 weeks.
                        </p>
                    </div>

                    {/* Process Track */}
                    <div className="relative flex justify-between max-w-4xl mx-auto">
                        {/* Track line */}
                        <div
                            className="absolute top-10 left-20 right-20 h-1 rounded hidden md:block"
                            style={nmStyles.pressed}
                        />

                        {processSteps.map((step, i) => (
                            <ProcessStep key={i} step={step} isLast={i === processSteps.length - 1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════
          CTA SECTION
          ════════════════════════════════════════════════════════════ */}
            <section id="cta" className="py-24" style={{ background: '#E8EDF2' }}>
                <div className="container mx-auto px-6">
                    <div
                        className="max-w-3xl mx-auto p-16 rounded-[2rem] text-center relative overflow-hidden"
                        style={nmStyles.float}
                    >
                        {/* Decorative glow */}
                        <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(28,181,224,0.1)_0%,transparent_70%)] rounded-full" />

                        <h2 className="font-heading text-3xl text-brand-midnight mb-4 relative">
                            Don't See the Right Role?
                        </h2>
                        <p className="text-lg text-slate-gray mb-8 max-w-lg mx-auto relative">
                            We're always interested in meeting talented people. Send us your CV
                            and tell us what you're looking for.
                        </p>
                        <a
                            href="mailto:careers@alphafunding.co.uk"
                            className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-brand-midnight rounded-xl transition-all hover:-translate-y-0.5"
                            style={{
                                background: 'linear-gradient(145deg, #1ecff0, #18a3c8)',
                                boxShadow: '6px 6px 12px rgba(15, 23, 42, 0.15), -6px -6px 12px rgba(255, 255, 255, 0.8)',
                            }}
                        >
                            Send Your CV
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Global Styles for Animations */}
            <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
        </main>
    );
}
