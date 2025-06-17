import { prisma } from "@dalim/db"

export async function getFonts() {
  try {
    const fonts = await prisma.font.findMany({
      select: {
        id: true,
    name: true, 
    type: true,
    category: true,
    previewUrl: true,
    downloadUrl: true,
    tags: true,
    fontFiles: true,
    viewCount: true,
    downloadCount: true,
    featured: true,
    createdAt: true,
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    })

    return fonts.map((font) => ({
      ...font,
      category: font.category || "OTHER",
    }))
  } catch (error) {
    console.error("Error fetching fonts:", error)
    return []
  }
}

export async function getFontById(id: string) {
  try {
    const font = await prisma.font.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            username: true,
          },
        },
      },
    })

    return font
  } catch (error) {
    console.error("Error fetching font:", error)
    return null
  }
}
