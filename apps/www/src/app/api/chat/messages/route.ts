import { type NextRequest, NextResponse } from "next/server"
import { ChatService } from "@/src/actions/chat-service"

export async function POST(request: NextRequest) {
  try {
    const user = await ChatService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const content = formData.get("content") as string
    const conversationId = formData.get("conversationId") as string

    if (!conversationId) {
      return NextResponse.json({ error: "Conversation ID is required" }, { status: 400 })
    }

    // Get attachments
    const attachments: File[] = []
    const files = formData.getAll("attachments") as File[]

    for (const file of files) {
      if (file.size > 0) {
        attachments.push(file)
      }
    }

    if (!content && attachments.length === 0) {
      return NextResponse.json({ error: "Message content or attachments required" }, { status: 400 })
    }

    const message = await ChatService.sendMessage(
      {
        content,
        conversationId,
        attachments,
      },
      user.id,
    )

    return NextResponse.json(message)
  } catch (error) {
    console.error("Send message error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
