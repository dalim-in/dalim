"use client"

interface TagWithCount {
  tag: string
  count: number
}

interface TagResponse {
  success: boolean
  tags: TagWithCount[]
  error?: string
}

export async function fetchPopularTags(limit = 50): Promise<TagResponse> {
  try {
    const response = await fetch(`/api/fonts/tags?limit=${limit}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching popular tags:", error)
    return {
      success: false,
      tags: [],
      error: "Failed to fetch tags",
    }
  }
}

export async function searchTags(query: string, limit = 20): Promise<TagResponse> {
  try {
    if (!query.trim()) {
      return { success: true, tags: [] }
    }

    const response = await fetch(`/api/fonts/tags?search=${encodeURIComponent(query)}&limit=${limit}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error searching tags:", error)
    return {
      success: false,
      tags: [],
      error: "Failed to search tags",
    }
  }
}
