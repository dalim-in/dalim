import { type NextRequest, NextResponse } from "next/server"
import { ChatService } from "@/src/actions/chat-service"

export async function GET() {
  try {
    const user = await ChatService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const conversations = await ChatService.getUserConversations(user.id)
    return NextResponse.json(conversations)
  } catch (error) {
    console.error("Get conversations error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await ChatService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { participantIds, title } = await request.json()

    // Add current user to participants if not already included
    const allParticipantIds = participantIds.includes(user.id) ? participantIds : [...participantIds, user.id]

    const conversation = await ChatService.createConversation({
      participantIds: allParticipantIds,
      title,
    })

    return NextResponse.json(conversation)
  } catch (error) {
    console.error("Create conversation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
