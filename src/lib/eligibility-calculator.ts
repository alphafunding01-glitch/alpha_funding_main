import { QualificationFormData, QualificationResult, RevenueTier, FundingTier } from '@/types/eligibility';

export function calculateEligibility(formData: QualificationFormData): QualificationResult {
    let score = 70; // Base score
    const factors: QualificationResult['factors'] = [];
    const recommendedProducts: string[] = [];

    // 1. Revenue Impact
    const revenueValues: Record<RevenueTier, number> = {
        'under-10k': 5000,
        '10k-50k': 30000,
        '50k-100k': 75000,
        '100k-500k': 300000,
        '500k-plus': 1000000,
    };

    const monthlyRev = revenueValues[formData.monthlyRevenue as RevenueTier] || 0;
    const annualRev = monthlyRev * 12;

    if (formData.monthlyRevenue === 'under-10k') {
        score -= 20;
        factors.push({
            label: 'Monthly Revenue',
            impact: 'negative',
            details: 'Lenders typically look for £10k+ monthly revenue for unsecured loans.'
        });
    } else if (formData.monthlyRevenue === '500k-plus') {
        score += 15;
        factors.push({
            label: 'High Revenue',
            impact: 'positive',
            details: 'Strong revenue profile unlocks institutional lender rates.'
        });
    } else {
        factors.push({
            label: 'Trading Volume',
            impact: 'positive',
            details: 'Consistent monthly revenue demonstrates business stability.'
        });
    }

    // 2. Funding Ratio Impact
    const fundingValues: Record<FundingTier, number> = {
        '10k-50k': 30000,
        '50k-100k': 75000,
        '100k-250k': 175000,
        '250k-500k': 375000,
        '500k-1m': 750000,
        '1m-plus': 2000000,
    };

    const fundingAmt = fundingValues[formData.fundingAmount as FundingTier] || 0;
    const ratio = fundingAmt / annualRev;

    if (ratio <= 0.3) {
        score += 10;
        factors.push({
            label: 'Lending Ratio',
            impact: 'positive',
            details: 'Requested amount is highly sustainable relative to annual turnover.'
        });
    } else if (ratio > 1.5) {
        score -= 25;
        factors.push({
            label: 'High Leverage',
            impact: 'negative',
            details: 'Requested funding exceeds 150% of annual revenue, suggesting high risk.'
        });
    }

    // 3. Company Age (if available)
    if (formData.company?.incorporationDate) {
        const incDate = new Date(formData.company.incorporationDate);
        const now = new Date();
        const yearsTrading = (now.getTime() - incDate.getTime()) / (1000 * 60 * 60 * 24 * 365);

        if (yearsTrading < 1) {
            score -= 15;
            factors.push({
                label: 'Trading History',
                impact: 'negative',
                details: 'Businesses with < 12 months trading have fewer lender options.'
            });
        } else if (yearsTrading > 3) {
            score += 10;
            factors.push({
                label: 'Established Entity',
                impact: 'positive',
                details: `Solid ${Math.floor(yearsTrading)} year trading history increases trust.`
            });
        }
    }

    // 4. Status Check
    if (formData.company?.status && formData.company.status !== 'active') {
        return {
            score: 0,
            status: 'ineligible',
            message: 'Your company status must be active to apply for funding.',
            recommendedProducts: [],
            factors: [{
                label: 'Company Status',
                impact: 'negative',
                details: `Status "${formData.company.status}" is not eligible for standard finance products.`
            }]
        };
    }

    // Final Status and Products
    let status: QualificationResult['status'] = 'medium';
    let message = "You have a good chance of securing funding. We've identified matching lenders.";

    if (score >= 85) {
        status = 'high';
        message = "Excellent profile! You qualify for our most competitive rates and fastest lenders.";
        recommendedProducts.push('Business Loan (Prime)', 'Revolving Credit Line', 'Asset Finance');
    } else if (score >= 60) {
        status = 'medium';
        recommendedProducts.push('Unsecured Business Loan', 'Merchant Cash Advance');
    } else if (score >= 40) {
        status = 'low';
        message = "Funding is possible, but may require a personal guarantee or higher rates.";
        recommendedProducts.push('Merchant Cash Advance', 'Secured Loan');
    } else {
        status = 'ineligible';
        message = "Based on the data, standard lending may be difficult at this time.";
    }

    return {
        score: Math.min(100, Math.max(0, score)),
        status,
        message,
        recommendedProducts,
        factors
    };
}
