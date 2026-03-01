'use client';

import { useState, useEffect, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEYS = {
    HAS_ENGAGED: 'af_chat_engaged',
    HAS_VISITED: 'af_visited',
    WIDGET_OPEN: 'af_widget_open',
    USER_NAME: 'af_user_name', // Session only for callback form
} as const;

// Pulse animation delays based on user engagement level
const PULSE_DELAY = {
    NEW_VISITOR: 8000,      // 8 seconds for first-time visitors
    RETURNING: 3000,        // 3 seconds for returning visitors
    ENGAGED: 0,             // No pulse for users who have chatted
} as const;

// Pages where widget should be minimized (no pulse, collapsed by default)
const MINIMIZED_PAGES = ['/check-eligibility', '/calculator'];

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface ChatWidgetState {
    isOpen: boolean;
    hasEngaged: boolean;
    hasVisited: boolean;
    showPulse: boolean;
    isMinimized: boolean;
    userName: string | null;
}

interface UseChatWidgetReturn extends ChatWidgetState {
    openWidget: () => void;
    closeWidget: () => void;
    toggleWidget: () => void;
    markEngaged: () => void;
    setUserName: (name: string) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────────────────────

function getStorageValue(key: string): string | null {
    if (typeof window === 'undefined') return null;
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
}

function setStorageValue(key: string, value: string): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(key, value);
    } catch {
        // Storage might be full or blocked
    }
}

function isMinimizedPage(): boolean {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname;
    return MINIMIZED_PAGES.some((p) => path.startsWith(p));
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

export function useChatWidget(): UseChatWidgetReturn {
    const [state, setState] = useState<ChatWidgetState>({
        isOpen: false,
        hasEngaged: false,
        hasVisited: false,
        showPulse: false,
        isMinimized: false,
        userName: null,
    });

    // Initialize state from localStorage on mount
    useEffect(() => {
        const hasEngaged = getStorageValue(STORAGE_KEYS.HAS_ENGAGED) === 'true';
        const hasVisited = getStorageValue(STORAGE_KEYS.HAS_VISITED) === 'true';
        const isMinimized = isMinimizedPage();

        setState((prev) => ({
            ...prev,
            hasEngaged,
            hasVisited,
            isMinimized,
        }));

        // Mark as visited for future sessions
        setStorageValue(STORAGE_KEYS.HAS_VISITED, 'true');

        // Set up pulse animation delay
        if (!isMinimized && !hasEngaged) {
            const delay = hasVisited ? PULSE_DELAY.RETURNING : PULSE_DELAY.NEW_VISITOR;

            const timer = setTimeout(() => {
                setState((prev) => ({ ...prev, showPulse: true }));
            }, delay);

            return () => clearTimeout(timer);
        }
    }, []);

    // Update minimized state on route changes (for SPA navigation)
    useEffect(() => {
        const handleRouteChange = () => {
            setState((prev) => ({
                ...prev,
                isMinimized: isMinimizedPage(),
            }));
        };

        // Listen for popstate (browser back/forward)
        window.addEventListener('popstate', handleRouteChange);

        return () => {
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, []);

    const openWidget = useCallback(() => {
        setState((prev) => ({
            ...prev,
            isOpen: true,
            showPulse: false, // Stop pulsing when opened
        }));
    }, []);

    const closeWidget = useCallback(() => {
        setState((prev) => ({
            ...prev,
            isOpen: false,
        }));
    }, []);

    const toggleWidget = useCallback(() => {
        setState((prev) => ({
            ...prev,
            isOpen: !prev.isOpen,
            showPulse: false, // Stop pulsing when interacted
        }));
    }, []);

    const markEngaged = useCallback(() => {
        setStorageValue(STORAGE_KEYS.HAS_ENGAGED, 'true');
        setState((prev) => ({
            ...prev,
            hasEngaged: true,
            showPulse: false,
        }));
    }, []);

    const setUserName = useCallback((name: string) => {
        setState((prev) => ({
            ...prev,
            userName: name,
        }));
    }, []);

    return {
        ...state,
        openWidget,
        closeWidget,
        toggleWidget,
        markEngaged,
        setUserName,
    };
}

export default useChatWidget;
