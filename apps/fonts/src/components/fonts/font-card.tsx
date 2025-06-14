'use client'

import Link from 'next/link'
import { Badge } from '@dalim/core/ui/badge'
import { Button } from '@dalim/core/ui/button'
import { Download, Eye, Files, Star } from 'lucide-react'
import { FontQuickPreview } from './font-quick-preview'
import { incrementFontDownloadCount } from '@/src/lib/fonts'
import { useFontPreview } from '@dalim/core/hooks/use-font-preview'
import { FONTS_URL } from '@dalim/auth'
import { ShareButton } from '@dalim/core/components/common/share-button'

interface FontCardProps {
    font: {
        id: string
        name: string
        description?: string
        type: string
        previewUrl: string
        downloadUrl: string
        fontFiles: string
        viewCount: number
        downloadCount: number
        featured: boolean
        tags: string[]
        createdAt: string
    }
}

export function FontCard({ font }: FontCardProps) {
    const { previewText, fontSize, textAlign, letterSpacing } = useFontPreview()
    const handleDownload = async () => {
        // Increment download count in the database
        await incrementFontDownloadCount(font.id)

        // Trigger download
        window.open(font.downloadUrl, '_blank')
    }

    return (
        <div>
            <div className="bg-muted/50 dark:bg-muted/50 overflow-hidden rounded-3xl ">
                <div className="relative p-2">
                    <Link href={`${FONTS_URL}/${font.id}`}>
                        <FontQuickPreview
                            previewText={previewText}
                            textAlign={textAlign}
                            letterSpacing={letterSpacing}
                            fontUrl={font.previewUrl}
                            fontName={font.name}
                            fontSize={fontSize}
                        />
                    </Link>
                    <div className="grid items-start justify-between gap-2 md:flex">
                        <div className="grid items-center gap-3 px-4 md:flex md:gap-6">
                            <div className="flex items-center gap-2">
                                <h3 className="truncate text-lg font-semibold">{font.name}</h3>
                                {font.featured && (
                                    <Badge
                                        variant="secondary"
                                        className="bg-purple-500 text-white">
                                        <Star className="mr-1 h-3 w-3" />
                                        Featured
                                    </Badge>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Badge
                                    variant="outline"
                                    className="text-xs">
                                    {font.type.toUpperCase()}
                                </Badge>
                                {font.tags.slice(0, 2).map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="outline"
                                        className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                                {font.tags.length > 2 && (
                                    <Badge
                                        variant="outline"
                                        className="text-xs">
                                        +{font.tags.length - 2}
                                    </Badge>
                                )}
                            </div>
                            <div className="text-muted-foreground flex items-center space-x-2 text-sm">
                                <Eye className="h-4 w-4" />
                                <span>{font.viewCount}</span>
                                <Download className="ml-2 h-4 w-4" />
                                <span>{font.downloadCount}</span>
                                {font.fontFiles && (
                                    <>
                                        <Files className="ml-2 h-4 w-4" />
                                        <span>{font.fontFiles}</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="px-3 space-x-2 pb-3 md:pb-0">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDownload}>
                                <Download className="h-4 w-4" />
                                Download
                            </Button>
                            <ShareButton
                                url={`/${font.id}`}
                                title={font.name}
                                description={font.description}
                                image={""}
                                type="font"
                                variant="ghost"
                                size="icon"
                                showText={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
