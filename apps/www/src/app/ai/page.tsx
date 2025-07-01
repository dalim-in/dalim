import { Suspense } from 'react'
import EnhancedChat from '@/src/components/ai/chat' 

export default async function DesignChatPage() {
    return (
        <div className="relative -mx-6 -mt-14 h-[950px]">
            <div className="">
                <Suspense fallback={<div>Loading...</div>}> 
                    <EnhancedChat chatId={''} />
                </Suspense>
            </div>
        </div>
    )
}
