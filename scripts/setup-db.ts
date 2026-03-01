/**
 * Setup script to enable pgvector extension on Neon database
 * Run this BEFORE applying Drizzle migrations
 * 
 * Usage: npx tsx scripts/setup-db.ts
 */

import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

// Load .env.local file
config({ path: '.env.local' });

async function main() {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is not set');
    }

    console.log('🔧 Setting up database...');

    const sql = neon(process.env.DATABASE_URL);

    // Enable pgvector extension
    console.log('📦 Enabling pgvector extension...');
    await sql`CREATE EXTENSION IF NOT EXISTS vector;`;
    console.log('✅ pgvector extension enabled');

    // Verify extension is installed
    const result = await sql`SELECT * FROM pg_extension WHERE extname = 'vector';`;
    if (result.length > 0) {
        console.log('✅ pgvector verified: ', result[0].extname, 'v' + result[0].extversion);
    } else {
        console.error('❌ pgvector extension not found!');
        process.exit(1);
    }

    console.log('\n🎉 Database setup complete!');
    console.log('Next step: Run "npx drizzle-kit push" to apply migrations');
}

main().catch((err) => {
    console.error('Error:', err);
    process.exit(1);
});
