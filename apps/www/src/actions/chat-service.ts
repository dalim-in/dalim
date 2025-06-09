/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@dalim/db"
import { auth } from "@dalim/auth"
import { cloudinary } from "@/src/lib/cloudinary"
import type { CreateMessageData, CreateConversationData, User, Conversation, Message } from "@/src/types/chat"


export class ChatService {
  static async getCurrentUser(): Promise<User | null> {
    const session = await auth()
    if (!session?.user?.id) return null

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    })

    return user
  }

  static async createConversation(data: CreateConversationData): Promise<Conversation> {
    const conversation = await prisma.conversation.create({
      data: {
        title: data.title,
        participants: {
          create: data.participantIds.map((userId) => ({
            userId,
          })),
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
            attachments: true,
          },
          orderBy: { createdAt: "asc" },
        },
      },
    })

    return conversation as unknown as Conversation
  }

  static async getOrCreateDirectConversation(userId: string, otherUserId: string): Promise<Conversation> {
    // Check if conversation already exists between these two users
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        participants: {
          every: {
            userId: {
              in: [userId, otherUserId],
            },
          },
        },
        AND: {
          participants: {
            some: {
              userId: userId,
            },
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
            attachments: true,
          },
          orderBy: { createdAt: "asc" },
        },
      },
    })

    if (existingConversation) {
      return existingConversation as unknown as Conversation
    }

    // Create new conversation
    return this.createConversation({
      participantIds: [userId, otherUserId],
    })
  }

  static async getUserConversations(userId: string): Promise<Conversation[]> {
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
            attachments: true,
          },
          orderBy: { createdAt: "asc" }
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
      orderBy: {
        lastMessageAt: "desc",
      },
    })

    return conversations as unknown as Conversation[]
  }

  static async getConversation(conversationId: string, userId: string): Promise<Conversation | null> {
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        participants: {
          some: {
            userId,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
            recipient: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
            attachments: true,
          },
          orderBy: { createdAt: "asc" },
        },
      },
    })

    return conversation as Conversation | null
  }

  static async sendMessage(data: CreateMessageData, senderId: string): Promise<Message> {
    const { content, conversationId, attachments = [] } = data

    // Upload attachments to Cloudinary
    const uploadedAttachments = await Promise.all(
      attachments.map(async (file) => {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        return new Promise<any>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "chat-attachments",
                resource_type: "auto",
              },
              (error, result) => {
                if (error) reject(error)
                else resolve(result)
              },
            )
            .end(buffer)
        })
      }),
    )

    // Create message with attachments
    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        conversationId,
        attachments: {
          create: uploadedAttachments.map((upload, index) => ({
            fileName: attachments[index].name,
            fileType: attachments[index].type,
            fileSize: attachments[index].size,
            fileUrl: upload.secure_url,
            publicId: upload.public_id,
          })),
        },
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
          },
        },
        recipient: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
          },
        },
        attachments: true,
      },
    })

    // Update conversation's lastMessageAt
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: new Date() },
    })

    // Get other participants to send notifications
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        participants: {
          where: {
            userId: {
              not: senderId,
            },
          },
          include: {
            user: true,
          },
        },
      },
    })

    // Send notifications to other participants
    if (conversation) {
      await Promise.all(
        conversation.participants.map(async (participant) => {
          await this.createNotification({
            userId: participant.userId,
            type: "NEW_MESSAGE",
            title: "New Message",
            content: `You have a new message from ${message.sender.name}`,
            referenceId: message.id,
            referenceType: "message",
            data: {
              conversationId,
              senderId,
              senderName: message.sender.name,
            },
          })
        }),
      )
    }

    return message as unknown as Message
  }

  static async markMessageAsRead(messageId: string, userId: string): Promise<void> {
    await prisma.message.updateMany({
      where: {
        id: messageId,
        recipientId: userId,
      },
      data: {
        status: "READ",
        readAt: new Date(),
      },
    })
  }

  static async markConversationAsRead(conversationId: string, userId: string): Promise<void> {
    await prisma.conversationParticipant.updateMany({
      where: {
        conversationId,
        userId,
      },
      data: {
        lastReadAt: new Date(),
      },
    })
  }

  static async createNotification(data: {
    userId: string
    type: string
    title: string
    content?: string
    referenceId?: string
    referenceType?: string
    data?: any
  }) {
    return await prisma.ping.create({
      data,
    })
  }

  static async getUserNotifications(userId: string) {
    return await prisma.ping.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    })
  }

  static async markNotificationAsRead(notificationId: string, userId: string) {
    return await prisma.ping.updateMany({
      where: {
        id: notificationId,
        userId,
      },
      data: {
        isRead: true,
      },
    })
  }

  static async getUnreadNotificationCount(userId: string): Promise<number> {
    return await prisma.ping.count({
      where: {
        userId,
        isRead: false,
      },
    })
  }

  static async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
      orderBy: {
        name: "asc",
      },
    })
  }

  static async getAdminUsers(): Promise<User[]> {
    return await prisma.user.findMany({
      where: {
        role: "ADMIN",
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
      orderBy: {
        name: "asc",
      },
    })
  }

  static async getFirstAvailableAdmin(): Promise<User | null> {
    const admins = await this.getAdminUsers()
    return admins.length > 0 ? admins[0] : null
  }

  static async updateConversationStatus(
    conversationId: string,
    userId: string,
    status: "ACTIVE" | "CLOSED" | "ARCHIVED",
  ): Promise<Conversation | null> {
    // Check if user is participant in the conversation
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        participants: {
          some: {
            userId,
          },
        },
      },
    })

    if (!conversation) {
      return null
    }

    // Update the conversation status
    const updatedConversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: { status },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
            recipient: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
            attachments: true,
          },
          orderBy: { createdAt: "asc" },
        },
      },
    })

    // Notify other participants about status change
    const otherParticipants = updatedConversation.participants.filter((p) => p.userId !== userId)

    await Promise.all(
      otherParticipants.map(async (participant) => {
        await this.createNotification({
          userId: participant.userId,
          type: "CONVERSATION_STATUS_CHANGED",
          title: "Conversation Status Updated",
          content: `Conversation status changed to ${status.toLowerCase()}`,
          referenceId: conversationId,
          referenceType: "conversation",
          data: {
            conversationId,
            newStatus: status,
            changedBy: userId,
          },
        })
      }),
    )

    return updatedConversation as unknown as Conversation
  }

  static async getConversationStats(userId: string) {
    const [all, active, closed, archived] = await Promise.all([
      prisma.conversation.count({
        where: {
          participants: {
            some: { userId },
          },
        },
      }),
      prisma.conversation.count({
        where: {
          participants: {
            some: { userId },
          },
          status: "ACTIVE",
        },
      }),
      prisma.conversation.count({
        where: {
          participants: {
            some: { userId },
          },
          status: "CLOSED",
        },
      }),
      prisma.conversation.count({
        where: {
          participants: {
            some: { userId },
          },
          status: "ARCHIVED",
        },
      }),
    ])

    return { all, active, closed, archived }
  }

  static async getUserConversationsByStatus(
    userId: string,
    status?: "ACTIVE" | "CLOSED" | "ARCHIVED",
  ): Promise<Conversation[]> {
    const whereClause: any = {
      participants: {
        some: {
          userId,
        },
      },
    }

    if (status) {
      whereClause.status = status
    }

    const conversations = await prisma.conversation.findMany({
      where: whereClause,
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
            attachments: true,
          },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
      orderBy: {
        lastMessageAt: "desc",
      },
    })

    return conversations as unknown as Conversation[]
  }

  static async createSupportConversation(userId: string): Promise<Conversation | null> {
    const admin = await this.getFirstAvailableAdmin()
    if (!admin) {
      throw new Error("No admin available")
    }

    return this.getOrCreateDirectConversation(userId, admin.id)
  }

  static async deleteConversation(conversationId: string, userId: string): Promise<boolean> {
    try {
      // Check if user is participant in the conversation
      const conversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          participants: {
            some: {
              userId,
            },
          },
        },
        include: {
          messages: {
            include: {
              attachments: true,
            },
          },
          participants: {
            include: {
              user: true,
            },
          },
        },
      })

      if (!conversation) {
        return false
      }

      // Delete attachments from Cloudinary
      const allAttachments = conversation.messages.flatMap((message) => message.attachments)

      if (allAttachments.length > 0) {
        await Promise.all(
          allAttachments
            .filter((attachment) => attachment.publicId)
            .map(async (attachment) => {
              try {
                await cloudinary.uploader.destroy(attachment.publicId!)
              } catch (error) {
                console.error(`Failed to delete attachment ${attachment.publicId}:`, error)
              }
            }),
        )
      }

      // Notify other participants about deletion
      const otherParticipants = conversation.participants.filter((p) => p.userId !== userId)

      await Promise.all(
        otherParticipants.map(async (participant) => {
          await this.createNotification({
            userId: participant.userId,
            type: "CONVERSATION_DELETED",
            title: "Conversation Deleted",
            content: `A conversation has been deleted by ${conversation.participants.find((p) => p.userId === userId)?.user.name}`,
            referenceId: conversationId,
            referenceType: "conversation",
            data: {
              conversationId,
              deletedBy: userId,
            },
          })
        }),
      )

      // Delete the conversation (cascade will handle messages, attachments, participants)
      await prisma.conversation.delete({
        where: { id: conversationId },
      })

      return true
    } catch (error) {
      console.error("Error deleting conversation:", error)
      return false
    }
  }

  static async deleteMessage(messageId: string, userId: string): Promise<boolean> {
    try {
      // Check if user is the sender of the message
      const message = await prisma.message.findFirst({
        where: {
          id: messageId,
          senderId: userId,
        },
        include: {
          attachments: true,
          conversation: {
            include: {
              participants: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      })

      if (!message) {
        return false
      }

      // Delete attachments from Cloudinary
      if (message.attachments.length > 0) {
        await Promise.all(
          message.attachments
            .filter((attachment) => attachment.publicId)
            .map(async (attachment) => {
              try {
                await cloudinary.uploader.destroy(attachment.publicId!)
              } catch (error) {
                console.error(`Failed to delete attachment ${attachment.publicId}:`, error)
              }
            }),
        )
      }

      // Notify other participants about message deletion
      const otherParticipants = message.conversation.participants.filter((p) => p.userId !== userId)

      await Promise.all(
        otherParticipants.map(async (participant) => {
          await this.createNotification({
            userId: participant.userId,
            type: "MESSAGE_DELETED",
            title: "Message Deleted",
            content: `A message has been deleted from your conversation`,
            referenceId: message.conversationId,
            referenceType: "conversation",
            data: {
              conversationId: message.conversationId,
              messageId,
              deletedBy: userId,
            },
          })
        }),
      )

      // Delete the message (cascade will handle attachments)
      await prisma.message.delete({
        where: { id: messageId },
      })

      return true
    } catch (error) {
      console.error("Error deleting message:", error)
      return false
    }
  }

  static async bulkDeleteConversations(
    conversationIds: string[],
    userId: string,
  ): Promise<{ deleted: number; failed: number }> {
    let deleted = 0
    let failed = 0

    for (const conversationId of conversationIds) {
      const success = await this.deleteConversation(conversationId, userId)
      if (success) {
        deleted++
      } else {
        failed++
      }
    }

    return { deleted, failed }
  }
}