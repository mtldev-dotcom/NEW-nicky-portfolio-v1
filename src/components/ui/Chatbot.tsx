'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/utils/cn';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';
import ChatMessage, { type ChatMessageProps } from './ChatMessage';
import ChatInput from './ChatInput';

export interface ChatbotProps {
    className?: string;
    webhookUrl?: string;
    maxMessages?: number;
    autoOpen?: boolean;
}

interface Message extends Omit<ChatMessageProps, 'id' | 'timestamp'> {
    id: string;
    timestamp: Date;
}

const Chatbot: React.FC<ChatbotProps> = ({
    className,
    webhookUrl, // Remove default - will use API route
    maxMessages = 50,
    autoOpen = false
}) => {
    const t = useTranslations('chatbot');
    const locale = useLocale();

    const [isOpen, setIsOpen] = useState(autoOpen);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline' | 'connecting' | 'error'>('online');
    const [error, setError] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Initialize with welcome message
    useEffect(() => {
        if (messages.length === 0) {
            const welcomeMessage: Message = {
                id: 'welcome',
                content: t('welcome'),
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages([welcomeMessage]);
        }
    }, [t, messages.length]);

    // Handle escape key to close chat
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen]);

    const sendMessage = async (content: string) => {
        if (!content.trim() || isLoading) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            content,
            sender: 'user',
            timestamp: new Date()
        };

        const typingMessage: Message = {
            id: `typing-${Date.now()}`,
            content: '',
            sender: 'ai',
            timestamp: new Date(),
            isTyping: true
        };

        // Add user message and typing indicator
        setMessages(prev => [...prev, userMessage, typingMessage]);
        setIsLoading(true);
        setError(null);
        setConnectionStatus('connecting');

        try {
            // Use API route instead of direct webhook for security
            const apiUrl = '/api/chat';
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: content,
                    language: locale
                }),
            });

            const result = await response.json();

            // Handle API errors
            if (!response.ok) {
                throw new Error(result.message || `HTTP ${response.status}: ${response.statusText}`);
            }

            // Remove typing indicator and add AI response
            setMessages(prev => {
                const withoutTyping = prev.filter(msg => !msg.isTyping);
                const aiMessage: Message = {
                    id: `ai-${Date.now()}`,
                    content: result.answer || result.message || result.response || 'I apologize, but I couldn\'t process your request.',
                    sender: 'ai',
                    timestamp: new Date()
                };

                const newMessages = [...withoutTyping, aiMessage];

                // Limit message history
                return newMessages.slice(-maxMessages);
            });

            setConnectionStatus('online');
        } catch (err) {
            console.error('Chatbot error:', err);

            // Remove typing indicator and show error
            setMessages(prev => {
                const withoutTyping = prev.filter(msg => !msg.isTyping);

                // Determine appropriate error message based on error type
                let errorContent: string;
                if (err instanceof Error) {
                    if (err.message.includes('429') || err.message.includes('Too many')) {
                        errorContent = t('errorRateLimit');
                    } else if (err.message.includes('502') || err.message.includes('503') || err.message.includes('unavailable')) {
                        errorContent = t('errorServiceUnavailable');
                    } else if (err.message.includes('404')) {
                        errorContent = 'The chatbot service is currently being set up. Please try again in a moment, or contact me directly at nickdevmtl@gmail.com for immediate assistance.';
                    } else {
                        errorContent = t('errorSendFailed');
                    }
                } else {
                    errorContent = t('errorSendFailed');
                }

                const errorMessage: Message = {
                    id: `error-${Date.now()}`,
                    content: errorContent,
                    sender: 'ai',
                    timestamp: new Date(),
                    error: true
                };

                return [...withoutTyping, errorMessage];
            });

            setError(err instanceof Error ? err.message : 'Unknown error');
            setConnectionStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    const clearMessages = () => {
        const welcomeMessage: Message = {
            id: 'welcome',
            content: t('welcome'),
            sender: 'ai',
            timestamp: new Date()
        };
        setMessages([welcomeMessage]);
        setError(null);
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setIsMinimized(false);
        }
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    const getStatusColor = () => {
        switch (connectionStatus) {
            case 'online': return 'text-success';
            case 'offline': return 'text-muted-foreground';
            case 'connecting': return 'text-warning';
            case 'error': return 'text-error';
            default: return 'text-muted-foreground';
        }
    };

    const getStatusIcon = () => {
        switch (connectionStatus) {
            case 'online': return 'Circle';
            case 'offline': return 'CircleOff';
            case 'connecting': return 'Loader2';
            case 'error': return 'AlertCircle';
            default: return 'CircleOff';
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <div className={cn('fixed bottom-6 right-6 z-50', className)}>
                <Button
                    onClick={toggleChat}
                    size="icon"
                    className={cn(
                        'w-14 h-14 rounded-full shadow-lg transition-smooth',
                        'bg-primary text-primary-foreground hover:bg-primary/90',
                        'glow-neon hover:glow-neon-active',
                        'animate-float'
                    )}
                    iconName="MessageCircle"
                    iconSize={24}
                    aria-label={isOpen ? t('accessibilityCloseChat') : t('accessibilityOpenChat')}
                />
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div
                    ref={chatContainerRef}
                    className={cn(
                        'fixed bottom-24 right-6 z-50 w-96 h-[600px]',
                        'bg-card border border-border rounded-xl shadow-2xl',
                        'flex flex-col overflow-hidden',
                        'animate-scale-in',
                        isMinimized && 'h-16'
                    )}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <Icon name="Bot" size={16} className="text-primary-foreground" />
                            </div>
                            <div>
                                <h3 className="font-medium text-foreground">{t('title')}</h3>
                                <div className="flex items-center space-x-2">
                                    <Icon
                                        name={getStatusIcon()}
                                        size={12}
                                        className={cn('animate-spin', connectionStatus !== 'connecting' && 'animate-none')}
                                    />
                                    <span className={cn('text-xs', getStatusColor())}>
                                        {connectionStatus === 'online' ? t('statusOnline') :
                                            connectionStatus === 'offline' ? t('statusOffline') :
                                                connectionStatus === 'connecting' ? t('statusConnecting') :
                                                    t('statusError')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-1">
                            <Button
                                onClick={toggleMinimize}
                                size="icon"
                                variant="ghost"
                                className="w-8 h-8"
                                iconName={isMinimized ? "Maximize2" : "Minimize2"}
                                iconSize={16}
                                aria-label={isMinimized ? t('actionMaximize') : t('actionMinimize')}
                            />
                            <Button
                                onClick={clearMessages}
                                size="icon"
                                variant="ghost"
                                className="w-8 h-8"
                                iconName="Trash2"
                                iconSize={16}
                                aria-label={t('actionClear')}
                            />
                            <Button
                                onClick={toggleChat}
                                size="icon"
                                variant="ghost"
                                className="w-8 h-8"
                                iconName="X"
                                iconSize={16}
                                aria-label={t('actionClose')}
                            />
                        </div>
                    </div>

                    {/* Messages Area */}
                    {!isMinimized && (
                        <>
                            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                                {messages.map((message) => (
                                    <ChatMessage
                                        key={message.id}
                                        id={message.id}
                                        content={message.content}
                                        sender={message.sender}
                                        timestamp={message.timestamp}
                                        isTyping={message.isTyping}
                                        error={message.error}
                                    />
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Quick Suggestions */}
                            {messages.length <= 1 && (
                                <div className="px-4 py-2 border-t border-border bg-muted/30">
                                    <p className="text-xs text-muted-foreground mb-2">{t('suggestionsTitle')}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {[
                                            t('suggestion1'),
                                            t('suggestion2'),
                                            t('suggestion3'),
                                            t('suggestion4')
                                        ].map((suggestion, index) => (
                                            <Button
                                                key={index}
                                                variant="outline"
                                                size="sm"
                                                className="text-xs h-7 px-2"
                                                onClick={() => sendMessage(suggestion)}
                                                disabled={isLoading}
                                            >
                                                {suggestion}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Input Area */}
                            <ChatInput
                                onSendMessage={sendMessage}
                                disabled={isLoading}
                                placeholder={t('placeholder')}
                                maxLength={1000}
                            />
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default Chatbot;
