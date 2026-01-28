// Business logic for eligibility calculation
export function getRevenueScore(revenue: string): number {
    const scores: Record<string, number> = {
        'under-10k': 30,
        '10k-50k': 50,
        '50k-100k': 70,
        '100k-500k': 85,
        '500k-plus': 95,
    };
    return scores[revenue] || 50;
}

export function getFundingScore(funding: string, revenue: string): number {
    // Logic: Lower funding relative to revenue = higher score
    const fundingValues: Record<string, number> = {
        '10k-50k': 30000,
        '50k-100k': 75000,
        '100k-250k': 175000,
        '250k-500k': 375000,
        '500k-1m': 750000,
        '1m-plus': 1500000,
    };
    const revenueValues: Record<string, number> = {
        'under-10k': 8000,
        '10k-50k': 30000,
        '50k-100k': 75000,
        '100k-500k': 300000,
        '500k-plus': 750000,
    };

    const ratio = fundingValues[funding] / (revenueValues[revenue] * 12);
    if (ratio <= 0.5) return 90;
    if (ratio <= 1) return 75;
    if (ratio <= 2) return 55;
    return 35;
}

export function getRecommendedProducts(revenue: string, funding: string): Array<{
    name: string;
    description: string;
    matchScore: number;
    url: string;
}> {
    const products = [];

    if (revenue === '500k-plus' || revenue === '100k-500k') {
        products.push({
            name: 'Invoice Finance',
            description: 'Release up to 90% of unpaid invoices within 24 hours',
            matchScore: 95,
            url: '/solutions/invoice-finance',
        });
    }

    if (funding === '10k-50k' || funding === '50k-100k') {
        products.push({
            name: 'Merchant Cash Advance',
            description: 'Flexible repayments tied to card sales. 90% approval rate.',
            matchScore: 88,
            url: '/solutions/merchant-cash-advance',
        });
    }

    products.push({
        name: 'Business Loan',
        description: 'Secured or unsecured loans from £10k-£10M. Decisions in 24h.',
        matchScore: 82,
        url: '/solutions/business-loans',
    });

    return products.slice(0, 3);
}
