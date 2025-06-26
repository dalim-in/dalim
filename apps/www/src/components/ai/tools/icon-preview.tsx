'use client'

import { Button } from '@dalim/core/ui/button'
import { Badge } from '@dalim/core/ui/badge'
import { Copy, Download } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@dalim/core/lib/utils'

interface IconPreviewProps {
    svgCode: string
    iconName?: string
    description: string
    size?: number
    color?: string
    style?: string
    className?: string
}

export function IconPreview({ svgCode, iconName, description, size = 24, color = 'currentColor', style = 'outline', className }: IconPreviewProps) {
    const resolvedIconName = iconName || description

    const downloadSVG = () => {
        const blob = new Blob([svgCode], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${resolvedIconName.replace(/\s+/g, '-').toLowerCase()}-icon.svg`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        toast.success(`Downloaded ${resolvedIconName} icon!`)
    }

    const copySVG = () => {
        navigator.clipboard.writeText(svgCode)
        toast.success(`Copied ${resolvedIconName} SVG to clipboard!`)
    }

    return (
        <div className={cn('w-full max-w-md', className)}>
            <div className="pb-4">
                <div className="flex items-center justify-between">
                    <div className="text-lg capitalize">{resolvedIconName}</div>
                    <Badge variant="secondary">{style}</Badge>
                </div>
            </div>

            <div className="space-y-4">
                {/* Icon Preview */}
                <div className="flex items-center aspect-square justify-center rounded-lg border-2 border-dotted p-8">
                    {svgCode?.trim().startsWith('<svg') ? (
                        <div
                            className="transition-all  duration-200 hover:scale-110"
                            dangerouslySetInnerHTML={{ __html: svgCode }}
                        />
                    ) : (
                        <p className="text-sm text-red-500">Invalid SVG Code</p>
                    )}
                </div>

                {/* Icon Info */}
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span>Size: {size}px</span>
                    <span>Color: {color}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <Button
                        onClick={downloadSVG}
                        className="flex-1">
                        <Download className="h-4 w-4" />
                        Download
                    </Button>
                    <Button
                        variant="outline"
                        onClick={copySVG}
                        className="flex-1">
                        <Copy className="h-4 w-4" />
                        Copy SVG
                    </Button>
                </div>
            </div>
        </div>
    )
}
