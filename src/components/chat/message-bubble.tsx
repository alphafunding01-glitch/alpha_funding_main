'use client';

import type { UIMessage } from 'ai';
import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

interface MessageBubbleProps {
    message: UIMessage;
}

// ─────────────────────────────────────────────────────────────────────────────
// Extract text content from message parts
// ─────────────────────────────────────────────────────────────────────────────

function getMessageText(message: UIMessage): string {
    // Handle legacy format (content as string)
    if (typeof (message as any).content === 'string') {
        return (message as any).content;
    }

    // Handle new parts format
    if (message.parts && Array.isArray(message.parts)) {
        return message.parts
            .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
            .map(part => part.text)
            .join('');
    }

    return '';
}

// ─────────────────────────────────────────────────────────────────────────────
// Message Bubble Component
// ─────────────────────────────────────────────────────────────────────────────

export function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === 'user';
    const content = getMessageText(message);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
            className={cn(
                'flex gap-3',
                isUser ? 'flex-row-reverse' : 'flex-row'
            )}
        >
            {/* Avatar */}
            <div className={cn(
                'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                isUser
                    ? 'bg-brand-cyan text-white'
                    : 'bg-gradient-to-r from-[#030f42] to-[#1CB5E0] text-white'
            )}>
                {isUser ? (
                    <User className="w-4 h-4" />
                ) : (
                    <Sparkles className="w-4 h-4" />
                )}
            </div>

            {/* Message Content */}
            <div className={cn(
                'max-w-[80%] rounded-2xl px-4 py-3',
                isUser
                    ? 'bg-brand-cyan text-white rounded-tr-sm'
                    : 'bg-white/10 dark:bg-white/5 border border-white/10 rounded-tl-sm'
            )}>
                <div className="text-sm whitespace-pre-wrap break-words">
                    {content}
                </div>
            </div>
        </motion.div>
    );
}

export default MessageBubble;
