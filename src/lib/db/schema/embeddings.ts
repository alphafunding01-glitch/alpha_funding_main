import { index, pgTable, text, varchar, vector } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { resources } from './resources';

/**
 * Embeddings table - stores vector embeddings for RAG retrieval
 * Each embedding represents a chunk of content from a resource
 * Uses OpenAI text-embedding-3-small (1536 dimensions)
 */
export const embeddings = pgTable(
    'embeddings',
    {
        id: varchar('id', { length: 191 })
            .primaryKey()
            .$defaultFn(() => nanoid()),

        // Foreign key to the source resource
        resourceId: varchar('resource_id', { length: 191 }).references(
            () => resources.id,
            { onDelete: 'cascade' }
        ),

        // The text content of this chunk (for display in responses)
        content: text('content').notNull(),

        // Vector embedding (1536 dimensions for text-embedding-3-small)
        embedding: vector('embedding', { dimensions: 1536 }).notNull(),
    },
    (table) => [
        // HNSW index for fast cosine similarity search
        index('embedding_index').using(
            'hnsw',
            table.embedding.op('vector_cosine_ops')
        ),
    ]
);

export type Embedding = typeof embeddings.$inferSelect;
export type NewEmbedding = typeof embeddings.$inferInsert;
