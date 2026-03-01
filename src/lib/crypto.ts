// ═══════════════════════════════════════════════════════════════════════════
// Alpha Funding - Payload Encryption Utilities
// Phase 0.4: AES-GCM Encryption with Double-Blind Session Keys
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// Server-Side Only Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generate a session key for the current request
 * This key is unique per session and expires quickly
 */
export async function generateSessionKey(): Promise<{ key: string; expiresAt: number }> {
    // Generate random bytes for the key
    const keyBytes = new Uint8Array(32);
    crypto.getRandomValues(keyBytes);

    // Convert to base64 for transmission
    const key = Buffer.from(keyBytes).toString('base64');

    // Key expires in 5 minutes
    const expiresAt = Date.now() + 5 * 60 * 1000;

    return { key, expiresAt };
}

/**
 * Encrypt a payload using AES-GCM
 * Returns encrypted data as base64 along with IV
 */
export async function encryptPayload(
    data: object,
    keyBase64: string
): Promise<{ encrypted: string; iv: string }> {
    // Decode the key from base64
    const keyBytes = Buffer.from(keyBase64, 'base64');

    // Import as CryptoKey
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyBytes,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt']
    );

    // Generate random IV (12 bytes for AES-GCM)
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Encode the data
    const encoded = new TextEncoder().encode(JSON.stringify(data));

    // Encrypt
    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        cryptoKey,
        encoded
    );

    return {
        encrypted: Buffer.from(encrypted).toString('base64'),
        iv: Buffer.from(iv).toString('base64'),
    };
}

/**
 * Decrypt a payload using AES-GCM
 */
export async function decryptPayload<T = unknown>(
    encryptedBase64: string,
    ivBase64: string,
    keyBase64: string
): Promise<T> {
    // Decode from base64
    const keyBytes = Buffer.from(keyBase64, 'base64');
    const iv = Buffer.from(ivBase64, 'base64');
    const encrypted = Buffer.from(encryptedBase64, 'base64');

    // Import as CryptoKey
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyBytes,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
    );

    // Decrypt
    const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        cryptoKey,
        encrypted
    );

    // Decode and parse
    const decoded = new TextDecoder().decode(decrypted);
    return JSON.parse(decoded) as T;
}

// ─────────────────────────────────────────────────────────────────────────────
// Session Key Store (In-Memory)
// For production, use Redis or Upstash for persistence
// ─────────────────────────────────────────────────────────────────────────────

interface SessionKeyRecord {
    key: string;
    expiresAt: number;
    clientId: string;
}

const sessionKeyStore = new Map<string, SessionKeyRecord>();

// Clean up expired keys periodically
const CLEANUP_INTERVAL = 60000;
let lastCleanup = Date.now();

function cleanupExpiredKeys() {
    const now = Date.now();
    if (now - lastCleanup > CLEANUP_INTERVAL) {
        for (const [id, record] of sessionKeyStore.entries()) {
            if (now > record.expiresAt) {
                sessionKeyStore.delete(id);
            }
        }
        lastCleanup = now;
    }
}

/**
 * Create and store a session key for a client
 * Returns a session ID that the client uses to identify their key
 */
export async function createSessionKey(clientId: string): Promise<{
    sessionId: string;
    key: string;
    expiresIn: number;
}> {
    cleanupExpiredKeys();

    const { key, expiresAt } = await generateSessionKey();

    // Generate unique session ID
    const sessionIdBytes = new Uint8Array(16);
    crypto.getRandomValues(sessionIdBytes);
    const sessionId = Buffer.from(sessionIdBytes).toString('hex');

    // Store the key
    sessionKeyStore.set(sessionId, {
        key,
        expiresAt,
        clientId,
    });

    return {
        sessionId,
        key,
        expiresIn: 5 * 60 * 1000, // 5 minutes
    };
}

/**
 * Retrieve session key for decryption (server-side only)
 */
export function getSessionKey(sessionId: string): string | null {
    cleanupExpiredKeys();

    const record = sessionKeyStore.get(sessionId);

    if (!record) {
        return null;
    }

    if (Date.now() > record.expiresAt) {
        sessionKeyStore.delete(sessionId);
        return null;
    }

    return record.key;
}

/**
 * Invalidate a session key (e.g., after use)
 */
export function invalidateSessionKey(sessionId: string): void {
    sessionKeyStore.delete(sessionId);
}

// ─────────────────────────────────────────────────────────────────────────────
// Client-Side Decryption Helper (for reference)
// This code would run in the browser
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Client-side decryption using Web Crypto API
 * Usage: Include this in your client bundle
 * 
 * async function decryptOnClient(encrypted, iv, key) {
 *     const keyBytes = Uint8Array.from(atob(key), c => c.charCodeAt(0));
 *     const ivBytes = Uint8Array.from(atob(iv), c => c.charCodeAt(0));
 *     const encryptedBytes = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));
 *     
 *     const cryptoKey = await crypto.subtle.importKey(
 *         'raw', keyBytes,
 *         { name: 'AES-GCM', length: 256 },
 *         false, ['decrypt']
 *     );
 *     
 *     const decrypted = await crypto.subtle.decrypt(
 *         { name: 'AES-GCM', iv: ivBytes },
 *         cryptoKey, encryptedBytes
 *     );
 *     
 *     return JSON.parse(new TextDecoder().decode(decrypted));
 * }
 */
