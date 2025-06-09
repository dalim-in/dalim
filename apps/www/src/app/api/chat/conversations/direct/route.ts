import { type NextRequest, NextResponse } from "next/server"
import { ChatService } from "@/src/actions/chat-service"

export async function POST(request: NextRequest) {
  try {
    const user = await ChatService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { otherUserId } = await request.json()

    if (!otherUserId) {
      return NextResponse.json({ error: "Other user ID is required" }, { status: 400 })
    }

    const conversation = await ChatService.getOrCreateDirectConversation(user.id, otherUserId)
    return NextResponse.json(conversation)
  } catch (error) {
    console.error("Create direct conversation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
