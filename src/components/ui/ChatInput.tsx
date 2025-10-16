'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';

export interface ChatInputProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
    maxLength?: number;
    className?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
    onSendMessage,
    disabled = false,
    placeholder = "Type your message here...",
    maxLength = 1000,
    className
}) => {
    const [message, setMessage] = useState('');
    const [isComposing, setIsComposing] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea based on content
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
        }
    }, [message]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedMessage = message.trim();
        if (!trimmedMessage || disabled) return;

        // Validate message length
        if (trimmedMessage.length > maxLength) {
            return;
        }

        onSendMessage(trimmedMessage);
        setMessage('');

        // Reset textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Handle Enter key
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                // Shift+Enter: new line (default behavior)
                return;
            } else {
                // Enter: send message
                e.preventDefault();
                handleSubmit(e);
            }
        }
    };

    const handleCompositionStart = () => {
        setIsComposing(true);
    };

    const handleCompositionEnd = () => {
        setIsComposing(false);
    };

    const canSend = message.trim().length > 0 && !disabled && !isComposing;

    return (
        <form
            onSubmit={handleSubmit}
            className={cn(
                'flex items-end space-x-2 p-4 border-t border-border bg-card',
                className
            )}
        >
            {/* Textarea */}
            <div className="flex-1 relative">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    placeholder={placeholder}
                    disabled={disabled}
                    maxLength={maxLength}
                    rows={1}
                    className={cn(
                        'w-full px-4 py-3 bg-input border border-border rounded-lg',
                        'text-foreground placeholder-muted-foreground',
                        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                        'resize-none transition-smooth',
                        'min-h-[44px] max-h-[120px]',
                        disabled && 'opacity-50 cursor-not-allowed'
                    )}
                    style={{ height: 'auto' }}
                />

                {/* Character count */}
                {message.length > maxLength * 0.8 && (
                    <div className="absolute bottom-1 right-2 text-xs text-muted-foreground">
                        {message.length}/{maxLength}
                    </div>
                )}
            </div>

            {/* Send button */}
            <Button
                type="submit"
                size="icon"
                disabled={!canSend}
                className={cn(
                    'h-11 w-11 shrink-0',
                    canSend && 'glow-neon hover:glow-neon-active'
                )}
                iconName="Send"
                iconSize={18}
                aria-label="Send message"
            />

            {/* Loading indicator */}
            {disabled && (
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-lg">
                    <Icon name="Loader2" size={20} className="animate-spin text-primary" />
                </div>
            )}
        </form>
    );
};

export default ChatInput;
