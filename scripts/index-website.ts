/**
 * Content Indexing Script for Alpha Funding AI Chatbot
 * 
 * Crawls Alpha Funding website pages, extracts content,
 * generates embeddings, and stores in Neon PostgreSQL.
 * 
 * Usage: npx tsx scripts/index-website.ts
 */

import * as cheerio from 'cheerio';
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { embed, embedMany } from 'ai';
import { openai } from '@ai-sdk/openai';
import { nanoid } from 'nanoid';
import { eq } from 'drizzle-orm';
import { resources } from '../src/lib/db/schema/resources';
import { embeddings } from '../src/lib/db/schema/embeddings';

// Load environment variables
config({ path: '.env.local' });

// Initialize database
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

// Embedding model
const embeddingModel = openai.embedding('text-embedding-3-small');

// ─────────────────────────────────────────────────────────────────────────────
// Pages to Index
// ─────────────────────────────────────────────────────────────────────────────

// Base URL - use localhost for local development
const BASE_URL = process.env.INDEX_BASE_URL || 'http://localhost:3000';

const PAGES_TO_INDEX = [
    // Core pages
    { path: '/', type: 'homepage', title: 'Alpha Funding - Business Finance Broker' },
    { path: '/about-us', type: 'about', title: 'About Alpha Funding' },
    { path: '/contact', type: 'contact', title: 'Contact Alpha Funding' },
    { path: '/partner', type: 'partner', title: 'Partner with Alpha Funding' },
    { path: '/meet-the-team', type: 'about', title: 'Meet the Team' },
    { path: '/careers', type: 'about', title: 'Careers at Alpha Funding' },

    // Solutions (12 pages)
    { path: '/solutions', type: 'service', title: 'Business Funding Solutions' },
    { path: '/solutions/business-loans', type: 'service', title: 'Business Loans' },
    { path: '/solutions/invoice-finance', type: 'service', title: 'Invoice Finance' },
    { path: '/solutions/business-asset-equipment-finance', type: 'service', title: 'Asset & Equipment Finance' },
    { path: '/solutions/merchant-cash-advance', type: 'service', title: 'Merchant Cash Advance' },
    { path: '/solutions/business-cash-advance', type: 'service', title: 'Business Cash Advance' },
    { path: '/solutions/commercial-property-finance', type: 'service', title: 'Commercial Property Finance' },
    { path: '/solutions/property-finance', type: 'service', title: 'Property Finance' },
    { path: '/solutions/commercial-vehicle-finance', type: 'service', title: 'Commercial Vehicle Finance' },
    { path: '/solutions/growth-guarantee-scheme', type: 'service', title: 'Growth Guarantee Scheme' },
    { path: '/solutions/recovery-loan-scheme', type: 'service', title: 'Recovery Loan Scheme' },
    { path: '/solutions/refinance', type: 'service', title: 'Refinance' },
    { path: '/solutions/revolving-credit-facility', type: 'service', title: 'Revolving Credit Facility' },

    // Other Solutions (5 pages)
    { path: '/other-solutions/bridging-loans', type: 'service', title: 'Bridging Loans' },
    { path: '/other-solutions/business-bank-accounts', type: 'service', title: 'Business Bank Accounts' },
    { path: '/other-solutions/business-cards', type: 'service', title: 'Business Cards' },
    { path: '/other-solutions/machinery-vehicle-finance', type: 'service', title: 'Machinery & Vehicle Finance' },
    { path: '/other-solutions/merchant-services', type: 'service', title: 'Merchant Services' },

    // Sectors (20 pages)
    { path: '/sectors/agriculture', type: 'sector', title: 'Agriculture Finance' },
    { path: '/sectors/amusement-gaming-entertainment-finance-solutions', type: 'sector', title: 'Gaming & Entertainment Finance' },
    { path: '/sectors/beauty-finance-solutions', type: 'sector', title: 'Beauty Sector Finance' },
    { path: '/sectors/brewery-distillery-microbrewery-finance-solutions', type: 'sector', title: 'Brewery & Distillery Finance' },
    { path: '/sectors/business-loans-for-gyms', type: 'sector', title: 'Gym Finance Solutions' },
    { path: '/sectors/construction-financing-solutions', type: 'sector', title: 'Construction Finance' },
    { path: '/sectors/franchise-finance-solutions', type: 'sector', title: 'Franchise Finance' },
    { path: '/sectors/garage-finance-solutions', type: 'sector', title: 'Garage Finance' },
    { path: '/sectors/healthcare-finance-solutions', type: 'sector', title: 'Healthcare Finance' },
    { path: '/sectors/hospitality-leisure-glamping-finance-solutions', type: 'sector', title: 'Hospitality & Leisure Finance' },
    { path: '/sectors/logistics-transport-finance-solutions', type: 'sector', title: 'Logistics & Transport Finance' },
    { path: '/sectors/manufacturing-finance-solutions', type: 'sector', title: 'Manufacturing Finance' },
    { path: '/sectors/packaging-machinery-and-printing-equipment-financing', type: 'sector', title: 'Packaging & Printing Equipment Finance' },
    { path: '/sectors/professional-services-and-accountancy-business-financing', type: 'sector', title: 'Professional Services Finance' },
    { path: '/sectors/renewable-energy-finance-solutions', type: 'sector', title: 'Renewable Energy Finance' },
    { path: '/sectors/retail-finance-solutions', type: 'sector', title: 'Retail Finance' },
    { path: '/sectors/technology-finance-solutions', type: 'sector', title: 'Technology Finance' },
    { path: '/sectors/vehicle-and-plant-hire-finance', type: 'sector', title: 'Vehicle & Plant Hire Finance' },
    { path: '/sectors/waste-management-vehicle-and-recycling-equipment-finance', type: 'sector', title: 'Waste Management Finance' },
    { path: '/sectors/wholesale-business-finance-solutions', type: 'sector', title: 'Wholesale Business Finance' },

    // Tools
    { path: '/check-eligibility', type: 'tool', title: 'Eligibility Checker' },
    { path: '/calculator', type: 'tool', title: 'Funding Calculator' },
    { path: '/apply-now', type: 'tool', title: 'Apply for Funding' },

    // Policy pages
    { path: '/policy', type: 'policy', title: 'Privacy Policy' },
    { path: '/cookie-policy', type: 'policy', title: 'Cookie Policy' },
    { path: '/terms', type: 'policy', title: 'Terms & Conditions' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Content Extraction
// ─────────────────────────────────────────────────────────────────────────────

async function fetchPageContent(url: string): Promise<string | null> {
    try {
        console.log(`  📥 Fetching: ${url}`);
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'AlphaFunding-Indexer/1.0',
            },
        });

        if (!response.ok) {
            console.log(`  ⚠️ HTTP ${response.status} for ${url}`);
            return null;
        }

        return await response.text();
    } catch (error) {
        console.log(`  ❌ Failed to fetch ${url}:`, error);
        return null;
    }
}

function extractTextContent(html: string): string {
    const $ = cheerio.load(html);

    // Remove unwanted elements
    $('nav, footer, script, style, header, noscript, iframe, form, button, svg').remove();
    $('[class*="cookie"]').remove();
    $('[class*="banner"]').remove();
    $('[class*="popup"]').remove();
    $('[class*="modal"]').remove();

    // Get main content areas
    let content = '';

    // Try to get main content first
    const mainContent = $('main, article, [role="main"], .content, .page-content').text();
    if (mainContent.trim()) {
        content = mainContent;
    } else {
        // Fallback to body
        content = $('body').text();
    }

    // Clean up whitespace
    content = content
        .replace(/\s+/g, ' ')
        .replace(/\n\s*\n/g, '\n\n')
        .trim();

    return content;
}

// ─────────────────────────────────────────────────────────────────────────────
// Chunking
// ─────────────────────────────────────────────────────────────────────────────

function chunkContent(text: string, title: string, maxChars: number = 1500): string[] {
    // Split by sentences and paragraphs
    const sentences = text.split(/(?<=[.!?])\s+/);

    const chunks: string[] = [];
    let currentChunk = '';

    for (const sentence of sentences) {
        // If adding this sentence would exceed max, save current and start new
        if ((currentChunk + sentence).length > maxChars && currentChunk) {
            chunks.push(`[Page: ${title}]\n${currentChunk.trim()}`);
            currentChunk = sentence;
        } else {
            currentChunk += ' ' + sentence;
        }
    }

    // Don't forget the last chunk
    if (currentChunk.trim() && currentChunk.trim().length > 50) {
        chunks.push(`[Page: ${title}]\n${currentChunk.trim()}`);
    }

    return chunks;
}

// ─────────────────────────────────────────────────────────────────────────────
// Database Operations
// ─────────────────────────────────────────────────────────────────────────────

async function deleteExistingResource(url: string): Promise<void> {
    // Find existing resource
    const existing = await db
        .select({ id: resources.id })
        .from(resources)
        .where(eq(resources.url, url));

    if (existing.length > 0) {
        // Delete will cascade to embeddings
        await db.delete(resources).where(eq(resources.url, url));
        console.log(`  🗑️ Deleted existing: ${url}`);
    }
}

async function indexPage(
    url: string,
    type: string,
    title: string
): Promise<{ chunks: number } | null> {
    // Delete existing if re-indexing
    await deleteExistingResource(url);

    // Fetch page
    const html = await fetchPageContent(url);
    if (!html) return null;

    // Extract content
    const content = extractTextContent(html);
    if (!content || content.length < 100) {
        console.log(`  ⚠️ Insufficient content for ${url}`);
        return null;
    }

    // Create resource record
    const resourceId = nanoid();
    await db.insert(resources).values({
        id: resourceId,
        content: content,
        url: url,
        title: title,
        contentType: type,
        lastIndexed: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    // Chunk content
    const chunks = chunkContent(content, title);
    if (chunks.length === 0) {
        console.log(`  ⚠️ No chunks generated for ${url}`);
        return null;
    }

    console.log(`  📝 Generated ${chunks.length} chunks`);

    // Generate embeddings in batches
    const batchSize = 10;
    for (let i = 0; i < chunks.length; i += batchSize) {
        const batch = chunks.slice(i, i + batchSize);

        console.log(`  🔢 Embedding batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(chunks.length / batchSize)}`);

        const { embeddings: vectors } = await embedMany({
            model: embeddingModel,
            values: batch,
        });

        // Insert embeddings
        const embeddingRecords = vectors.map((vector, idx) => ({
            id: nanoid(),
            resourceId: resourceId,
            content: batch[idx],
            embedding: vector,
        }));

        await db.insert(embeddings).values(embeddingRecords);
    }

    return { chunks: chunks.length };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
    console.log('🚀 Alpha Funding Content Indexer');
    console.log('================================\n');

    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is not set');
    }

    if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY environment variable is not set');
    }

    let totalChunks = 0;
    let successCount = 0;
    let failCount = 0;

    for (const page of PAGES_TO_INDEX) {
        const fullUrl = `${BASE_URL}${page.path}`;
        console.log(`\n📄 Indexing: ${page.title}`);

        try {
            const result = await indexPage(fullUrl, page.type, page.title);

            if (result) {
                totalChunks += result.chunks;
                successCount++;
                console.log(`  ✅ Indexed: ${result.chunks} chunks`);
            } else {
                failCount++;
                console.log(`  ❌ Failed to index`);
            }
        } catch (error) {
            failCount++;
            console.log(`  ❌ Error:`, error);
        }

        // Rate limiting - be nice to the server
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n================================');
    console.log('📊 Indexing Complete!');
    console.log(`   ✅ Successful: ${successCount} pages`);
    console.log(`   ❌ Failed: ${failCount} pages`);
    console.log(`   📝 Total chunks: ${totalChunks}`);
    console.log('================================\n');
}

main().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
});
