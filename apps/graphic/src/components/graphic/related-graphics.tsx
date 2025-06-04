'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@dalim/core/ui/badge'
import { Eye, Download } from 'lucide-react'

interface RelatedGraphicsProps {
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

export function RelatedGraphics({ graphics }: RelatedGraphicsProps) {
    return (
        <section className="mb-6 space-y-6">
            <div className="relative before:absolute before:-inset-x-6 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>

            <div className="">
                <h2 className="py-6 text-2xl text-center font-bold">Related Graphics</h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {graphics.map((graphic) => (
                        <div
                            key={graphic.id}
                            className="group rounded-xl border transition-shadow hover:shadow-lg">
                            <div className="p-0">
                                <Link href={`/${graphic.id}`}>
                                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                                        <Image
                                            src={graphic.images[0] || '/placeholder.svg'}
                                            alt={graphic.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        {graphic.images.length > 1 && <Badge className="bg-background/80 text-foreground absolute right-2 top-2">+{graphic.images.length - 1}</Badge>}
                                    </div>
                                </Link>

                                <div className="space-y-3 p-4">
                                    <div className="flex justify-between">
                                        <Link href={`/${graphic.id}`}>
                                            <h3 className="hover:text-primary line-clamp-1 font-semibold transition-colors">{graphic.title}</h3>
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
                        </div>
                    ))}
                </div>

                {graphics.length === 6 && (
                    <div className="mt-6 text-center">
                        <Link
                            href="/"
                            className="text-primary font-medium hover:underline">
                            View more graphics
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}
