import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@dalim/auth"
import { prisma } from "@dalim/db"
import { headers } from "next/headers"
 

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify admin access
    const session = await auth.api.getSession({
     headers: await headers(),
    })

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const userId = params.id

    // Get user email
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    await auth.api.sendVerificationEmail({
     body: {
       email: user.email,
       callbackURL: "https://www.dalim.in/email-verified",
      },
    })
 
    return NextResponse.json({ message: "Verification email sent successfully" })
  } catch (error) {
    console.error("Error sending verification email:", error)
    return NextResponse.json({ message: "Failed to send verification email" }, { status: 500 })
  }
}
