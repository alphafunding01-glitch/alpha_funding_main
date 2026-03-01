'use client';

import { FormEvent } from 'react';
import { Send } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

interface ChatInputProps {
    input: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: (e: FormEvent) => void;
    isLoading: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Chat Input Component
// ─────────────────────────────────────────────────────────────────────────────

export function ChatInput({ input = '', onChange, onSubmit, isLoading }: ChatInputProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (input?.trim() && !isLoading) {
                onSubmit(e as unknown as FormEvent);
            }
        }
    };

    return (
        <form onSubmit={onSubmit} className="flex items-end gap-2">
            <div className="flex-1 relative">
                <textarea
                    value={input || ''}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    rows={1}
                    className="
            w-full resize-none
            px-4 py-3
            rounded-xl
            bg-white/5 dark:bg-white/5
            border border-white/20
            focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan
            focus:outline-none
            text-sm
            placeholder:text-muted-foreground
            disabled:opacity-50 disabled:cursor-not-allowed
            max-h-32
            transition-colors
          "
                    style={{
                        minHeight: '48px',
                        height: 'auto',
                    }}
                />
            </div>

            <button
                type="submit"
                disabled={!input?.trim() || isLoading}
                className="
          flex-shrink-0
          w-12 h-12
          rounded-xl
          bg-brand-cyan
          text-white
          flex items-center justify-center
          hover:bg-brand-cyan/90
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2
        "
                aria-label="Send message"
            >
                <Send className="w-5 h-5" />
            </button>
        </form>
    );
}

export default ChatInput;
