'use client'

import { useEffect, useState, useMemo } from 'react'
import { FontCard } from '../../../../../fonts/src/components/fonts/font-card'
import { type FilterOptions } from '../../../../../fonts/src/components/fonts/font-filter'
import { getFonts } from '@/src/lib/fonts'
import { useToast } from '@dalim/core/hooks/use-toast'

interface FontsListProps {
  userId?: string
}

export function FontsList({ userId }: FontsListProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [allFonts, setAllFonts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [filters] = useState<FilterOptions>({
        searchText: '',
        fontTypes: [],
        tags: [],
        featured: null,
        sortBy: 'name',
        sortOrder: 'asc',
        minDownloads: 0,
        minViews: 0,
    })

    const { toast } = useToast()

    useEffect(() => {
        const loadFonts = async () => {
            try {
                const fontData = await getFonts(userId)
                setAllFonts(fontData)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to load fonts',
                    variant: 'destructive',
                })
            } finally {
                setLoading(false)
            }
        }

        loadFonts()
    }, [toast, userId])

    const filteredFonts = useMemo(() => {
        let filtered = [...allFonts]

        // Text search
        if (filters.searchText) {
            const searchLower = filters.searchText.toLowerCase()
            filtered = filtered.filter((font) => font.name.toLowerCase().includes(searchLower) || (font.description && font.description.toLowerCase().includes(searchLower)))
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
                case 'name':
                    comparison = a.name.localeCompare(b.name)
                    break
                case 'downloads':
                    comparison = a.downloadCount - b.downloadCount
                    break
                case 'views':
                    comparison = a.viewCount - b.viewCount
                    break
                case 'date':
                    comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    break
            }

            return filters.sortOrder === 'desc' ? -comparison : comparison
        })

        return filtered
    }, [allFonts, filters])

    if (loading) {
        return (
            <div className="py-3">
                {/* Filter bar skeleton */}
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <div className="bg-muted h-10 flex-1 animate-pulse rounded-md" />
                        <div className="bg-muted h-10 w-[180px] animate-pulse rounded-md" />
                        <div className="bg-muted h-10 w-[100px] animate-pulse rounded-md" />
                    </div>
                </div>

                {/* Fonts grid skeleton */}
                <div className="grid gap-2 py-3">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-card h-48 animate-pulse rounded-lg border p-4"
                        />
                    ))}
                </div>
            </div>
        )
    }
 
    return (
        <div className="">
            {filteredFonts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <h3 className="mb-4 text-2xl font-semibold">No fonts found</h3>
                    <p className="text-muted-foreground mb-6">
                        {userId ? "This user hasn't uploaded any fonts yet" : "Try adjusting your filters or search terms"}
                    </p>
                </div>
            ) : (
                <div className="">
                    <div className="grid gap-2">
                        {filteredFonts.map((font) => (
                            <FontCard
                                key={font.id}
                                font={font}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
