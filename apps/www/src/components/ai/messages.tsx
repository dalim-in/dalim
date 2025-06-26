import type { Message as TMessage } from 'ai'
import { Message } from './message'
import { useScrollToBottom } from '@dalim/core/hooks/use-scroll-to-bottom'
import { Button } from '@dalim/core/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export const Messages = ({
    messages,
    isLoading,
    status,
    startNewChat,
}: {
    messages: TMessage[]
    isLoading: boolean
    status: 'error' | 'submitted' | 'streaming' | 'ready'
    startNewChat: () => void // ✅ changed from string to function
}) => {
    const [containerRef, endRef] = useScrollToBottom()
    const session = useSession()
    return (
        <div
            className="mt-14 h-full flex-1 space-y-4 overflow-y-auto border-t py-8"
            ref={containerRef}>
            <div className="mx-auto max-w-2xl pt-8">
                {messages.map((m, i) => (
                    <Message
                        key={i}
                        isLatestMessage={i === messages.length - 1}
                        isLoading={isLoading}
                        message={m}
                        status={status}
                    />
                ))}
                <div
                    className="h-1"
                    ref={endRef}
                />
                <div className="absolute top-20 mx-3 mt-3">
                    <div className="flex w-full justify-center gap-2">
                        <Button onClick={startNewChat}>
                            <Plus />
                            New Design Chat
                        </Button>
                        <Link href={session ? '/dashboard' : `/login`}>
                            <Button variant={'outline'}>{session ? 'Dashboard' : 'Login'}</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
