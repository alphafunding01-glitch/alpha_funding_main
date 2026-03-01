export async function searchCompanies(query: string) {
    const res = await fetch(`/api/companies-house/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to search companies');
    return res.json();
}

export async function getCompanyProfile(companyNumber: string) {
    const res = await fetch(`/api/companies-house/profile?number=${encodeURIComponent(companyNumber)}`);
    if (!res.ok) throw new Error('Failed to fetch company profile');
    return res.json();
}

export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        maximumFractionDigits: 0,
    }).format(amount);
}
