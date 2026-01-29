"use client"

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterFieldProps {
    label: string;
    value: string;
    delay?: number; // ms before starting
    speed?: number; // ms per character
    className?: string;
    onComplete?: () => void;
}

export function TypewriterField({
    label,
    value,
    delay = 0,
    speed = 20,
    className,
    onComplete
}: TypewriterFieldProps) {
    const [displayedValue, setDisplayedValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showCursor, setShowCursor] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!value) return;

        // Reset on value change
        setDisplayedValue('');
        setIsTyping(false);
        setShowCursor(false);
        setIsComplete(false);

        // Start after delay
        const delayTimer = setTimeout(() => {
            setIsTyping(true);
            setShowCursor(true);
        }, delay);

        return () => clearTimeout(delayTimer);
    }, [value, delay]);

    useEffect(() => {
        if (!isTyping || !value) return;

        if (displayedValue.length < value.length) {
            const timer = setTimeout(() => {
                setDisplayedValue(value.slice(0, displayedValue.length + 1));
            }, speed);
            return () => clearTimeout(timer);
        } else {
            // Typing complete
            setIsTyping(false);
            setIsComplete(true);

            // Blink cursor 3 times then hide
            let blinkCount = 0;
            const blinkInterval = setInterval(() => {
                blinkCount++;
                if (blinkCount >= 6) {
                    clearInterval(blinkInterval);
                    setShowCursor(false);
                    onComplete?.();
                }
            }, 200);

            return () => clearInterval(blinkInterval);
        }
    }, [displayedValue, value, isTyping, speed, onComplete]);

    return (
        <div className={cn("space-y-1.5", className)}>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {label}
            </label>
            <div
                className={cn(
                    "py-3 px-4 rounded-xl text-sm text-white bg-white/5 border transition-all duration-300",
                    isTyping
                        ? "border-[#1CB5E0]/30 shadow-[0_0_15px_rgba(28,181,224,0.1)]"
                        : "border-white/10"
                )}
            >
                <span>{displayedValue}</span>
                {showCursor && (
                    <span className="inline-block text-[#1CB5E0] animate-[blink_0.5s_infinite]">|</span>
                )}
                {!displayedValue && !isTyping && (
                    <span className="text-slate-600">...</span>
                )}
            </div>
        </div>
    );
}

export default TypewriterField;
