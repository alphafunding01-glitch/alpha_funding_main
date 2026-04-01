'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useRef, useEffect, useCallback, useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { ChatMessages } from './chat-messages';
import { ChatInput } from './chat-input';
import { SuggestedQuestions } from './suggested-questions';
import { ChatDisclaimer } from './chat-disclaimer';

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

interface ChatPanelProps {
    onClose: () => void;
    onMessageSent: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Suggested Questions
// ─────────────────────────────────────────────────────────────────────────────

const SUGGESTED_QUESTIONS = [
    'What types of funding do you offer?',
    'How do I check my eligibility?',
    'What documents do I need?',
    'How long does funding take?',
];

// ─────────────────────────────────────────────────────────────────────────────
// Chat Panel Component
// ─────────────────────────────────────────────────────────────────────────────

export function ChatPanel({
    onClose,
    onMessageSent,
}: ChatPanelProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState('');

    const { messages, sendMessage, status, error } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chatbot',
        }),
    });

    const isLoading = status === 'streaming' || status === 'submitted';

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Handle suggested question click
    const handleSuggestedClick = useCallback((question: string) => {
        sendMessage({ text: question });
        onMessageSent();
    }, [sendMessage, onMessageSent]);

    // Handle form submission with engagement tracking
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            sendMessage({ text: input });
            setInput('');
            onMessageSent();
        }
    };

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    return (
        <div className="flex flex-col h-full bg-background/95 backdrop-blur-xl">
            {/* Header */}
            <div className="
        flex items-center justify-between
        px-4 py-3
        bg-linear-to-r from-[#030f42] to-brand-cyan
        text-white
      ">
                <div className="flex items-center gap-2">
<Sparkles className="w-5 h-5" />
                    <div>
                        <h2 className="font-semibold text-sm">Alpha Assistant</h2>
                        <p className="text-xs text-white/70">Business Finance Help</p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="
            p-2 rounded-lg
            hover:bg-white/10
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-white/30
          "
                    aria-label="Close chat"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.length === 0 ? (
                    <>
                        {/* Welcome Message */}
                        <div className="text-center py-6">
                            <div className="
                inline-flex items-center justify-center
                w-16 h-16 rounded-full mb-4
                bg-linear-to-r from-[#030f42] to-brand-cyan
              ">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">
                                Hi there! 👋
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                I'm Alpha, your business finance assistant. How can I help you today?
                            </p>
                        </div>

                        {/* Suggested Questions */}
                        <SuggestedQuestions
                            questions={SUGGESTED_QUESTIONS}
                            onSelect={handleSuggestedClick}
                        />
                    </>
                ) : (
                    <ChatMessages messages={messages} isLoading={isLoading} />
                )}

                {error && (
                    <div className="mx-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                        Something went wrong. Please try again.
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border/50 p-4 space-y-3">
                <ChatInput
                    input={input}
                    onChange={handleInputChange}
                    onSubmit={handleFormSubmit}
                    isLoading={isLoading}
                />

                <ChatDisclaimer />
            </div>
        </div>
    );
}

export default ChatPanel;
