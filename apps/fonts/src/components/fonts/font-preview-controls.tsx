"use client"

import { Input } from "@dalim/core/ui/input"
import { Slider } from "@dalim/core/ui/slider"
import { Label } from "@dalim/core/ui/label"
import { Button } from "@dalim/core/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@dalim/core/ui/toggle-group"
import { Switch } from "@dalim/core/ui/switch"
import { useFontPreview } from "@/src/hooks/use-font-preview"
 
import { AlignCenter, RotateCw, AlignLeft, AlignRight } from "lucide-react"
import Link from "next/link"

export function MainFontPreviewControls() {
  const {
    previewText,
    setPreviewText,
    fontSize,
    setFontSize,
    textAlign,
    setTextAlign,
    letterSpacing,
    setLetterSpacing,
    showFontName,
    setShowFontName,
    reset,
  } = useFontPreview()

  return (
    <div className="bg-muted/40 rounded-lg p-4 space-y-4">
      {/* Preview Text Input */}
      <div className="space-y-2">
        <Input
          id="preview-text"
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          placeholder="Type to preview fonts..."
          className="bg-background"
        />
      </div>

      <div className="flex gap-3 flex-wrap justify-center items-center">
        <div className="flex gap-2 items-center">
          <Label className="whitespace-nowrap" htmlFor="font-size">
            Font Size: {fontSize}px
          </Label>
          <Slider
            className="w-40"
            id="font-size"
            min={12}
            max={128}
            step={1}
            value={[fontSize]}
            onValueChange={(value) => setFontSize(value[0] ?? fontSize)}
          />
        </div>

        {/* Letter Spacing Slider */}
        <div className="flex gap-2 items-center">
          <Label htmlFor="letter-spacing" className="whitespace-nowrap">
            Letter Spacing: {letterSpacing}px
          </Label>
          <Slider
            className="w-40"
            id="letter-spacing"
            min={-5}
            max={20}
            step={1}
            value={[letterSpacing]}
            onValueChange={(value) => setLetterSpacing(value[0] ?? letterSpacing)}
          />
        </div>

        {/* Show Font Name Switch */}
        <div className="flex items-center space-x-2">
          <Switch id="show-font-name" checked={showFontName} onCheckedChange={setShowFontName} />
          <Label htmlFor="show-font-name">Switch to Font Name</Label>
        </div>

        {/* Text Alignment Toggle Group */}
        <div className="space-y-2">
          <ToggleGroup
            type="single"
            value={textAlign}
            onValueChange={(val) => val && setTextAlign(val as "left" | "center" | "right")}
            className="w-full"
          >
            <ToggleGroupItem
              className="rounded-none bg-muted  shadow-none first:rounded-s-lg last:rounded-e-lg hover:bg-primary focus-visible:z-10 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              aria-label="Align Left"
              value="left"
            >
              <AlignLeft size={16} strokeWidth={2} aria-hidden="true" />
            </ToggleGroupItem>
            <ToggleGroupItem
              className="rounded-none bg-muted shadow-none first:rounded-s-lg last:rounded-e-lg hover:bg-primary focus-visible:z-10 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              aria-label="Align Center"
              value="center"
            >
              <AlignCenter size={16} strokeWidth={2} aria-hidden="true" />
            </ToggleGroupItem>

            <ToggleGroupItem
              className="rounded-none bg-muted shadow-none first:rounded-s-lg rounded-r-lg hover:bg-primary focus-visible:z-10 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              aria-label="Align Justify"
              value="right"
            >
              <AlignRight size={16} strokeWidth={2} aria-hidden="true" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Reset Button */}
        <div className="">
          <Button variant="outline" size={"icon"} onClick={reset}>
            <RotateCw className="" />
          </Button>
        </div>
      </div>
    </div>
  )
}
 
export function FontPreviewControls() {
  const {
    previewText,
    setPreviewText,
    fontSize,
    setFontSize,
    textAlign,
    setTextAlign,
    letterSpacing,
    setLetterSpacing,
    showFontName,
    setShowFontName,
    reset,
  } = useFontPreview()

  return (
    <div className="bg-muted/40 rounded-lg p-4 space-y-4">
      {/* Preview Text Input */}
      <div className="space-y-2">
        <Input
          id="preview-text"
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          placeholder="Type to preview fonts..."
          className="bg-background"
        />
      </div>

      <div className="flex gap-3 flex-wrap justify-center items-center">
        <div className="flex gap-2 items-center">
          <Label className="whitespace-nowrap" htmlFor="font-size">
            Font Size: {fontSize}px
          </Label>
          <Slider
            className="w-40"
            id="font-size"
            min={12}
            max={128}
            step={1}
            value={[fontSize]}
            onValueChange={(value) => setFontSize(value[0] ?? fontSize)}
          />
        </div>
        {/* Letter Spacing Slider */}
        <div className="flex gap-2 items-center">
          <Label htmlFor="letter-spacing" className="whitespace-nowrap">
            Letter Spacing: {letterSpacing}px
          </Label>
          <Slider
            className="w-40"
            id="letter-spacing"
            min={-5}
            max={20}
            step={1}
            value={[letterSpacing]}
            onValueChange={(value) => setLetterSpacing(value[0] ?? letterSpacing)}
          />
        </div>
        {/* Show Font Name Switch */}
        <div className="flex items-center space-x-2">
          <Switch id="show-font-name-controls" checked={showFontName} onCheckedChange={setShowFontName} />
          <Label htmlFor="show-font-name-controls">Switch to Font Name</Label>
        </div>
        {/* Text Alignment Toggle Group */}
        <div className="space-y-2">
          <ToggleGroup
            type="single"
            value={textAlign}
            onValueChange={(val) => val && setTextAlign(val as "left" | "center" | "right")}
            className="w-full"
          >
            <ToggleGroupItem
              className="rounded-none bg-muted  shadow-none first:rounded-s-lg last:rounded-e-lg hover:bg-primary focus-visible:z-10 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              aria-label="Align Left"
              value="left"
            >
              <AlignLeft size={16} strokeWidth={2} aria-hidden="true" />
            </ToggleGroupItem>
            <ToggleGroupItem
              className="rounded-none bg-muted shadow-none first:rounded-s-lg last:rounded-e-lg hover:bg-primary focus-visible:z-10 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              aria-label="Align Center"
              value="center"
            >
              <AlignCenter size={16} strokeWidth={2} aria-hidden="true" />
            </ToggleGroupItem>

            <ToggleGroupItem
              className="rounded-none bg-muted shadow-none first:rounded-s-lg rounded-r-lg hover:bg-primary focus-visible:z-10 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              aria-label="Align Justify"
              value="right"
            >
              <AlignRight size={16} strokeWidth={2} aria-hidden="true" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <Button variant="outline" size={"icon"} onClick={reset}>
          <RotateCw className="" />
        </Button>{" "}
        {/* Reset Button */}
        <div className="flex gap-3 items-center">
          <Link href="/fonts">
            <Button>View All Fonts</Button>
          </Link>
          <Link href="/fonts">
            <Button variant={"outline"}>Upload Your Fonts</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}