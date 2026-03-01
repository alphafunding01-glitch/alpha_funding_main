'use client';

import type { UIMessage } from 'ai';
import { MessageBubble } from './message-bubble';
import { ThinkingIndicator } from './thinking-indicator';

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

interface ChatMessagesProps {
    messages: UIMessage[];
    isLoading: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Chat Messages Component
// ─────────────────────────────────────────────────────────────────────────────

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
    return (
        <div className="space-y-4">
            {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
            ))}

            {isLoading && <ThinkingIndicator />}
        </div>
    );
}

export default ChatMessages;
