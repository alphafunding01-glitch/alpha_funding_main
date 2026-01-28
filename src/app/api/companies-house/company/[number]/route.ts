
import { NextRequest, NextResponse } from 'next/server';

const COMPANIES_HOUSE_API_KEY = process.env.COMPANIES_HOUSE_API_KEY || '94b47d68-9fae-48fe-bb54-9e1cb99c697c';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ number: string }> }
) {
    const { number } = await params;

    if (!number) {
        return NextResponse.json({ error: 'Company number is required' }, { status: 400 });
    }

    const auth = Buffer.from(`${COMPANIES_HOUSE_API_KEY}:`).toString('base64');

    try {
        // Fetch all relevant data points in parallel
        const [profileRes, officersRes, chargesRes, pscRes, insolvencyRes] = await Promise.all([
            fetch(`https://api.company-information.service.gov.uk/company/${number}`, {
                headers: { 'Authorization': `Basic ${auth}`, 'Accept': 'application/json' },
            }),
            fetch(`https://api.company-information.service.gov.uk/company/${number}/officers`, {
                headers: { 'Authorization': `Basic ${auth}`, 'Accept': 'application/json' },
            }),
            fetch(`https://api.company-information.service.gov.uk/company/${number}/charges`, {
                headers: { 'Authorization': `Basic ${auth}`, 'Accept': 'application/json' },
            }),
            fetch(`https://api.company-information.service.gov.uk/company/${number}/persons-with-significant-control`, {
                headers: { 'Authorization': `Basic ${auth}`, 'Accept': 'application/json' },
            }),
            fetch(`https://api.company-information.service.gov.uk/company/${number}/insolvency`, {
                headers: { 'Authorization': `Basic ${auth}`, 'Accept': 'application/json' },
            }).catch(() => null) // Insolvency often returns 404 if none exists
        ]);

        if (!profileRes.ok) {
            const errorText = await profileRes.text();
            return NextResponse.json({ error: 'Failed to fetch profile', context: errorText }, { status: profileRes.status });
        }

        const profileData = await profileRes.json();
        const officersData = officersRes.ok ? await officersRes.json() : { items: [] };
        const chargesData = chargesRes.ok ? await chargesRes.json() : { items: [] };
        const pscData = pscRes.ok ? await pscRes.json() : { items: [] };
        let insolvencyData = null;
        if (insolvencyRes && insolvencyRes.ok) {
            insolvencyData = await insolvencyRes.json();
        }

        return NextResponse.json({
            ...profileData,
            officers: officersData.items || [],
            charges: chargesData.items || [],
            pscs: pscData.items || [],
            insolvency: insolvencyData
        });
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal server error', message: error.message }, { status: 500 });
    }
}
