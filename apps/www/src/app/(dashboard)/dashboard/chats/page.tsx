import { Suspense } from 'react'
import { ChatInterface } from '@/src/components/dashboard/chat/chat-interface'

interface ChatPageProps {
    searchParams: {
        conversationId?: string
    }
}

export default function ChatPage({}: ChatPageProps) {
    return (
        <div className="mt-2">
            <Suspense fallback={<div className="p-8 text-center">Loading chat...</div>}>
                <ChatInterface />
            </Suspense>
        </div>
    )
}
