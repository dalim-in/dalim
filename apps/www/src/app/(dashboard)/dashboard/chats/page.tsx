"use client" 
import { Suspense } from 'react'
import { EnhancedChatInterface } from '@/src/components/dashboard/chat/enhanced-chat-interface'

interface ChatPageProps {
    searchParams: {
        conversationId?: string
    }
}

export default function ChatPage({}: ChatPageProps) {
    return (
        <div className="mt-3">
            <Suspense fallback={<div className="p-8 text-center">Loading chat...</div>}>
                <EnhancedChatInterface />
            </Suspense>
        </div>
    )
}
