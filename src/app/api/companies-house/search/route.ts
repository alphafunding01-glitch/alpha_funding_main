
import { NextRequest, NextResponse } from 'next/server';

// Companies House API Key provided by user
const COMPANIES_HOUSE_API_KEY = process.env.COMPANIES_HOUSE_API_KEY || '94b47d68-9fae-48fe-bb54-9e1cb99c697c';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    // Basic Auth: key as username, empty password
    const auth = Buffer.from(`${COMPANIES_HOUSE_API_KEY}:`).toString('base64');

    try {
        const response = await fetch(`https://api.company-information.service.gov.uk/search/companies?q=${encodeURIComponent(query)}`, {
            headers: {
                'Authorization': `Basic ${auth}`,
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Companies House API error status:', response.status, errorText);
            return NextResponse.json({ error: 'Companies House API error', detail: errorText }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Companies House search internal error:', error);
        return NextResponse.json({ error: 'Internal server error', message: error.message }, { status: 500 });
    }
}
