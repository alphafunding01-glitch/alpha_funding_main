export type RevenueTier = 'under-10k' | '10k-50k' | '50k-100k' | '100k-500k' | '500k-plus';
export type FundingTier = '10k-50k' | '50k-100k' | '100k-250k' | '250k-500k' | '500k-1m' | '1m-plus';

export interface CompanyData {
    companyName: string;
    companyNumber: string;
    incorporationDate?: string;
    sicCodes?: string[];
    status?: string;
    jurisdiction?: string;
}

export interface QualificationFormData {
    company: CompanyData | null;
    monthlyRevenue: RevenueTier | '';
    fundingAmount: FundingTier | '';
}

export interface QualificationResult {
    score: number; // 0 to 100
    status: 'high' | 'medium' | 'low' | 'ineligible';
    message: string;
    recommendedProducts: string[];
    factors: {
        label: string;
        impact: 'positive' | 'negative' | 'neutral';
        details: string;
    }[];
}
