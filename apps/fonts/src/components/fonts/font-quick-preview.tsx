'use client'

import { useEffect, useState } from 'react'

interface FontQuickPreviewProps {
    fontUrl: string
    fontName: string
}

export function FontQuickPreview({ fontUrl, fontName }: FontQuickPreviewProps) {
    const [fontLoaded, setFontLoaded] = useState(false)
    const fontFamily = `font-${fontName.replace(/\s+/g, '-').toLowerCase()}`

    useEffect(() => {
        // Create a style element to load the font
        const style = document.createElement('style')
        style.innerHTML = `
      @font-face {
        font-family: "${fontFamily}";
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
        <div className="bg-background mb-2 flex justify-start rounded-md border p-4 text-center transition-all hover:bg-neutral-100 md:text-start dark:hover:bg-neutral-900">
            <p
                className="text-center text-sm"
                style={{
                    fontSize: '24px',
                    fontFamily: fontFamily,
                }}>
                The quick brown fox jumps over the lazy dog
            </p>
        </div>
    )
}
