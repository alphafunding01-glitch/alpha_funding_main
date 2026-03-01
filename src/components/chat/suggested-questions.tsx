'use client';

import { motion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

interface SuggestedQuestionsProps {
    questions: string[];
    onSelect: (question: string) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Suggested Questions Component
// ─────────────────────────────────────────────────────────────────────────────

export function SuggestedQuestions({ questions, onSelect }: SuggestedQuestionsProps) {
    return (
        <div className="space-y-2">
            <p className="text-xs text-muted-foreground text-center">
                Quick questions to get started:
            </p>

            <div className="flex flex-wrap gap-2 justify-center">
                {questions.map((question, index) => (
                    <motion.button
                        key={question}
                        type="button"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => onSelect(question)}
                        className="
              px-3 py-2
              text-xs
              rounded-full
              bg-white/10 dark:bg-white/5
              border border-white/10
              hover:bg-brand-cyan/20 hover:border-brand-cyan/50
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-brand-cyan
              cursor-pointer
            "
                    >
                        {question}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}

export default SuggestedQuestions;
