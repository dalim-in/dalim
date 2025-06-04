/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { auth } from "@dalim/auth"
import { GraphicCategory, prisma } from "@dalim/db"
import { cloudinary } from "@/src/lib/cloudinary"
import { revalidatePath } from "next/cache"

export async function uploadGraphic(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" }
    }

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const link = formData.get("link") as string
    const tagsJson = formData.get("tags") as string
    const tags = JSON.parse(tagsJson || "[]")

    if (!title || !category) {
      return { success: false, error: "Title and category are required" }
    }

    // Upload images to Cloudinary
    const imageUrls: string[] = []
    const publicIds: string[] = []

    for (let i = 0; formData.get(`image-${i}`); i++) {
      const file = formData.get(`image-${i}`) as File
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const result = (await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "graphics",
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            },
          )
          .end(buffer)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })) as any

      imageUrls.push(result.secure_url)
      publicIds.push(result.public_id)
    }

    // Create graphic in database
    const graphic = await prisma.graphic.create({
      data: {
        title,
        description: description || null,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        category: category as any,
        images: imageUrls,
        imagePublicIds: publicIds,
        link: link || null,
        tags,
        userId: session.user.id,
      },
    })

    revalidatePath("/")
    return { success: true, graphicId: graphic.id }
  } catch (error) {
    console.error("Upload error:", error)
    return { success: false, error: "Failed to upload graphic" }
  }
}

export async function getGraphics(params?: {
  search?: string
  category?: string
  tags?: string[]
  page?: number
  limit?: number
}) {
  try {
    const { search = "", category, tags = [], page = 1, limit = 12 } = params || {}

    const skip = (page - 1) * limit

    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    if (category && category !== "ALL") {
      where.category = category
    }

    if (tags.length > 0) {
      where.tags = {
        hasSome: tags,
      }
    }

    const [graphics, total] = await Promise.all([
      prisma.graphic.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          },
        },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.graphic.count({ where }),
    ])

    return {
      graphics,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    }
  } catch (error) {
    console.error("Get graphics error:", error)
    return {
      graphics: [],
      total: 0,
      pages: 0,
      currentPage: 1,
    }
  }
}

export async function getGraphicById(id: string) {
  try {
    const graphic = await prisma.graphic.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    })

    if (graphic) {
      // Increment view count
      await prisma.graphic.update({
        where: { id },
        data: { viewCount: { increment: 1 } },
      })
    }

    return graphic
  } catch (error) {
    console.error("Get graphic error:", error)
    return null
  }
}

export async function incrementDownloadCount(id: string) {
  try {
    await prisma.graphic.update({
      where: { id },
      data: { downloadCount: { increment: 1 } },
    })
    
    revalidatePath(`/${id}`)
    return { success: true }
  } catch (error) {
    console.error("Increment download count error:", error)
    return { success: false }
  }
}

export async function updateGraphic(id: string, formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" }
    }

    // Check if user owns the graphic
    const existingGraphic = await prisma.graphic.findUnique({
      where: { id },
      select: { userId: true, imagePublicIds: true }
    })

    if (!existingGraphic || existingGraphic.userId !== session.user.id) {
      return { success: false, error: "Unauthorized" }
    }

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const link = formData.get("link") as string
    const tagsJson = formData.get("tags") as string
    const tags = JSON.parse(tagsJson || "[]")
    const keepExistingImages = formData.get("keepExistingImages") === "true"

    if (!title || !category) {
      return { success: false, error: "Title and category are required" }
    }

    let imageUrls: string[] = []
    let publicIds: string[] = []

    // Handle existing images
    if (keepExistingImages) {
      const currentGraphic = await prisma.graphic.findUnique({
        where: { id },
        select: { images: true, imagePublicIds: true }
      })
      if (currentGraphic) {
        imageUrls = [...currentGraphic.images]
        publicIds = [...currentGraphic.imagePublicIds]
      }
    } else {
      // Delete old images from Cloudinary
      for (const publicId of existingGraphic.imagePublicIds) {
        try {
          await cloudinary.uploader.destroy(publicId)
        } catch (error) {
          console.error("Error deleting image:", error)
        }
      }
    }

    // Upload new images to Cloudinary
    for (let i = 0; formData.get(`image-${i}`); i++) {
      const file = formData.get(`image-${i}`) as File
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const result = (await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "graphics",
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            },
          )
          .end(buffer)
      })) as any

      imageUrls.push(result.secure_url)
      publicIds.push(result.public_id)
    }

    // Update graphic in database
    await prisma.graphic.update({
      where: { id },
      data: {
        title,
        description: description || null,
        category: category as any,
        images: imageUrls,
        imagePublicIds: publicIds,
        link: link || null,
        tags,
      },
    })

    revalidatePath(`/${id}`)
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Update error:", error)
    return { success: false, error: "Failed to update graphic" }
  }
}

export async function deleteGraphic(id: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" }
    }

    // Check if user owns the graphic
    const graphic = await prisma.graphic.findUnique({
      where: { id },
      select: { userId: true, imagePublicIds: true }
    })

    if (!graphic || graphic.userId !== session.user.id) {
      return { success: false, error: "Unauthorized" }
    }

    // Delete images from Cloudinary
    for (const publicId of graphic.imagePublicIds) {
      try {
        await cloudinary.uploader.destroy(publicId)
      } catch (error) {
        console.error("Error deleting image:", error)
      }
    }

    // Delete graphic from database
    await prisma.graphic.delete({
      where: { id }
    })

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Delete error:", error)
    return { success: false, error: "Failed to delete graphic" }
  }
}

export async function getRelatedGraphics(graphicId: string, category: string, tags: string[], limit = 6) {
  try {
    // Get related graphics based on category and tags
    const relatedGraphics = await prisma.graphic.findMany({
      where: {
        AND: [
          { id: { not: graphicId } }, // Exclude current graphic
          {
            OR: [
              { category: category as GraphicCategory }, // Same category
              { tags: { hasSome: tags } }, // Has some matching tags
            ],
          },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
      orderBy: [{ featured: "desc" }, { viewCount: "desc" }, { createdAt: "desc" }],
      take: limit,
    })

    return relatedGraphics
  } catch (error) {
    console.error("Get related graphics error:", error)
    return []
  }
}


export async function getUserGraphics(
  userId: string,
  params?: {
    search?: string
    category?: string
    page?: number
    limit?: number
  },
) {
  try {
    const { search = "", category, page = 1, limit = 10 } = params || {}

    const skip = (page - 1) * limit

    const where: any = {
      userId,
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    if (category && category !== "") {
      where.category = category
    }

    const [graphics, total] = await Promise.all([
      prisma.graphic.findMany({
        where,
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.graphic.count({ where }),
    ])

    return {
      graphics,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    }
  } catch (error) {
    console.error("Get user graphics error:", error)
    return {
      graphics: [],
      total: 0,
      pages: 0,
      currentPage: 1,
    }
  }
}

export async function bulkDeleteGraphics(graphicIds: string[]) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" }
    }

    // Get graphics to verify ownership and get public IDs
    const graphics = await prisma.graphic.findMany({
      where: {
        id: { in: graphicIds },
        userId: session.user.id,
      },
      select: { id: true, imagePublicIds: true },
    })

    if (graphics.length !== graphicIds.length) {
      return { success: false, error: "Some graphics not found or unauthorized" }
    }

    // Delete images from Cloudinary
    for (const graphic of graphics) {
      for (const publicId of graphic.imagePublicIds) {
        try {
          await cloudinary.uploader.destroy(publicId)
        } catch (error) {
          console.error("Error deleting image:", error)
        }
      }
    }

    // Delete graphics from database
    await prisma.graphic.deleteMany({
      where: {
        id: { in: graphicIds },
        userId: session.user.id,
      },
    })

    revalidatePath("/dashboard/graphics")
    revalidatePath("/graphics")
    return { success: true }
  } catch (error) {
    console.error("Bulk delete error:", error)
    return { success: false, error: "Failed to delete graphics" }
  }
}

export async function adminDeleteGraphic(id: string) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" }
    }

    // Get graphic and its images
    const graphic = await prisma.graphic.findUnique({
      where: { id },
      select: { imagePublicIds: true },
    })

    if (!graphic) {
      return { success: false, error: "Graphic not found" }
    }

    // Delete images from Cloudinary
    for (const publicId of graphic.imagePublicIds) {
      try {
        await cloudinary.uploader.destroy(publicId)
      } catch (error) {
        console.error("Error deleting image:", error)
      }
    }

    // Delete graphic from database
    await prisma.graphic.delete({
      where: { id },
    })

    revalidatePath("/admin/graphics")
    revalidatePath("/graphics")
    return { success: true }
  } catch (error) {
    console.error("Admin delete error:", error)
    return { success: false, error: "Failed to delete graphic" }
  }
}

export async function adminBulkDeleteGraphics(graphicIds: string[]) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" }
    }

    // Get graphics and their images
    const graphics = await prisma.graphic.findMany({
      where: { id: { in: graphicIds } },
      select: { id: true, imagePublicIds: true },
    })

    // Delete images from Cloudinary
    for (const graphic of graphics) {
      for (const publicId of graphic.imagePublicIds) {
        try {
          await cloudinary.uploader.destroy(publicId)
        } catch (error) {
          console.error("Error deleting image:", error)
        }
      }
    }

    // Delete graphics from database
    await prisma.graphic.deleteMany({
      where: { id: { in: graphicIds } },
    })

    revalidatePath("/admin/graphics")
    revalidatePath("/graphics")
    return { success: true }
  } catch (error) {
    console.error("Admin bulk delete error:", error)
    return { success: false, error: "Failed to delete graphics" }
  }
}

export async function toggleFeaturedGraphic(id: string, featured: boolean) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" }
    }

    await prisma.graphic.update({
      where: { id },
      data: { featured },
    })

    revalidatePath("/admin/graphics")
    revalidatePath("/graphics")
    return { success: true }
  } catch (error) {
    console.error("Toggle featured error:", error)
    return { success: false, error: "Failed to update graphic" }
  }
}


// Admin-only functions
export async function getAllGraphicsForAdmin(params?: {
  search?: string
  category?: string
  user?: string
  page?: number
  limit?: number
}) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
      return { graphics: [], total: 0, pages: 0, currentPage: 1 }
    }

    const { search = "", category, user = "", page = 1, limit = 15 } = params || {}

    const skip = (page - 1) * limit

    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    if (category && category !== "") {
      where.category = category
    }

    if (user) {
      where.user = {
        OR: [
          { name: { contains: user, mode: "insensitive" } },
          { username: { contains: user, mode: "insensitive" } },
          { email: { contains: user, mode: "insensitive" } },
        ],
      }
    }

    const [graphics, total] = await Promise.all([
      prisma.graphic.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
              email: true,
            },
          },
        },
        orderBy: [{ createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.graphic.count({ where }),
    ])

    return {
      graphics,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    }
  } catch (error) {
    console.error("Get admin graphics error:", error)
    return {
      graphics: [],
      total: 0,
      pages: 0,
      currentPage: 1,
    }
  }
}