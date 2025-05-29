import { auth } from "@dalim/auth"
import { prisma } from "@dalim/db"
import { NextResponse } from "next/server"
import * as z from "zod"
import bcrypt from "bcryptjs"
import { updateSecuritySchema } from "@/src/types/zod"

export async function PATCH(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = updateSecuritySchema.parse(body)

    // Get current user with password
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, password: true },
    })

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Verify current password
    if (!currentUser.password) {
      return NextResponse.json({ error: "No password set for this account" }, { status: 400 })
    }

    const isCurrentPasswordValid = await bcrypt.compare(validatedData.currentPassword, currentUser.password)

    if (!isCurrentPasswordValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
    }

    // Prepare update data 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {
      isTwoFactorAuthEnabled: validatedData.isTwoFactorAuthEnabled,
      updatedAt: new Date(),
    }

    // Hash new password if provided
    if (validatedData.newPassword) {
      updateData.password = await bcrypt.hash(validatedData.newPassword, 12)
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        isTwoFactorAuthEnabled: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 })
    }

    console.error("Security update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
