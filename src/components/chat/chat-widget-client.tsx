'use client';

import dynamic from 'next/dynamic';

// Dynamically import ChatWidget on client side only
const ChatWidgetComponent = dynamic(
    () => import('./chat-widget').then((mod) => mod.ChatWidget),
    { ssr: false }
);

export function ChatWidgetClient() {
    return <ChatWidgetComponent />;
}

export default ChatWidgetClient;
