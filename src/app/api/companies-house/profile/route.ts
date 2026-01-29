import { NextRequest, NextResponse } from 'next/server';

const COMPANIES_HOUSE_API_KEY = process.env.COMPANIES_HOUSE_API_KEY || '';
const BASE_URL = 'https://api.company-information.service.gov.uk';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const companyNumber = searchParams.get('number');

    if (!companyNumber) {
        return NextResponse.json(
            { error: 'Company number is required' },
            { status: 400 }
        );
    }

    if (!COMPANIES_HOUSE_API_KEY) {
        // Return mock data if no API key
        return NextResponse.json(getMockProfile(companyNumber));
    }

    try {
        const response = await fetch(
            `${BASE_URL}/company/${companyNumber}`,
            {
                headers: {
                    'Authorization': `Basic ${Buffer.from(COMPANIES_HOUSE_API_KEY + ':').toString('base64')}`,
                },
                next: { revalidate: 3600 } // Cache for 1 hour
            }
        );

        if (!response.ok) {
            throw new Error(`Companies House API error: ${response.status}`);
        }

        const data = await response.json();

        // Extract and format the data we need
        const profile = {
            company_name: data.company_name,
            company_number: data.company_number,
            company_status: data.company_status,
            date_of_creation: data.date_of_creation,
            sic_codes: data.sic_codes || [],
            has_charges: data.has_charges || false,
            registered_office_address: data.registered_office_address || {},
            accounts: data.accounts || {},
            type: data.type,
            jurisdiction: data.jurisdiction,
        };

        return NextResponse.json(profile);

    } catch (error: any) {
        console.error('Companies House Profile Error:', error);
        // Return mock data on error
        return NextResponse.json(getMockProfile(companyNumber));
    }
}

function getMockProfile(companyNumber: string) {
    // Generate deterministic mock data based on company number
    const hash = companyNumber.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const years = (hash % 20) + 1;
    const hasCharges = hash % 3 === 0;

    const date = new Date();
    date.setFullYear(date.getFullYear() - years);

    return {
        company_name: "COMPANY " + companyNumber,
        company_number: companyNumber,
        company_status: "active",
        date_of_creation: date.toISOString().split('T')[0],
        sic_codes: ["62020", "62090"], // IT services
        has_charges: hasCharges,
        registered_office_address: {
            address_line_1: "123 Business Street",
            address_line_2: "Suite 100",
            locality: "Manchester",
            postal_code: "M1 1AA",
            country: "United Kingdom"
        },
        accounts: {
            last_accounts: {
                made_up_to: "2025-03-31",
                type: "full"
            }
        },
        type: "ltd",
        jurisdiction: "england-wales",
        _mock: true
    };
}
