import { type NextRequest, NextResponse } from "next/server"
import { ChatService } from "@/src/actions/chat-service"

export async function GET(request: NextRequest) {
  try {
    const user = await ChatService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") as "ACTIVE" | "CLOSED" | "ARCHIVED" | null

    const conversations = await ChatService.getUserConversationsByStatus(user.id, status || undefined)
    return NextResponse.json(conversations)
  } catch (error) {
    console.error("Get filtered conversations error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
