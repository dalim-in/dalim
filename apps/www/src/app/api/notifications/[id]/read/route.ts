import { type NextRequest, NextResponse } from "next/server"
import { ChatService } from  "@/src/actions/chat-service"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await ChatService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await ChatService.markNotificationAsRead(params.id, user.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Mark notification as read error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
