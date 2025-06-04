"use server"

import { auth } from "@dalim/auth"
import { prisma } from "@dalim/db"
import { revalidatePath } from "next/cache"

export async function trackDownload(
  itemId: string,
  itemType: "GRAPHIC" | "FONT",
  itemTitle: string,
  itemImage?: string,
  downloadUrl?: string,
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" }
    }

    // Check if download already exists
    const existingDownload = await prisma.download.findUnique({
      where: {
        userId_itemId_itemType: {
          userId: session.user.id,
          itemId,
          itemType,
        },
      },
    })

    if (existingDownload) {
      // Update existing download with new timestamp and increment count
      await prisma.download.update({
        where: {
          id: existingDownload.id,
        },
        data: {
          lastDownloadAt: new Date(),
          downloadCount: {
            increment: 1,
          },
          downloadUrl: downloadUrl || existingDownload.downloadUrl,
        },
      })
    } else {
      // Create new download record
      await prisma.download.create({
        data: {
          userId: session.user.id,
          itemId,
          itemType,
          itemTitle,
          itemImage,
          downloadUrl,
        },
      })
    }

    revalidatePath("/dashboard/downloads")
    return { success: true }
  } catch (error) {
    console.error("Track download error:", error)
    return { success: false, error: "Failed to track download" }
  }
}
 