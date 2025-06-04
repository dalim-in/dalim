'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@dalim/core/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@dalim/core/ui/avatar'
import { Button } from '@dalim/core/ui/button'
import { Eye, Download, Grid, Table, Search, Loader2, Star } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ShareButton } from '@dalim/core/components/common/share-button'

interface GraphicsGridProps {
    graphics: Array<{
        id: string
        title: string
        description: string | null
        category: string
        images: string[]
        tags: string[]
        featured: boolean
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
    pages: number
    currentPage: number
}

export function GraphicsGrid({ graphics, pages, currentPage }: GraphicsGridProps) {
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

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', page.toString())
        router.push(`/graphics?${params.toString()}`)
    }

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
                    <p className="text-muted-foreground mb-4">{hasFilters ? 'Try adjusting your search criteria or browse all graphics.' : 'No graphics available at the moment.'}</p>
                    {hasFilters && (
                        <Button
                            variant="outline"
                            onClick={() => router.push('/graphics')}>
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

            {/* Graphics Display */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3' : 'grid gap-3 md:grid-cols-2'}>
                {graphics.map((graphic) => (
                    <div
                        key={graphic.id}
                        className={`group rounded-xl border transition-all duration-200 hover:shadow-lg ${viewMode === 'list' ? 'grid gap-3 p-2' : ''}`}>
                        <Link
                            href={`/${graphic.id}`}
                            className={viewMode === 'list' ? 'flex-shrink-0' : ''}>
                            <div className={`relative overflow-hidden ${viewMode === 'list' ? 'h-full w-full rounded-lg md:h-[400px]' : 'h-[250px] w-full rounded-t-lg md:h-[290px]'}`}>
                                <Image
                                    src={graphic.images[0] || '/placeholder.svg?height=200&width=300'}
                                    alt={graphic.title}
                                    height={200}
                                    width={200}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                {graphic.images.length > 1 && <Badge className="bg-background/80 text-foreground absolute right-2 top-2 text-xs">+{graphic.images.length - 1}</Badge>}
                                {graphic.featured && (
                                    <Badge
                                        variant="secondary"
                                        className="absolute left-2 top-2 bg-purple-500 text-white">
                                        <Star className="mr-1 h-3 w-3" />
                                        Featured
                                    </Badge>
                                )}
                            </div>
                        </Link>

                        <div className={`flex flex-col space-y-3 p-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                            {/* Top content: Title, Category, Tags */}
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    <Avatar className="h-6 w-6 border">
                                        <AvatarImage src={graphic.user.image || ''} />
                                        <AvatarFallback className="text-xs">{graphic.user.name?.[0] || graphic.user.username?.[0] || 'U'}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex max-w-40 md:max-w-60">
                                        <h3 className="hover:text-primary overflow-hidden truncate whitespace-nowrap font-semibold transition-colors">{graphic.title}</h3>
                                    </div>
                                </div>
                                <div className="text-muted-foreground flex items-center gap-3 text-xs">
                                    <div className="flex items-center gap-1">
                                        <Eye className="h-3 w-3" />
                                        {graphic.viewCount}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Download className="h-3 w-3" />
                                        {graphic.downloadCount}
                                    </div>
                                    <ShareButton
                                        url={`/${graphic.id}`}
                                        title={graphic.title}
                                        description={graphic.description || `Check out this ${graphic.category.toLowerCase().replace('_', ' ')} graphic!`}
                                        image={graphic.images[0]}
                                        type="graphic"
                                        variant="ghost"
                                        size="icon"
                                        showText={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {pages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6">
                    <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}>
                        Previous
                    </Button>

                    <div className="flex gap-1">
                        {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                            let page: number
                            if (pages <= 5) {
                                page = i + 1
                            } else if (currentPage <= 3) {
                                page = i + 1
                            } else if (currentPage >= pages - 2) {
                                page = pages - 4 + i
                            } else {
                                page = currentPage - 2 + i
                            }

                            return (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => handlePageChange(page)}>
                                    {page}
                                </Button>
                            )
                        })}
                    </div>

                    <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === pages}>
                        Next
                    </Button>
                </div>
            )}
        </div>
    )
}
