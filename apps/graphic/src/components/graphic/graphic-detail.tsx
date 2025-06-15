'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@dalim/core/ui/button'
import { Badge } from '@dalim/core/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@dalim/core/ui/avatar'
import { Eye, Download, ChevronLeft, ChevronRight } from 'lucide-react'
import { incrementDownloadCount } from '@/src/actions/graphic'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import { Separator } from '@dalim/core/ui/separator'
import { DALIM_URL } from '@dalim/auth'
import { ShareButton } from '@dalim/core/components/common/share-button'
import { CldImage } from '@dalim/core/components/common/gallery'
import { trackDownload } from '@/src/actions/downloads' 

interface GraphicDetailProps { 
    graphic: {
        id: string
        title: string
        description: string | null
        category: string
        images: string[]
        link: string | null
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
    }
}

export function GraphicDetail({ graphic }: GraphicDetailProps) {
    const { data: session } = useSession()
    const [currentImageIndex, setCurrentImageIndex] = useState(0) 

    const handleVisitLink = async () => {
        if (graphic.link) {
            await incrementDownloadCount(graphic.id)
 
            if (session?.user) {
                await trackDownload(graphic.id, 'GRAPHIC', graphic.title, graphic.images[0], graphic.link)
            }

            window.open(graphic.link, '_blank', 'noopener,noreferrer')
        }
    }
 

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev === graphic.images.length - 1 ? 0 : prev + 1))
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? graphic.images.length - 1 : prev - 1))
    }

    const isOwner = session?.user?.id === graphic.user.id

    return (
        <div className="my-6">
            <div className="">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div>
                        <div className="p-0">
                            <div className="relative rounded-xl aspect-video p-2 shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] transition-all dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]">
                                <CldImage
                                    src={graphic.images[currentImageIndex] || '/placeholder.svg'}
                                    alt={graphic.title}
                                    width={700}
                                    height={500}
                                    className="h-auto w-full rounded-lg object-cover"
                                />
                                <div className="hidden md:block">
                                    {graphic.images.length > 1 && (
                                        <>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="bg-background/80 absolute left-4 top-1/2 -translate-y-1/2 backdrop-blur-sm"
                                                onClick={prevImage}>
                                                <ChevronLeft className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="bg-background/80 absolute right-4 top-1/2 -translate-y-1/2 backdrop-blur-sm"
                                                onClick={nextImage}>
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid justify-center">
                        <h1 className="mb-2 text-center text-3xl font-bold">{graphic.title}</h1>
                        <div className="text-muted-foreground grid items-center justify-center gap-4 text-sm md:flex">
                            <Badge
                                variant="secondary"
                                className="flex justify-center">
                                {graphic.category.replace('_', ' ')}
                            </Badge>
                            <div className="flex gap-3">
                                <div className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    {graphic.viewCount} views
                                </div>
                                <div className="flex items-center gap-1">
                                    <Download className="h-4 w-4" />
                                    {graphic.downloadCount} downloads
                                </div>
                            </div>
                            <div>
                                {graphic.tags.length > 0 && (
                                    <div>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {graphic.tags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="outline">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center gap-3 pt-6">
                            <ShareButton
                                url={`/${graphic.id}`}
                                title={graphic.title}
                                description={graphic.description || `Check out this amazing ${graphic.category.toLowerCase().replace('_', ' ')} graphic!`}
                                image={graphic.images[0]}
                                type="graphic"
                                variant="outline"
                                showText={true}
                            />
                            {graphic.link && (
                                <Button
                                    onClick={handleVisitLink}
                                    className="">
                                    <Download className="h-4 w-4" />
                                    Download
                                </Button>
                            )}
                            {isOwner && (
                                <div className="flex justify-center">
                                    <Button
                                        asChild
                                        variant="outline">
                                        <Link href={`/${graphic.id}/edit`}>Edit Graphic</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {graphic.description && (
                    <>
                        <Separator className="my-6" />
                        <p className="text-muted-foreground text-center leading-relaxed">{graphic.description}</p>
                        <Separator className="my-6" />
                    </>
                )}

                <div className="space-y-6">
                    <div className="grid gap-3 md:grid-cols-2">
                        {graphic.images?.length > 1 ? (
                            graphic.images.slice(1).map((imgSrc, index) => (
                                <CldImage
                                    key={index}
                                    src={imgSrc || '/placeholder.svg'}
                                    alt={`${graphic.title} image ${index + 2}`} // +2 because we're skipping the first
                                    width={500}
                                    height={300}
                                    className="h-full w-full rounded-lg object-cover"
                                />
                            ))
                        ) : (
                            <p className="text-muted-foreground">No additional images available.</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <Link href={`${DALIM_URL}/${graphic.user.username}`}>
                                <Avatar>
                                    <AvatarImage src={graphic.user.image || ''} />
                                    <AvatarFallback>{graphic.user.name?.[0] || graphic.user.username?.[0] || 'U'}</AvatarFallback>
                                </Avatar>
                            </Link>
                            <p className="font-medium">{graphic.user.name || graphic.user.username}</p>
                        </div>
                        <p className="text-muted-foreground text-sm">Uploaded on {format(new Date(graphic.createdAt), 'MMMM d, yyyy')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
