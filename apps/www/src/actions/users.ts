"use server"

import { auth } from "@dalim/auth"
import { prisma } from "@dalim/db"
import { cloudinary } from "@/src/lib/cloudinary"
import { revalidatePath } from "next/cache"

export async function getAllUsersForAdmin(params?: {
  search?: string
  role?: string
  status?: string
  page?: number
  limit?: number
}) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
      return { users: [], total: 0, pages: 0, currentpage: 1 }
    }

    const { search = "", role, status, page = 1, limit = 15 } = params || {}

    const skip = (page - 1) * limit

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { username: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ]
    }

    if (role && role !== "") {
      where.role = role
    }

    if (status === "verified") {
      where.emailVerified = { not: null }
    } else if (status === "unverified") {
      where.emailVerified = null
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          image: true,
          role: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              graphics: true,
              fonts: true,
            },
          },
        },
        orderBy: [{ createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ])

    return {
      users,
      total,
      pages: Math.ceil(total / limit),
      currentpage: page,
    }
  } catch (error) {
    console.error("Get admin users error:", error)
    return {
      users: [],
      total: 0,
      pages: 0,
      currentpage: 1,
    }
  }
}

export async function adminDeleteUser(userId: string) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" }
    }

    // Prevent admin from deleting themselves
    if (session.user.id === userId) {
      return { success: false, error: "Cannot delete your own account" }
    }

    // Get user's graphics and fonts to delete associated files
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        graphics: {
          select: { imagePublicIds: true },
        },
        fonts: {
          select: { publicId: true },
        },
      },
    })

    if (!user) {
      return { success: false, error: "User not found" }
    }

    // Delete all graphics images from Cloudinary
    for (const graphic of user.graphics) {
      for (const publicId of graphic.imagePublicIds) {
        try {
          await cloudinary.uploader.destroy(publicId)
        } catch (error) {
          console.error("Error deleting graphic image:", error)
        }
      }
    }

    // Delete all font files from Cloudinary
    for (const font of user.fonts) {
      if (font.publicId) {
        try {
          await cloudinary.uploader.destroy(font.publicId)
        } catch (error) {
          console.error("Error deleting font file:", error)
        }
      }
    }

    // Delete user profile image if it exists
    if (user.image && user.image.includes("cloudinary")) {
      try {
        // Extract public ID from Cloudinary URL
        const publicId = user.image.split("/").pop()?.split(".")[0]
        if (publicId) {
          await cloudinary.uploader.destroy(publicId)
        }
      } catch (error) {
        console.error("Error deleting profile image:", error)
      }
    }

    // Delete user from database (cascade will handle related records)
    await prisma.user.delete({
      where: { id: userId },
    })

    revalidatePath("/admin/users")
    revalidatePath("/admin/graphics")
    return { success: true }
  } catch (error) {
    console.error("Admin delete user error:", error)
    return { success: false, error: "Failed to delete user" }
  }
}

export async function adminBulkDeleteUsers(userIds: string[]) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" }
    }

    // Prevent admin from deleting themselves
    if (userIds.includes(session.user.id!)) {
      return { success: false, error: "Cannot delete your own account" }
    }

    // Get users and their associated files
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      include: {
        graphics: {
          select: { imagePublicIds: true },
        },
        fonts: {
          select: { publicId: true },
        },
      },
    })

    // Delete all associated files from Cloudinary
    for (const user of users) {
      // Delete graphics images
      for (const graphic of user.graphics) {
        for (const publicId of graphic.imagePublicIds) {
          try {
            await cloudinary.uploader.destroy(publicId)
          } catch (error) {
            console.error("Error deleting graphic image:", error)
          }
        }
      }

      // Delete font files
      for (const font of user.fonts) {
        if (font.publicId) {
          try {
            await cloudinary.uploader.destroy(font.publicId)
          } catch (error) {
            console.error("Error deleting font file:", error)
          }
        }
      }

      // Delete profile image
      if (user.image && user.image.includes("cloudinary")) {
        try {
          const publicId = user.image.split("/").pop()?.split(".")[0]
          if (publicId) {
            await cloudinary.uploader.destroy(publicId)
          }
        } catch (error) {
          console.error("Error deleting profile image:", error)
        }
      }
    }

    // Delete users from database
    await prisma.user.deleteMany({
      where: { id: { in: userIds } },
    })

    revalidatePath("/admin/users")
    revalidatePath("/admin/graphics")
    return { success: true }
  } catch (error) {
    console.error("Admin bulk delete users error:", error)
    return { success: false, error: "Failed to delete users" }
  }
}

export async function adminUpdateUserRole(userId: string, role: "USER" | "ADMIN") {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" }
    }

    // Prevent admin from demoting themselves
    if (session.user.id === userId && role === "USER") {
      return { success: false, error: "Cannot demote your own account" }
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role },
    })

    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("Admin update user role error:", error)
    return { success: false, error: "Failed to update user role" }
  }
}

export async function adminToggleUserStatus(userId: string, verified: boolean) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" }
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        emailVerified: verified ? new Date() : null,
      },
    })

    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("Admin toggle user status error:", error)
    return { success: false, error: "Failed to update user status" }
  }
}
