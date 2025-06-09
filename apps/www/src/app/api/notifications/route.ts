import {NextResponse } from "next/server"
import { ChatService } from "@/src/actions/chat-service"

export async function GET() {
  try {
    const user = await ChatService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const notifications = await ChatService.getUserNotifications(user.id)
    return NextResponse.json(notifications)
  } catch (error) {
    console.error("Get notifications error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
