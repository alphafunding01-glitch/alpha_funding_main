'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Thinking Indicator Component
// ─────────────────────────────────────────────────────────────────────────────

export function ThinkingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
        >
            {/* Avatar */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-[#030f42] to-[#1CB5E0] text-white">
                <Sparkles className="w-4 h-4" />
            </div>

            {/* Thinking Dots */}
            <div className="bg-white/10 dark:bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                        <motion.span
                            key={i}
                            className="w-2 h-2 rounded-full bg-brand-cyan"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default ThinkingIndicator;
