'use client'

import { useEffect, useState } from 'react'
import { Input } from '@dalim/core/ui/input'
import { Slider } from '@dalim/core/ui/slider'
import { Card, CardContent } from '@dalim/core/ui/card'

interface FontPreviewProps {
    font: {
        url: string
        name: string
        type: string
    }
    expanded?: boolean 
}

export function FontPreview({ font, expanded = false }: FontPreviewProps) {
    const [fontLoaded, setFontLoaded] = useState(false)
    const [previewText, setPreviewText] = useState('')
    const [fontSize, setFontSize] = useState(expanded ? 54 : 24)
    const fontFamily = `font-${font.name.replace(/\s+/g, '-').toLowerCase()}`

    useEffect(() => {
        if (!font.url) return

        // Create a style element to load the font
        const style = document.createElement('style')
        style.innerHTML = `
      @font-face {
        font-family: "${fontFamily}";
        src: url("${font.url}") format("truetype");
        font-weight: normal;
        font-style: normal;
      }
    `
        document.head.appendChild(style)

        // Create a font loader to check when the font is loaded
        const fontFace = new FontFace(fontFamily, `url(${font.url})`)
        fontFace
            .load()
            .then(() => {
                document.fonts.add(fontFace)
                setFontLoaded(true)
            })
            .catch((err) => {
                console.error('Font could not be loaded:', err)
            })

        return () => {
            document.head.removeChild(style)
        }
    }, [font.url, fontFamily])

    if (!font.url) {
        return (
            <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">No font selected</p>
            </div>
        )
    }

    if (!fontLoaded) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-pulse text-center">
                    <p className="text-muted-foreground">Loading font preview...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="">
            <Card className="w-full">
                <CardContent>
                    {expanded ? (
                        <div
                            style={{
                                fontFamily: fontFamily,
                                fontSize: `${fontSize}px`,
                                
                                lineHeight: 1.4,
                                wordBreak: 'break-word',
                            }}
                            className="transition-all duration-300 ease-in-out">
                            <div className="space-y-2">
                                {previewText || (
                                    <p style={{ fontSize: `${fontSize}px` }}>
                                        ABCDEFGHIJKLMNOPQRSTUVWXYZ
                                        <br />
                                        abcdefghijklmnopqrstuvwxyz
                                        <br />
                                        0123456789
                                        <br />
                                        !@#$%^&*()_+-=|;:'",.?/\
                                    </p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex min-h-[150px] items-center justify-center">
                            <p className="text-muted-foreground">Loading font preview...</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="mt-3 flex w-full items-center gap-3">
                <Input
                    value={previewText}
                    onChange={(e) => setPreviewText(e.target.value)}
                    placeholder="Enter text to preview"
                    
                /> 
                <div className="text-muted-foreground text-sm">{fontSize}px</div>
                <Slider
                    className="w-60"
                    value={[fontSize]}
                    min={12}
                    max={expanded ? 96 : 48}
                    step={1}
                    onValueChange={(value) => setFontSize(value[0])}
                />
            </div>
        </div>
    )
}
