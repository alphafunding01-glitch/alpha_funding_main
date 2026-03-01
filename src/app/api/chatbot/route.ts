import { NextResponse } from 'next/server';

// ─────────────────────────────────────────────────────────────────────────────
// Chat API Route - TEMPORARILY DISABLED FOR "COMING SOON" STATE
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(request: Request) {
    return NextResponse.json(
        { message: 'Chatbot is currently under construction.' },
        { status: 503 }
    );
}

// Only allow POST requests
export async function GET() {
    return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
}
