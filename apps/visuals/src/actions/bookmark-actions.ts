"use server"

import { auth } from "@dalim/auth"
import { prisma } from "@dalim/db"
import { revalidatePath } from "next/cache"

export async function bookmarkVisual(visualId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  // For now, we'll use the Download model to track bookmarks
  // You might want to create a separate Bookmark model
  await prisma.download.upsert({
    where: {
      userId_itemId_itemType: {
        userId: session.user.id,
        itemId: visualId,
        itemType: "GRAPHIC", // Using existing enum, you might want to add VISUAL
      },
    },
    update: {
      lastDownloadAt: new Date(),
    },
    create: {
      userId: session.user.id,
      itemId: visualId,
      itemType: "GRAPHIC",
      itemTitle: "Visual Bookmark",
      downloadCount: 0,
    },
  })

  revalidatePath("/visuals")
}

export async function unbookmarkVisual(visualId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  await prisma.download.delete({
    where: {
      userId_itemId_itemType: {
        userId: session.user.id,
        itemId: visualId,
        itemType: "GRAPHIC",
      },
    },
  })

  revalidatePath("/visuals")
}

export async function getUserBookmarks(userId: string) {
  return await prisma.download.findMany({
    where: {
      userId,
      itemType: "GRAPHIC",
    },
    orderBy: {
      lastDownloadAt: "desc",
    },
  })
}
