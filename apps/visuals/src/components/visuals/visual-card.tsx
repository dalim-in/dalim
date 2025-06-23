'use client'

import { useState } from 'react'
import { CardTitle } from '@dalim/core/ui/card'
import { Button } from '@dalim/core/ui/button'
import { Badge } from '@dalim/core/ui/badge'
import { ArrowLeft, BookmarkIcon, Eye, Loader2, SquareArrowOutUpRight, Star, X } from 'lucide-react'
import { cn } from '@dalim/core/lib/utils'
import { bookmarkVisual, unbookmarkVisual } from '@/src/actions/bookmark-actions'
import { incrementViewCount } from '@/src/actions/visual-actions'
import { AspectRatio } from '@dalim/core/ui/aspect-ratio'
import { CldImage } from '@dalim/core/components/common/gallery'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog'
import { useIsMobile } from '@/src/hooks/use-mobile'

interface Visual {
    id: string
    title: string
    description: string | null
    category: string
    image: string
    link: string
    tags: string[]
    viewCount: number
    visitCount: number
    featured: boolean
    createdAt: Date
    user: {
        name: string | null
        image: string | null
    }
}

interface VisualCardProps {
    visual: Visual
    currentUserId?: string
}

export function VisualCard({ visual, currentUserId }: VisualCardProps) {
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [isBookmarking, setIsBookmarking] = useState(false)
    const isMobile = useIsMobile()
    const [isFullscreen] = useState(false)
    const [loading, setLoading] = useState(true)

    const handleBookmark = async () => {
        if (!currentUserId) return

        setIsBookmarking(true)
        try {
            if (isBookmarked) {
                await unbookmarkVisual(visual.id)
                setIsBookmarked(false)
            } else {
                await bookmarkVisual(visual.id)
                setIsBookmarked(true)
            }
        } catch (error) {
            console.error('Error bookmarking:', error)
        } finally {
            setIsBookmarking(false)
        }
    }

    const handleVisit = async () => {
        await incrementViewCount(visual.id)
        window.open(visual.link, '_blank')
    }

    return (
        <div className="group overflow-hidden rounded-b-sm rounded-t-3xl border transition-shadow hover:shadow-lg">
            <Dialog key={visual.id}>
                <DialogTrigger
                    className="w-full"
                    key={visual.id}>
                    <div
                        key={visual.id}
                        className={cn('focused group h-full w-full overflow-hidden rounded-sm')}>
                        <div className="border-b border-dotted p-0">
                            <AspectRatio
                                ratio={16 / 9}
                                className="overflow-hidden">
                                <div>
                                    <CldImage
                                        src={visual.image || '/placeholder.svg'}
                                        alt={visual.title}
                                        loading="lazy"
                                        fill
                                        className="h-full w-full object-cover transition-all group-hover:scale-105"
                                    />
                                </div>
                            </AspectRatio>
                        </div>
                        <div className="flex items-center justify-between px-4 pt-2">
                            <CardTitle className="md:text-md truncate text-sm">{visual.title}</CardTitle>

                            <div className="text-primary/60 flex gap-3 text-xs">
                                {visual.featured && (
                                    <Badge className="h-5 bg-purple-500 text-white">
                                        <Star className="mr-1 h-3 w-3" />
                                        Featured
                                    </Badge>
                                )}
                                <div className="flex gap-1">
                                    <Eye className="h-4 w-4" />
                                    <p>{visual.visitCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className={cn('bg-background flex flex-col gap-0 overflow-hidden p-2 transition-all duration-200', isMobile ? 'm-0 h-screen w-screen max-w-none' : isFullscreen ? 'm-0 h-screen w-screen max-w-none' : 'h-[90vh] w-[90vw] max-w-[1400px]')}>
                    {!isMobile && (
                        <DialogHeader className="flex h-14 flex-row items-center justify-between border-b px-4 pb-2 text-sm">
                            <div className="flex items-center gap-4">
                                <DialogTitle className="text-xl font-medium">{visual.title}</DialogTitle>
                            </div>
                            <div>
                                <div className="bg-secondary text-primary/70 relative hidden items-center gap-2 rounded-full border p-1 px-4 lg:flex">{visual.link}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                {currentUserId && (
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        onClick={handleBookmark}
                                        disabled={isBookmarking}
                                        className="">
                                        <BookmarkIcon className={cn('h-4 w-4', isBookmarked && 'fill-current')} />
                                    </Button>
                                )}
                                <div className="flex items-center gap-2">
                                    <Button
                                        onClick={handleVisit}
                                        size="sm"
                                        className="flex gap-2">
                                        <SquareArrowOutUpRight className="h-4 w-4" />
                                        <p> {visual.viewCount}</p>
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2 pl-2">
                                    <DialogClose>
                                        <X className="h-4 w-4" />
                                    </DialogClose>
                                </div>
                            </div>
                        </DialogHeader>
                    )}
                    <div className="relative h-[calc(80vh-3.5rem)] flex-1 overflow-hidden">
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white">
                                <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
                            </div>
                        )}
                        <div className="h-[125%] w-[125%] origin-top-left scale-[0.8]">
                            <iframe
                                src={visual.link}
                                className="h-full w-full border-0"
                                onLoad={() => setLoading(false)}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                    {isMobile && (
                        <div className="flex h-16 flex-shrink-0 flex-row items-center justify-between space-y-0 border-t px-4 text-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex min-w-0 flex-col">
                                    <DialogTitle className="text-xl font-medium">{visual.title}</DialogTitle>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {currentUserId && (
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        onClick={handleBookmark}
                                        disabled={isBookmarking}
                                        className="">
                                        <BookmarkIcon className={cn('h-4 w-4', isBookmarked && 'fill-current')} />
                                    </Button>
                                )}
                                <DialogClose>
                                    <Button size={'icon'}>
                                        <ArrowLeft size={16} />
                                    </Button>
                                </DialogClose>
                            </div>
                        </div>
                    )}
                    <div>
                        <div className="-mb-2 flex items-center justify-between gap-2 border-t p-2">
                            {visual.description && <p className="text-muted-foreground line-clamp-2 text-sm">{visual.description}</p>}
                            <div className="flex flex-wrap items-center gap-1">
                                <Badge
                                    className="h-5"
                                    variant="secondary">
                                    {visual.category}
                                </Badge>
                                {visual.tags.slice(0, 2).map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="outline"
                                        className="h-5">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
