'use client'

import { CldImage } from '@dalim/core/components/common/gallery'
import Link from 'next/link'
import { Badge } from '@dalim/core/ui/badge'
import { Button } from '@dalim/core/ui/button'
import { Eye, Download, Grid, Table, Search, Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { GRAPHIC_URL } from '@dalim/auth'

interface GraphicsGridProps {
    graphics: Array<{
        id: string
        title: string
        description: string | null
        category: string
        images: string[]
        tags: string[]
        viewCount: number
        downloadCount: number
        createdAt: Date
        user: {
            id: string
            name: string | null
            username: string | null
            image: string | null
        }
    }>
}

export function GraphicsGrid({ graphics }: GraphicsGridProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [isLoading, setIsLoading] = useState(false)

    // Show loading state briefly when search params change
    useEffect(() => {
        setIsLoading(true)
        const timer = setTimeout(() => setIsLoading(false), 200)
        return () => clearTimeout(timer)
    }, [searchParams])

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading graphics...
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="animate-pulse overflow-hidden rounded-lg border">
                            <div className="bg-muted aspect-video" />
                            <div className="space-y-3 p-4">
                                <div className="bg-muted h-4 w-3/4 rounded" />
                                <div className="bg-muted h-3 w-1/2 rounded" />
                                <div className="flex justify-between">
                                    <div className="bg-muted h-6 w-6 rounded-full" />
                                    <div className="bg-muted h-3 w-16 rounded" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (graphics.length === 0) {
        const hasFilters = searchParams.get('search') || searchParams.get('category') || searchParams.get('tags')

        return (
            <div className="py-12 text-center">
                <div className="mx-auto max-w-md">
                    <div className="mb-4">
                        <div className="bg-muted mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                            <Search className="text-muted-foreground h-8 w-8" />
                        </div>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">No graphics found</h3>
                    <p className="text-muted-foreground mb-4">{hasFilters ? 'Try adjusting your search criteria or browse all graphics.' : "This user hasn't uploaded any graphics yet."}</p>
                    {hasFilters && (
                        <Button
                            variant="outline"
                            onClick={() => router.push(`${GRAPHIC_URL}/graphics`)}>
                            Clear Filters
                        </Button>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="mb-6 mt-4 space-y-3">
            {/* Header with results count and view toggle */}
            <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm">
                    Showing {graphics.length} graphics
                    {searchParams.get('search') && <span className="ml-1">for "{searchParams.get('search')}"</span>}
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('grid')}>
                        <Grid
                            strokeWidth={1}
                            className="h-4 w-4"
                        />
                    </Button>
                    <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('list')}>
                        <Table
                            strokeWidth={1}
                            className="h-4 w-4"
                        />
                    </Button>
                </div>
            </div>

            <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3' : 'grid gap-3 lg:grid-cols-2'}>
                {graphics.map((graphic) => (
                    <div
                        key={graphic.id}
                        className={`group rounded-xl border transition-all duration-200 hover:shadow-lg ${viewMode === 'list' ? 'grid gap-3 p-2' : ''}`}>
                        <Link
                            href={`${GRAPHIC_URL}/${graphic.id}`}
                            className={viewMode === 'list' ? 'flex-shrink-0' : ''}>
                            <div className={`relative overflow-hidden ${viewMode === 'list' ? 'h-[350px] w-full rounded-lg' : 'h-[250px] rounded-t-lg'}`}>
                                <CldImage
                                    src={graphic.images[0] || '/placeholder.svg?height=200&width=300'}
                                    alt={graphic.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                {graphic.images.length > 1 && <Badge className="bg-background/80 text-foreground absolute right-2 top-2 text-xs">+{graphic.images.length - 1}</Badge>}
                            </div>
                        </Link>

                        <div className={`flex flex-col space-y-3 p-3 ${viewMode === 'list' ? 'flex-1' : 'p-4'}`}>
                            {/* Top content: Title, Category, Tags */}
                            <div className="flex justify-between">
                                <Link href={`${GRAPHIC_URL}/${graphic.id}`}>
                                    <h3 className="hover:text-primary line-clamp-2 font-semibold transition-colors">{graphic.title}</h3>
                                </Link>
                                <div className="text-muted-foreground flex items-center gap-3 text-xs">
                                    <div className="flex items-center gap-1">
                                        <Eye className="h-3 w-3" />
                                        {graphic.viewCount}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Download className="h-3 w-3" />
                                        {graphic.downloadCount}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
