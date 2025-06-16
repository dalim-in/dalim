/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { auth } from "@dalim/auth"
import { prisma } from "@dalim/db"
import { cloudinary } from "@/src/lib/cloudinary"
import { revalidatePath } from "next/cache"

export async function uploadVisual(formData: FormData) {
  const session = await auth()

  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const link = formData.get("link") as string
  const tags = JSON.parse(formData.get("tags") as string)
  const featured = formData.get("featured") === "true"
  const image = formData.get("image") as File

  if (!image) {
    throw new Error("Image is required")
  }

  // Upload image to Cloudinary
  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadResult = (await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "visuals",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        },
      )
      .end(buffer)
  })) as any

  // Save to database
  await prisma.visuals.create({
    data: {
      title,
      description: description || null,
      category: category as any,
      image: uploadResult.secure_url,
      link,
      tags,
      featured,
      userId: session.user.id!,
    },
  })

  revalidatePath("/visuals")
}

export async function incrementViewCount(visualId: string) {
  await prisma.visuals.update({
    where: { id: visualId },
    data: {
      viewCount: {
        increment: 1,
      },
    },
  })
}
