"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@dalim/core/ui/card"
import { Badge } from "@dalim/core/ui/badge"
import { Copy, Download } from "lucide-react"
import { Button } from "@dalim/core/ui/button"

interface ColorPaletteProps {
  colors: string[]
  theme: string
}

export const ColorPaletteDisplay = ({ colors, theme }: ColorPaletteProps) => {
  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{theme} Color Palette</span>
          <Badge variant="secondary">{colors.length} colors</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {colors.map((color, index) => (
            <div key={index} className="text-center">
              <div
                className="w-full h-16 rounded-lg border-2 border-white shadow-sm cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => copyToClipboard(color)}
              />
              <p className="text-xs mt-2 font-mono">{color}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => copyToClipboard(colors.join(", "))}>
            <Copy className="w-3 h-3 mr-1" />
            Copy All
          </Button>
          <Button size="sm" variant="outline">
            <Download className="w-3 h-3 mr-1" />
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface IconDisplayProps {
  svgCode: string
  description: string
}

export const IconDisplay = ({ svgCode, description }: IconDisplayProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(svgCode)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Generated Icon</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: svgCode }} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={copyToClipboard}>
            <Copy className="w-3 h-3 mr-1" />
            Copy SVG
          </Button>
          <Button size="sm" variant="outline">
            <Download className="w-3 h-3 mr-1" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
