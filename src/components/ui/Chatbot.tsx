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
    const [isMobile, setIsMobile] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Mobile breakpoint detection and body scroll lock
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
        };

        // Initial check
        checkMobile();

        // Listen for resize events
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Body scroll lock for mobile when chat is open
    useEffect(() => {
        if ((isOpen || isClosing) && isMobile) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = '';
            };
        }
    }, [isOpen, isClosing, isMobile]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Handle virtual keyboard on mobile - ensure input stays visible
    useEffect(() => {
        if ((isOpen || isClosing) && isMobile) {
            const handleResize = () => {
                // Small delay to ensure keyboard animation completes
                setTimeout(() => {
                    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [isOpen, isClosing, isMobile]);

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

    // Handle escape key to close chat (desktop only)
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen && !isMobile) {
                setIsOpen(false);
            }
        };

        if (isOpen && !isMobile) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, isMobile]);

    // Focus trap for mobile full-screen chat
    useEffect(() => {
        if ((isOpen || isClosing) && isMobile && chatContainerRef.current) {
            const focusableElements = chatContainerRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            const handleTabKey = (e: KeyboardEvent) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            lastElement?.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            firstElement?.focus();
                            e.preventDefault();
                        }
                    }
                }
            };

            // Focus first element only when opening (not closing)
            if (isOpen && !isClosing) {
                firstElement?.focus();
            }

            document.addEventListener('keydown', handleTabKey);
            return () => document.removeEventListener('keydown', handleTabKey);
        }
    }, [isOpen, isClosing, isMobile]);

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
        if (isOpen) {
            // Start closing animation on mobile
            if (isMobile) {
                setIsClosing(true);
                // Wait for animation to complete before actually closing
                setTimeout(() => {
                    setIsOpen(false);
                    setIsClosing(false);
                }, 300); // Match animation duration
            } else {
                // Desktop: close immediately
                setIsOpen(false);
            }
        } else {
            // Opening chat
            setIsOpen(true);
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
            {(isOpen || isClosing) && (
                <div
                    ref={chatContainerRef}
                    className={cn(
                        'fixed z-[9999] bg-background flex flex-col',
                        // Mobile full-screen
                        'max-md:inset-0 max-md:w-screen max-md:h-screen max-md:rounded-none',
                        // Desktop widget (existing)
                        'md:bottom-24 md:right-6 md:w-96 md:h-[600px] md:rounded-xl md:border md:border-border md:shadow-2xl',
                        // Animation
                        'animate-scale-in',
                        // Minimize state (desktop only)
                        !isMobile && isMinimized && 'h-16'
                    )}
                    role={isMobile ? "dialog" : undefined}
                    aria-modal={isMobile ? "true" : undefined}
                >
                    {/* Header */}
                    <div className={cn(
                        'flex items-center justify-between border-b border-border',
                        // Mobile header with neon-mint background and safe area support
                        'max-md:h-16 max-md:bg-primary max-md:text-primary-foreground max-md:px-4',
                        // iOS safe area support
                        'max-md:pt-[env(safe-area-inset-top)] max-md:pb-[env(safe-area-inset-bottom)]',
                        // Desktop header (existing)
                        'md:h-auto md:bg-muted/50 md:p-4'
                    )}>
                        <div className="flex items-center space-x-3">
                            <div className={cn(
                                'w-8 h-8 rounded-full flex items-center justify-center',
                                // Mobile: white icon on mint background
                                'max-md:bg-primary-foreground max-md:text-primary',
                                // Desktop: mint icon on muted background
                                'md:bg-primary md:text-primary-foreground'
                            )}>
                                <Icon name="Bot" size={16} />
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
                            {/* Desktop-only buttons */}
                            {!isMobile && (
                                <>
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
                                </>
                            )}
                            {/* Close button - always visible */}
                            <Button
                                onClick={toggleChat}
                                size="icon"
                                variant="ghost"
                                className={cn(
                                    'w-8 h-8',
                                    // Mobile: white text on mint background
                                    'max-md:text-primary-foreground max-md:hover:bg-primary-foreground/10',
                                    // Desktop: default ghost styling
                                    'md:text-foreground'
                                )}
                                iconName="X"
                                iconSize={16}
                                aria-label={t('actionClose')}
                            />
                        </div>
                    </div>

                    {/* Messages Area */}
                    {((!isMobile && !isMinimized) || isMobile) && (
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
