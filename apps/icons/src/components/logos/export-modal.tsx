"use client"

import type React from "react"

import { useState } from "react"
import { Download, Copy, Check, ImageIcon, Code, Film, FileImage } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dalim/core/ui/dialog"
import { Button } from "@dalim/core/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@dalim/core/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@dalim/core/ui/card"
import { Label } from "@dalim/core/ui/label"
import { Input } from "@dalim/core/ui/input"
import { Slider } from "@dalim/core/ui/slider"
import { Switch } from "@dalim/core/ui/switch"
import { Badge } from "@dalim/core/ui/badge"
import { Separator } from "@dalim/core/ui/separator"
import type { ExportOptions, ExportFormat } from "dalim-icons"
import { exportService } from "@/src/lib/export-service"


interface ExportModalProps {
  iconElement: HTMLElement | null
  iconName: string
  isAnimated: boolean
  children: React.ReactNode
}

const staticFormats = [
  { value: "png", label: "PNG", description: "High quality raster image", icon: FileImage },
  { value: "svg", label: "SVG", description: "Vector format, scalable", icon: ImageIcon },
  { value: "jpg", label: "JPG", description: "Compressed raster image", icon: FileImage },
  { value: "webp", label: "WebP", description: "Modern web format", icon: FileImage },
  { value: "react", label: "React", description: "React component code", icon: Code },
]

const animatedFormats = [
  { value: "gif", label: "GIF", description: "Animated image format", icon: Film },
  { value: "mp4", label: "MP4", description: "Video format", icon: Film },
  { value: "webm", label: "WebM", description: "Web video format", icon: Film },
  { value: "png-sequence", label: "PNG Sequence", description: "Individual frame images", icon: FileImage },
  { value: "react-animated", label: "React Animated", description: "Animated React component", icon: Code },
]

const presetSizes = [
  { label: "16px", value: 16 },
  { label: "24px", value: 24 },
  { label: "32px", value: 32 },
  { label: "48px", value: 48 },
  { label: "64px", value: 64 },
  { label: "128px", value: 128 },
  { label: "256px", value: 256 },
  { label: "512px", value: 512 },
]

export function ExportModal({ iconElement, iconName, isAnimated, children }: ExportModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("png")
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: "png",
    size: 64,
    quality: 0.9,
    backgroundColor: "#ffffff",
    transparent: true,
    duration: 2000,
    fps: 30,
  })
  const [isExporting, setIsExporting] = useState(false)
  const [copied, setCopied] = useState(false)

  const formats = isAnimated ? [...staticFormats, ...animatedFormats] : staticFormats

  const handleExport = async () => {
    if (!iconElement) return

    setIsExporting(true)
    try {
      const result = await exportService.exportIcon(iconElement, {
        ...exportOptions,
        format: selectedFormat,
      })

      if (result.blob) {
        // Download file
        const url = URL.createObjectURL(result.blob)
        const a = document.createElement("a")
        a.href = url
        a.download = result.filename || `${iconName}.${selectedFormat}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }

      if (result.code) {
        // Copy code to clipboard
        await navigator.clipboard.writeText(result.code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (error) {
      console.error("Export failed:", error)
      alert(`Export failed: ${error.message}`)
    } finally {
      setIsExporting(false)
    }
  }

  const handleCopyCode = async () => {
    if (!iconElement) return

    try {
      const result = await exportService.exportIcon(iconElement, {
        ...exportOptions,
        format: selectedFormat,
      })

      if (result.code) {
        await navigator.clipboard.writeText(result.code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (error) {
      console.error("Copy failed:", error)
      alert(`Copy failed: ${error.message}`)
    }
  }

  const isCodeFormat = selectedFormat === "react" || selectedFormat === "react-animated"

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Export {iconName}</DialogTitle>
          <DialogDescription>Choose your preferred format and customize export settings</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="format" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="format">Format & Options</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="format" className="space-y-6">
            {/* Format Selection */}
            <div>
              <Label className="text-base font-semibold">Export Format</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                {formats.map((format) => {
                  const ImageIconComponent = format.icon
                  return (
                    <Card
                      key={format.value}
                      className={`cursor-pointer transition-all ${
                        selectedFormat === format.value ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => {
                        setSelectedFormat(format.value as ExportFormat)
                        setExportOptions((prev) => ({ ...prev, format: format.value as ExportFormat }))
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <ImageIconComponent className="h-5 w-5" />
                          <div>
                            <p className="font-medium">{format.label}</p>
                            <p className="text-xs text-muted-foreground">{format.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            <Separator />

            {/* Quick Size Presets */}
            <div>
              <Label className="text-base font-semibold">Size Presets</Label>
              <div className="flex flex-wrap gap-2 mt-3">
                {presetSizes.map((preset) => (
                  <Button
                    key={preset.value}
                    variant={exportOptions.size === preset.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setExportOptions((prev) => ({ ...prev, size: preset.value }))}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Basic Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium">Custom Size: {exportOptions.size}px</Label>
                <Slider
                  value={[exportOptions.size]}
                  onValueChange={([value]) => setExportOptions((prev) => ({ ...prev, size: value }))}
                  max={1024}
                  min={16}
                  step={1}
                  className="mt-2"
                />
              </div>

              {!isCodeFormat && (
                <div className="flex items-center justify-between">
                  <Label htmlFor="transparent" className="text-sm font-medium">
                    Transparent Background
                  </Label>
                  <Switch
                    id="transparent"
                    checked={exportOptions.transparent}
                    onCheckedChange={(checked) => setExportOptions((prev) => ({ ...prev, transparent: checked }))}
                  />
                </div>
              )}
            </div>

            {/* Background Color (if not transparent) */}
            {!exportOptions.transparent && !isCodeFormat && (
              <div>
                <Label className="text-sm font-medium">Background Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="color"
                    value={exportOptions.backgroundColor}
                    onChange={(e) => setExportOptions((prev) => ({ ...prev, backgroundColor: e.target.value }))}
                    className="w-8 h-8 rounded border"
                  />
                  <Input
                    value={exportOptions.backgroundColor}
                    onChange={(e) => setExportOptions((prev) => ({ ...prev, backgroundColor: e.target.value }))}
                    className="flex-1"
                  />
                </div>
              </div>
            )}

            {/* Animation Options */}
            {isAnimated && (selectedFormat === "gif" || selectedFormat === "mp4" || selectedFormat === "webm") && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium">Duration: {exportOptions.duration}ms</Label>
                  <Slider
                    value={[exportOptions.duration || 2000]}
                    onValueChange={([value]) => setExportOptions((prev) => ({ ...prev, duration: value }))}
                    max={10000}
                    min={500}
                    step={100}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">FPS: {exportOptions.fps}</Label>
                  <Slider
                    value={[exportOptions.fps || 30]}
                    onValueChange={([value]) => setExportOptions((prev) => ({ ...prev, fps: value }))}
                    max={60}
                    min={10}
                    step={5}
                    className="mt-2"
                  />
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            {/* Quality Settings */}
            {(selectedFormat === "jpg" || selectedFormat === "webp") && (
              <div>
                <Label className="text-sm font-medium">
                  Quality: {Math.round((exportOptions.quality || 0.9) * 100)}%
                </Label>
                <Slider
                  value={[exportOptions.quality || 0.9]}
                  onValueChange={([value]) => setExportOptions((prev) => ({ ...prev, quality: value }))}
                  max={1}
                  min={0.1}
                  step={0.1}
                  className="mt-2"
                />
              </div>
            )}

            {/* Export Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Export Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Format:</span>
                  <Badge variant="secondary">{selectedFormat.toUpperCase()}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Size:</span>
                  <span>
                    {exportOptions.size}×{exportOptions.size}px
                  </span>
                </div>
                {isAnimated && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>Duration:</span>
                      <span>{exportOptions.duration}ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Frame Rate:</span>
                      <span>{exportOptions.fps} FPS</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-sm">
                  <span>Estimated Size:</span>
                  <span>~{Math.round((exportOptions.size * exportOptions.size * 4) / 1024)}KB</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 pt-4 border-t">
          {isCodeFormat ? (
            <Button onClick={handleCopyCode} disabled={isExporting}>
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? "Copied!" : "Copy Code"}
            </Button>
          ) : (
            <Button onClick={handleExport} disabled={isExporting}>
              <Download className="mr-2 h-4 w-4" />
              {isExporting ? "Exporting..." : "Download"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}