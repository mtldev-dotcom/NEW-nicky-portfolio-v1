import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Session management utilities for chatbot
 * Handles secure session ID generation and cookie management
 */

/**
 * Generate a secure session ID using crypto.randomUUID()
 * @returns A UUID v4 string
 */
export function generateSessionId(): string {
    return randomUUID();
}

/**
 * Extract session ID from request cookies or create a new one
 * @param request - Next.js request object
 * @returns The session ID string
 */
export function getOrCreateSession(request: NextRequest): string {
    const existingSessionId = request.cookies.get('chatSessionId')?.value;

    if (existingSessionId) {
        return existingSessionId;
    }

    return generateSessionId();
}

/**
 * Set secure session cookie on response
 * @param response - Next.js response object
 * @param sessionId - The session ID to set
 * @returns The response with cookie set
 */
export function setSessionCookie(response: NextResponse, sessionId: string): NextResponse {
    response.cookies.set('chatSessionId', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/'
    });

    return response;
}
