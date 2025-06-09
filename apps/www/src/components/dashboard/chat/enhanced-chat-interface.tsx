import { ChatInterface } from './chat-interface'

interface EnhancedChatInterfaceProps {
    conversationId?: string
}

export function EnhancedChatInterface({ conversationId }: EnhancedChatInterfaceProps) {
    return (
        <div>
            <ChatInterface conversationId={conversationId} />
        </div>
    )
}
