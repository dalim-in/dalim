import { updateProfileSchema } from "@/src/types/zod"
import { auth } from "@dalim/auth"
import { prisma } from "@dalim/db"
import { NextResponse } from "next/server"
import * as z from "zod"

export async function PATCH(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = updateProfileSchema.parse(body)

    // Check if username is already taken by another user
    if (validatedData.username) {
      const existingUser = await prisma.user.findFirst({
        where: {
          username: validatedData.username,
          NOT: { id: session.user.id },
        },
      })

      if (existingUser) {
        return NextResponse.json({ error: "Username is already taken" }, { status: 400 })
      }
    }

    // Check if email is already taken by another user
    if (validatedData.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: validatedData.email,
          NOT: { id: session.user.id },
        },
      })

      if (existingUser) {
        return NextResponse.json({ error: "Email is already taken" }, { status: 400 })
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        bio: true,
        summary: true,
        image: true,
        coverImage: true,
        website: true,
        twitter: true,
        instagram: true,
        linkedin: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 })
    }

    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
