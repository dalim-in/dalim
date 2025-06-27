"use client"

import { Button } from "@dalim/core/ui/button"
import { Badge } from "@dalim/core/ui/badge"
import { Copy, Download, Code, Eye, FileDown } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@dalim/core/lib/utils"
import { useState, useRef, useEffect } from "react"
import * as Icons from "dalim-icons"

interface IconPreviewProps {
  iconName?: string
  description?: string
  size?: number
  color?: string
  variant?: string
  strokeWidth?: number
  componentCode?: string
  svgCode?: string
  category?: string
  tags?: string[]
  matchingIcons?: Array<{
    name: string
    category: string
    tags: string[]
  }>
  className?: string
}

export function IconPreview({
  iconName,
  description = "Icon",
  size = 72,
  color = "currentColor",
  variant = "stroke",
  strokeWidth = 2,
  componentCode = "",
  svgCode = "",
  category,
  tags = [],
  matchingIcons = [],
  className,
}: IconPreviewProps) {
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview")
  const [actualSvg, setActualSvg] = useState<string>("")
  const iconRef = useRef<HTMLDivElement>(null)

  // Extract SVG from the rendered icon component
  useEffect(() => {
    if (iconRef.current && iconName) {
      const svgElement = iconRef.current.querySelector("svg")
      if (svgElement) {
        // Clone the SVG and set proper attributes for download
        const clonedSvg = svgElement.cloneNode(true) as SVGElement
        clonedSvg.setAttribute("width", size.toString())
        clonedSvg.setAttribute("height", size.toString())
        clonedSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg")

        // Set the stroke color if it's currentColor
        if (color !== "currentColor") {
          clonedSvg.setAttribute("stroke", color)
        }

        setActualSvg(clonedSvg.outerHTML)
      }
    }
  }, [iconName, size, color, variant, strokeWidth])

  // Return early if no icon name
  if (!iconName) {
    return (
      <div className={cn("w-full max-w-md p-4 border rounded-lg bg-yellow-50", className)}>
        <div className="text-center text-gray-500">
          <div className="h-8 w-8 mx-auto mb-2 border rounded bg-gray-100" />
          <p className="font-medium">No icon data available</p> 
        </div>
      </div>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[iconName]

  const downloadSVG = () => {
    const svgToDownload = actualSvg || svgCode
    const blob = new Blob([svgToDownload], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${iconName.toLowerCase()}-icon.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`Downloaded ${iconName} SVG!`)
  }

  const downloadComponent = () => {
    const blob = new Blob([componentCode], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${iconName.toLowerCase()}-icon.tsx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`Downloaded ${iconName} component!`)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(componentCode)
    toast.success(`Copied ${iconName} component code to clipboard!`)
  }

  const copySVG = () => {
    const svgToCopy = actualSvg || svgCode
    navigator.clipboard.writeText(svgToCopy)
    toast.success(`Copied ${iconName} SVG to clipboard!`)
  }

  return (
    <div className={cn("w-full max-w-2xl", className)}>
      <div className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-lg font-semibold">{iconName}</div>
          <div className="flex gap-1">
            <Badge variant="secondary">{variant}</Badge>
            {category && <Badge variant="outline">{category}</Badge>}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="">
        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <Button
            variant={viewMode === "preview" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("preview")}
          >
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button variant={viewMode === "code" ? "default" : "outline"} size="sm" onClick={() => setViewMode("code")}>
            <Code className="h-4 w-4" />
            Code
          </Button>
        </div>

        {viewMode === "preview" ? (
          <div className="flex gap-3">
            {/* Icon Preview */}
            <div className="flex my-3 h-80 justify-center items-center w-auto aspect-square bg-muted/20 rounded-lg border-2 border-dotted p-8">
              <div ref={iconRef}>
                {IconComponent ? (
                  <IconComponent
                    size={size}
                    variant={variant}
                    color={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-200 hover:scale-110"
                  />
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-red-500 mb-2">Icon component not found</p>
                    <p className="text-xs text-gray-500">Searched for: {iconName}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Icon Info */}
            <div className="flex flex-col my-3 gap-3 text-sm">
              <div>
                <span className="font-medium">Size:</span> {size}px
              </div>
              <div>
                <span className="font-medium">Color:</span> {color}
              </div>
              <div>
                <span className="font-medium">Variant:</span> {variant}
              </div>
              <div>
                <span className="font-medium">Stroke Width:</span> {strokeWidth}
              </div>
              {tags.length > 0 && (
              <div className="w-full items-center flex gap-2 mb-3">
                <p className="text-sm font-medium">Tags:</p>
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            </div>

            {/* Tags */}
            

            {/* Similar Icons */}
            {matchingIcons.length > 1 && (
              <div>
                <p className="text-sm font-medium mb-2">Similar Icons:</p>
                <div className="flex flex-wrap gap-2">
                  {matchingIcons.slice(0, 4).map((icon) => (
                    <Badge key={icon.name} variant="outline" className="text-xs">
                      {icon.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Code View */
          <div className="space-y-4 mx-auto max-w-xl my-3">
            <div>
              <h3 className="text-sm font-medium mb-2">React Component:</h3>
              <div className="bg-muted  p-4 rounded-lg">
                <pre className="text-sm  overflow-x-auto">
                  <code>{componentCode}</code>
                </pre>
              </div>
            </div>

            {(actualSvg || svgCode) && (
              <div>
                <h3 className="text-sm font-medium mb-2">SVG Code:</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{actualSvg || svgCode}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={downloadComponent} variant="outline">
            <Download className="h-4 w-4 mr-1" />
            Download React
          </Button>
          <Button onClick={downloadSVG} variant="outline">
            <FileDown className="h-4 w-4 mr-1" />
            Download SVG
          </Button>
          <Button onClick={copyCode} variant="outline">
            <Copy className="h-4 w-4 mr-1" />
            Copy React
          </Button>
          <Button onClick={copySVG} variant="outline">
            <Copy className="h-4 w-4 mr-1" />
            Copy SVG
          </Button>
        </div>
      </div>
    </div>
  )
}
