import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateSession, setSessionCookie } from '@/utils/session';
import { checkRateLimit } from '@/utils/rateLimit';
import type { ChatApiRequest, ChatApiResponse, ChatApiError } from '@/types/chat';

/**
 * POST /api/chat
 * 
 * Secure API proxy for chatbot communication with n8n webhook
 * Handles session management, rate limiting, and error handling
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // Parse and validate request body
        const body: ChatApiRequest = await request.json();

        if (!body.message || typeof body.message !== 'string') {
            return NextResponse.json<ChatApiError>({
                error: 'Invalid request',
                message: 'Message is required and must be a string',
                code: 'INVALID_MESSAGE'
            }, { status: 400 });
        }

        if (!body.language || typeof body.language !== 'string') {
            return NextResponse.json<ChatApiError>({
                error: 'Invalid request',
                message: 'Language is required and must be a string',
                code: 'INVALID_LANGUAGE'
            }, { status: 400 });
        }

        // Validate message length (prevent abuse)
        if (body.message.length > 1000) {
            return NextResponse.json<ChatApiError>({
                error: 'Message too long',
                message: 'Message must be 1000 characters or less',
                code: 'MESSAGE_TOO_LONG'
            }, { status: 400 });
        }

        // Get or create session ID
        const sessionId = getOrCreateSession(request);

        // Check rate limit
        const rateLimitResult = checkRateLimit(sessionId);
        if (!rateLimitResult.success) {
            return NextResponse.json<ChatApiError>({
                error: 'Rate limit exceeded',
                message: 'Too many messages. Please wait a moment.',
                code: 'RATE_LIMIT_EXCEEDED'
            }, {
                status: 429,
                headers: {
                    'Retry-After': Math.ceil((rateLimitResult.resetTime.getTime() - Date.now()) / 1000).toString(),
                    'X-RateLimit-Limit': '20',
                    'X-RateLimit-Remaining': '0',
                    'X-RateLimit-Reset': rateLimitResult.resetTime.toISOString()
                }
            });
        }

        // Prepare payload for n8n webhook
        const n8nPayload = {
            conversationId: sessionId,
            message: body.message.trim(),
            language: body.language,
            timestamp: new Date().toISOString(),
            meta: {
                userAgent: request.headers.get('user-agent') || 'unknown',
                ip: request.headers.get('x-forwarded-for') ||
                    request.headers.get('x-real-ip') ||
                    'unknown'
            }
        };

        // Get webhook URL from environment
        const webhookUrl = process.env.N8N_WEBHOOK_URL;
        if (!webhookUrl) {
            console.error('N8N_WEBHOOK_URL environment variable not set');
            return NextResponse.json<ChatApiError>({
                error: 'Configuration error',
                message: 'Chat service temporarily unavailable.',
                code: 'MISSING_WEBHOOK_URL'
            }, { status: 500 });
        }

        // Forward request to n8n webhook
        const n8nResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Nicky-Portfolio-Chatbot/1.0'
            },
            body: JSON.stringify(n8nPayload),
            // Add timeout to prevent hanging requests
            signal: AbortSignal.timeout(30000) // 30 second timeout
        });

        // Handle n8n response
        if (!n8nResponse.ok) {
            console.error(`n8n webhook error: ${n8nResponse.status} ${n8nResponse.statusText}`);

            // Return user-friendly error based on n8n status
            if (n8nResponse.status >= 500) {
                return NextResponse.json<ChatApiError>({
                    error: 'Service unavailable',
                    message: 'Chat service temporarily unavailable.',
                    code: 'N8N_SERVER_ERROR'
                }, { status: 502 });
            } else if (n8nResponse.status === 429) {
                return NextResponse.json<ChatApiError>({
                    error: 'Service rate limited',
                    message: 'Chat service is busy. Please try again in a moment.',
                    code: 'N8N_RATE_LIMITED'
                }, { status: 503 });
            } else {
                return NextResponse.json<ChatApiError>({
                    error: 'Service error',
                    message: 'Unable to process your message. Please try again.',
                    code: 'N8N_CLIENT_ERROR'
                }, { status: 502 });
            }
        }

        // Parse n8n response
        let n8nData;
        try {
            n8nData = await n8nResponse.json();
        } catch (parseError) {
            console.error('Failed to parse n8n response:', parseError);
            return NextResponse.json<ChatApiError>({
                error: 'Invalid response',
                message: 'Received invalid response from chat service.',
                code: 'INVALID_N8N_RESPONSE'
            }, { status: 502 });
        }

        // Format response for frontend
        const response: ChatApiResponse = {
            answer: n8nData.message || n8nData.response || n8nData.answer || 'I apologize, but I couldn\'t process your request.',
            conversationId: sessionId,
            timestamp: new Date().toISOString()
        };

        // Create response with session cookie
        const nextResponse = NextResponse.json(response);
        return setSessionCookie(nextResponse, sessionId);

    } catch (error) {
        console.error('Chat API error:', error);

        // Handle different error types
        if (error instanceof SyntaxError) {
            return NextResponse.json<ChatApiError>({
                error: 'Invalid JSON',
                message: 'Invalid request format.',
                code: 'INVALID_JSON'
            }, { status: 400 });
        }

        if (error instanceof Error && error.name === 'AbortError') {
            return NextResponse.json<ChatApiError>({
                error: 'Request timeout',
                message: 'Request timed out. Please try again.',
                code: 'TIMEOUT'
            }, { status: 408 });
        }

        // Generic server error
        return NextResponse.json<ChatApiError>({
            error: 'Internal server error',
            message: 'An unexpected error occurred. Please try again.',
            code: 'INTERNAL_ERROR'
        }, { status: 500 });
    }
}

/**
 * Handle unsupported methods
 */
export async function GET(): Promise<NextResponse> {
    return NextResponse.json<ChatApiError>({
        error: 'Method not allowed',
        message: 'Only POST requests are supported.',
        code: 'METHOD_NOT_ALLOWED'
    }, { status: 405 });
}
