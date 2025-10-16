'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import Icon from '@/components/AppIcon';

export interface ChatMessageProps {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    isTyping?: boolean;
    error?: boolean;
    className?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
    id,
    content,
    sender,
    timestamp,
    isTyping = false,
    error = false,
    className
}) => {
    const isUser = sender === 'user';
    const isAI = sender === 'ai';

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div
            className={cn(
                'flex w-full mb-4 animate-slide-up',
                isUser ? 'justify-end' : 'justify-start',
                className
            )}
            data-message-id={id}
        >
            <div
                className={cn(
                    'flex max-w-[80%] space-x-2',
                    isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                )}
            >
                {/* Avatar */}
                <div
                    className={cn(
                        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-smooth',
                        isUser
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                    )}
                >
                    {isUser ? (
                        <Icon name="User" size={16} />
                    ) : (
                        <Icon name="Bot" size={16} />
                    )}
                </div>

                {/* Message Content */}
                <div className="flex flex-col space-y-1">
                    <div
                        className={cn(
                            'px-4 py-3 rounded-lg transition-smooth',
                            isUser
                                ? 'bg-primary text-primary-foreground rounded-br-sm'
                                : 'bg-card border border-border rounded-bl-sm',
                            error && 'border-error bg-error/5',
                            isTyping && 'animate-pulse'
                        )}
                    >
                        {isTyping ? (
                            <div className="flex items-center space-x-1">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                                <span className="text-sm text-muted-foreground ml-2">Typing...</span>
                            </div>
                        ) : (
                            <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                {content}
                            </div>
                        )}
                    </div>

                    {/* Timestamp */}
                    <div
                        className={cn(
                            'text-xs text-muted-foreground px-1',
                            isUser ? 'text-right' : 'text-left'
                        )}
                    >
                        {formatTime(timestamp)}
                    </div>

                    {/* Error indicator */}
                    {error && (
                        <div className="flex items-center space-x-1 text-xs text-error">
                            <Icon name="AlertCircle" size={12} />
                            <span>Failed to send</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
