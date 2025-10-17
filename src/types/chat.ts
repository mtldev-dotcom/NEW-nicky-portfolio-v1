/**
 * TypeScript interfaces for Chat API
 * Ensures type safety across client/server boundary
 */

export interface ChatApiRequest {
    message: string;
    language: string;
}

export interface ChatApiResponse {
    answer: string;
    conversationId: string;
    timestamp: string;
}

export interface ChatApiError {
    error: string;
    message: string;
    code?: string;
}

export interface RateLimitResult {
    success: boolean;
    remaining: number;
    resetTime: Date;
}
