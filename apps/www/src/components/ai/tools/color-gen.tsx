'use client'

import { Button } from '@dalim/core/ui/button'
import { Badge } from '@dalim/core/ui/badge'
import { Copy, Download, Palette } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@dalim/core/lib/utils' 

interface ColorPalettePreviewProps {
  theme?: string
  type?: string
  baseColor?: string
  palette?: Array<{
    hex: string
    name: string
    rgb: string
    hsl: string
  }>
  cssVariables?: string
  usage?: string
  className?: string
}

export function ColorPalettePreview({
  theme = "Custom",
  type = "custom",
  baseColor,
  palette = [],
  cssVariables = "",
  usage = "Use this color palette in your designs.",
  className,
}: ColorPalettePreviewProps) {
  // Return early if no palette data
  if (!palette || palette.length === 0) {
    return (
      <div className={cn("w-full max-w-2xl p-4 border rounded-lg", className)}>
        <div className="text-center text-gray-500">
          <Palette className="h-8 w-8 mx-auto mb-2" />
          <p>No color palette data available</p>
        </div>
      </div>
    )
  }

  const copyPalette = () => {
    const paletteText = palette.map((color) => `${color.name}: ${color.hex}`).join("\n")
    navigator.clipboard.writeText(paletteText)
    toast.success("Color palette copied to clipboard!")
  }

  const copyCSSVariables = () => {
    navigator.clipboard.writeText(cssVariables)
    toast.success("CSS variables copied to clipboard!")
  }

  const downloadPalette = () => {
    const data = {
      theme,
      type,
      baseColor,
      palette,
      cssVariables,
      usage,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${theme}-color-palette.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`Downloaded ${theme} color palette!`)
  }

  return (
    <div className={cn("w-full max-w-2xl", className)}>
      <div className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            <div className="text-lg font-semibold capitalize">{theme} Palette</div>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">{type}</Badge>
            {baseColor && <Badge variant="outline">Base: {baseColor}</Badge>}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Color Swatches */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {palette.map((color, index) => (
            <div key={index} className="space-y-2">
              <div
                className="aspect-square rounded-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer transition-transform hover:scale-105"
                style={{ backgroundColor: color.hex }}
                onClick={() => {
                  navigator.clipboard.writeText(color.hex)
                  toast.success(`Copied ${color.hex}`)
                }}
              />
              <div className="text-center space-y-1">
                <div className="font-medium text-sm">{color.name || `Color ${index + 1}`}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-mono">{color.hex}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Color Details */}
        <div className="space-y-3">
          <h4 className="font-semibold">Color Values</h4>
          <div className="grid gap-2 text-sm">
            {palette.map((color, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded border" style={{ backgroundColor: color.hex }} />
                  <span className="font-medium">{color.name || `Color ${index + 1}`}</span>
                </div>
                <div className="flex gap-4 text-xs font-mono text-gray-600 dark:text-gray-400">
                  <span>{color.hex}</span>
                  <span>{color.rgb}</span>
                  <span>{color.hsl}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CSS Variables Preview */}
        {cssVariables && (
          <div className="space-y-3">
            <h4 className="font-semibold">CSS Variables</h4>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <pre className="text-xs font-mono whitespace-pre-wrap text-gray-700 dark:text-gray-300">{cssVariables}</pre>
            </div>
          </div>
        )}

        {/* Usage */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">{usage}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={copyPalette} className="flex-1">
            <Copy className="h-4 w-4" />
            Copy Palette
          </Button>
          {cssVariables && (
            <Button variant="outline" onClick={copyCSSVariables} className="flex-1 bg-transparent">
              <Copy className="h-4 w-4" />
              Copy CSS
            </Button>
          )}
          <Button variant="outline" onClick={downloadPalette}>
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  )
}
