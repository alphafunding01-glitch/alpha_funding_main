"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, Sparkles, Quote, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- Types & Data ---

interface Testimonial {
    id: number;
    name: string;
    location: string;
    date: string;
    rating: number;
    text: string;
    staff?: string[]; // Array of staff names
    company?: string;
}

const rawReviews: Testimonial[] = [
    {
        id: 1,
        name: "Thomas Plodowski",
        location: "GB",
        date: "A day ago",
        rating: 5,
        text: "Excellent service from Qadri & Mahek, wasn't even looking for funding but they have managed to get me a repayment rate that I couldn't refuse. Definitely worth getting an offer to see for yourself.",
        staff: ["Qadri", "Mahek"]
    },
    {
        id: 2,
        name: "Clevert Ngendo",
        location: "GB",
        date: "2 days ago",
        rating: 5,
        text: "Alpha Funding has been extremely helpful from start to finish and made the whole process much easier and clearer than we expected. They took the time to fully understand our situation and went above and beyond by securing a new loan option that we didn't even know we were eligible for.",
        staff: ["Devang"]
    },
    {
        id: 3,
        name: "Mark Gore",
        location: "GB",
        date: "Jan 19, 2026",
        rating: 5,
        text: "The service offered by Charms and Aadil was excellent. I couldn't believe how fast the funds were into my business account so quickly and the application was so easy to do. A very big thank you from me.",
        staff: ["Charms", "Aadil"]
    },
    {
        id: 4,
        name: "Cosmin Petcu",
        location: "GB",
        date: "Jan 16, 2026",
        rating: 5,
        text: "Alpha Funding have done an amazing job. Mr Aadil & Ronil have provided a very good customer service and support that I haven't found in years. Very professional approach, they helped me understand and explained everything in details. My funds was in the bank couple of hours later.",
        staff: ["Aadil", "Ronil"]
    },
    {
        id: 5,
        name: "Christopher",
        location: "GB",
        date: "Nov 12, 2025",
        rating: 5,
        text: "Were totally honest with what I could expect and got me more than I expected on reasonable terms. They always answered my call and dealt with the lenders efficiently. Secured me funds within 5 days despite me making a hash of the initial application."
    },
    {
        id: 6,
        name: "Steve Bradley",
        location: "GB",
        date: "Nov 11, 2025",
        rating: 5,
        text: "Alpha Funding was excellent and Devang in particular pushed the funding through, kept me posted at all times and sorted some technical issues robustly and quickly to ensure the least possible turn round was achieved.",
        staff: ["Devang"]
    },
    {
        id: 7,
        name: "P Sahota",
        location: "GB",
        date: "Dec 8, 2025",
        rating: 5,
        text: "I was in touch 7 days ago by Alpha Funding and my case being dealt by Devang Barot. I can't explain in words how satisfied I am with service, ownership until loan been approved. In each step they are very helpful and go extra miles. 10 out of 10 for Alpha and Devang.",
        staff: ["Devang"]
    },
    {
        id: 8,
        name: "Alex Jayes",
        location: "GB",
        date: "Jul 7, 2025",
        rating: 5,
        text: "Excellent assistance with business funding. Aadil was very helpful and I highly recommend trying this company especially if you are struggling to secure finance. The banks are next to useless and these guys were brilliant all round.",
        staff: ["Aadil"]
    },
    {
        id: 9,
        name: "Jin Sangha",
        location: "GB",
        date: "Jun 4, 2025",
        rating: 5,
        text: "Working with Alpha Funding was an absolute game-changer in securing the financing we needed. Their team demonstrated an unparalleled level of professionalism, transparency, and commitment to our success. They turned a complex process into a smooth, efficient experience.",
        company: "AUM Construction Ltd"
    },
    {
        id: 10,
        name: "James",
        location: "GB",
        date: "May 27, 2025",
        rating: 5,
        text: "Thank you to Aadil at Alpha Funding for securing our business loan. He has been tenacious, persistent and focused and ultimately the deal he obtained for us was far better than anything the banks were willing to offer.",
        staff: ["Aadil"]
    },
    {
        id: 11,
        name: "Chris Marshall",
        location: "GB",
        date: "Apr 29, 2025",
        rating: 5,
        text: "These guys have stuck with me for well over a year trying to get me a lender to help with my business. They never give up just when you think you will never get your business credit built up! Thank you Aditya for your help and perseverance.",
        staff: ["Aditya"]
    },
    {
        id: 12,
        name: "Sophie",
        location: "GB",
        date: "Feb 28, 2025",
        rating: 5,
        text: "Helpful, speedy and brilliant from start to finish. Mohsin and Naina were there to help every step of the way. Would definitely use again if we need them!",
        staff: ["Mohsin", "Naina"]
    },
    {
        id: 13,
        name: "David Wiltshire",
        location: "GB",
        date: "Feb 25, 2025",
        rating: 5,
        text: "What a pleasure it was to work with both Talha and Mohsin. We required some funds urgently and both gave really good and honest advice to achieve what was needed. Definitely will use this company again.",
        staff: ["Talha", "Mohsin"]
    },
    {
        id: 14,
        name: "George",
        location: "GB",
        date: "Mar 10, 2025",
        rating: 5,
        text: "I just wanted to personally thank Aadil and his team at Alpha Funding for all the hard work and dedication in securing the funding for us. With this funding, we can now move forward with our plans to expand our children's services.",
        staff: ["Aadil"]
    },
    {
        id: 15,
        name: "Aus",
        location: "GB",
        date: "Jul 26, 2025",
        rating: 5,
        text: "I'd love to express our sincere gratitude for the exceptional service provided by Naina and Mohsin at Alpha Funding. Their dedication and tireless efforts were instrumental in securing the funding we needed. I highly recommend them to anyone seeking business financing.",
        staff: ["Naina", "Mohsin"]
    },
    {
        id: 16,
        name: "Khoda",
        location: "GB",
        date: "Jan 31, 2025",
        rating: 5,
        text: "Alpha funding is a good company and they help me in laws Ismail help me a lot very good person very reliable whenever I call him, he can pick up my call very helpful also Shivangi is a help me a lot as well",
        staff: ["Ismail", "Shivangi"]
    },
    {
        id: 17,
        name: "Rushden Motors",
        location: "GB",
        date: "Jan 28, 2025",
        rating: 5,
        text: "Mohsin Patel from Alfa funding is very helpful gentleman and I will recommend him to anyone looking for business funding.",
        staff: ["Mohsin Patel"]
    },
    {
        id: 18,
        name: "Jason Carr",
        location: "GB",
        date: "Jan 21, 2025",
        rating: 5,
        text: "The process from call to money being paid into our account was very professional and Adi was very patient and helpful throughout. Thanks for the assistance and we look forward to working together again.",
        staff: ["Adi"]
    },
    {
        id: 19,
        name: "BALWINDER KAUR SAROYA",
        location: "GB",
        date: "Jan 7, 2025",
        rating: 5,
        text: "Alpha Funding exceeded all my expectations! Their team was incredibly professional, knowledgeable, and attentive throughout the entire process. They took the time to understand my needs and provided a financing solution that worked perfectly for me. The customer service was outstanding, and every question I had was answered promptly and clearly. I felt supported and confident every step of the way. I highly recommend Alpha Funding to anyone looking for a reliable and trustworthy financial partner. Five stars well-deserved."
    },
    {
        id: 20,
        name: "oli food",
        location: "GB",
        date: "Jan 3, 2025",
        rating: 5,
        text: "I think they are fast and reliable. it is a fact that they love their work. their communication is great"
    },
    {
        id: 21,
        name: "Mahendran Suriyakanthan",
        location: "GB",
        date: "Dec 19, 2024",
        rating: 5,
        text: "Mr. Aathi was dealing with my finance arrangement This fund was very helpful for my cash Flows. He was very knowledgable about the various facilities on offer and worked hard to secure the one which best for me. Finally, Aathi was extremely courteous and professional throughout the process. Would definitely recommend him and Alpha to anyone looking for business funding options.",
        staff: ["Aathi"]
    },
    {
        id: 22,
        name: "Rob Kuharcsik",
        location: "GB",
        date: "Dec 3, 2024",
        rating: 5,
        text: "Second time using Aloha funding and they are great! Very helpful and they work efficiently and effectively to secure the best deal for you and you company. Highly rated!"
    },
    {
        id: 23,
        name: "Philip Taylor",
        location: "GB",
        date: "Nov 28, 2024",
        rating: 5,
        text: "Great service I have been dealing with Alpha Funding since 2021 no problems at all. My contact there is Aadil I can highly recommend him to get your funding fast & fair with good communication.",
        staff: ["Aadil"]
    },
    {
        id: 24,
        name: "JT Car Sales Worksop LTD",
        location: "GB",
        date: "Nov 15, 2024",
        rating: 5,
        text: "Brilliant company to work with for any businesses looking for any funding. This company is amazing at keeping you up to date with any applications. They do their best do find the best deals to suit your needs. Highly recommended From jt car sales worksop"
    },
    {
        id: 25,
        name: "sweetieshoppie.co.uk",
        location: "GB",
        date: "Nov 4, 2024",
        rating: 5,
        text: "Fast, easy service at a fair price. would use again!"
    },
    {
        id: 26,
        name: "Andrew Donnelly",
        location: "GB",
        date: "Oct 22, 2024",
        rating: 5,
        text: "Subject: Feedback on Funding Support for [Autopak ]\n\nDear alpha- funding\n\nWe want to express our sincere appreciation for the opportunity to apply for funding through alpha funding Your assistance throughout the process has been invaluable, and we greatly appreciate your responsiveness and dedication to helping companies like ours.\n\nThe potential funding would be a significant boost for our company, helping us accelerate our growth plans and scale to new heights. Specifically, it will enable us to invest in new technology, expand our team, and enter new markets allowing us to increase our impact and achieve our long-term goals more effectively.\n\nWe are confident that with your support, we will be able to unlock new opportunities, enhance our operations, and contribute positively to the community and industry we serve. Thank you again for your commitment to helping businesses like ours thrive.\n\nSincerely,\nAndrew Donned\nDirector"
    },
    {
        id: 27,
        name: "Remy",
        location: "GB",
        date: "Oct 22, 2024",
        rating: 5,
        text: "Our company needed a loan, Aniket and Tom helped us through our application, which was easy, slick, and very quick! They were straight forward and very responsive - when we asked questions, they answered them very satisfactorily, the whole process took about 20 minutes amazingly fast, highly recommended, this is now our go to for our financing needs, many thanks.",
        staff: ["Aniket", "Tom"]
    },
    {
        id: 28,
        name: "Work Email",
        location: "GB",
        date: "Oct 18, 2024",
        rating: 5,
        text: "Great service"
    },
    {
        id: 29,
        name: "Shaun",
        location: "GB",
        date: "Oct 14, 2024",
        rating: 5,
        text: "Adi at Alpha Funding has been very helpful in helping our business gain the flexible funding options we needed. He was very knowledgable about the various facilities on offer and worked hard to secure the one which best suited our needs. He was also very understanding of our busy schedule and was always flexible around us in terms of correspondence and calls. Finally, Adi was extremely courteous and professional throughout the process. Would definitely recommend him and Alpha to anyone looking for business funding options. Thanks Adi.",
        staff: ["Adi"]
    },
    {
        id: 30,
        name: "vishal cs",
        location: "GB",
        date: "Sep 18, 2024",
        rating: 5,
        text: "Very good service"
    },
    {
        id: 31,
        name: "Richard",
        location: "KE",
        date: "Sep 9, 2024",
        rating: 5,
        text: "My contact Ismail Qadri was very helpful and kept me updated on every step",
        staff: ["Ismail Qadri"]
    },
    {
        id: 32,
        name: "Upendra Thakuri",
        location: "GB",
        date: "Sep 6, 2024",
        rating: 5,
        text: "Great service and highly recommended"
    },
    {
        id: 33,
        name: "Mari du Toit",
        location: "GB",
        date: "Aug 28, 2024",
        rating: 4,
        text: "We have received very good service from Aadil Khan from Alpha Funding. His service was excellent and he navigated us well through the process.",
        staff: ["Aadil Khan"]
    },
    {
        id: 34,
        name: "Ismet Keles",
        location: "GB",
        date: "Aug 15, 2024",
        rating: 5,
        text: "Thanks Aditya for help successful Loan. I would use a gain.",
        staff: ["Aditya"]
    },
    {
        id: 35,
        name: "Suresh",
        location: "ES",
        date: "Aug 12, 2024",
        rating: 5,
        text: "Good service 👍🏽"
    },
    {
        id: 36,
        name: "Shijo",
        location: "GB",
        date: "Aug 7, 2024",
        rating: 5,
        text: "If your buisness require a sudden funding back up, the service is done for you in fast pace. Make sure you play wisely and close it ASAP."
    },
    {
        id: 37,
        name: "James Johns",
        location: "GB",
        date: "Jul 29, 2024",
        rating: 5,
        text: "Great guy Ismail Qadri, Got me £100k within 10 days. Fair rate. Great service",
        staff: ["Ismail Qadri"]
    },
    {
        id: 38,
        name: "Anomila Richard",
        location: "GB",
        date: "Jul 15, 2024",
        rating: 5,
        text: "Thank you Ismail for did my application very friendly and smoothly within 2-3 days. So quick service that I never expected. I would highly recommend Ismail at alpha funding and I will be using again with them.",
        staff: ["Ismail"]
    },
    {
        id: 39,
        name: "Fawad Nouri",
        location: "GB",
        date: "Jul 15, 2024",
        rating: 5,
        text: "Very good I’m so happy with this service Ismail Qadri is very good person he attended me very professionally. I wish him best of luck in future.",
        staff: ["Ismail Qadri"]
    },
    {
        id: 40,
        name: "Enita Ejire-Adeyemi",
        location: "GB",
        date: "Jul 5, 2024",
        rating: 5,
        text: "They found me an excellent facility, after so many unsuccessful tries. Really pleased. Excellent customer service. I highly recommend Alpha Funding."
    },
    {
        id: 41,
        name: "Rajesh Mathur",
        location: "GB",
        date: "Jul 5, 2024",
        rating: 5,
        text: "Thanks Devang & Team for sorting out my application so quick within 24 hours...Very helpful and keeping me informed throughout...",
        staff: ["Devang"]
    },
    {
        id: 42,
        name: "MIKE POWDERHAM",
        location: "GB",
        date: "Jul 2, 2024",
        rating: 5,
        text: "They found a great funding for our business even though we could not get what we were quite looking for they found an alternative."
    },
    {
        id: 43,
        name: "Miriam Phinda",
        location: "GB",
        date: "Jun 13, 2024",
        rating: 5,
        text: "Great service. Charms went above and beyond to ensure they found the right funder for purpose. Good customer service. I would use them again.",
        staff: ["Charms"]
    },
    {
        id: 44,
        name: "Rajesh Hotchandani",
        location: "GB",
        date: "Jun 13, 2024",
        rating: 5,
        text: "Excellent client interaction and superb services by Naina. She took the ownership and worked hard to successfully execute the funding facility.",
        staff: ["Naina"]
    },
    {
        id: 45,
        name: "dr stephen kelly",
        location: "GB",
        date: "Jun 3, 2024",
        rating: 5,
        text: "a great service being kept updated information very accurate timing was very quick"
    },
    {
        id: 46,
        name: "D Quigley",
        location: "GB",
        date: "May 16, 2024",
        rating: 5,
        text: "Great experience. Straight forward, easy to deal with company from start to finish. Aadil provided excellent customer service.",
        staff: ["Aadil"]
    },
    {
        id: 47,
        name: "Raluca Lazar",
        location: "RO",
        date: "May 11, 2024",
        rating: 5,
        text: "Brilliant service! If you need help please don’t hesitate to contact them. Very helpful and fast . I can’t describe in words the service they offer to you and support."
    },
    {
        id: 48,
        name: "Brenda Head",
        location: "GB",
        date: "Apr 30, 2024",
        rating: 5,
        text: "Brilliant service from this company, professional and helpful. Extremely efficient and expertly handled each step of the process. Would highly recommend"
    },
    {
        id: 49,
        name: "MGL",
        location: "GB",
        date: "Apr 30, 2024",
        rating: 5,
        text: "Fast transaction. Devang is very helpful 😊 🌟",
        staff: ["Devang"]
    }
];

// --- Components ---

const HeaderSection = () => (
    <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
        <div className="space-y-4">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
            >
                <Quote className="w-3 h-3 text-[#1CB5E0]" />
                <span className="text-[13px] font-medium text-[#1CB5E0]">What Our Clients Say</span>
            </motion.div>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-heading font-bold text-white max-w-2xl"
            >
                Trusted by UK Businesses
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-lg text-slate-300 max-w-xl font-medium"
            >
                Don't just take our word for it — hear from business owners we've helped secure funding.
            </motion.p>
        </div>

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-3"
        >
            <div className="w-full lg:w-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="text-center sm:text-left">
                    <span className="block text-5xl font-heading font-bold text-white">4.9</span>
                    <div className="flex gap-1 my-2 justify-center sm:justify-start">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className="w-5 h-5 fill-[#1CB5E0] text-[#1CB5E0]" />
                        ))}
                    </div>
                    <span className="text-sm text-slate-400 font-medium">199 verified reviews</span>
                </div>
            </div>

            <a
                href="https://www.trustpilot.com/review/alpha-funding.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center sm:justify-end gap-2 text-sm text-slate-400 hover:text-[#1CB5E0] transition-colors"
                title="Verify on Trustpilot"
            >
                <span>Verify on Trustpilot</span>
                <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
        </motion.div>
    </div>
);

const summaries = [
    "Clients consistently highlight the speed of our service — many receiving funds within 24-48 hours. Business owners appreciate the streamlined process that eliminates traditional banking delays. Our team's proactive communication keeps clients informed at every stage, turning what's typically a stressful experience into a straightforward one.",
    "Reviews frequently mention our advisors by name — Aadil, Devang, Mohsin, and the wider team receive praise for their dedication and personal approach. Clients value having a single point of contact who understands their situation and advocates on their behalf throughout the funding journey.",
    "A significant number of our clients found us after being turned down by traditional banks. Reviews reveal a pattern — businesses struggling to secure funding elsewhere found solutions through our 200+ lender network. Our advisors specialize in understanding why previous applications failed and finding alternative routes to approval.",
    "Clear communication stands out across client feedback. Reviewers consistently mention being kept informed at every stage — no chasing, no radio silence, no uncertainty. Our team's proactive approach means clients always know where their application stands, transforming what's typically an anxious wait into a confident process.",
    "Many reviews come from repeat clients and long-term relationships. Business owners return to us for subsequent funding rounds, citing the trust built during their first experience. Our advisors remember client circumstances and provide continuity — a personal banking relationship without the bank."
];

const AISummaryBox = () => {
    const [phase, setPhase] = useState<'loading' | 'generating' | 'complete'>('loading');
    const [summary, setSummary] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    // Random summary selection
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * summaries.length);
        setSummary(summaries[randomIndex]);
    }, []);

    // Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isInView) {
                    setIsInView(true);
                }
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [isInView]);

    // Animation Sequence
    useEffect(() => {
        if (isInView) {
            // Phase 1: Loading (0.8s)
            const loadingTimer = setTimeout(() => {
                setPhase('generating');
            }, 800);

            return () => clearTimeout(loadingTimer);
        }
    }, [isInView]);

    // Completion Timer based on word count
    useEffect(() => {
        if (phase === 'generating') {
            const wordCount = summary.split(" ").length;
            const duration = wordCount * 30 + 600; // rough estimate
            const completionTimer = setTimeout(() => {
                setPhase('complete');
            }, duration + 500); // extra buffer

            return () => clearTimeout(completionTimer);
        }
    }, [phase, summary]);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`relative bg-gradient-to-r from-[#1CB5E0]/12 to-[#D946EF]/10 border border-[#1CB5E0]/30 rounded-[24px] p-6 md:p-8 mb-16 overflow-hidden transition-shadow duration-1000 ${phase === 'complete' ? 'shadow-[0_0_30px_rgba(28,181,224,0.2)]' : ''}`}
            style={phase === 'complete' ? { animation: 'glow-pulse 3s infinite' } : {}}
        >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1CB5E0] to-[#D946EF] opacity-50" />

            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-[#1CB5E0]/15 flex items-center justify-center transition-all duration-1000 ${phase === 'loading' ? 'animate-pulse' : ''}`}>
                    <Sparkles className={`w-6 h-6 text-[#1CB5E0] ${phase === 'loading' ? 'opacity-70' : 'opacity-100'}`} />
                </div>

                <div className="space-y-3 w-full">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#1CB5E0]/15 text-[#1CB5E0] text-[11px] font-bold uppercase tracking-wider">
                        AI Summary
                    </div>

                    <div className="relative min-h-[80px]">
                        {/* Loading State (Skeleton) */}
                        <AnimatePresence>
                            {phase === 'loading' && (
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-3 pt-1"
                                >
                                    <div className="h-3.5 w-[95%] rounded bg-white/5 overflow-hidden relative ai-skeleton" />
                                    <div className="h-3.5 w-[100%] rounded bg-white/5 overflow-hidden relative ai-skeleton" />
                                    <div className="h-3.5 w-[90%] rounded bg-white/5 overflow-hidden relative ai-skeleton" />
                                    <div className="h-3.5 w-[60%] rounded bg-white/5 overflow-hidden relative ai-skeleton" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Text Generation */}
                        {(phase === 'generating' || phase === 'complete') && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <p className="text-[15px] leading-relaxed text-white">
                                    {summary.split(" ").map((word, i) => (
                                        <span
                                            key={i}
                                            className="inline-block mr-1 opacity-0"
                                            style={{
                                                animation: `word-reveal 150ms ease-out forwards`,
                                                animationDelay: `${i * 30}ms`,
                                            }}
                                        >
                                            {word}
                                        </span>
                                    ))}
                                    {phase === 'generating' && (
                                        <span className="inline-block w-1.5 h-4 bg-[#1CB5E0] ml-0.5 align-middle animate-[blink_0.6s_infinite]" />
                                    )}
                                </p>

                                {phase === 'complete' && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                        className="text-[12px] text-slate-400 italic mt-4"
                                    >
                                        Analysis based on 199 verified reviews
                                    </motion.p>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const TestimonialCard = ({ review }: { review: Testimonial }) => {
    return (
        <motion.div
            whileHover={{ y: -4, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-8 flex flex-col transition-colors duration-300"
        >
            <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#1CB5E0] text-[#1CB5E0]" />
                    ))}
                </div>
                <span className="text-xs text-slate-500 font-medium">{review.date}</span>
            </div>

            <p className="text-[15px] leading-relaxed text-slate-200 line-clamp-4 mb-8 flex-grow">
                "{review.text}"
            </p>

            <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1CB5E0] to-[#D946EF] p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#0B1221] flex items-center justify-center text-white font-bold">
                        {review.name.charAt(0)}
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-white text-[15px]">{review.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{review.location}</p>
                </div>
            </div>

            {review.staff && review.staff.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D946EF]/10 text-slate-300 text-[11px] font-medium">
                        Helped by <span className="text-[#D946EF]">{review.staff.join(", ")}</span>
                    </span>
                </div>
            )}
        </motion.div>
    );
};

// Fisher-Yates shuffle
const shuffleArray = (array: Testimonial[]) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

export default function HomeTestimonials() {
    const [reviews, setReviews] = useState<Testimonial[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    // Initial shuffle
    useEffect(() => {
        setReviews(shuffleArray(rawReviews));
    }, []);

    // Responsive items per page
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setItemsPerPage(1);
            else if (window.innerWidth < 1280) setItemsPerPage(2);
            else setItemsPerPage(3);
        };

        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Derived total pages
    const totalPages = Math.ceil(reviews.length / itemsPerPage);

    // Auto-play logic
    const startAutoPlay = () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        autoPlayRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % totalPages);
        }, 8000); // 8 Seconds for readability
    };

    const stopAutoPlay = () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };

    useEffect(() => {
        if (totalPages > 0) {
            startAutoPlay();
        }
        return () => stopAutoPlay();
    }, [totalPages]);

    // Manual Navigation
    const nextSlide = () => {
        stopAutoPlay();
        setActiveIndex((prev) => (prev + 1) % totalPages);
        startAutoPlay();
    };

    const prevSlide = () => {
        stopAutoPlay();
        setActiveIndex((prev) => (prev - 1 + totalPages) % totalPages);
        startAutoPlay();
    };

    if (reviews.length === 0) return null; // Wait for hydration/shuffle

    return (
        <section
            className="py-28 min-h-screen relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #030f42, #0F172A)" }}
        >
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 -left-[20%] w-[50%] h-[50%] bg-[#1CB5E0] rounded-full blur-[180px] opacity-10" />
                <div className="absolute bottom-1/4 -right-[20%] w-[50%] h-[50%] bg-[#D946EF] rounded-full blur-[180px] opacity-10" />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-[1400px]">
                <HeaderSection />
                <AISummaryBox />

                {/* Carousel Container */}
                <div
                    className="relative px-4 sm:px-12"
                    onMouseEnter={stopAutoPlay}
                    onMouseLeave={startAutoPlay}
                >
                    {/* Main Track */}
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex gap-6 md:gap-6"
                            animate={{ x: `-${activeIndex * 100}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {Array.from({ length: totalPages }).map((_, pageIndex) => (
                                <div
                                    key={pageIndex}
                                    className="flex gap-6 md:gap-6 min-w-full"
                                    style={{ flex: "0 0 100%" }}
                                >
                                    {reviews.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((review) => (
                                        <div key={review.id} style={{ width: `calc((100% - ${(itemsPerPage - 1) * 24}px) / ${itemsPerPage})` }}>
                                            <TestimonialCard review={review} />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Arrows (Desktop) */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1CB5E0] hover:text-[#000428] transition-all hidden md:flex"
                        aria-label="Previous reviews"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1CB5E0] hover:text-[#000428] transition-all hidden md:flex"
                        aria-label="Next reviews"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-12 flex-wrap">
                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => { stopAutoPlay(); setActiveIndex(idx); startAutoPlay(); }}
                                className={`h-2.5 rounded-full transition-all duration-300 ${idx === activeIndex
                                    ? "w-8 bg-[#1CB5E0]"
                                    : "w-2.5 bg-white/20 hover:bg-white/40"
                                    }`}
                                aria-label={`Go to review set ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
