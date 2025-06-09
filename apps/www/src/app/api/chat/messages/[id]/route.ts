import { type NextRequest, NextResponse } from "next/server"
import { ChatService } from "@/src/actions/chat-service"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await ChatService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const deleted = await ChatService.deleteMessage(params.id, user.id)

    if (!deleted) {
      return NextResponse.json({ error: "Message not found or access denied" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Message deleted successfully" })
  } catch (error) {
    console.error("Delete message error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
