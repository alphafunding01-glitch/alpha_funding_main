import type { NextConfig } from "next";
// NOTE: webpack-obfuscator has compatibility issues with Next.js worker builds
// For obfuscation, use post-build script: npx javascript-obfuscator .next/static --output .next/static-obfuscated
// Or implement via Vercel Edge Config
// import WebpackObfuscator from "webpack-obfuscator";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/photos/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/products/:path*',
        destination: '/solutions/:path*',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/solutions',
        permanent: true,
      }
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,

  // ═══════════════════════════════════════════════════════════════════════
  // Phase 0.3: JavaScript Obfuscation
  // DISABLED: webpack-obfuscator has worker compatibility issues with Next.js
  // 
  // Alternative approaches:
  // 1. Post-build script: npx javascript-obfuscator .next/static/chunks/*.js
  // 2. Vercel Edge Middleware for response transformation
  // 3. Use Server Actions (implemented) to keep logic server-side
  // 
  // For now, Server Actions (Phase 0.1) provide the primary protection
  // by keeping all sensitive logic on the server with no client exposure.
  // ═══════════════════════════════════════════════════════════════════════

  // Security headers can be added via next.config or middleware
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;

