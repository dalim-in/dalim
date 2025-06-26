 
import { notFound } from "next/navigation"
import { getDesignChatWithMessages } from "@/src/actions/design-chat"
import EnhancedChat from "@/src/components/ai/chat"
import { Suspense } from "react"

interface PageProps {
  params: { id: string }
}

export default async function ChatPage({ params }: PageProps) {
  const { id } = params
  const chat = await getDesignChatWithMessages(params.id)

  if (!chat) notFound()

  return (
    <div className="relative -mx-6 -mt-14 h-[950px]">
              <div className="">
                        <Suspense fallback={<div>Loading...</div>}>
                            <EnhancedChat chatId={id} />
                        </Suspense>
                    </div>
            </div>
  )
}
