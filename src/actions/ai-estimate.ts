// ═══════════════════════════════════════════════════════════════════════════
// Alpha Funding - AI Estimate Server Action
// Phase 0.1: Hidden API Logic (No /api/ URL exposed in Network tab)
// ═══════════════════════════════════════════════════════════════════════════

'use server';

import { cookies } from 'next/headers';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface EstimateRequest {
    amount: number;
    companyAge: number | null;
    hasCharges: boolean | null;
    sicCodes?: string[];
}

interface EstimateResponse {
    success: boolean;
    data?: {
        minEstimate: number;
        maxEstimate: number;
        reasoning: string;
        tags: string[];
        recommendedProduct?: string;
        alternativeProduct?: string;
    };
    error?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Reasoning Templates (Server-side only - never exposed to client)
// ─────────────────────────────────────────────────────────────────────────────

const REASONING_TEMPLATES = {
    youngWithData: [
        "As a company established in {year}, you're in an exciting growth phase. We work with many ambitious young businesses.",
        "Operating since {year} puts you in a strong position. Lenders see fresh companies with clear direction as great prospects.",
        "Founded {years} years ago, you've already proven your commitment. That counts for a lot in funding decisions.",
    ],
    establishedWithData: [
        "With {years} years of trading history, you've built significant credibility. This opens up preferential rates.",
        "Your {years}-year track record demonstrates stability. Lenders love this kind of proven performance.",
        "Operating since {year}, your established business history qualifies you for our best funding options.",
    ],
    hasChargesWithData: [
        "Your existing finance facilities show lenders take you seriously. This actually works in your favor.",
        "The current charges on file indicate a positive lending history. We can often work around these.",
    ],
    noChargesWithData: [
        "With no existing charges, your assets are unencumbered. This maximizes your available options.",
        "A clean charge sheet gives you negotiating power. Lenders compete for businesses like yours.",
    ],
    genericPositive: [
        "Based on your requirements, several funding options are available to you.",
        "Your funding request aligns well with multiple lender criteria.",
        "We're confident we can find competitive options for your business.",
        "Multiple funding solutions match your profile.",
        "Your application shows strong potential for approval.",
    ],
    genericEncouraging: [
        "Every business deserves access to growth capital. Let's explore your options together.",
        "We specialise in finding solutions where others can't. Your journey starts here.",
        "Our lender network includes specialists for every business type.",
        "Complete your application and we'll match you with the right funding partners.",
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────────────────────

function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateReasoning(data: EstimateRequest): string {
    const { amount, companyAge, hasCharges, sicCodes = [] } = data;

    const hasVerifiedAge = companyAge !== null && companyAge !== undefined && companyAge > 0;
    const hasVerifiedCharges = hasCharges !== null && hasCharges !== undefined;

    let template: string;

    // Priority 1: Young company with verified data
    if (hasVerifiedAge && companyAge! < 2) {
        template = pickRandom(REASONING_TEMPLATES.youngWithData);
        const year = new Date().getFullYear() - Math.floor(companyAge!);
        return template
            .replace(/{years}/g, String(Math.floor(companyAge!)))
            .replace(/{year}/g, String(year));
    }

    // Priority 2: Established company with verified data
    if (hasVerifiedAge && companyAge! >= 5) {
        template = pickRandom(REASONING_TEMPLATES.establishedWithData);
        const year = new Date().getFullYear() - Math.floor(companyAge!);
        return template
            .replace(/{years}/g, String(Math.floor(companyAge!)))
            .replace(/{year}/g, String(year));
    }

    // Priority 3: Charges info with verified data
    if (hasVerifiedCharges) {
        template = hasCharges
            ? pickRandom(REASONING_TEMPLATES.hasChargesWithData)
            : pickRandom(REASONING_TEMPLATES.noChargesWithData);
        return template;
    }

    // Fallback: Generic positive or encouraging
    if (amount > 50000) {
        return pickRandom(REASONING_TEMPLATES.genericPositive);
    }

    return pickRandom(REASONING_TEMPLATES.genericEncouraging);
}

function generateTags(data: EstimateRequest): string[] {
    const tags: string[] = [];
    const { amount, companyAge, hasCharges } = data;

    if (amount <= 50000) tags.push('Fast-Track Eligible');
    else if (amount <= 150000) tags.push('Standard Process');
    else tags.push('Premium Review');

    if (companyAge !== null && companyAge >= 3) tags.push('Established');
    if (hasCharges === false) tags.push('Clean Assets');

    tags.push('Multiple Options');

    return tags.slice(0, 4); // Max 4 tags
}

function getProductRecommendation(amount: number): { recommended?: string; alternative?: string } {
    if (amount <= 25000) {
        return {
            recommended: 'Merchant Cash Advance',
            alternative: 'Business Loans'
        };
    } else if (amount <= 75000) {
        return {
            recommended: 'Business Loans',
            alternative: 'Revolving Credit Facility'
        };
    } else if (amount <= 150000) {
        return {
            recommended: 'Business Loans', // Not "Secured Business Loan"
            alternative: 'Business Asset Equipment Finance' // Asset Finance -> Business Asset Equipment Finance
        };
    } else {
        return {
            recommended: 'Commercial Property Finance', // Not "Commercial Finance"
            alternative: 'Invoice Finance' // Invoice Finance is correct
        };
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Server Action
// ─────────────────────────────────────────────────────────────────────────────

export async function getAiEstimate(request: EstimateRequest): Promise<EstimateResponse> {
    try {
        // Validate input
        if (!request.amount || request.amount < 5000 || request.amount > 1000000) {
            return {
                success: false,
                error: 'Invalid amount. Must be between £5,000 and £1,000,000.',
            };
        }

        // Calculate estimate range
        const baseMin = Math.max(5000, request.amount * 0.8);
        const baseMax = Math.min(1000000, request.amount * 1.2);

        // Adjust based on company data
        let multiplier = 1.0;

        if (request.companyAge !== null && request.companyAge >= 5) {
            multiplier += 0.15; // Established companies get better rates
        }

        if (request.hasCharges === false) {
            multiplier += 0.1; // No charges = more options
        }

        const minEstimate = Math.round(baseMin * multiplier / 1000) * 1000;
        const maxEstimate = Math.round(baseMax * multiplier / 1000) * 1000;

        // Generate response
        const reasoning = generateReasoning(request);
        const tags = generateTags(request);
        const products = getProductRecommendation(request.amount);

        // Simulate processing time for UX
        await new Promise(resolve => setTimeout(resolve, 500));

        return {
            success: true,
            data: {
                minEstimate,
                maxEstimate,
                reasoning,
                tags,
                recommendedProduct: products.recommended,
                alternativeProduct: products.alternative,
            },
        };

    } catch (error) {
        console.error('[AI Estimate Action] Error:', error);
        return {
            success: false,
            error: 'An error occurred processing your request.',
        };
    }
}
