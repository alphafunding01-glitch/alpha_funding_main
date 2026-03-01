'use client';

import { Info } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Chat Disclaimer Component
// ─────────────────────────────────────────────────────────────────────────────

export function ChatDisclaimer() {
    return (
        <div className="flex items-start gap-2 text-[10px] text-muted-foreground">
            <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
            <p>
                Alpha Funding is a business finance broker, not a lender.
                This is general guidance, not financial advice.
                All funding is subject to status.
            </p>
        </div>
    );
}

export default ChatDisclaimer;
