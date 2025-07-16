"use client"
import { Input } from '@dalim/core/ui/input'
import { DownloadIcon, Trash2Icon, UploadIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, WandSparklesIcon, ZoomInIcon, ZoomOutIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon, Undo, CopyIcon, PlusIcon, ExpandIcon, ShuffleIcon, RotateCcwIcon } from 'lucide-react'
import { Slider } from '@dalim/core/ui/slider'
import { Tabs, TabsList, TabsTrigger } from '@dalim/core/ui/tabs'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
import { HexColorPicker } from 'react-colorful'
import { Popover, PopoverContent, PopoverTrigger } from '@dalim/core/ui/popover'
import { AppProps, RESOLUTION_PRESETS } from '@/src/lib/constants'
import { cn } from '@/src/lib/utils'
import { useMemo, useRef, useState } from 'react'
import { Textarea } from '@dalim/core/ui/textarea'
import { CanvasPreview } from './canvas-preview'
import { toast } from 'sonner'
import { Separator } from '@dalim/core/ui/separator'
import { Button } from '@dalim/core/ui/button'
import { DndContext, useDraggable, useSensor, useSensors, MouseSensor, TouchSensor, DragEndEvent } from '@dnd-kit/core'
import { PositionControl } from '@/src/components/ui/position-control'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@dalim/core/ui/dialog'
import { motion } from 'motion/react'
import { Label } from '@dalim/core/ui/label'
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

export default function DesktopApp({
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
    setActiveTab,
    generateNewPalette,
    downloadImage,
    isDownloading,
    previousCircles,
    setCircles,
    setPreviousCircles,
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
    setResolution,
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
    setTextPosition,
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

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setLogoImage(reader.result as string)
            }
            reader.readAsDataURL(file)
            setTextMode('image')
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

    const containerRef = useRef<HTMLDivElement>(null)
    const [zoom, setZoom] = useState(0.4)

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
        <main className="relative flex h-[950px] w-full items-center justify-center gap-2 p-2">
            <div
                aria-hidden="true"
                className="sr-only">
                {fontPreloadText}
            </div>
            <aside className="flex h-full w-full min-w-[200px] max-w-[240px] flex-col gap-1 overflow-hidden">
                <Tabs
                    value={activeTab}
                    onValueChange={(value) => setActiveTab(value as 'design' | 'canvas' | 'effects')}
                    className="flex w-full flex-col items-center">
                    <TabsList className="w-full">
                        {[{ id: 'design' }, { id: 'effects' }].map(({ id }) => (
                            <TabsTrigger
                                key={id}
                                value={id}
                                className="w-full"
                                disabled={!!backgroundImage && id === 'colors'}>
                                <span className="capitalize">{id}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
                <section className="no-scrollbar relative flex h-full w-full flex-col overflow-hidden">
                    <div className="no-scrollbar relative flex h-full flex-col justify-between gap-2 overflow-y-auto p-1">
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
                                <div className="flex w-full flex-col gap-3">
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
                                        <div className="flex items-center justify-center">
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
                                                <Label className="text-muted-foreground text-sm">Color</Label>
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
                                                <Label className="text-muted-foreground text-sm">Font</Label>
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
                                    {sizeMode === 'text' && (
                                        <div className="flex w-full flex-col gap-2">
                                            <Label className="text-muted-foreground text-sm">Decoration</Label>
                                            <div className="flex gap-1">
                                                <Button
                                                    onClick={() => setTextAlign('left')}
                                                    size={'icon'}
                                                    className={cn(textAlign === 'left' ? 'bg-primary' : 'bg-primary/20')}>
                                                    <AlignLeftIcon className="size-4" />
                                                </Button>
                                                <Button
                                                    size={'icon'}
                                                    onClick={() => setTextAlign('center')}
                                                    className={cn(textAlign === 'center' ? 'bg-primary' : 'bg-primary/20')}>
                                                    <AlignCenterIcon className="size-4" />
                                                </Button>
                                                <Button
                                                    size={'icon'}
                                                    onClick={() => setTextAlign('right')}
                                                    className={cn(textAlign === 'right' ? 'bg-primary' : 'bg-primary/20')}>
                                                    <AlignRightIcon className="size-4" />
                                                </Button>
                                                <Button
                                                    size={'icon'}
                                                    onClick={() => setIsItalic(!isItalic)}
                                                    className={cn(isItalic ? 'bg-primary' : 'bg-primary/20')}>
                                                    <ItalicIcon className="size-4" />
                                                </Button>
                                                <Button
                                                    size={'icon'}
                                                    onClick={() => setIsUnderline(!isUnderline)}
                                                    className={cn(isUnderline ? 'bg-primary' : 'bg-primary/20')}>
                                                    <UnderlineIcon className="mx-auto size-4" />
                                                </Button>
                                                <Button
                                                    size={'icon'}
                                                    onClick={() => setIsStrikethrough(!isStrikethrough)}
                                                    className={cn(isStrikethrough ? 'bg-primary' : 'bg-primary/20')}>
                                                    <StrikethroughIcon className="size-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex w-full flex-col gap-2">
                                        <div className="text-muted-foreground flex justify-between text-sm">
                                            <Label>Font Size</Label>
                                            <span>{fontSize}</span>
                                        </div>

                                        <Slider
                                            min={sizeMode === 'text' ? 0 : 10}
                                            max={sizeMode === 'text' ? 20 : 100}
                                            step={sizeMode === 'text' ? 0.1 : 1}
                                            value={[fontSize]}
                                            onValueChange={([value]) => setFontSize(value)}
                                        />
                                    </div>
                                    {sizeMode === 'text' && (
                                        <>
                                            <div className="flex w-full flex-col gap-2">
                                                <div className="text-muted-foreground flex justify-between text-sm">
                                                    <Label>Font Weight</Label>
                                                    <span>{fontWeight}</span>
                                                </div>

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
                                                <div className="text-muted-foreground flex justify-between text-sm">
                                                    <Label>Font Traking</Label>
                                                    <span>{letterSpacing}</span>
                                                </div>

                                                <Slider
                                                    min={-0.1}
                                                    max={0.1}
                                                    step={0.01}
                                                    value={[letterSpacing]}
                                                    onValueChange={([value]) => setLetterSpacing(value)}
                                                />
                                            </div>

                                            <div className="flex w-full flex-col gap-2">
                                                <div className="text-muted-foreground flex justify-between text-sm">
                                                    <Label>Font Height</Label>
                                                    <span>{lineHeight}</span>
                                                </div>

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
                                    <div className="flex w-full flex-col gap-2">
                                        <div className="text-muted-foreground flex justify-between text-sm">
                                            <Label>Font Opacity</Label>
                                            <span>{opacity}</span>
                                        </div>
                                        <Slider
                                            min={0}
                                            max={100}
                                            step={1}
                                            value={[opacity]}
                                            onValueChange={([value]) => setOpacity(value)}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'effects' && (
                            <motion.div
                                key={activeTab}
                                className="mt-2 flex flex-col gap-8"
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
                                    <div className="flex flex-col gap-2">
                                        <div className="text-muted-foreground flex justify-between text-sm">
                                            <Label>Blur</Label>
                                            <span>{blur}</span>
                                        </div>
                                        <Slider
                                            min={backgroundImage ? 0 : 400}
                                            max={isSafari ? 800 : 1200}
                                            step={20}
                                            value={[blur]}
                                            onValueChange={([value]) => setBlur(value)}
                                        />
                                    </div>
                                    {!isSafari && (
                                        <>
                                            <div className="flex flex-col gap-2">
                                                <div className="text-muted-foreground flex justify-between text-sm">
                                                    <Label> Noise</Label>
                                                    <span>{grainIntensity}</span>
                                                </div>
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
                                    <div className="flex flex-col gap-2">
                                        <div className="text-muted-foreground flex justify-between text-sm">
                                            <Label>Saturation</Label>
                                            <span>{saturation}</span>
                                        </div>
                                        <Slider
                                            min={0}
                                            max={200}
                                            step={1}
                                            value={[saturation]}
                                            onValueChange={([value]) => setSaturation(value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="text-muted-foreground flex justify-between text-sm">
                                            <Label>Contrast</Label>
                                            <span>{contrast}</span>
                                        </div>
                                        <Slider
                                            min={5}
                                            max={200}
                                            step={1}
                                            value={[contrast]}
                                            onValueChange={([value]) => setContrast(value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="text-muted-foreground flex justify-between text-sm">
                                            <Label>Brightness</Label>
                                            <span>{brightness}</span>
                                        </div>
                                        <Slider
                                            min={10}
                                            max={200}
                                            step={1}
                                            value={[brightness]}
                                            onValueChange={([value]) => setBrightness(value)}
                                        />
                                    </div>
                                    <Separator className="my-2" />
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-muted-foreground text-sm">Glow</Label>
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
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <div className="text-muted-foreground flex justify-between text-sm">
                                            <Label>Text Shadow</Label>
                                            <span>{textShadow.blur}</span>
                                        </div>
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
                                        <div className="text-muted-foreground flex justify-between text-sm">
                                            <Label>offset X</Label>
                                            <span>{textShadow.offsetX}</span>
                                        </div>
                                        <Slider
                                            min={-20}
                                            max={20}
                                            step={1}
                                            value={[textShadow.offsetX]}
                                            onValueChange={([value]) => setTextShadow((prev) => ({ ...prev, offsetX: value }))}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <div className="text-muted-foreground flex justify-between text-sm">
                                            <Label>offset Y</Label>
                                            <span>{textShadow.offsetY}</span>
                                        </div>
                                        <Slider
                                            min={-20}
                                            max={20}
                                            step={1}
                                            value={[textShadow.offsetY]}
                                            onValueChange={([value]) => setTextShadow((prev) => ({ ...prev, offsetY: value }))}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                    <div className="sticky bottom-0 z-10 flex w-full gap-1 border-t p-2">
                        <Button
                            className="flex w-full items-center"
                            onClick={downloadImage}
                            disabled={isDownloading}>
                            <DownloadIcon className="size-4" />
                            <span className="text-sm">Download</span>
                        </Button>

                        <Button
                            size={'icon'}
                            className="w-12"
                            onClick={copyImage}
                            disabled={isCopying}>
                            <CopyIcon className="size-4" />
                        </Button>
                    </div>
                </section>
            </aside>

            {/* preview section */}
            <section
                ref={containerRef}
                className="bg-card relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border">
                <div className="absolute bottom-4 left-0 right-0 z-10 flex flex-wrap items-center justify-center gap-1">
                    <Button
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
                            }, 2000)
                        }}
                        disabled={isGenerating}>
                        <WandSparklesIcon />
                        Generate
                    </Button>
                    <Button
                        onClick={() => {
                            generateNewPalette()
                            setIsGenerating(true)
                            setTimeout(() => {
                                setIsGenerating(false)
                            }, 2000)
                        }}
                        disabled={numCircles >= 10}>
                        <ShuffleIcon />
                        Shuffle
                    </Button>
                    <Button
                        size={'icon'}
                        onClick={() => setZoom((z) => Math.min(z + 0.1, 2))}>
                        <ZoomInIcon />
                    </Button>
                    <Button
                        size={'icon'}
                        onClick={() => setZoom((z) => Math.max(z - 0.1, 0.1))}>
                        <ZoomOutIcon />
                    </Button>
                    <Button
                        disabled={previousCircles.length === 0}
                        size={'icon'}
                        onClick={() => {
                            setBackgroundImage(null)
                            if (previousCircles.length > 0) {
                                setCircles(previousCircles)
                                setPreviousCircles([])
                            }
                        }}>
                        {backgroundImage ? <Trash2Icon className="size-5" /> : <Undo className="size-5" />}
                    </Button>
                </div>

                <DndContext
                    sensors={sensors}
                    onDragEnd={handleDragEnd}>
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl">
                        <DraggablePreview id="preview">
                            <div
                                className="relative cursor-grab overflow-hidden rounded-2xl active:cursor-grabbing"
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
                                    {isGenerating ? (
                                        <div className="bg-background absolute inset-0 z-50 flex items-center justify-center">
                                            <WandSparklesIcon className="text-primary size-16 animate-ping" />
                                        </div>
                                    ) : (
                                        <>
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
                                                            textWrap: 'nowrap',
                                                            textAlign: textAlign,
                                                        }}
                                                        className="ease-[cubic-bezier(0.45, 0.05, 0.55, 0.95)] transition-all duration-300">
                                                        {text}
                                                    </p>
                                                ) : (
                                                    logoImage && (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img
                                                            src={logoImage}
                                                            className="ease-[cubic-bezier(0.45, 0.05, 0.55, 0.95)] transition-all duration-300"
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
                                        </>
                                    )}
                                </div>
                            </div>
                        </DraggablePreview>
                    </div>
                </DndContext>
            </section>

            {/* right controls */}
            <aside className="flex h-full w-full min-w-[200px] max-w-[240px] flex-col gap-2 overflow-hidden">
                <div className="flex flex-col gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="flex w-full">
                                <div className="flex w-full items-center justify-between gap-2">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="border-primary-foreground min-h-4 w-full min-w-4 rounded border"
                                            style={{
                                                aspectRatio: `${resolution.width}/${resolution.height}`,
                                            }}
                                        />

                                        <div className="flex items-center gap-2">
                                            <p className="text-left text-sm tracking-tight">{RESOLUTION_PRESETS.find((preset) => preset.width === resolution.width && preset.height === resolution.height)?.name || 'Custom'}</p>
                                            <p className="text-muted-foreground text-left text-xs">
                                                {resolution.width}x{resolution.height}
                                            </p>
                                        </div>
                                    </div>

                                    <ExpandIcon className={`size-4 transition-all duration-300`} />
                                </div>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="border-primary/10 bg-secondary no-scrollbar h-[550px] w-full max-w-lg overflow-y-auto rounded-2xl border p-0">
                            <div className="border-primary/10 bg-secondary sticky top-0 flex items-center gap-2 border-b p-4">
                                <div className="relative flex w-full flex-col gap-1">
                                    <label className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-xs">W:</label>
                                    <Input
                                        className="pl-8"
                                        type="number"
                                        min={0}
                                        max={2560}
                                        defaultValue={resolution.width}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value)
                                            if (value > 2560) {
                                                toast.error('Maximum width is 2560px')
                                                return
                                            }
                                            e.target.value = value.toString()
                                        }}
                                        id="width-input"
                                    />
                                </div>
                                <div className="relative flex w-full flex-col gap-1">
                                    <label className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-xs">H:</label>
                                    <Input
                                        className="pl-8"
                                        type="number"
                                        min={0}
                                        max={2560}
                                        defaultValue={resolution.height}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value)
                                            if (value > 2560) {
                                                toast.error('Maximum height is 2560px')
                                                return
                                            }
                                            e.target.value = value.toString()
                                        }}
                                        id="height-input"
                                    />
                                </div>
                                <Button
                                    className="w-fit"
                                    onClick={() => {
                                        const width = parseInt((document.getElementById('width-input') as HTMLInputElement).value)
                                        const height = parseInt((document.getElementById('height-input') as HTMLInputElement).value)
                                        if (width > 2560 || height > 2560) {
                                            toast.error('Maximum dimensions are 2560px')
                                            return
                                        }
                                        setResolution({ width, height })
                                    }}>
                                    Apply
                                </Button>
                            </div>
                            <div className="flex flex-col gap-6 p-4">
                                {Array.from(new Set(RESOLUTION_PRESETS.map((preset) => preset.category))).map((category) => (
                                    <div
                                        key={category}
                                        className="flex flex-col gap-2">
                                        <p className="text-muted-foreground text-xs">{category}</p>
                                        <div className="grid grid-cols-3 gap-2">
                                            {RESOLUTION_PRESETS.filter((preset) => preset.category === category).map((preset) => (
                                                <div
                                                    key={preset.name}
                                                    onClick={() =>
                                                        setResolution({
                                                            width: preset.width,
                                                            height: preset.height,
                                                        })
                                                    }
                                                    className="bg-foreground/5 border-primary/10 hover:bg-foreground/10 flex cursor-pointer flex-col items-center justify-between gap-4 rounded-xl border p-2 transition-all duration-300">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <p className="text-left font-medium tracking-tight">{preset.name}</p>
                                                        <p className="text-muted-foreground text-xs">
                                                            ({preset.width}x{preset.height})
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="no-scrollbar flex h-full flex-col gap-4 overflow-y-auto p-1">
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
                            <span className="text-muted-foreground text-xs">or</span>
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
                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size={'icon'}
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
                                            size={'icon'}
                                            variant="ghost"
                                            className="p-0"
                                            onClick={resetPalette}>
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
                                                            style={{ backgroundColor: circle.color }}
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
                </div>

                <div className="flex w-full flex-col gap-2 rounded-2xl border p-4">
                    <PositionControl
                        value={textPosition}
                        onChange={setTextPosition}
                        width={resolution.width}
                        height={resolution.height}
                        className="max-h-[140px] max-w-[140px]"
                    />
                </div>
            </aside>

            <Dialog
                open={showGenerateConfirm}
                onOpenChange={setShowGenerateConfirm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Generate New Colors</DialogTitle>
                        <DialogDescription>Clicking generate will reset all the colors and create a fresh set of colors.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
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
