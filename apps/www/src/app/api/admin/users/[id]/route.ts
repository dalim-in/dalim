import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@dalim/auth"
import { prisma } from "@dalim/db"
import { headers } from "next/headers"

// Update user
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify admin access
    const session = await auth.api.getSession({
     headers: await headers(),
    })

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const userId = params.id
    const data = await req.json()

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        role: data.role,
        emailVerified: data.emailVerified,
        premium: data.premium,
        banned: data.banned,
        banReason: data.banReason,
      },
      include: {
        _count: {
          select: {
            sessions: true,
          },
        },
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ message: "Failed to update user" }, { status: 500 })
  }
}

// Delete user
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify admin access
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const userId = params.id

    // Delete user from database
    await prisma.user.delete({
      where: { id: userId },
    })

    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ message: "Failed to delete user" }, { status: 500 })
  }
}
