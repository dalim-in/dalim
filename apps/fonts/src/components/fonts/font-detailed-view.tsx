'use client'

import { useState } from 'react'
import { Button } from '@dalim/core/ui/button'
import { FontPreview } from './font-preview'
import { Badge } from '@dalim/core/ui/badge'
import { Download, File, Eye, Calendar, User } from 'lucide-react'
import { format } from 'date-fns'
import { incrementFontDownloadCount } from '@/src/lib/fonts'
import Link from 'next/link'
import { DALIM_URL } from '@dalim/auth'
import { toSentenceCase } from '@/src/lib/utils' 
import { FontGlyphs } from './font-glyphs' 

interface FontDetailViewProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    font: any
}

export function FontDetailView({ font }: FontDetailViewProps) {
    const [downloadCount, setDownloadCount] = useState(font.downloadCount)
    const fontFamily = `font-${font.name.replace(/\s+/g, '-').toLowerCase()}`
     
    const handleDownload = async () => {
        await incrementFontDownloadCount(font.id)
        setDownloadCount((prev: number) => prev + 1)
        window.open(font.downloadUrl, '_blank')
    }

    const handleZipDownload = async () => {
        await incrementFontDownloadCount(font.id)
        setDownloadCount((prev: number) => prev + 1)
        window.open(font.zipFileUrl, '_blank')
    }

     
    return (
        <div>
            <div className="grid grid-cols-1 gap-3">
                <div className="md:col-span-2">
                    <div className="h-full">
                        <FontPreview
                            font={{
                                url: font.previewUrl,
                                name: font.name,
                                type: font.type,
                            }}
                            expanded
                        />
                    </div>
                </div>

                <div>
                    <div className="h-full">
                        <div className="rounded-3xl border p-6">
                            <div className="grid grid-cols-3 gap-2">
                                <div className="bg-muted/20 flex flex-col items-center justify-center rounded-md border p-4">
                                    <Eye className="text-muted-foreground mb-2 h-5 w-5" />
                                    <span className="text-2xl font-bold">{font.viewCount}</span>
                                    <span className="text-muted-foreground text-xs">Views</span>
                                </div>

                                <div className="bg-muted/20 flex flex-col items-center justify-center rounded-md border p-4">
                                    <Download className="text-muted-foreground mb-2 h-5 w-5" />
                                    <span className="text-2xl font-bold">{downloadCount}</span>
                                    <span className="text-muted-foreground text-xs">Downloads</span>
                                </div>
                                <div className="bg-muted/20 flex flex-col items-center justify-center rounded-md border p-4">
                                    <File className="text-muted-foreground mb-2 h-5 w-5" />
                                    <span className="text-2xl font-bold">{font.fontFiles || 1}</span>
                                    <span className="text-muted-foreground text-xs">Font File</span>
                                </div>
                            </div>
                            <div className="my-3">
                                <h3 className="text-md mb-2">Description</h3>
                                <p className="text-muted-foreground">{font.description || 'No description provided.'}</p>
                            </div>

                            <div className="flex gap-2">
                                <Badge variant="outline">{toSentenceCase(font.category)}</Badge>
                                <div className="flex flex-wrap gap-2">
                                    {font.tags && font.tags.length > 0 ? (
                                        font.tags.map((tag: string) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary">
                                                {tag}
                                            </Badge>
                                        ))
                                    ) : (
                                        <p className="text-muted-foreground">No tags added.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border p-6">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-md border p-3">
                            <div className="flex items-center">
                                <span className="font-medium">{font.name} Font File</span>
                                <Badge
                                    variant="outline"
                                    className="mx-2">
                                    {font.type.toUpperCase()}
                                </Badge>
                            </div>
                            <Button onClick={handleDownload}>
                                <Download className="h-4 w-4" />
                                Download
                            </Button>
                        </div>

                        {font.zipFileUrl && (
                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <span className="font-medium">{font.name} Package</span>
                                    <Badge
                                        variant="outline"
                                        className="mx-2">
                                        ZIP
                                    </Badge>
                                </div>
                                <Button onClick={handleZipDownload}>
                                    <Download className="h-4 w-4" />
                                    Download ZIP
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="mt-3 space-y-3">
                        <div className="flex items-center gap-1">
                            <User className="text-muted-foreground h-4 w-4" />
                            <span className="text-muted-foreground text-sm"> By </span>
                            <Link href={`${DALIM_URL}/${font.user?.username}`}>
                                <span className="text-brand text-sm hover:underline"> {font.user?.name || 'Unknown user'}</span>
                            </Link>
                        </div>

                        <div className="flex items-center">
                            <Calendar className="text-muted-foreground mr-2 h-4 w-4" />
                            <span className="text-muted-foreground text-sm">Uploaded on {format(new Date(font.createdAt), 'MMMM d, yyyy')}</span>
                        </div>
                    </div>
                </div>
            </div>
            <FontGlyphs
                fontId={font.name}
                fontFamily={fontFamily}
            />
             
        </div>
    )
}
