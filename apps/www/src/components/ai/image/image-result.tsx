'use client'

import { Button } from '@dalim/core/ui/button'
import { Download, RotateCcw  } from 'lucide-react'
import { useState } from 'react'
import { HistoryItem, HistoryPart } from '@/src/types/ai'
import Image from 'next/image'
import { ImageZoom } from '@dalim/core/components/backgrunds/image-zoom'

interface ImageResultDisplayProps {
    imageUrl: string
    description: string | null
    onReset: () => void
    conversationHistory?: HistoryItem[]
}

export function ImageResultDisplay({ imageUrl, description, onReset, conversationHistory = [] }: ImageResultDisplayProps) {
    const [showHistory, setShowHistory] = useState(false)

    const handleDownload = () => {
        // Create a temporary link element
        const link = document.createElement('a')
        link.href = imageUrl
        link.download = `gemini-image-${Date.now()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const toggleHistory = () => {
        setShowHistory(!showHistory)
    }

    return (
        <div className="space-y-2"> 
            <div className="flex items-center justify-center"> 
                <div className="gap-1 flex items-center">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}>
                        <Download className="h-4 w-4" />
                        Download
                    </Button>
                    {conversationHistory.length > 0 && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleHistory}> 
                            {showHistory ? 'Hide History' : 'Show History'}
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onReset}>
                        <RotateCcw className="h-4 w-4" />
                        New Image
                    </Button>
                </div>
            </div>
            <div className="space-y-2 h-[300px] md:h-[520px] overflow-auto">
                <div className="bg-muted overflow-hidden rounded-lg p-2">
                    <ImageZoom>
                    <Image
                        width={500}
                        height={500}
                        src={imageUrl}
                        alt={description || 'Generated image'}
                        className="mx-auto h-auto w-60 md:w-md max-w-[640px]"
                    />
                    </ImageZoom>
                </div>

                {description && (
                    <div className="bg-muted rounded-lg p-4">
                        <h3 className="mb-2 text-sm font-medium">Description</h3>
                        <p className="text-muted-foreground text-sm">{description}</p>
                    </div>
                )}

                {showHistory && conversationHistory.length > 0 && (
                    <div className="rounded-lg">
                        <div className="space-y-2">
                            {conversationHistory.map((item, index) => (
                                <div
                                    key={index}
                                    className={`bg-secondary rounded-lg p-3`}>
                                    <p className={`mb-2 text-sm font-medium ${item.role === 'user' ? 'text-foreground' : 'text-primary'}`}>{item.role === 'user' ? 'You' : 'Gemini'}</p>
                                    <div className="space-y-2">
                                        {item.parts.map((part: HistoryPart, partIndex) => (
                                            <div key={partIndex}>
                                                {part.text && <p className="text-sm">{part.text}</p>}
                                                {part.image && (
                                                    <div className="mt-2 overflow-hidden rounded-md">
                                                        <Image
                                                            width={100}
                                                            height={100}
                                                            src={part.image}
                                                            alt={`Image shared by ${item.role}`}
                                                            className="h-auto max-w-[16rem] object-contain"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
