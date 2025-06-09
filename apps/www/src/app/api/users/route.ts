import { type NextRequest, NextResponse } from "next/server"
import { ChatService } from "@/src/actions/chat-service"

export async function GET(request: NextRequest) {
  try {
    const user = await ChatService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")

    let users
    if (role === "ADMIN") {
      users = await ChatService.getAdminUsers()
    } else {
      users = await ChatService.getAllUsers()
    }

    // Filter out current user
    const filteredUsers = users.filter((u) => u.id !== user.id)

    return NextResponse.json(filteredUsers)
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
