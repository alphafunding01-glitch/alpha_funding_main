import { NextRequest, NextResponse } from 'next/server';

const COMPANIES_HOUSE_API_KEY = process.env.COMPANIES_HOUSE_API_KEY || '';
const BASE_URL = 'https://api.company-information.service.gov.uk';

export interface Officer {
    name: string;
    officer_role: string;
    appointed_on: string;
    resigned_on?: string;
    nationality?: string;
    occupation?: string;
}

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
        return NextResponse.json(getMockOfficers(companyNumber));
    }

    try {
        const response = await fetch(
            `${BASE_URL}/company/${companyNumber}/officers`,
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

        // Filter to active officers only (no resigned_on date)
        const activeOfficers: Officer[] = (data.items || [])
            .filter((officer: any) => !officer.resigned_on)
            .map((officer: any) => ({
                name: officer.name,
                officer_role: officer.officer_role,
                appointed_on: officer.appointed_on,
                nationality: officer.nationality,
                occupation: officer.occupation,
            }));

        return NextResponse.json({
            total_results: activeOfficers.length,
            items: activeOfficers
        });

    } catch (error: any) {
        console.error('Companies House Officers Error:', error);
        // Return mock data on error
        return NextResponse.json(getMockOfficers(companyNumber));
    }
}

function getMockOfficers(companyNumber: string) {
    // Generate deterministic mock officers based on company number
    const hash = companyNumber.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const officerCount = (hash % 3) + 1; // 1-3 officers

    const names = [
        "SMITH, John David",
        "JONES, Sarah Elizabeth",
        "WILLIAMS, Michael James",
        "BROWN, Emma Louise",
        "TAYLOR, David Robert"
    ];

    const roles = ["director", "secretary", "director"];

    const officers: Officer[] = [];
    for (let i = 0; i < officerCount; i++) {
        officers.push({
            name: names[(hash + i) % names.length],
            officer_role: roles[i % roles.length],
            appointed_on: "2020-01-15",
            nationality: "British",
            occupation: "Company Director"
        });
    }

    return {
        total_results: officers.length,
        items: officers,
        _mock: true
    };
}
