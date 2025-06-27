"use client"

import { Button } from "@dalim/core/ui/button"
import { Badge } from "@dalim/core/ui/badge"
import { Copy, Download, Type } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@dalim/core/lib/utils" 

interface TypographyPreviewProps {
  style?: string
  purpose?: string
  mood?: string
  fonts?: {
    primary?: { name: string; category: string; weight: string }
    secondary?: { name: string; category: string; weight: string }
    accent?: { name: string; category: string; weight: string }
  }
  typographyScale?: Record<string, { size: string; lineHeight: string; letterSpacing: string }>
  css?: string
  googleFontsImport?: string
  usage?: string
  tips?: string[]
  className?: string
}

export function TypographyPreview({
  style = "Modern",
  purpose = "website",
  mood,
  fonts,
  typographyScale,
  css = "",
  googleFontsImport = "",
  usage = "Use these fonts consistently throughout your design for a cohesive look.",
  tips = [],
  className,
}: TypographyPreviewProps) {
  // Return early if no fonts data
  if (!fonts || !fonts.primary) {
    return (
      <div className={cn("w-full max-w-4xl p-4 border rounded-lg", className)}>
        <div className="text-center text-gray-500">
          <Type className="h-8 w-8 mx-auto mb-2" />
          <p>No typography data available</p>
        </div>
      </div>
    )
  }

  const copyCSS = () => {
    navigator.clipboard.writeText(css)
    toast.success("Typography CSS copied to clipboard!")
  }

  const copyGoogleFontsImport = () => {
    navigator.clipboard.writeText(googleFontsImport)
    toast.success("Google Fonts import copied to clipboard!")
  }

  const downloadTypography = () => {
    const data = {
      style,
      purpose,
      mood,
      fonts,
      typographyScale,
      css,
      googleFontsImport,
      usage,
      tips,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${style}-typography-system.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`Downloaded ${style} typography system!`)
  }

  return (
    <div className={cn("w-full max-w-4xl", className)}>
      <div className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            <div className="text-lg font-semibold capitalize">{style} Typography</div>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">{purpose}</Badge>
            {mood && <Badge variant="outline">{mood}</Badge>}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Font Families */}
        <div className="grid md:grid-cols-3 gap-2">
          {fonts.primary && (
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Primary Font</h4>
              <div className="space-y-1">
                <div className="font-semibold text-lg">{fonts.primary.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{fonts.primary.category}</div>
                <div className="text-xs text-gray-500">Weights: {fonts.primary.weight}</div>
              </div>
            </div>
          )}
          {fonts.secondary && (
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Secondary Font</h4>
              <div className="space-y-1">
                <div className="font-semibold text-lg">{fonts.secondary.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{fonts.secondary.category}</div>
                <div className="text-xs text-gray-500">Weights: {fonts.secondary.weight}</div>
              </div>
            </div>
          )}
          {fonts.accent && (
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Accent Font</h4>
              <div className="space-y-1">
                <div className="font-semibold text-lg">{fonts.accent.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{fonts.accent.category}</div>
                <div className="text-xs text-gray-500">Weights: {fonts.accent.weight}</div>
              </div>
            </div>
          )}
        </div>

        {/* Typography Scale Preview */}
        {typographyScale && Object.keys(typographyScale).length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold">Typography Scale</h4>
            <div className="space-y-3">
              {Object.entries(typographyScale).map(([element, styles]) => (
                <div key={element} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-16 text-sm font-mono text-gray-500">{element}</div>
                  <div className="flex-1">
                    <div
                      className="font-semibold"
                      style={{
                        fontSize: styles.size,
                        lineHeight: styles.lineHeight,
                        letterSpacing: styles.letterSpacing,
                      }}
                    >
                      The quick brown fox jumps
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    {styles.size} / {styles.lineHeight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Google Fonts Import */}
        {googleFontsImport && (
          <div className="space-y-3">
            <h4 className="font-semibold">Google Fonts Import</h4>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <pre className="text-xs font-mono whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                {googleFontsImport}
              </pre>
            </div>
          </div>
        )}

        {/* CSS */}
        {css && (
          <div className="space-y-3">
            <h4 className="font-semibold">CSS Variables & Styles</h4>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg max-h-64 overflow-y-auto">
              <pre className="text-xs font-mono whitespace-pre-wrap text-gray-700 dark:text-gray-300">{css}</pre>
            </div>
          </div>
        )}

        {/* Usage & Tips */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h5 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Usage</h5>
            <p className="text-sm text-blue-700 dark:text-blue-300">{usage}</p>
          </div>
          {tips && tips.length > 0 && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h5 className="font-semibold mb-2 text-green-800 dark:text-green-200">Tips</h5>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {googleFontsImport && (
            <Button onClick={copyGoogleFontsImport} className="flex-1">
              <Copy className="h-4 w-4" />
              Copy Import
            </Button>
          )}
          {css && (
            <Button variant="outline" onClick={copyCSS} className="flex-1 bg-transparent">
              <Copy className="h-4 w-4" />
              Copy CSS
            </Button>
          )}
          <Button variant="outline" onClick={downloadTypography}>
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  )
}
