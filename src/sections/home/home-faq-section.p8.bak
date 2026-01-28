"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"],
});

export default function HomeFaqSection() {
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
        }
    ];

    return (
        <div className="bg-[#f0f0f0] px-[4%] md:px-[6%] py-16 flex flex-col items-center gap-8">
            {/* Heading */}
            <h1 className={`text-2xl md:text-4xl font-bold text-center ${poppins.className} text-gradient-primary`}>
                Business Loan FAQs
            </h1>

            {/* Accordion */}
            <div className="w-full max-w-3xl">
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-4 border-none shadow-sm">
                            <AccordionTrigger className="text-left font-semibold text-lg py-4 hover:no-underline">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground pb-4 text-base">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
