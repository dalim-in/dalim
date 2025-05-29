import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@dalim/auth"
import { createVerificationToken } from "@dalim/auth"
import { sendAccountVerificationEmail } from "@dalim/auth"
import { findUserByEmail } from "@dalim/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { email } = await request.json()

    // Verify the email belongs to the current user
    if (email !== session.user.email) {
      return NextResponse.json({ error: "Email mismatch" }, { status: 400 })
    }

    // Get the full user object
    const user = await findUserByEmail(email)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json({ error: "Email already verified" }, { status: 400 })
    }

    // Generate verification token
    const verificationToken = await createVerificationToken(email)

    // Send verification email
    const result = await sendAccountVerificationEmail(user, verificationToken.token)

    if (result.success) {
      return NextResponse.json({ success: result.success })
    } else {
      return NextResponse.json({ error: result.error || "Failed to send verification email" }, { status: 500 })
    }
  } catch (error) {
    console.error("Send verification email error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
