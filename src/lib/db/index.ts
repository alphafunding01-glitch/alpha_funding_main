import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as resources from './schema/resources';
import * as embeddings from './schema/embeddings';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, {
    schema: { ...resources, ...embeddings },
});

export type Database = typeof db;
