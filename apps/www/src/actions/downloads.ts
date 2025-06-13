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

export async function getUserDownloads(params?: {
  search?: string
  type?: string
  page?: number
  limit?: number
}) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { downloads: [], total: 0, pages: 0, currentpage: 1 }
    }

    const { search = "", type, page = 1, limit = 20 } = params || {}
    const skip = (page - 1) * limit

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      userId: session.user.id,
    }

    if (search) {
      where.itemTitle = {
        contains: search,
        mode: "insensitive",
      }
    }

    if (type && type !== "") {
      where.itemType = type
    }

    const [downloads, total] = await Promise.all([
      prisma.download.findMany({
        where,
        orderBy: {
          lastDownloadAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.download.count({ where }),
    ])

    return {
      downloads,
      total,
      pages: Math.ceil(total / limit),
      currentpage: page,
    }
  } catch (error) {
    console.error("Get user downloads error:", error)
    return {
      downloads: [],
      total: 0,
      pages: 0,
      currentpage: 1,
    }
  }
}

export async function deleteDownload(downloadId: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" }
    }

    // Verify the download belongs to the user
    const download = await prisma.download.findFirst({
      where: {
        id: downloadId,
        userId: session.user.id,
      },
    })

    if (!download) {
      return { success: false, error: "Download not found" }
    }

    await prisma.download.delete({
      where: {
        id: downloadId,
      },
    })

    revalidatePath("/dashboard/downloads")
    return { success: true }
  } catch (error) {
    console.error("Delete download error:", error)
    return { success: false, error: "Failed to delete download" }
  }
}

export async function bulkDeleteDownloads(downloadIds: string[]) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" }
    }

    // Verify all downloads belong to the user
    const downloads = await prisma.download.findMany({
      where: {
        id: { in: downloadIds },
        userId: session.user.id,
      },
    })

    if (downloads.length !== downloadIds.length) {
      return { success: false, error: "Some downloads not found" }
    }

    await prisma.download.deleteMany({
      where: {
        id: { in: downloadIds },
        userId: session.user.id,
      },
    })

    revalidatePath("/dashboard/downloads")
    return { success: true }
  } catch (error) {
    console.error("Bulk delete downloads error:", error)
    return { success: false, error: "Failed to delete downloads" }
  }
}

export async function clearAllDownloads() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" }
    }

    await prisma.download.deleteMany({
      where: {
        userId: session.user.id,
      },
    })

    revalidatePath("/dashboard/downloads")
    return { success: true }
  } catch (error) {
    console.error("Clear all downloads error:", error)
    return { success: false, error: "Failed to clear downloads" }
  }
}

export async function getDownloadStats() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { totalDownloads: 0, graphicsDownloads: 0, fontsDownloads: 0, recentDownloads: 0 }
    }

    const [totalDownloads, graphicsDownloads, fontsDownloads, recentDownloads] = await Promise.all([
      prisma.download.count({
        where: { userId: session.user.id },
      }),
      prisma.download.count({
        where: { userId: session.user.id, itemType: "GRAPHIC" },
      }),
      prisma.download.count({
        where: { userId: session.user.id, itemType: "FONT" },
      }),
      prisma.download.count({
        where: {
          userId: session.user.id,
          lastDownloadAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
          },
        },
      }),
    ])

    return {
      totalDownloads,
      graphicsDownloads,
      fontsDownloads,
      recentDownloads,
    }
  } catch (error) {
    console.error("Get download stats error:", error)
    return { totalDownloads: 0, graphicsDownloads: 0, fontsDownloads: 0, recentDownloads: 0 }
  }
}
