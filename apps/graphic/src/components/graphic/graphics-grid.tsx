'use client'

import Link from 'next/link'
import { Badge } from '@dalim/core/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@dalim/core/ui/avatar'
import { Button } from '@dalim/core/ui/button'
import { Eye, Download, Grid, Table, Search, Loader2, Star } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useCallback, useRef } from 'react'
import { ShareButton } from '@dalim/core/components/common/share-button'
import { CldImage } from '@dalim/core/components/common/gallery'
import { GRAPHIC_URL } from '@dalim/auth'

interface Graphic {
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
}

interface GraphicsGridInfiniteProps {
    initialGraphics: Graphic[]
    initialTotal: number
    initialPage: number
}

// Client-side function to fetch more graphics
async function fetchGraphics(params: {
    search?: string
    category?: string
    tags?: string[]
    page: number
    limit?: number
}) {
    const searchParams = new URLSearchParams()
    
    if (params.search) searchParams.set('search', params.search)
    if (params.category) searchParams.set('category', params.category)
    if (params.tags && params.tags.length > 0) searchParams.set('tags', params.tags.join(','))
    searchParams.set('page', params.page.toString())
    searchParams.set('limit', (params.limit || 12).toString())

    const response = await fetch(`/api/graphic?${searchParams.toString()}`)
    if (!response.ok) {
        throw new Error('Failed to fetch graphics')
    }
    
    return response.json()
}

export function GraphicsGrid({ 
    initialGraphics, 
    initialTotal, 
    initialPage 
}: GraphicsGridInfiniteProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [graphics, setGraphics] = useState<Graphic[]>(initialGraphics)
    const [, setIsLoading] = useState(false)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(initialGraphics.length < initialTotal)
    const [currentpage, setcurrentpage] = useState(initialPage)
    const [error, setError] = useState<string | null>(null)
    
    const observerRef = useRef<IntersectionObserver | null>(null)
    const loadMoreRef = useRef<HTMLDivElement | null>(null)

    // Get current search parameters
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || []

    // Reset graphics when search params change
    useEffect(() => {
        setIsLoading(true)
        setGraphics(initialGraphics)
        setcurrentpage(initialPage)
        setHasMore(initialGraphics.length < initialTotal)
        setError(null)
        
        const timer = setTimeout(() => setIsLoading(false), 200)
        return () => clearTimeout(timer)
    }, [searchParams, initialGraphics, initialTotal, initialPage])

    // Load more graphics
    const loadMore = useCallback(async () => {
        if (isLoadingMore || !hasMore) return

        setIsLoadingMore(true)
        setError(null)

        try {
            const nextPage = currentpage + 1
            const result = await fetchGraphics({
                search,
                category,
                tags,
                page: nextPage,
                limit: 12
            })

            if (result.graphics.length === 0) {
                setHasMore(false)
            } else {
                setGraphics(prev => [...prev, ...result.graphics])
                setcurrentpage(nextPage)
                setHasMore(result.graphics.length === 12) // Assuming limit is 12
            }
        } catch (err) {
            setError('Failed to load more graphics')
            console.error('Error loading more graphics:', err)
        } finally {
            setIsLoadingMore(false)
        }
    }, [isLoadingMore, hasMore, currentpage, search, category, tags])

    // Set up intersection observer
    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect()
        }

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const target = entries[0]
                if (target.isIntersecting && hasMore && !isLoadingMore) {
                    loadMore()
                }
            },
            {
                threshold: 0.1,
                rootMargin: '100px'
            }
        )

        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current)
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [loadMore, hasMore, isLoadingMore])

     

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
                    <p className="text-muted-foreground mb-4">
                        {hasFilters ? 'Try adjusting your search criteria or browse all graphics.' : 'No graphics available at the moment.'}
                    </p>
                    {hasFilters && (
                        <Button
                            variant="outline"
                            onClick={() => router.push('/')}>
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
                        <Grid strokeWidth={1} className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('list')}>
                        <Table strokeWidth={1} className="h-4 w-4" />
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
                                <CldImage 
                                    src={graphic.images[0] || '/placeholder.svg?height=200&width=300'}
                                    alt={graphic.title}
                                    height={200}
                                    width={200}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                {graphic.images.length > 1 && (
                                    <Badge className="bg-background/80 text-foreground absolute right-2 top-2 text-xs">
                                        +{graphic.images.length - 1}
                                    </Badge>
                                )}
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
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    <Avatar className="h-6 w-6 border">
                                        <AvatarImage src={graphic.user.image || ''} />
                                        <AvatarFallback className="text-xs">
                                            {graphic.user.name?.[0] || graphic.user.username?.[0] || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex w-24 md:w-40">
                                        <h3 className="hover:text-primary overflow-hidden truncate whitespace-nowrap font-semibold transition-colors">
                                            {graphic.title}
                                        </h3>
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

            {/* Loading More Indicator */}
            {hasMore && (
                <div ref={loadMoreRef} className="flex justify-center py-8">
                    {isLoadingMore ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading more graphics...
                        </div>
                    ) : (
                        <Button
                            variant="outline"
                            onClick={loadMore}
                            className="px-8">
                            Load More
                        </Button>
                    )}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="flex justify-center py-4">
                    <div className="text-red-500 text-sm">{error}</div>
                </div>
            )}

            {/* End Message */}
            {!hasMore && graphics.length > 0 && (
                <div className="flex justify-center py-8">
                    <div className="text-muted-foreground text-sm">
                        You've reached the end of the graphics
                    </div>
                </div>
            )}
        </div>
    )
}



export function GraphicsGridWWW({ 
    initialGraphics, 
    initialTotal, 
    initialPage 
}: GraphicsGridInfiniteProps) { 
    const searchParams = useSearchParams()
     
    const [graphics, setGraphics] = useState<Graphic[]>(initialGraphics)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(initialGraphics.length < initialTotal)
    const [currentpage, setcurrentpage] = useState(initialPage)
     
    
    const observerRef = useRef<IntersectionObserver | null>(null)
    const loadMoreRef = useRef<HTMLDivElement | null>(null)

    // Get current search parameters
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
     

    // Reset graphics when search params change
    useEffect(() => {
        setIsLoading(true)
        setGraphics(initialGraphics)
        setcurrentpage(initialPage)
        setHasMore(initialGraphics.length < initialTotal)
        
        
        const timer = setTimeout(() => setIsLoading(false), 200)
        return () => clearTimeout(timer)
    }, [searchParams, initialGraphics, initialTotal, initialPage])

    // Load more graphics
    const loadMore = useCallback(async () => {
        if (isLoadingMore || !hasMore) return

        setIsLoadingMore(true)
         

        try {
            const nextPage = currentpage + 1
            const result = await fetchGraphics({
                search,
                category, 
                page: nextPage,
                limit: 12
            })

            if (result.graphics.length === 0) {
                setHasMore(false)
            } else {
                setGraphics(prev => [...prev, ...result.graphics])
                setcurrentpage(nextPage)
                setHasMore(result.graphics.length === 12) // Assuming limit is 12
            }
        } catch (err) { 
            console.error('Error loading more graphics:', err)
        } finally {
            setIsLoadingMore(false)
        }
    }, [isLoadingMore, hasMore, currentpage, search, category])

    // Set up intersection observer
    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect()
        }

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const target = entries[0]
                if (target.isIntersecting && hasMore && !isLoadingMore) {
                    loadMore()
                }
            },
            {
                threshold: 0.1,
                rootMargin: '100px'
            }
        )

        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current)
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [loadMore, hasMore, isLoadingMore])

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

     
    return (
        <div className="mt-6"> 
            <div className={'grid grid-cols-1 gap-3 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'}>
                {graphics.slice(0, 6).map((graphic) => (
                    <div
                        key={graphic.id}
                        className={` relative rounded-xl border transition-all duration-200 hover:shadow-lg grid gap-3 p-2`}>
                         
                        <Link
                            href={`${GRAPHIC_URL}/${graphic.id}`}
                            className={'relative'}>
                            <div className={`relative overflow-hidden h-[250px] w-full rounded-lg md:h-[290px]`}>
                                <CldImage 
                                    src={graphic.images[0] || '/placeholder.svg?height=200&width=300'}
                                    alt={graphic.title}
                                    height={200}
                                    width={200}
                                    className="h-full w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                {graphic.images.length > 1 && (
                                    <Badge className="bg-background/80 text-foreground absolute right-2 top-2 text-xs">
                                        +{graphic.images.length - 1}
                                    </Badge>
                                )}
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

                        <div className={`flex flex-col space-y-3 p-3 `}>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    <Avatar className="h-6 w-6 border">
                                        <AvatarImage src={graphic.user.image || ''} />
                                        <AvatarFallback className="text-xs">
                                            {graphic.user.name?.[0] || graphic.user.username?.[0] || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex w-24 md:w-40">
                                        <h3 className="hover:text-primary overflow-hidden truncate whitespace-nowrap font-semibold transition-colors">
                                            {graphic.title}
                                        </h3>
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
                                        url={`${GRAPHIC_URL}/${graphic.id}`}
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
 
             
        </div>
    )
}
