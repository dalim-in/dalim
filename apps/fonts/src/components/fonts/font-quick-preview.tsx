'use client'

import { useFontPreview } from '@/src/hooks/use-font-preview'
import { useEffect, useRef, useState } from 'react'

interface FontQuickPreviewProps {
    fontUrl: string
    fontName: string
    fontSize: number
    textAlign: 'left' | 'center' | 'right'
    letterSpacing: number
    previewText: string
}

export function FontQuickPreview({ fontUrl, fontName, fontSize, previewText, textAlign, letterSpacing }: FontQuickPreviewProps) {
    const [fontLoaded, setFontLoaded] = useState(false)
    const fontFamily = `font-${fontName.replace(/\s+/g, '-').toLowerCase()}`
    const previewRef = useRef<HTMLDivElement>(null)
    const { showFontName } = useFontPreview()

    useEffect(() => {
        // Create a style element to load the font
        const style = document.createElement('style')
        style.innerHTML = `
        @font-face {
        font-family: "${fontFamily}";
        font-size: "12px";
        src: url("${fontUrl}") format("truetype");
        font-weight: normal;
        font-style: normal;
      }
    `
        document.head.appendChild(style)

        // Create a font loader to check when the font is loaded
        const font = new FontFace(fontFamily, `url(${fontUrl})`)
        font.load()
            .then(() => {
                document.fonts.add(font)
                setFontLoaded(true)
            })
            .catch((err) => {
                console.error('Font could not be loaded:', err)
            })

        return () => {
            document.head.removeChild(style)
        }
    }, [fontUrl, fontFamily])

    if (!fontLoaded) {
        return (
            <div className="bg-muted/30 flex h-full w-full items-center justify-center">
                <p className="text-muted-foreground text-sm">Loading preview...</p>
            </div>
        )
    }

    return (
        <div className="bg-background mb-2 flex w-full justify-start rounded-md border p-4 transition-all hover:bg-neutral-100 md:text-start dark:hover:bg-neutral-900">
            <div
                ref={previewRef}
                className="block w-full"
                style={{
                    fontSize: `${fontSize}px`,
                    fontFamily: fontFamily,
                    textAlign: textAlign,
                    lineHeight: 1.2,
                    letterSpacing: `${letterSpacing}px`,
                }}>
                {fontLoaded ? (showFontName ? fontName : previewText) : 'Loading...'}
            </div>
        </div>
    )
}
