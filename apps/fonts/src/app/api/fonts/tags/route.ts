import { NextResponse } from "next/server"
import { prisma } from "@dalim/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const limitParam = searchParams.get("limit")
    const limit = limitParam ? parseInt(limitParam) : undefined

    if (search) {
      // Search for tags that match the query
      const fonts = await prisma.font.findMany({
        select: {
          tags: true,
        },
        where: {
          tags: {
            hasSome: [search.toLowerCase()],
          },
        },
      })

      const matchingTags = new Set<string>()
      fonts.forEach((font) => {
        font.tags.forEach((tag) => {
          const normalizedTag = tag.toLowerCase().trim()
          if (normalizedTag.includes(search.toLowerCase().trim())) {
            matchingTags.add(normalizedTag)
          }
        })
      })

      const tags = Array.from(matchingTags)
        .slice(0, limit)
        .map((tag) => ({ tag, count: 0 }))

      return NextResponse.json({
        success: true,
        tags,
      })
    } else {
      // Get all fonts with tags to calculate popularity
      const fonts = await prisma.font.findMany({
        select: {
          tags: true,
        },
      })

      // Count tag frequency
      const tagCounts: Record<string, number> = {}

      fonts.forEach((font) => {
        font.tags.forEach((tag) => {
          const normalizedTag = tag.toLowerCase().trim()
          if (normalizedTag) {
            tagCounts[normalizedTag] = (tagCounts[normalizedTag] || 0) + 1
          }
        })
      })

      // Sort by frequency
      const sortedTags = Object.entries(tagCounts).sort(([, a], [, b]) => b - a)
      const limitedTags = limit ? sortedTags.slice(0, limit) : sortedTags
      const popularTags = limitedTags.map(([tag, count]) => ({ tag, count }))

      return NextResponse.json({
        success: true,
        tags: popularTags,
      })
    }
  } catch (error) {
    console.error("Error fetching tags:", error)
    return NextResponse.json(
      {
        success: false,
        tags: [],
        error: "Failed to fetch tags",
      },
      { status: 500 }
    )
  }
}
