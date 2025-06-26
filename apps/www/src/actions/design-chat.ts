"use server"

import { auth } from "@dalim/auth"
import { prisma } from "@dalim/db"
import { revalidatePath } from "next/cache"

export async function createDesignChat(title: string, isPublic = false) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const chat = await prisma.designChat.create({
    data: {
      title,
      isPublic,
      userId: session.user.id,
    },
  })

  return chat
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveDesignMessage(chatId: string, content: string, role: "user" | "assistant", toolCalls?: any) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  // Verify user owns the chat
  const chat = await prisma.designChat.findFirst({
    where: {
      id: chatId,
      userId: session.user.id,
    },
  })

  if (!chat) {
    throw new Error("Chat not found or unauthorized")
  }

  const message = await prisma.designMessage.create({
    data: {
      chatId,
      content,
      role,
      toolCalls: toolCalls || null,
    },
  })

  // Update chat's updatedAt
  await prisma.designChat.update({
    where: { id: chatId },
    data: { updatedAt: new Date() },
  })

  return message
}

export async function getUserDesignChats() {
  const session = await auth()
  if (!session?.user?.id) {
    return []
  }

  const chats = await prisma.designChat.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  })

  return chats
}

export async function getPublicDesignChats() {
  const chats = await prisma.designChat.findMany({
    where: {
      isPublic: true,
    },
    orderBy: [{ upvotes: "desc" }, { createdAt: "desc" }],
    include: {
      user: {
        select: {
          name: true,
          username: true,
          image: true,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
    take: 50,
  })

  return chats
}

export async function getDesignChatWithMessages(chatId: string) {
  const session = await auth()

  const chat = await prisma.designChat.findFirst({
    where: {
      id: chatId,
      OR: [{ isPublic: true }, { userId: session?.user?.id || "" }],
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
      user: {
        select: {
          name: true,
          username: true,
          image: true,
        },
      },
      votes: session?.user?.id
        ? {
            where: {
              userId: session.user.id,
            },
          }
        : false,
    },
  })

  if ((chat && !session?.user?.id) || chat?.userId !== session?.user?.id) {
    // Increment view count for public chats viewed by others
    await prisma.designChat.update({
      where: { id: chatId },
      data: { viewCount: { increment: 1 } },
    })
  }

  return chat
}

export async function deleteDesignChat(chatId: string) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  // Verify user owns the chat
  const chat = await prisma.designChat.findFirst({
    where: {
      id: chatId,
      userId: session.user.id,
    },
  })

  if (!chat) {
    throw new Error("Chat not found or unauthorized")
  }

  await prisma.designChat.delete({
    where: { id: chatId },
  })

  revalidatePath("/design-chat")
  return { success: true }
}

export async function toggleChatPrivacy(chatId: string) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const chat = await prisma.designChat.findFirst({
    where: {
      id: chatId,
      userId: session.user.id,
    },
  })

  if (!chat) {
    throw new Error("Chat not found or unauthorized")
  }

  const updatedChat = await prisma.designChat.update({
    where: { id: chatId },
    data: { isPublic: !chat.isPublic },
  })

  revalidatePath("/design-chat")
  return updatedChat
}

export async function voteOnDesignChat(chatId: string, isUpvote: boolean) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  // Check if user already voted
  const existingVote = await prisma.designChatVote.findUnique({
    where: {
      userId_chatId: {
        userId: session.user.id,
        chatId,
      },
    },
  })

  if (existingVote) {
    if (existingVote.isUpvote === isUpvote) {
      // Remove vote if clicking same vote
      await prisma.designChatVote.delete({
        where: { id: existingVote.id },
      })

      // Update chat vote counts
      await prisma.designChat.update({
        where: { id: chatId },
        data: {
          [isUpvote ? "upvotes" : "downvotes"]: { decrement: 1 },
        },
      })
    } else {
      // Change vote
      await prisma.designChatVote.update({
        where: { id: existingVote.id },
        data: { isUpvote },
      })

      // Update chat vote counts
      await prisma.designChat.update({
        where: { id: chatId },
        data: {
          upvotes: { [isUpvote ? "increment" : "decrement"]: 1 },
          downvotes: { [isUpvote ? "decrement" : "increment"]: 1 },
        },
      })
    }
  } else {
    // Create new vote
    await prisma.designChatVote.create({
      data: {
        userId: session.user.id,
        chatId,
        isUpvote,
      },
    })

    // Update chat vote counts
    await prisma.designChat.update({
      where: { id: chatId },
      data: {
        [isUpvote ? "upvotes" : "downvotes"]: { increment: 1 },
      },
    })
  }

  revalidatePath("/design-chat")
  return { success: true }
}
