import { NextRequest, NextResponse } from 'next/server';

// Industry risk mapping based on SIC codes
const HIGH_RISK_SIC = ['92', '64', '66']; // Gambling, financial services, insurance
const MEDIUM_RISK_SIC = ['55', '56', '47', '45']; // Hospitality, food, retail
const LOW_RISK_SIC = ['62', '63', '69', '70', '71', '72', '73', '74', '85', '86', '87', '88']; // Professional services, tech, healthcare

// Product recommendations based on amount
interface ProductRecommendation {
    name: string;
    href: string;
    note?: string;
}

const PRODUCTS = {
    businessLoan: { name: 'Business Loan', href: '/solutions/business-loans' },
    merchantCash: { name: 'Merchant Cash Advance', href: '/solutions/merchant-cash-advance' },
    invoiceFinance: { name: 'Invoice Finance', href: '/solutions/invoice-finance' },
    assetFinance: { name: 'Asset Finance', href: '/solutions/business-asset-equipment-finance' },
    commercialProperty: { name: 'Commercial Property Finance', href: '/solutions/commercial-property-finance' },
    revolvingCredit: { name: 'Revolving Credit', href: '/solutions/revolving-credit-facility' },
    growthScheme: { name: 'Growth Guarantee Scheme', href: '/solutions/growth-guarantee-scheme' },
};

// Dynamic reasoning templates - uses {placeholders} that get replaced with actual data
const REASONING_TEMPLATES = {
    // Only used when we KNOW the company has 5+ years trading
    establishedWithData: [
        "Your {years}-year trading history puts you in a strong position with our lender panel. Established businesses typically secure more competitive rates.",
        "With {years} years of trading behind you, lenders see you as a reliable borrower. This opens doors to preferential terms and faster decisions.",
        "Established since {year}, your business qualifies for our prime lender network. Expect competitive rates and flexible repayment options.",
        "A solid {years}-year track record significantly strengthens your application. Our analysis shows high approval probability.",
    ],
    // Only used when we KNOW the company is under 2 years old
    youngWithData: [
        "As a business trading for {years} year(s), we've identified specialist lenders who focus on high-potential companies at your stage.",
        "With {years} year(s) of trading history, alternative funding routes through our specialist network are available.",
        "Early-stage businesses like yours can access funding through our alternative lender panel. Revenue-based options may suit your profile.",
        "At {years} year(s) trading, we recommend building your funding relationship. Our specialist lenders support companies at your growth stage.",
    ],
    // Only used when we KNOW the company has active charges
    hasChargesWithData: [
        "We've noted your existing financial arrangements. Lenders regularly work with businesses like yours, refinancing alongside new funding.",
        "Your current lending doesn't prevent new funding. We can explore options that may improve your overall position.",
        "Existing facilities are common. Our lenders assess total affordability, and many specialise in second-charge or refinancing deals.",
        "Your credit history shows established relationships. With proper structuring, additional funding remains accessible.",
    ],
    // Used for high amounts (£150k+)
    highAmount: [
        "For larger funding requirements, we typically structure deals across multiple facilities for optimal terms.",
        "Significant funding requests often benefit from secured options. Our commercial finance team can unlock higher amounts.",
        "This estimate reflects unsecured options. Secured lending could significantly increase your borrowing ceiling.",
        "At this funding level, lenders often consider asset-backed arrangements. We can structure deals to maximize your borrowing.",
    ],
    // Only used when we KNOW the company is in a low-risk sector
    lowRiskWithData: [
        "Your industry sector is viewed favourably by lenders. Businesses in your field typically enjoy competitive rates.",
        "Sector analysis works in your favour. Expect a wider range of lender options and faster processing times.",
        "Your business category has strong approval rates across our panel. Lenders actively seek companies in your industry.",
        "Industry profile shows favourable risk classification. This typically translates to better rates.",
    ],
    // GENERIC FALLBACKS - used when company data is unavailable or incomplete
    genericPositive: [
        "Based on your funding requirements, we've matched you with lenders suited to your needs. Complete your application for a tailored quote.",
        "Your enquiry shows strong funding potential. Final terms will be confirmed once we review your full application.",
        "We've identified multiple funding options in your range. Submit your details to receive personalized offers from our lender panel.",
        "This estimate reflects typical approval amounts for similar requests. A funding specialist will refine these figures for you.",
        "Preliminary analysis looks positive. Complete the form to unlock your personalized funding options.",
    ],
    genericEncouraging: [
        "Various funding options are available at this level. Our team will match you with the most suitable lenders.",
        "We work with 200+ lenders to find the right fit. Submit your application to see what's available for your business.",
        "Funding at this level is our speciality. Complete your details and a specialist will be in touch within 24 hours.",
        "Your request is within our regular funding range. We'll find the best options once we review your full profile.",
        "Businesses like yours successfully secure funding through our panel regularly. Take the next step to see your options.",
    ],
};

interface EstimateRequest {
    amount: number;
    companyAge?: number | null; // null means data not available
    sicCodes?: string[];
    hasCharges?: boolean | null; // null means unknown
    numberOfDirectors?: number;
    annualRevenue?: string;
    companyStatus?: string;
    hasCompanyData?: boolean; // explicit flag for whether we have verified company data
}

function getAgeModifier(years: number | null | undefined): number {
    if (years === null || years === undefined) return 0.9; // Unknown = slightly conservative
    if (years < 1) return 0.5;
    if (years < 2) return 0.7;
    if (years < 5) return 0.85;
    if (years < 10) return 1.0;
    return 1.1;
}

function getIndustryModifier(sicCodes: string[]): number {
    if (!sicCodes || sicCodes.length === 0) return 0.9;
    const primarySic = sicCodes[0]?.substring(0, 2) || '';
    if (HIGH_RISK_SIC.includes(primarySic)) return 0.6;
    if (MEDIUM_RISK_SIC.includes(primarySic)) return 0.8;
    if (LOW_RISK_SIC.includes(primarySic)) return 1.0;
    return 0.9;
}

function getChargeModifier(hasCharges: boolean | null | undefined, directorCount: number): number {
    if (hasCharges === null || hasCharges === undefined) return 1.0; // Unknown = neutral
    let modifier = hasCharges ? 0.85 : 1.0;
    if (directorCount >= 2) modifier += 0.05;
    return Math.min(modifier, 1.1);
}

function getAmountModifier(amount: number): number {
    if (amount < 30000) return 1.1;
    if (amount < 75000) return 1.0;
    if (amount < 150000) return 0.85;
    if (amount < 300000) return 0.7;
    return 0.6;
}

function getProductRecommendation(amount: number, hasCharges: boolean | null | undefined): { primary: ProductRecommendation; alternative?: ProductRecommendation } {
    if (amount >= 150000) {
        return {
            primary: { ...PRODUCTS.commercialProperty, note: 'Secured lending for higher amounts' },
            alternative: { ...PRODUCTS.assetFinance, note: 'Use equipment as collateral' },
        };
    }

    if (amount >= 75000) {
        return {
            primary: PRODUCTS.businessLoan,
            alternative: { ...PRODUCTS.commercialProperty, note: 'Higher amounts available with security' },
        };
    }

    if (amount >= 50000) {
        return {
            primary: PRODUCTS.businessLoan,
            alternative: PRODUCTS.revolvingCredit,
        };
    }

    if (hasCharges === true) {
        return {
            primary: PRODUCTS.merchantCash,
            alternative: PRODUCTS.invoiceFinance,
        };
    }

    return {
        primary: PRODUCTS.businessLoan,
        alternative: PRODUCTS.merchantCash,
    };
}

function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateReasoning(data: EstimateRequest): string {
    const { amount, companyAge, hasCharges, sicCodes = [] } = data;

    // Check if we have verified company data
    const hasVerifiedAge = companyAge !== null && companyAge !== undefined && companyAge > 0;
    const hasVerifiedCharges = hasCharges !== null && hasCharges !== undefined;
    const hasVerifiedSicCodes = sicCodes && sicCodes.length > 0;

    let template: string;

    // Priority 1: Young company with verified data
    if (hasVerifiedAge && companyAge! < 2) {
        template = pickRandom(REASONING_TEMPLATES.youngWithData);
        const year = new Date().getFullYear() - Math.floor(companyAge!);
        return template
            .replace(/{years}/g, String(Math.floor(companyAge!)))
            .replace(/{year}/g, String(year));
    }

    // Priority 2: High amount requests (always relevant)
    if (amount >= 150000) {
        return pickRandom(REASONING_TEMPLATES.highAmount);
    }

    // Priority 3: Has charges with verified data
    if (hasVerifiedCharges && hasCharges === true) {
        return pickRandom(REASONING_TEMPLATES.hasChargesWithData);
    }

    // Priority 4: Established company with verified data
    if (hasVerifiedAge && companyAge! >= 5) {
        template = pickRandom(REASONING_TEMPLATES.establishedWithData);
        const year = new Date().getFullYear() - Math.floor(companyAge!);
        return template
            .replace(/{years}/g, String(Math.floor(companyAge!)))
            .replace(/{year}/g, String(year));
    }

    // Priority 5: Low-risk sector with verified data
    if (hasVerifiedSicCodes && LOW_RISK_SIC.includes(sicCodes[0]?.substring(0, 2) || '')) {
        return pickRandom(REASONING_TEMPLATES.lowRiskWithData);
    }

    // Fallback: Use generic encouraging messages when no specific data available
    // Randomly pick between positive and encouraging for variety
    return Math.random() > 0.5
        ? pickRandom(REASONING_TEMPLATES.genericPositive)
        : pickRandom(REASONING_TEMPLATES.genericEncouraging);
}

function generateTags(data: EstimateRequest, isSecuredRecommended: boolean): string[] {
    const { amount, companyAge, hasCharges, sicCodes = [] } = data;
    const tags: string[] = [];

    // Only add age-related tags if we have verified data
    if (companyAge !== null && companyAge !== undefined) {
        if (companyAge >= 5) tags.push('Established');
        else if (companyAge < 2) tags.push('Growth Stage');
    }

    if (amount >= 100000) tags.push('Growth Finance');
    else tags.push('SME Funding');

    if (isSecuredRecommended) tags.push('Secured Options');

    // Only mention charges if we know they exist
    if (hasCharges === true) tags.push('Refinance Available');

    // Only add low-risk tag if we have verified SIC data
    if (sicCodes.length > 0 && LOW_RISK_SIC.includes(sicCodes[0]?.substring(0, 2) || '')) {
        tags.push('Favourable Sector');
    }

    tags.push('Lender Matched');

    return tags.slice(0, 4);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        let data: EstimateRequest;
        if (typeof body.prompt === 'string') {
            try {
                data = JSON.parse(body.prompt);
            } catch {
                data = { amount: parseInt(body.prompt) || 50000 };
            }
        } else {
            data = {
                amount: body.amount || parseInt(body.prompt) || 50000,
                companyAge: body.companyAge ?? null, // Use null if not provided
                sicCodes: body.sicCodes || [],
                hasCharges: body.hasCharges ?? null, // Use null if not provided
                numberOfDirectors: body.numberOfDirectors || 1,
                annualRevenue: body.annualRevenue,
                companyStatus: body.companyStatus,
            };
        }

        const { amount, companyAge, sicCodes = [], hasCharges, numberOfDirectors = 1 } = data;

        // Calculate modifiers (handles null values gracefully)
        const ageModifier = getAgeModifier(companyAge);
        const industryModifier = getIndustryModifier(sicCodes);
        const chargeModifier = getChargeModifier(hasCharges, numberOfDirectors);
        const amountModifier = getAmountModifier(amount);
        const totalModifier = ageModifier * industryModifier * chargeModifier * amountModifier;

        // Calculate base range
        let baseMin = amount * 0.5;
        let baseMax = amount * 1.0;

        // Apply modifiers
        let finalMin = Math.round((baseMin * totalModifier) / 1000) * 1000;
        let finalMax = Math.round((baseMax * totalModifier) / 1000) * 1000;

        // Apply caps
        finalMin = Math.max(finalMin, 10000);
        finalMax = Math.min(finalMax, amount * 1.2);
        finalMax = Math.min(finalMax, 2000000);
        finalMax = Math.round(finalMax / 1000) * 1000;

        if (finalMin >= finalMax) {
            finalMin = Math.round(finalMax * 0.7 / 1000) * 1000;
        }

        // Get product recommendations
        const isSecuredRecommended = amount >= 75000;
        const products = getProductRecommendation(amount, hasCharges);

        // Generate reasoning (now data-aware with fallbacks)
        const reasoning = generateReasoning(data);
        const tags = generateTags(data, isSecuredRecommended);

        const response = {
            min: finalMin,
            max: finalMax,
            reasoning,
            tags,
            recommendedProduct: products.primary,
            alternativeProduct: products.alternative,
            modifiers: {
                age: ageModifier,
                industry: industryModifier,
                charge: chargeModifier,
                amount: amountModifier,
                total: totalModifier
            }
        };

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Stream response
        const encoder = new TextEncoder();
        const fullResponse = JSON.stringify(response);

        const stream = new ReadableStream({
            async start(controller) {
                const chunkSize = 20;
                for (let i = 0; i < fullResponse.length; i += chunkSize) {
                    const chunk = fullResponse.slice(i, i + chunkSize);
                    controller.enqueue(encoder.encode(chunk));
                    await new Promise(r => setTimeout(r, Math.random() * 30 + 15));
                }
                controller.close();
            },
        });

        return new Response(stream, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });

    } catch (error: any) {
        console.error("AI Estimate API Error:", error);
        return NextResponse.json(
            { error: "Failed to generate estimate" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: "AI Estimate API v4 ✅",
        features: [
            "Data-aware reasoning",
            "Verified company data check",
            "Generic fallbacks when data unavailable",
            "Product recommendations",
            "Null-safe modifiers"
        ]
    });
}
