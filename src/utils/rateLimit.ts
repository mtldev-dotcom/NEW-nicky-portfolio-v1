/**
 * In-memory rate limiting utility for chatbot API
 * Tracks requests per session to prevent abuse
 */

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

// In-memory store for rate limiting
// In production, consider using Redis for distributed rate limiting
const rateLimitStore = new Map<string, RateLimitEntry>();

export interface RateLimitResult {
    success: boolean;
    remaining: number;
    resetTime: Date;
}

/**
 * Check if request is within rate limit for given session
 * @param sessionId - The session ID to check
 * @param maxRequests - Maximum requests allowed (default from env)
 * @param windowMs - Time window in milliseconds (default from env)
 * @returns Rate limit result with success status and remaining count
 */
export function checkRateLimit(
    sessionId: string,
    maxRequests: number = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '20'),
    windowMs: number = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000')
): RateLimitResult {
    const now = Date.now();
    const entry = rateLimitStore.get(sessionId);

    // If no entry exists or window has expired, create new entry
    if (!entry || now > entry.resetTime) {
        const newEntry: RateLimitEntry = {
            count: 1,
            resetTime: now + windowMs
        };
        rateLimitStore.set(sessionId, newEntry);

        return {
            success: true,
            remaining: maxRequests - 1,
            resetTime: new Date(now + windowMs)
        };
    }

    // Check if limit exceeded
    if (entry.count >= maxRequests) {
        return {
            success: false,
            remaining: 0,
            resetTime: new Date(entry.resetTime)
        };
    }

    // Increment count
    entry.count++;
    rateLimitStore.set(sessionId, entry);

    return {
        success: true,
        remaining: maxRequests - entry.count,
        resetTime: new Date(entry.resetTime)
    };
}

/**
 * Clean up expired rate limit entries to prevent memory leaks
 * Should be called periodically in production
 */
export function cleanupExpiredEntries(): void {
    const now = Date.now();
    const expiredSessions: string[] = [];

    // Collect expired session IDs first
    rateLimitStore.forEach((entry, sessionId) => {
        if (now > entry.resetTime) {
            expiredSessions.push(sessionId);
        }
    });

    // Delete expired entries
    expiredSessions.forEach(sessionId => {
        rateLimitStore.delete(sessionId);
    });
}

// Clean up expired entries every 5 minutes
if (typeof window === 'undefined') { // Only run on server
    setInterval(cleanupExpiredEntries, 5 * 60 * 1000);
}
