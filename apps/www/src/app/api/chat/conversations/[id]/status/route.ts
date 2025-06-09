import { type NextRequest, NextResponse } from "next/server"
import { ChatService } from "@/src/actions/chat-service"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await ChatService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { status } = await request.json()

    if (!["ACTIVE", "CLOSED", "ARCHIVED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const updatedConversation = await ChatService.updateConversationStatus(params.id, user.id, status)

    if (!updatedConversation) {
      return NextResponse.json({ error: "Conversation not found or access denied" }, { status: 404 })
    }

    return NextResponse.json(updatedConversation)
  } catch (error) {
    console.error("Update conversation status error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
