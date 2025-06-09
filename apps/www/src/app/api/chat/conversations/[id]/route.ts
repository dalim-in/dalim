import { type NextRequest, NextResponse } from "next/server"
import { ChatService } from "@/src/actions/chat-service"


export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await ChatService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const conversation = await ChatService.getConversation(params.id, user.id)
    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 })
    }

    return NextResponse.json(conversation)
  } catch (error) {
    console.error("Get conversation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await ChatService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const deleted = await ChatService.deleteConversation(params.id, user.id)

    if (!deleted) {
      return NextResponse.json({ error: "Conversation not found or access denied" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Conversation deleted successfully" })
  } catch (error) {
    console.error("Delete conversation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
