import { embed, embedMany } from 'ai';
import { embeddingModel, AI_CONFIG } from './models';

/**
 * Generate embedding for a single text string
 */
export async function generateEmbedding(text: string): Promise<number[]> {
    const { embedding } = await embed({
        model: embeddingModel,
        value: text,
    });
    return embedding;
}

/**
 * Generate embeddings for multiple text strings in batch
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
    const { embeddings } = await embedMany({
        model: embeddingModel,
        values: texts,
    });
    return embeddings;
}

/**
 * Chunk content into smaller pieces for embedding
 * Uses paragraph-based chunking with metadata prefix
 */
export function chunkContent(
    text: string,
    title: string,
    maxChars: number = AI_CONFIG.MAX_CHUNK_CHARS
): string[] {
    // Split by double newlines (paragraphs)
    const paragraphs = text
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter((p) => p.length > 20); // Skip very short paragraphs

    const chunks: string[] = [];
    let currentChunk = '';

    for (const para of paragraphs) {
        // If adding this paragraph would exceed max, save current and start new
        if ((currentChunk + para).length > maxChars && currentChunk) {
            chunks.push(`Page: ${title}\n${currentChunk.trim()}`);
            currentChunk = para;
        } else {
            currentChunk += '\n\n' + para;
        }
    }

    // Don't forget the last chunk
    if (currentChunk.trim()) {
        chunks.push(`Page: ${title}\n${currentChunk.trim()}`);
    }

    return chunks;
}

/**
 * Prepare text for embedding by cleaning and normalizing
 */
export function prepareTextForEmbedding(text: string): string {
    return text
        .replace(/\s+/g, ' ') // Normalize whitespace
        .replace(/[^\x20-\x7E\u00A0-\u00FF]/g, '') // Remove non-printable chars
        .trim();
}
