import { NextResponse } from "next/server"
import { ChatService } from "@/src/actions/chat-service"

export async function GET() {
  try {
    const user = await ChatService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const count = await ChatService.getUnreadNotificationCount(user.id)
    return NextResponse.json({ count })
  } catch (error) {
    console.error("Get unread count error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
