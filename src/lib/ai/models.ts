import { openai } from '@ai-sdk/openai';

/**
 * AI Model Configuration for Alpha Funding Chatbot
 * Using GPT-4o-mini for fast responses within 10s Vercel free tier timeout
 */

// Chat model - GPT-4o-mini for speed and cost efficiency
export const chatModel = openai('gpt-4o-mini');

// Embedding model - text-embedding-3-small (1536 dimensions)
export const embeddingModel = openai.embedding('text-embedding-3-small');

// Model configuration constants
export const AI_CONFIG = {
    // Embedding dimensions (must match schema)
    EMBEDDING_DIMENSIONS: 1536,

    // Similarity threshold for RAG retrieval (0.0 to 1.0)
    // Lower = more results, higher = stricter matching
    SIMILARITY_THRESHOLD: 0.3,

    // Maximum chunks to retrieve per query
    MAX_CHUNKS: 5,

    // Maximum characters per chunk when indexing
    MAX_CHUNK_CHARS: 1500,

    // Token limits
    MAX_TOKENS: 1024,
} as const;
