import { tool as createTool } from 'ai';
import { z } from 'zod';
import { getRevenueScore, getFundingScore, getRecommendedProducts } from '@/lib/eligibility-logic';

// Define the eligibility check tool
export const checkEligibilityTool = createTool({
    description: 'Check business funding eligibility based on company details and return recommended products',
    inputSchema: z.object({
        companyName: z.string().describe('The registered company name'),
        monthlyRevenue: z.enum([
            'under-10k',
            '10k-50k',
            '50k-100k',
            '100k-500k',
            '500k-plus'
        ]).describe('Monthly revenue bracket'),
        fundingAmount: z.enum([
            '10k-50k',
            '50k-100k',
            '100k-250k',
            '250k-500k',
            '500k-1m',
            '1m-plus'
        ]).describe('Funding amount required'),
        tradingMonths: z.number().optional().describe('Months in business'),
    }),
    execute: async function ({ companyName, monthlyRevenue, fundingAmount, tradingMonths }) {
        // Simulate delay for "magic" feeling
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Business logic for eligibility calculation
        const revenueScore = getRevenueScore(monthlyRevenue);
        const fundingScore = getFundingScore(fundingAmount, monthlyRevenue);
        const eligibilityScore = Math.round((revenueScore + fundingScore) / 2);

        // Determine eligibility status
        let status: 'high' | 'medium' | 'low';
        if (eligibilityScore >= 80) status = 'high';
        else if (eligibilityScore >= 50) status = 'medium';
        else status = 'low';

        // Get recommended products based on profile
        const recommendedProducts = getRecommendedProducts(monthlyRevenue, fundingAmount);

        return {
            companyName,
            eligibilityScore,
            status,
            recommendedProducts,
            nextStep: status === 'high'
                ? 'Complete full application'
                : status === 'medium'
                    ? 'Speak with an advisor'
                    : 'Explore alternative options',
            ctaUrl: status === 'high' ? '/apply-now' : '/contact',
            ctaText: status === 'high' ? 'Start Application' : 'Speak to Advisor',
        };
    },
});

// Export all tools
export const tools = {
    checkEligibility: checkEligibilityTool,
};
