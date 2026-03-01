// ═══════════════════════════════════════════════════════════════════════════
// Alpha Funding - Companies House Server Action
// Phase 0.1: Hidden API Logic (No /api/ URL exposed in Network tab)
// ═══════════════════════════════════════════════════════════════════════════

'use server';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface CompanySearchResult {
    company_number: string;
    title: string;
    company_status: string;
    date_of_creation?: string;
    address_snippet?: string;
    company_type?: string;
}

interface CompanyProfile {
    company_number: string;
    company_name: string;
    company_status: string;
    date_of_creation?: string;
    type?: string;
    registered_office_address?: {
        address_line_1?: string;
        address_line_2?: string;
        locality?: string;
        postal_code?: string;
        country?: string;
    };
    sic_codes?: string[];
    has_charges?: boolean;
    accounts?: {
        last_accounts?: {
            made_up_to?: string;
            type?: string;
        };
    };
}

interface SearchResponse {
    success: boolean;
    data?: CompanySearchResult[];
    error?: string;
}

interface ProfileResponse {
    success: boolean;
    data?: CompanyProfile;
    error?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────

const CH_API_BASE = 'https://api.company-information.service.gov.uk';

function getApiKey(): string {
    const key = process.env.COMPANIES_HOUSE_API_KEY;
    if (!key) {
        throw new Error('Companies House API key not configured');
    }
    return key;
}

// ─────────────────────────────────────────────────────────────────────────────
// API Helpers
// ─────────────────────────────────────────────────────────────────────────────

async function fetchFromCH(endpoint: string): Promise<Response> {
    const apiKey = getApiKey();

    return fetch(`${CH_API_BASE}${endpoint}`, {
        headers: {
            'Authorization': `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
            'Accept': 'application/json',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// Server Actions
// ─────────────────────────────────────────────────────────────────────────────

export async function searchCompanies(query: string): Promise<SearchResponse> {
    try {
        // Validate input
        if (!query || query.length < 2) {
            return {
                success: false,
                error: 'Search query must be at least 2 characters.',
            };
        }

        // Sanitize query
        const sanitizedQuery = query.trim().replace(/[<>]/g, '');

        const response = await fetchFromCH(
            `/search/companies?q=${encodeURIComponent(sanitizedQuery)}&items_per_page=10`
        );

        if (!response.ok) {
            if (response.status === 429) {
                return {
                    success: false,
                    error: 'Rate limit exceeded. Please wait a moment.',
                };
            }
            throw new Error(`Companies House API error: ${response.status}`);
        }

        const data = await response.json();

        // Filter to active UK companies only
        const activeCompanies = (data.items || []).filter((company: CompanySearchResult) =>
            company.company_status === 'active'
        );

        return {
            success: true,
            data: activeCompanies,
        };

    } catch (error) {
        console.error('[CH Search Action] Error:', error);
        return {
            success: false,
            error: 'Unable to search companies. Please try again.',
        };
    }
}

export async function getCompanyProfile(companyNumber: string): Promise<ProfileResponse> {
    try {
        // Validate input
        if (!companyNumber || !/^[A-Z0-9]{6,8}$/i.test(companyNumber)) {
            return {
                success: false,
                error: 'Invalid company number format.',
            };
        }

        const [profileRes, chargesRes] = await Promise.all([
            fetchFromCH(`/company/${companyNumber.toUpperCase()}`),
            fetchFromCH(`/company/${companyNumber.toUpperCase()}/charges`),
        ]);

        if (!profileRes.ok) {
            if (profileRes.status === 404) {
                return {
                    success: false,
                    error: 'Company not found.',
                };
            }
            throw new Error(`Companies House API error: ${profileRes.status}`);
        }

        const profile = await profileRes.json();

        // Check for charges
        let hasCharges = false;
        if (chargesRes.ok) {
            const chargesData = await chargesRes.json();
            hasCharges = (chargesData.total_count || 0) > 0;
        }

        return {
            success: true,
            data: {
                ...profile,
                has_charges: hasCharges,
            },
        };

    } catch (error) {
        console.error('[CH Profile Action] Error:', error);
        return {
            success: false,
            error: 'Unable to fetch company details. Please try again.',
        };
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility Action: Get Company Age
// ─────────────────────────────────────────────────────────────────────────────

export async function getCompanyAge(companyNumber: string): Promise<number | null> {
    const result = await getCompanyProfile(companyNumber);

    if (!result.success || !result.data?.date_of_creation) {
        return null;
    }

    const creationDate = new Date(result.data.date_of_creation);
    const now = new Date();
    const ageInYears = (now.getTime() - creationDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);

    return Math.floor(ageInYears * 10) / 10; // Round to 1 decimal
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility Action: Get Company Officers
// ─────────────────────────────────────────────────────────────────────────────

interface Officer {
    name: string;
    officer_role: string;
    appointed_on: string;
}

interface OfficersResponse {
    success: boolean;
    data?: Officer[];
    error?: string;
}

export async function getCompanyOfficers(companyNumber: string): Promise<OfficersResponse> {
    try {
        // Validate input
        if (!companyNumber || !/^[A-Z0-9]{6,8}$/i.test(companyNumber)) {
            return {
                success: false,
                error: 'Invalid company number format.',
            };
        }

        const response = await fetchFromCH(`/company/${companyNumber.toUpperCase()}/officers`);

        if (!response.ok) {
            // 404 is acceptable (no officers found or company dissolved)
            if (response.status === 404) {
                return { success: true, data: [] };
            }
            throw new Error(`Companies House API error: ${response.status}`);
        }

        const data = await response.json();

        // Filter for active directors if needed, but for now return all
        // The API returns 'items' array. We map to our simple Officer interface if needed,
        // or just pass through data.items

        return {
            success: true,
            data: data.items || [],
        };

    } catch (error) {
        console.error('[CH Officers Action] Error:', error);
        return {
            success: false,
            error: 'Unable to fetch company officers.',
        };
    }
}
