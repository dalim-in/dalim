'use client'

import { useState, useEffect } from 'react'
import { Button } from '@dalim/core/ui/button'
import { Card, CardContent } from '@dalim/core/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
import { Textarea } from '@dalim/core/ui/textarea'
import { Badge } from '@dalim/core/ui/badge'
import { Shuffle, Download, Copy } from 'lucide-react'
import { toast } from '@dalim/core/hooks/use-toast'
import Link from 'next/link'
import { FontCard } from '../fonts/font-card'

interface Font {
    id: string
    name: string 
    type: string
    category: string
    previewUrl: string
    downloadUrl: string
    fontFiles: string
    viewCount: number
    downloadCount: number
    featured: boolean
    tags: string[]
    createdAt: string 
}

interface FontPairGeneratorProps {
    fonts: Font[]
}

const sampleTexts = [
    {
        heading: 'The Quick Brown Fox',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    }, 
]

export function FontPairGenerator({ fonts }: FontPairGeneratorProps) {
    const [headingFont, setHeadingFont] = useState<Font | null>(null)
    const [bodyFont, setBodyFont] = useState<Font | null>(null)
    const [customText, setCustomText] = useState(sampleTexts[0])
    const [isCustomTextMode, setIsCustomTextMode] = useState(false)
    const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set())

    // Load font CSS dynamically
    const loadFont = async (font: Font) => {
        if (loadedFonts.has(font.id)) return

        try {
            const fontFace = new FontFace(font.name, `url(${font.previewUrl})`)
            await fontFace.load()
            document.fonts.add(fontFace)
            setLoadedFonts((prev) => new Set([...prev, font.id]))
        } catch (error) {
            console.error('Failed to load font:', error)
        }
    }

    useEffect(() => {
        if (headingFont) loadFont(headingFont)
    }, [headingFont])

    useEffect(() => {
        if (bodyFont) loadFont(bodyFont)
    }, [bodyFont])

    const generateRandomPair = () => {
        const availableFonts = fonts.filter((f) => f.id !== headingFont?.id && f.id !== bodyFont?.id)
        if (availableFonts.length < 2) return

        const shuffled = [...availableFonts].sort(() => Math.random() - 0.5)
        setHeadingFont(shuffled[0])
        setBodyFont(shuffled[1])

        // Also randomize sample text
        const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)]
        setCustomText(randomText)
    }

    const copyPairInfo = () => {
        const info = `Font Pair:
Heading: ${headingFont?.name || 'Not selected'}
Body: ${bodyFont?.name || 'Not selected'}
Generated with Font Pair Generator`

        navigator.clipboard.writeText(info)
        toast({
            title: 'Copied to clipboard',
            description: 'Font pair information has been copied to your clipboard.',
        })
    }

    const downloadFonts = () => {
        if (headingFont && bodyFont) {
            // First download (allowed)
            window.open(headingFont.downloadUrl, '_blank')

            // Second download slightly delayed (helps bypass popup blocker)
            setTimeout(() => {
                window.open(bodyFont.downloadUrl, '_blank')
            }, 100)

            toast({
                title: 'Downloads started',
                description: 'Font downloads have been initiated in new tabs.',
            })
        }
    }

    return (
        <div className="mt-3 space-y-3">
            {/* Controls */}
            <div className="flex flex-wrap gap-2">
                <Button onClick={generateRandomPair}>
                    <Shuffle className="h-4 w-4" />
                    Generate
                </Button>
                <Button
                    onClick={copyPairInfo}
                    variant="outline"
                    disabled={!headingFont || !bodyFont}>
                    <Copy className="h-4 w-4" />
                    Copy Info
                </Button>
                <Button
                    onClick={downloadFonts}
                    variant="outline"
                    disabled={!headingFont || !bodyFont}>
                    <Download className="h-4 w-4" />
                    Download Fonts
                </Button>
            </div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[30%_70%]">
                <div className="space-y-3">
                    <Card>
                        <CardContent>
                            <Select
                                onValueChange={(value) => {
                                    const font = fonts.find((f) => f.id === value)
                                    setHeadingFont(font || null)
                                }}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Heading" />
                                </SelectTrigger>
                                <SelectContent>
                                    {fonts.map((font) => (
                                        <SelectItem
                                            key={font.id}
                                            value={font.id}>
                                            <div className="flex w-full items-center justify-between">
                                                <span>{font.name}</span>
                                                <Badge
                                                    variant="secondary"
                                                    className="ml-2">
                                                    {font.category}
                                                </Badge>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {headingFont && (
                                <div className="mt-2">
                                    <div className="mb-2 flex flex-wrap gap-1">
                                        {headingFont.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <p
                                        className="py-4 text-3xl font-medium"
                                        style={{ fontFamily: headingFont.name }}>
                                        {headingFont.name}
                                    </p>
                                    <div className="flex gap-2">
                                        <Link
                                            target="_blank"
                                            href={headingFont.downloadUrl}>
                                            <Button>Download</Button>
                                        </Link>
                                        <Link href={headingFont.id}>
                                            <Button variant={'outline'}>View</Button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Select
                                onValueChange={(value) => {
                                    const font = fonts.find((f) => f.id === value)
                                    setBodyFont(font || null)
                                }}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Body" />
                                </SelectTrigger>
                                <SelectContent>
                                    {fonts.map((font) => (
                                        <SelectItem
                                            key={font.id}
                                            value={font.id}>
                                            <div className="flex w-full items-center justify-between">
                                                <span>{font.name}</span>
                                                <Badge
                                                    variant="secondary"
                                                    className="ml-2">
                                                    {font.category}
                                                </Badge>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {bodyFont && (
                                <div className="mt-2">
                                    <div className="mb-2 flex flex-wrap gap-1">
                                        {bodyFont.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <p
                                        className="py-4 text-3xl font-medium"
                                        style={{ fontFamily: bodyFont.name }}>
                                        {bodyFont.name}
                                    </p>
                                    <div className="flex gap-2">
                                        <Link
                                            target="_blank"
                                            href={bodyFont.downloadUrl}>
                                            <Button>Download</Button>
                                        </Link>
                                        <Link href={bodyFont.id}>
                                            <Button variant={'outline'}>View</Button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div>
                    {(headingFont || bodyFont) && (
                        <div className="h-full p-6 border rounded-3xl">
                            <div>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <Button
                                            variant={isCustomTextMode ? 'outline' : 'default'}
                                            size="sm"
                                            onClick={() => setIsCustomTextMode(false)}>
                                            Sample Text
                                        </Button>
                                        <Button
                                            variant={isCustomTextMode ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setIsCustomTextMode(true)}>
                                            Custom Text
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {isCustomTextMode ? (
                                    <div className="space-y-3 mt-6">
                                        <div>
                                            <label className="my-2 block text-sm font-medium">Heading Text</label>
                                            <input
                                                type="text"
                                                value={customText.heading}
                                                onChange={(e) => setCustomText((prev) => ({ ...prev, heading: e.target.value }))}
                                                className="w-full rounded-md border p-2"
                                                placeholder="Enter heading text"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium">Body Text</label>
                                            <Textarea
                                                value={customText.body}
                                                onChange={(e) => setCustomText((prev) => ({ ...prev, body: e.target.value }))}
                                                placeholder="Enter body text"
                                                rows={4}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                   null
                                )}

                                <div className="mt-3 rounded-lg border border-dashed p-8">
                                    <h1
                                        className="mb-6 text-3xl font-bold md:text-7xl"
                                        style={{ fontFamily: headingFont?.name || 'inherit' }}>
                                        {customText.heading}
                                    </h1>
                                    <p
                                        className="text-primary/70 text-lg leading-relaxed"
                                        style={{ fontFamily: bodyFont?.name || 'inherit' }}>
                                        {customText.body}
                                    </p>

                                    {headingFont && bodyFont && (
                                        <div className="mt-8 border-t pt-6">
                                            <div className="flex flex-col gap-4 text-sm sm:flex-row">
                                                <div>
                                                    <strong>Heading:</strong> {headingFont.name}
                                                </div>
                                                <div>
                                                    <strong>Body:</strong> {bodyFont.name}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {fonts.length > 0 && (
                <div>
                    <div>
                        <div className="grid grid-cols-1 gap-3">
                            {fonts.slice(0, 3).map((font) => (
                                <div key={font.id}>
                                    <FontCard font={font} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div> 
            )}
            <div className="my-6 flex justify-center">
                <Link href={'/'}>
                    <Button>View More Fonts</Button>
                </Link>
            </div>
        </div>
    )
}
