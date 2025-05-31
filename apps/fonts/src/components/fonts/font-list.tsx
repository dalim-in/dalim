"use client"

import { useEffect, useState, useMemo } from "react"
import { FontCard } from "@/src/components/fonts/font-card"
import { AdvancedFilterBar, type FilterOptions } from "./font-filter"
import { getFonts } from "@/src/lib/fonts"
import { useToast } from "@dalim/core/hooks/use-toast"

export function FontsList() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [allFonts, setAllFonts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterOptions>({
    searchText: "",
    fontTypes: [],
    tags: [],
    featured: null,
    sortBy: "name",
    sortOrder: "asc",
    minDownloads: 0,
    minViews: 0,
  })

  const { toast } = useToast()

  useEffect(() => {
    const loadFonts = async () => {
      try {
        const fontData = await getFonts()
        setAllFonts(fontData)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load fonts",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadFonts()
  }, [toast])

  // Extract unique tags and types from all fonts
  const { availableTags, availableTypes } = useMemo(() => {
    const tags = new Set<string>()
    const types = new Set<string>()

    allFonts.forEach((font) => {
      if (font.tags) {
        font.tags.forEach((tag: string) => tags.add(tag))
      }
      if (font.type) {
        types.add(font.type)
      }
    })

    return {
      availableTags: Array.from(tags).sort(),
      availableTypes: Array.from(types).sort(),
    }
  }, [allFonts])

  // Filter and sort fonts based on current filters
  const filteredFonts = useMemo(() => {
    let filtered = [...allFonts]

    // Text search
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase()
      filtered = filtered.filter(
        (font) =>
          font.name.toLowerCase().includes(searchLower) ||
          (font.description && font.description.toLowerCase().includes(searchLower)),
      )
    }

    // Font types
    if (filters.fontTypes.length > 0) {
      filtered = filtered.filter((font) => filters.fontTypes.includes(font.type))
    }

    // Tags
    if (filters.tags.length > 0) {
      filtered = filtered.filter((font) => font.tags && filters.tags.some((tag: string) => font.tags.includes(tag)))
    }

    // Featured
    if (filters.featured !== null) {
      filtered = filtered.filter((font) => font.featured === filters.featured)
    }

    // Download count
    if (filters.minDownloads > 0) {
      filtered = filtered.filter((font) => font.downloadCount >= filters.minDownloads)
    }

    // View count
    if (filters.minViews > 0) {
      filtered = filtered.filter((font) => font.viewCount >= filters.minViews)
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0

      switch (filters.sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "downloads":
          comparison = a.downloadCount - b.downloadCount
          break
        case "views":
          comparison = a.viewCount - b.viewCount
          break
        case "date":
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
      }

      return filters.sortOrder === "desc" ? -comparison : comparison
    })

    return filtered
  }, [allFonts, filters])

  if (loading) {
    return (
      <div className="py-3">
        {/* Filter bar skeleton */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 h-10 bg-muted animate-pulse rounded-md" />
            <div className="w-[180px] h-10 bg-muted animate-pulse rounded-md" />
            <div className="w-[100px] h-10 bg-muted animate-pulse rounded-md" />
          </div>
        </div>

        {/* Fonts grid skeleton */}
        <div className="grid gap-2 py-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-card h-48 animate-pulse rounded-lg border p-4" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="">
      <AdvancedFilterBar
        onFiltersChange={setFilters}
        availableTags={availableTags}
        availableTypes={availableTypes}
        totalResults={filteredFonts.length}
      />

      {filteredFonts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="mb-4 text-2xl font-semibold">No fonts found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="">
          <div className="grid gap-2">
            {filteredFonts.map((font) => (
              <FontCard key={font.id} font={font} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
