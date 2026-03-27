// ═══════════════════════════════════════════════════════════════════════════
// Alpha Funding - Security Middleware
// Phase 0.5: Origin Restrictions + Custom Header Validation
// ═══════════════════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────

const ALLOWED_ORIGINS = [
    'https://alphafunding.co.uk',
    'https://www.alphafunding.co.uk',
    'https://alpha-funding.vercel.app',
    // Add any staging/preview domains
];

// Allow localhost in development
if (process.env.NODE_ENV === 'development') {
    ALLOWED_ORIGINS.push('http://localhost:3000');
    ALLOWED_ORIGINS.push('http://127.0.0.1:3000');
}

// Custom handshake header for additional validation
const HANDSHAKE_HEADER = 'x-alpha-client';
const HANDSHAKE_VALUE = process.env.ALPHA_HANDSHAKE_KEY || 'alpha-web-client-v1';

// Routes that require protection
const PROTECTED_API_ROUTES = [
    '/api/ai-estimate',
    '/api/companies-house',
    '/api/lead-score',
];

// ─────────────────────────────────────────────────────────────────────────────
// Rate Limiting (In-Memory with Persistence Hooks)
// ─────────────────────────────────────────────────────────────────────────────

interface RateLimitRecord {
    count: number;
    resetAt: number;
}

// In-memory store (will reset on cold start - use Upstash for production)
const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up old entries periodically
const CLEANUP_INTERVAL = 60000; // 1 minute
let lastCleanup = Date.now();

function cleanupRateLimitStore() {
    const now = Date.now();
    if (now - lastCleanup > CLEANUP_INTERVAL) {
        for (const [key, record] of rateLimitStore.entries()) {
            if (now > record.resetAt) {
                rateLimitStore.delete(key);
            }
        }
        lastCleanup = now;
    }
}

function checkRateLimit(
    identifier: string,
    limit: number = 100,
    windowMs: number = 60000
): { allowed: boolean; remaining: number; resetIn: number } {
    cleanupRateLimitStore();

    const now = Date.now();
    const record = rateLimitStore.get(identifier);

    if (!record || now > record.resetAt) {
        // New window
        rateLimitStore.set(identifier, { count: 1, resetAt: now + windowMs });
        return { allowed: true, remaining: limit - 1, resetIn: windowMs };
    }

    record.count++;
    rateLimitStore.set(identifier, record);

    const remaining = Math.max(0, limit - record.count);
    const resetIn = record.resetAt - now;

    return { allowed: record.count <= limit, remaining, resetIn };
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────────────────────

function getClientIP(request: NextRequest): string {
    // Check various headers for real IP behind proxies
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }

    const realIP = request.headers.get('x-real-ip');
    if (realIP) {
        return realIP;
    }

    // Vercel-specific
    const vercelIP = request.headers.get('x-vercel-forwarded-for');
    if (vercelIP) {
        return vercelIP.split(',')[0].trim();
    }

    return 'unknown';
}

function isOriginAllowed(request: NextRequest): boolean {
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');

    // Check origin header
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
        return true;
    }

    // Check referer header
    if (referer) {
        for (const allowed of ALLOWED_ORIGINS) {
            if (referer.startsWith(allowed)) {
                return true;
            }
        }
    }

    // In development, be more lenient
    if (process.env.NODE_ENV === 'development') {
        return true;
    }

    return false;
}

function hasValidHandshake(request: NextRequest): boolean {
    const handshake = request.headers.get(HANDSHAKE_HEADER);
    return handshake === HANDSHAKE_VALUE;
}

function isProtectedRoute(pathname: string): boolean {
    return PROTECTED_API_ROUTES.some(route => pathname.startsWith(route));
}

// ─────────────────────────────────────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────────────────────────────────────

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for static files and non-API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname.includes('.') // Files with extensions
    ) {
        return NextResponse.next();
    }

    // ═══════════════════════════════════════════════════════════════════════
    // Protected API Routes
    // ═══════════════════════════════════════════════════════════════════════

    if (isProtectedRoute(pathname)) {
        const clientIP = getClientIP(request);

        // Layer 1: Origin Check
        if (!isOriginAllowed(request)) {
            console.warn(`[Security] Blocked request from unauthorized origin: ${clientIP}`);
            return NextResponse.json(
                { error: 'Forbidden', code: 'ORIGIN_NOT_ALLOWED' },
                { status: 403 }
            );
        }

        // Layer 2: Rate Limiting
        // Different limits for different routes
        let limit = 100;
        let windowMs = 60000;

        if (pathname.includes('ai-estimate')) {
            limit = 30; // 30 requests per minute for AI estimate
            windowMs = 60000;
        } else if (pathname.includes('companies-house')) {
            limit = 60; // 60 requests per minute for CH search
            windowMs = 60000;
        }

        const rateLimitResult = checkRateLimit(`${clientIP}:${pathname}`, limit, windowMs);

        if (!rateLimitResult.allowed) {
            console.warn(`[Security] Rate limit exceeded for: ${clientIP} on ${pathname}`);
            return NextResponse.json(
                { error: 'Too Many Requests', code: 'RATE_LIMIT_EXCEEDED' },
                {
                    status: 429,
                    headers: {
                        'Retry-After': String(Math.ceil(rateLimitResult.resetIn / 1000)),
                        'X-RateLimit-Remaining': '0',
                        'X-RateLimit-Reset': String(rateLimitResult.resetIn),
                    }
                }
            );
        }

        // Layer 3: Handshake Header (optional extra layer)
        // Only enforce in production for extra security
        if (process.env.NODE_ENV === 'production' && process.env.ENFORCE_HANDSHAKE === 'true') {
            if (!hasValidHandshake(request)) {
                console.warn(`[Security] Invalid handshake from: ${clientIP}`);
                return NextResponse.json(
                    { error: 'Forbidden', code: 'INVALID_CLIENT' },
                    { status: 403 }
                );
            }
        }

        // Add security headers to response
        const response = NextResponse.next();
        response.headers.set('X-RateLimit-Remaining', String(rateLimitResult.remaining));
        response.headers.set('X-Content-Type-Options', 'nosniff');
        response.headers.set('X-Frame-Options', 'DENY');
        response.headers.set('X-XSS-Protection', '1; mode=block');

        return response;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // General Security Headers for All Routes
    // ═══════════════════════════════════════════════════════════════════════

    const response = NextResponse.next();

    // Security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;
}

// ─────────────────────────────────────────────────────────────────────────────
// Matcher Configuration
// ─────────────────────────────────────────────────────────────────────────────

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
