import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@dalim/auth"
import { prisma } from "@dalim/db"
import bcryptjs from "bcryptjs"
import { z } from "zod"

const setPasswordSchema = z.object({
  password: z.string().min(6),
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { password } = setPasswordSchema.parse(await request.json())

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10)

    // Update user with password
    await prisma.user.update({
      where: { email: session.user.email },
      data: { password: hashedPassword },
    })

    return NextResponse.json({ success: "Password set successfully" })
  } catch (error) {
    console.error("Set password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
