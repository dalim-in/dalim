import { Input } from '@dalim/core/ui/input'
import { DownloadIcon, Trash2Icon, UploadIcon, PaintbrushIcon, SparklesIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, Undo, WandSparklesIcon, ChevronRightIcon, ZoomInIcon, ZoomOutIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon, CopyIcon, CropIcon, PlusIcon, ExpandIcon, Move, RefreshCcwIcon, ShuffleIcon, RotateCcwIcon } from 'lucide-react'
import { Slider } from '@dalim/core/ui/slider'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
import { HexColorPicker } from 'react-colorful'
import { Tabs, TabsList, TabsTrigger } from '@dalim/core/ui/tabs'
import { Popover, PopoverContent, PopoverTrigger } from '@dalim/core/ui/popover'
import { AppProps, INITIAL_COLORS, RESOLUTION_PRESETS } from '@/src/lib/constants'
import { cn } from '@/src/lib/utils'
import { useState, useMemo, useRef, Suspense } from 'react'

import Image from 'next/image'
import { Textarea } from '@dalim/core/ui/textarea'
import { Separator } from '@dalim/core/ui/separator'
import { Button } from '@dalim/core/ui/button'
import { CanvasPreview } from './canvas-preview'
import { DndContext, useDraggable, useSensor, useSensors, MouseSensor, TouchSensor, DragEndEvent } from '@dnd-kit/core'
import { useGesture } from '@use-gesture/react'

import { motion } from 'motion/react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@dalim/core/ui/dialog'

function DraggablePreview({ children, id }: { children: React.ReactNode; id: string }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    })

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}>
            {children}
        </div>
    )
}

export default function MobileApp({
    blur,
    setBlur,
    backgroundColor,
    fontSize,
    fontWeight,
    letterSpacing,
    fontFamily,
    opacity,
    lineHeight,
    text,
    circles,
    textColor,
    generateNewPalette,
    downloadImage,
    isDownloading,
    previousCircles,
    setCircles,
    setPreviousCircles,
    setActiveTab,
    activeTab,
    setText,
    setFontFamily,
    setFontSize,
    setFontWeight,
    setLetterSpacing,
    setOpacity,
    setLineHeight,
    setBackgroundColor,
    setActiveColorPicker,
    handleColorChange,
    setActiveColorType,
    setActiveColor,
    updateColor,
    fonts,
    activeColorPicker,
    setTextColor,
    resolution,
    saturation,
    setSaturation,
    contrast,
    setContrast,
    brightness,
    setBrightness,
    backgroundImage,
    setBackgroundImage,
    isItalic,
    isUnderline,
    isStrikethrough,
    setIsItalic,
    setIsUnderline,
    setIsStrikethrough,
    numCircles,
    setNumCircles,
    colors,
    isSafari,
    textShadow,
    setTextShadow,
    grainIntensity,
    setGrainIntensity,
    isUploading,
    setIsUploading,
    textPosition,
    sizeMode,
    logoImage,
    setTextMode,
    setLogoImage,
    textAlign,
    setTextAlign,
    copyImage,
    isCopying,
    handlePaletteChange,
    resetPalette,
}: AppProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(0.2)
    const containerRef = useRef<HTMLDivElement>(null)

    const [isGenerating, setIsGenerating] = useState(false)
    const [showGenerateConfirm, setShowGenerateConfirm] = useState(false)

    const handleBackgroundImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setBackgroundImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    useGesture(
        {
            onPinch: ({ offset: [d], event }) => {
                event.preventDefault()
                const newZoom = Math.min(Math.max(0.1, d / 50), 2)
                setZoom(newZoom)
            },
            onDrag: ({ delta: [dx, dy] }) => {
                setPosition((prev) => ({
                    x: prev.x + dx,
                    y: prev.y + dy,
                }))
            },
        },
        {
            target: containerRef,
            eventOptions: { passive: false },
        }
    )

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setBackgroundImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const fontPreloadText = useMemo(() => {
        return fonts.map((font) => (
            <div
                key={font.name}
                style={{
                    fontFamily: font.name,
                    position: 'absolute',
                    visibility: 'hidden',
                    pointerEvents: 'none',
                    fontSize: '0px',
                }}
                aria-hidden="true">
                {text}
            </div>
        ))
    }, [fonts, text])

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 0,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        })
    )

    const handleDragEnd = (event: DragEndEvent) => {
        const { delta } = event
        if (delta) {
            setPosition((prev) => ({
                x: prev.x + delta.x,
                y: prev.y + delta.y,
            }))
        }
    }

    return (
        <main className="relative flex h-[100dvh] w-full flex-col items-center justify-center gap-2">
            <div
                aria-hidden="true"
                className="sr-only">
                {fontPreloadText}
            </div>
            <nav className="flex w-full items-center justify-between gap-2 px-4 py-4">
                <div className="flex items-center justify-between gap-2">
                    <div className="group flex items-center justify-between">
                        <button className="flex items-center gap-1">
                            <Image
                                src={''}
                                alt="logo"
                                className="size-10"
                                priority
                                loading="eager"
                            />
                            <ChevronRightIcon className="size-6" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        onClick={downloadImage}
                        disabled={isDownloading}>
                        <DownloadIcon className="size-4" />
                        <span className="text-xs tracking-tight">Download</span>
                    </Button>
                    <Button
                        onClick={copyImage}
                        disabled={isCopying}
                        className="w-fit">
                        <CopyIcon className="size-4" />
                    </Button>
                </div>
            </nav>

            {/* preview section */}
            <section className="relative flex h-full w-full touch-none flex-col items-center justify-center gap-4 overflow-hidden px-2">
                <DndContext
                    sensors={sensors}
                    onDragEnd={handleDragEnd}>
                    <div
                        className="border-primary/10 relative flex h-full w-full cursor-grab items-center justify-center overflow-hidden rounded-2xl border active:cursor-grabbing"
                        ref={containerRef}>
                        <DraggablePreview id="preview">
                            <div
                                className="relative overflow-hidden rounded-2xl"
                                style={{
                                    height: resolution.height * zoom,
                                    width: resolution.width * zoom,
                                    transform: `translate(${position.x}px, ${position.y}px)`,
                                }}>
                                <div
                                    id="wallpaper"
                                    style={{
                                        width: `${resolution.width}px`,
                                        height: `${resolution.height}px`,
                                        transform: `scale(${zoom})`,
                                        transformOrigin: 'top left',
                                        backfaceVisibility: 'hidden',
                                        WebkitBackfaceVisibility: 'hidden',
                                    }}>
                                    {isGenerating && (
                                        <div className="bg-secondary absolute inset-0 z-50 flex items-center justify-center">
                                            <WandSparklesIcon className="text-primary size-8 animate-ping" />
                                        </div>
                                    )}

                                    <CanvasPreview />

                                    <div className="absolute inset-0 z-40 flex items-center justify-center">
                                        {sizeMode === 'text' ? (
                                            <p
                                                style={{
                                                    fontSize: `${fontSize}em`,
                                                    fontWeight: fontWeight,
                                                    letterSpacing: `${letterSpacing}em`,
                                                    fontFamily: fontFamily,
                                                    opacity: opacity / 100,
                                                    lineHeight: lineHeight,
                                                    color: textColor,
                                                    fontStyle: isItalic ? 'italic' : 'normal',
                                                    textDecoration: `${isUnderline ? 'underline' : ''} ${isStrikethrough ? 'line-through' : ''}`.trim(),
                                                    textShadow: `${textShadow.offsetX}px ${textShadow.offsetY}px ${textShadow.blur}px ${textShadow.color}`,
                                                    transform: `translate(${textPosition.x}px, ${textPosition.y}px)`,
                                                    whiteSpace: 'pre-wrap',
                                                    textAlign: textAlign,
                                                }}
                                                className="ease-[cubic-bezier(0.45, 0.05, 0.55, 0.95)] transition-all duration-300">
                                                {text}
                                            </p>
                                        ) : (
                                            logoImage && (
                                                <Image
                                                    className="ease-[cubic-bezier(0.45, 0.05, 0.55, 0.95)] transition-all duration-300"
                                                    unoptimized
                                                    src={logoImage}
                                                    alt="Logo"
                                                    style={{
                                                        maxWidth: `${fontSize}%`,
                                                        maxHeight: `${fontSize}%`,
                                                        opacity: opacity / 100,
                                                        transform: `translate(${textPosition.x}px, ${textPosition.y}px)`,
                                                        filter: `drop-shadow(${textShadow.offsetX}px ${textShadow.offsetY}px ${textShadow.blur}px ${textShadow.color})`,
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </DraggablePreview>
                    </div>
                </DndContext>

                <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between gap-2 px-4 py-2">
                    <div className="flex items-center gap-2">
                        <Button
                            className="w-fit"
                            onClick={() => {
                                const hasSeenWarning = localStorage.getItem('generate-warning-seen')
                                if (!hasSeenWarning) {
                                    setShowGenerateConfirm(true)
                                    return
                                }
                                handlePaletteChange()
                                setBackgroundImage(null)
                                if (blur === 0) {
                                    setBlur(600)
                                }
                                setIsGenerating(true)
                                setTimeout(() => {
                                    setIsGenerating(false)
                                }, 1000)
                            }}
                            disabled={isGenerating}>
                            <WandSparklesIcon className="size-4" />
                            <span className="text-xs tracking-tight">Generate</span>
                        </Button>
                        <Button
                            className="w-fit"
                            onClick={() => {
                                generateNewPalette()
                                setIsGenerating(true)
                                setTimeout(() => {
                                    setIsGenerating(false)
                                }, 2000)
                            }}
                            disabled={numCircles >= 10}>
                            <ShuffleIcon className="size-4" />
                            <span className="text-xs tracking-tight">Shuffle</span>
                        </Button>
                        <Button
                            disabled={previousCircles.length === 0}
                            className="w-fit"
                            onClick={() => {
                                setBackgroundImage(null)
                                if (previousCircles.length > 0) {
                                    setCircles(previousCircles)
                                    setPreviousCircles([])
                                }
                            }}>
                            {backgroundImage ? <Trash2Icon className="size-4" /> : <Undo className="size-4" />}
                        </Button>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <Button
                            onClick={() => setZoom((z) => Math.min(z + 0.05, 2))}
                            className="w-fit">
                            <ZoomInIcon className="size-4" />
                        </Button>
                        <Button
                            onClick={() => setZoom((z) => Math.max(z - 0.05, 0.1))}
                            className="w-fit">
                            <ZoomOutIcon className="size-4" />
                        </Button>
                        <Button className="w-fit">
                            <Move className="size-4" />
                        </Button>
                    </div>
                </div>
            </section>

            <aside className="flex w-full flex-col gap-2">
                {/* controls */}
                <section className="px-2">
                    <div className="bg-secondary border-primary/10 flex max-h-[240px] min-h-[180px] w-full flex-col rounded-2xl border">
                        <div className="no-scrollbar relative flex h-full flex-col justify-between gap-2 overflow-y-auto p-4">
                            <Suspense fallback={<div>Loading...</div>}>
                                {activeTab === 'design' && (
                                    <motion.div
                                        key={activeTab}
                                        className="flex flex-col gap-8"
                                        initial={{ y: 10 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: -10 }}
                                        transition={{
                                            duration: 0.2,
                                            type: 'spring',
                                            damping: 10,
                                            stiffness: 100,
                                        }}>
                                        <div className="flex w-full flex-col gap-4">
                                            <div className="flex w-full flex-col gap-2">
                                                <Textarea
                                                    className={cn('resize-none whitespace-pre-wrap', sizeMode === 'image' && 'cursor-not-allowed opacity-50')}
                                                    value={text}
                                                    onChange={(e) => setText(e.target.value)}
                                                    placeholder="Enter text"
                                                    disabled={sizeMode === 'image'}
                                                />
                                            </div>

                                            <div className="relative">
                                                <div className="absolute inset-x-0 -top-3 flex items-center justify-center">
                                                    <span className="text-muted-foreground text-xs">or</span>
                                                </div>
                                                <div className="relative flex flex-col gap-2 pt-2">
                                                    <label className={`bg-foreground/5 hover:text-foreground/80 text-primary border-primary/10 flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-2 transition-all duration-300 ${isUploading ? 'cursor-not-allowed opacity-50' : ''}`}>
                                                        <Input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={async (e) => {
                                                                if (isUploading) return
                                                                setIsUploading(true)
                                                                try {
                                                                    await handleImageUpload(e)
                                                                } finally {
                                                                    setIsUploading(false)
                                                                    e.target.value = ''
                                                                }
                                                            }}
                                                            className="hidden"
                                                            disabled={isUploading}
                                                        />
                                                        {isUploading ? (
                                                            <span className="animate-pulse">Uploading...</span>
                                                        ) : (
                                                            <>
                                                                <UploadIcon className="size-4" />
                                                                <span className="text-xs tracking-tight">{logoImage ? 'Change Image' : 'Upload Image'}</span>
                                                            </>
                                                        )}
                                                    </label>

                                                    {logoImage && (
                                                        <Button
                                                            onClick={() => {
                                                                setLogoImage(null)
                                                                setTextMode('text')
                                                                setFontSize(10)
                                                            }}
                                                            variant="destructive">
                                                            <Trash2Icon className="size-4" />
                                                            <span className="ml-2 text-xs tracking-tight">Remove Image</span>
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>

                                            <Separator className="my-2" />

                                            {sizeMode === 'text' && (
                                                <>
                                                    <div className="flex w-full flex-col gap-2">
                                                        <label className="text-muted-foreground text-sm">Color</label>
                                                        <div className="relative flex w-full items-center gap-2">
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <span
                                                                        className="border-primary/10 absolute left-2 top-1/2 aspect-square h-6 w-6 -translate-y-1/2 cursor-pointer rounded-full border"
                                                                        style={{ backgroundColor: textColor }}
                                                                    />
                                                                </PopoverTrigger>
                                                                <PopoverContent
                                                                    className="w-auto p-3"
                                                                    align="start">
                                                                    <HexColorPicker
                                                                        color={activeColorPicker}
                                                                        onChange={(color) => {
                                                                            setActiveColorType('text')
                                                                            setActiveColorPicker(color)
                                                                            handleColorChange(color)
                                                                        }}
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                            <Input
                                                                className="pl-10"
                                                                type="text"
                                                                value={textColor.startsWith('#') ? textColor : `#${textColor}`}
                                                                placeholder="Color"
                                                                onChange={(e) => {
                                                                    const color = e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`
                                                                    setTextColor(color)
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex w-full flex-col gap-2">
                                                        <label className="text-muted-foreground text-sm">Font</label>
                                                        <Select
                                                            value={fontFamily}
                                                            onValueChange={setFontFamily}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select font" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    {fonts.map((font) => (
                                                                        <SelectItem
                                                                            key={font.name}
                                                                            value={font.name}>
                                                                            {font.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </>
                                            )}

                                            <Slider
                                                min={sizeMode === 'text' ? 0 : 10}
                                                max={sizeMode === 'text' ? 20 : 100}
                                                step={sizeMode === 'text' ? 0.1 : 1}
                                                value={[fontSize]}
                                                onValueChange={([value]) => setFontSize(value)}
                                            />
                                            {sizeMode === 'text' && (
                                                <>
                                                    <div className="flex w-full flex-col gap-2">
                                                        <Slider
                                                            min={100}
                                                            max={900}
                                                            step={100}
                                                            value={[fontWeight]}
                                                            onValueChange={([value]) => setFontWeight(value)}
                                                            disabled={!fonts.find((f) => f.name === fontFamily)?.variable}
                                                            className={cn(!fonts.find((f) => f.name === fontFamily)?.variable && 'cursor-not-allowed')}
                                                        />
                                                    </div>

                                                    <div className="flex w-full flex-col gap-2">
                                                        <Slider
                                                            min={-0.1}
                                                            max={0.1}
                                                            step={0.01}
                                                            value={[letterSpacing]}
                                                            onValueChange={([value]) => setLetterSpacing(value)}
                                                        />
                                                    </div>

                                                    <div className="flex w-full flex-col gap-2">
                                                        <Slider
                                                            min={0.5}
                                                            max={2}
                                                            step={0.1}
                                                            value={[lineHeight]}
                                                            onValueChange={([value]) => setLineHeight(value)}
                                                        />
                                                    </div>
                                                </>
                                            )}

                                            <Slider
                                                min={0}
                                                max={100}
                                                step={1}
                                                value={[opacity]}
                                                onValueChange={([value]) => setOpacity(value)}
                                            />

                                            {sizeMode === 'text' && (
                                                <div className="flex w-full flex-col gap-2">
                                                    <label className="text-muted-foreground text-sm">Decoration</label>
                                                    <div className="no-scrollbar flex items-center gap-2 overflow-x-auto rounded-xl">
                                                        <Button
                                                            onClick={() => setTextAlign('left')}
                                                            className={cn(textAlign === 'left' ? 'bg-primary/20' : 'bg-background/5')}>
                                                            <AlignLeftIcon className="size-4" />
                                                        </Button>
                                                        <Button
                                                            onClick={() => setTextAlign('center')}
                                                            className={cn(textAlign === 'center' ? 'bg-primary/20' : 'bg-background/5')}>
                                                            <AlignCenterIcon className="size-4" />
                                                        </Button>
                                                        <Button
                                                            onClick={() => setTextAlign('right')}
                                                            className={cn(textAlign === 'right' ? 'bg-primary/20' : 'bg-background/5')}>
                                                            <AlignRightIcon className="size-4" />
                                                        </Button>
                                                    </div>
                                                    <div className="no-scrollbar flex items-center gap-2 overflow-x-auto rounded-xl">
                                                        <Button
                                                            onClick={() => setIsItalic(!isItalic)}
                                                            className={cn(isItalic ? 'bg-primary/20' : 'bg-background/5')}>
                                                            <ItalicIcon className="size-4" />
                                                        </Button>
                                                        <Button
                                                            onClick={() => setIsUnderline(!isUnderline)}
                                                            className={cn(isUnderline ? 'bg-primary/20' : 'bg-background/5')}>
                                                            <UnderlineIcon className="mx-auto size-4" />
                                                        </Button>
                                                        <Button
                                                            onClick={() => setIsStrikethrough(!isStrikethrough)}
                                                            className={cn(isStrikethrough ? 'bg-primary/20' : 'bg-background/5')}>
                                                            <StrikethroughIcon className="size-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'effects' && (
                                    <motion.div
                                        key={activeTab}
                                        className="flex flex-col gap-8"
                                        initial={{ y: 10 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: -10 }}
                                        transition={{
                                            duration: 0.2,
                                            type: 'spring',
                                            damping: 10,
                                            stiffness: 100,
                                        }}>
                                        <div className="flex flex-col gap-4">
                                            <Slider
                                                min={backgroundImage ? 0 : 400}
                                                max={isSafari ? 800 : 1200}
                                                step={20}
                                                value={[blur]}
                                                onValueChange={([value]) => setBlur(value)}
                                            />

                                            {!isSafari && (
                                                <>
                                                    <div className="flex flex-col gap-4">
                                                        <Slider
                                                            min={0}
                                                            max={100}
                                                            step={1}
                                                            value={[grainIntensity]}
                                                            onValueChange={([value]) => {
                                                                setGrainIntensity(value)
                                                            }}
                                                        />
                                                    </div>
                                                </>
                                            )}

                                            <Separator className="my-2" />

                                            <Slider
                                                min={0}
                                                max={200}
                                                step={1}
                                                value={[saturation]}
                                                onValueChange={([value]) => setSaturation(value)}
                                            />
                                            <Slider
                                                min={5}
                                                max={200}
                                                step={1}
                                                value={[contrast]}
                                                onValueChange={([value]) => setContrast(value)}
                                            />
                                            <Slider
                                                min={10}
                                                max={200}
                                                step={1}
                                                value={[brightness]}
                                                onValueChange={([value]) => setBrightness(value)}
                                            />

                                            <Separator className="my-2" />

                                            <label className="text-muted-foreground text-sm">Glow</label>
                                            <div className="relative flex w-full items-center gap-2">
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <span
                                                            className="border-primary/10 absolute left-2 top-1/2 aspect-square h-6 w-6 -translate-y-1/2 cursor-pointer rounded-full border"
                                                            style={{ backgroundColor: textShadow.color }}
                                                        />
                                                    </PopoverTrigger>
                                                    <PopoverContent
                                                        className="w-auto p-3"
                                                        align="start">
                                                        <HexColorPicker
                                                            color={textShadow.color}
                                                            onChange={(color) => setTextShadow((prev) => ({ ...prev, color }))}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <Input
                                                    className="pl-10"
                                                    type="text"
                                                    value={textShadow.color.startsWith('#') ? textShadow.color : `#${textShadow.color}`}
                                                    placeholder="Glow Color"
                                                    onChange={(e) => {
                                                        const color = e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`
                                                        setTextShadow((prev) => ({
                                                            ...prev,
                                                            color: color,
                                                        }))
                                                    }}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Slider
                                                    min={0}
                                                    max={100}
                                                    step={1}
                                                    value={[textShadow.blur]}
                                                    onValueChange={([value]) =>
                                                        setTextShadow((prev) => ({
                                                            ...prev,
                                                            blur: value, // Store as percentage
                                                        }))
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Slider
                                                    min={-20}
                                                    max={20}
                                                    step={1}
                                                    value={[textShadow.offsetX]}
                                                    onValueChange={([value]) =>
                                                        setTextShadow((prev) => ({
                                                            ...prev,
                                                            offsetX: value,
                                                        }))
                                                    }
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Slider
                                                    min={-20}
                                                    max={20}
                                                    step={1}
                                                    value={[textShadow.offsetY]}
                                                    onValueChange={([value]) =>
                                                        setTextShadow((prev) => ({
                                                            ...prev,
                                                            offsetY: value,
                                                        }))
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'canvas' && (
                                    <motion.div
                                        key={activeTab}
                                        className="flex flex-col gap-8"
                                        initial={{ y: 10 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: -10 }}
                                        transition={{
                                            duration: 0.2,
                                            type: 'spring',
                                            damping: 10,
                                            stiffness: 100,
                                        }}>
                                        <div className="flex flex-col gap-2">
                                            <Button className="flex w-full">
                                                <div className="flex w-full items-center justify-between gap-2">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="border-primary min-h-4 w-full min-w-4 rounded border"
                                                            style={{
                                                                aspectRatio: `${resolution.width}/${resolution.height}`,
                                                            }}
                                                        />

                                                        <div className="flex flex-col gap-1">
                                                            <p className="text-left text-sm tracking-tight">{RESOLUTION_PRESETS.find((preset) => preset.width === resolution.width && preset.height === resolution.height)?.name || 'Custom'}</p>
                                                            <p className="text-muted-foreground text-left text-xs">
                                                                {resolution.width}x{resolution.height}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <ExpandIcon className={`size-4 transition-all duration-300`} />
                                                </div>
                                            </Button>
                                        </div>
                                        <Separator className="my-2" />
                                        <div className="flex flex-col gap-4">
                                            <div className="flex w-full flex-col gap-2">
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-muted-foreground text-sm">Background</label>
                                                    <div className="relative flex items-center gap-2">
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <span
                                                                    className="border-primary/10 absolute left-2 top-1/2 aspect-square h-6 w-6 -translate-y-1/2 cursor-pointer rounded-full border"
                                                                    style={{ backgroundColor: backgroundColor }}
                                                                />
                                                            </PopoverTrigger>
                                                            <PopoverContent
                                                                className="w-auto p-3"
                                                                align="start">
                                                                <HexColorPicker
                                                                    color={activeColorPicker}
                                                                    onChange={(color) => {
                                                                        setActiveColorType('background')
                                                                        setActiveColorPicker(color)
                                                                        setBackgroundColor(color)
                                                                    }}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <Input
                                                            type="text"
                                                            value={backgroundColor.startsWith('#') ? backgroundColor : `#${backgroundColor}`}
                                                            placeholder="Background Color"
                                                            onChange={(e) => {
                                                                const color = e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`
                                                                setBackgroundColor(color)
                                                            }}
                                                            className={cn('resize-none pl-10', backgroundImage && 'cursor-not-allowed opacity-50')}
                                                            disabled={!!backgroundImage}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <span className="bg-secondary text-muted-foreground px-2 text-xs">or</span>
                                            </div>
                                            <div className="relative">
                                                <label className={`bg-foreground/5 hover:text-foreground/80 text-primary border-primary/10 flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-2 transition-all duration-300 ${isUploading ? 'cursor-not-allowed opacity-50' : ''}`}>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        key={backgroundImage ? 'has-image' : 'no-image'}
                                                        onChange={async (e) => {
                                                            if (isUploading) return
                                                            setIsUploading(true)
                                                            try {
                                                                await handleBackgroundImageUpload(e)
                                                            } finally {
                                                                setIsUploading(false)
                                                                e.target.value = ''
                                                            }
                                                        }}
                                                        className="hidden"
                                                        disabled={isUploading}
                                                    />
                                                    {isUploading ? (
                                                        <span className="animate-pulse">Uploading...</span>
                                                    ) : (
                                                        <>
                                                            <UploadIcon className="size-4" />
                                                            <span className="text-xs tracking-tight">{backgroundImage ? 'Change Image' : 'Upload Image'}</span>
                                                        </>
                                                    )}
                                                </label>

                                                {backgroundImage && (
                                                    <Button
                                                        onClick={() => {
                                                            setBackgroundImage(null)
                                                            if (blur === 0) {
                                                                setBlur(600)
                                                            }
                                                        }}
                                                        className="mt-2 w-full rounded-xl"
                                                        variant="destructive">
                                                        <Trash2Icon className="size-4" />
                                                        <span className="text-xs tracking-tight">Remove Image</span>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>

                                        {!backgroundImage && (
                                            <>
                                                <Separator className="my-2" />
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <label className="text-muted-foreground text-sm">Palette</label>
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                className="p-0"
                                                                onClick={() => {
                                                                    generateNewPalette()
                                                                }}
                                                                disabled={numCircles >= 10}>
                                                                <RefreshCcwIcon className="size-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                className="p-0"
                                                                onClick={() => {
                                                                    const newCircle = {
                                                                        color: colors[circles.length % colors.length],
                                                                        cx: Math.random() * 100,
                                                                        cy: Math.random() * 100,
                                                                    }
                                                                    setCircles([...circles, newCircle])
                                                                    setNumCircles(circles.length + 1)
                                                                }}
                                                                disabled={numCircles >= 10}>
                                                                <PlusIcon className="size-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                className="p-0"
                                                                onClick={resetPalette}
                                                                disabled={colors === INITIAL_COLORS}>
                                                                <RotateCcwIcon className="size-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    {circles.map((circle, i) => (
                                                        <div
                                                            key={i}
                                                            className="relative flex w-full items-start gap-2">
                                                            <div
                                                                className="flex w-full items-center gap-2"
                                                                onClick={() => {
                                                                    setActiveColorType('gradient')
                                                                    setActiveColor(i)
                                                                    setActiveColorPicker(circle.color)
                                                                }}>
                                                                <div className="relative flex w-full items-center gap-2">
                                                                    <Popover>
                                                                        <PopoverTrigger asChild>
                                                                            <span
                                                                                className="border-primary/10 absolute left-2 top-1/2 aspect-square h-6 w-6 -translate-y-1/2 cursor-pointer rounded-full border"
                                                                                style={{
                                                                                    backgroundColor: circle.color,
                                                                                }}
                                                                            />
                                                                        </PopoverTrigger>
                                                                        <PopoverContent
                                                                            className="w-auto p-3"
                                                                            align="start">
                                                                            <HexColorPicker
                                                                                color={activeColorPicker}
                                                                                onChange={(color) => {
                                                                                    setActiveColorPicker(color)
                                                                                    handleColorChange(color)
                                                                                }}
                                                                            />
                                                                        </PopoverContent>
                                                                    </Popover>

                                                                    <Input
                                                                        type="text"
                                                                        value={circle.color.startsWith('#') ? circle.color : `#${circle.color}`}
                                                                        className="w-full pl-10 pr-4"
                                                                        placeholder="Color"
                                                                        onChange={(e) => {
                                                                            const color = e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`
                                                                            updateColor(color, i)
                                                                        }}
                                                                    />
                                                                    <button
                                                                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                                                                        onClick={() => {
                                                                            setCircles(circles.filter((_, index) => index !== i))
                                                                            setNumCircles(circles.length - 1)
                                                                        }}>
                                                                        <Trash2Icon className="text-muted-foreground hover:text-destructive size-4 transition-all duration-300" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                )}
                            </Suspense>
                        </div>
                    </div>
                </section>

                <Tabs
                    value={activeTab}
                    onValueChange={(value) => setActiveTab(value as 'design' | 'canvas' | 'effects')}
                    className="border-primary/10 bg-secondary flex w-full items-center border-t">
                    <TabsList className="flex w-full items-center gap-1">
                        <div className="flex min-w-full items-center gap-2 p-2 pb-8">
                            {[
                                { id: 'design', icon: PaintbrushIcon },
                                { id: 'effects', icon: SparklesIcon },
                                { id: 'canvas', icon: CropIcon },
                            ].map(({ id, icon: Icon }) => (
                                <TabsTrigger
                                    key={id}
                                    value={id}
                                    className={cn('relative flex w-full flex-1 cursor-pointer flex-col items-center justify-center rounded-2xl px-4 py-4 transition-all duration-300', activeTab === id && 'bg-primary/10 border-primary/50 border')}>
                                    <Icon className="size-4" />
                                </TabsTrigger>
                            ))}
                        </div>
                    </TabsList>
                </Tabs>
            </aside>
            <Dialog
                open={showGenerateConfirm}
                onOpenChange={setShowGenerateConfirm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Generate New Colors</DialogTitle>
                        <DialogDescription>Clicking generate will reset all the colors and create a fresh set of colors.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-col gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => setShowGenerateConfirm(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                localStorage.setItem('generate-warning-seen', 'true')
                                setShowGenerateConfirm(false)
                                handlePaletteChange()
                                setBackgroundImage(null)
                                if (blur === 0) {
                                    setBlur(600)
                                }
                                setIsGenerating(true)
                                setTimeout(() => {
                                    setIsGenerating(false)
                                }, 2000)
                            }}>
                            Generate
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </main>
    )
}
