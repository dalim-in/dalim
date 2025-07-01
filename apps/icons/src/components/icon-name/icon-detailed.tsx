/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { JSX, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Copy, Check, Download, RotateCw, Share2, Film, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button, buttonVariants } from '@dalim/core/ui/button'
import { Badge } from '@dalim/core/ui/badge'
import { ToggleGroup, ToggleGroupItem } from '@dalim/core/ui/toggle-group'
import { ShareButton } from '@dalim/core/components/common/share-button'
import { AdBanner } from '@dalim/core/components/common/adbanner'
import { Slider } from '@dalim/core/ui/slider'
import { Switch } from '@dalim/core/ui/switch'
import { GridPattern } from '@dalim/core/components/backgrunds/grid'
import { Label } from '@dalim/core/ui/label'
import { Input } from '@dalim/core/ui/input'
import { Dialog, DialogContent, DialogTitle } from '@dalim/core/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@dalim/core/ui/dropdown-menu'
import { toast } from '@dalim/core/hooks/use-toast'
import { getAllIcons, getIconByName } from 'dalim-icons'
import * as Icons from 'dalim-icons'
import { createRoot } from 'react-dom/client'
import GIF from 'gif.js'
import { CodeBlock } from '@dalim/core/components/common/code-block'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dalim/core/ui/tabs'
import { CopyButton } from '@dalim/core/components/common/copy-button'
import Link from 'next/link'
import { Features } from './features'
import { IconCategory } from '../icons/icon-categories'

export function IconDetailed() {
    const router = useRouter()
    const params = useParams()
    const iconName = params.name as string
    const [highlightedCode] = useState<JSX.Element | null>(null)

    // Icon customization controls
    const [size, setSize] = useState([92])
    const [variant, setVariant] = useState<'stroke' | 'solid' | 'duotone' | 'twotone' | 'bulk'>('stroke')
    const [color, setColor] = useState('currentColor')
    const [strokeWidth, setStrokeWidth] = useState([2])
    const [animation, setAnimation] = useState(false)
    const [loop, setLoop] = useState(false)
    const [copied, setCopied] = useState(false)

    const [strokeLinecap, setStrokeLinecap] = useState<'butt' | 'round' | 'square'>('round')
    const [strokeLinejoin, setStrokeLinejoin] = useState<'round' | 'miter' | 'bevel'>('round')

    // Export states
    const [showAnimationExport, setShowAnimationExport] = useState(false)
    const [exportProgress, setExportProgress] = useState(0)
    const [exportFormat, setExportFormat] = useState<'gif' | 'mp4'>('gif')
    const [gifQuality, setGifQuality] = useState(10)
    const [gifFrameRate, setGifFrameRate] = useState(30)
    const [selectedCategory, setSelectedCategory] = useState('all')

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const iconRef = useRef<HTMLDivElement>(null)

    const allIcons = getAllIcons()
    const currentIndex = allIcons.findIndex((icon) => icon.name.toLowerCase() === iconName.toLowerCase())

    function goToPrevious() {
        if (currentIndex > 0) {
            const prevIcon = allIcons[currentIndex - 1]
            router.push(`/${prevIcon.name}`)
        }
    }

    function goToNext() {
        if (currentIndex < allIcons.length - 1) {
            const nextIcon = allIcons[currentIndex + 1]
            router.push(`/${nextIcon.name}`)
        }
    }

    // Get icon metadata
    const iconData = getIconByName(iconName.charAt(0).toUpperCase() + iconName.slice(1))

    if (!iconData) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="mb-4 text-2xl font-bold">Icon not found</h1>
                <Button
                    onClick={() => router.push('/')}
                    variant="outline">
                    <ArrowLeft className="h-4 w-4" /> Back to Icons
                </Button>
            </div>
        )
    }

    const handleReset = () => {
        setSize([92])
        setColor('currentColor')
        setStrokeLinecap('round')
        setStrokeLinejoin('round')
        setStrokeWidth([2])
        setAnimation(false)
        setLoop(false)
    }

    // Generate SVG string for the selected icon
    const generateSVG = async (iconSize: number = size[0]): Promise<string> => {
        const Icon = (Icons as Record<string, any>)[iconData.name]
        if (!Icon) return ''

        const tempContainer = document.createElement('div')
        tempContainer.style.position = 'absolute'
        tempContainer.style.left = '-9999px'
        tempContainer.style.top = '-9999px'
        document.body.appendChild(tempContainer)

        try {
            const root = createRoot(tempContainer)

            return new Promise((resolve) => {
                root.render(
                    <Icon
                        size={iconSize}
                        variant={variant}
                        color={color}
                        strokeLinecap={strokeLinecap}
                        strokeLinejoin={strokeLinejoin}
                        strokeWidth={strokeWidth[0]}
                        animation={false}
                        loop={false}
                    />
                )

                setTimeout(() => {
                    const svgElement = tempContainer.querySelector('svg')
                    if (svgElement) {
                        const clonedSvg = svgElement.cloneNode(true) as SVGElement
                        const svgString = clonedSvg.outerHTML
                        root.unmount()
                        document.body.removeChild(tempContainer)
                        resolve(svgString)
                    } else {
                        const fallbackSvg = `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <text x="12" y="12" textAnchor="middle" fill="${color}" fontSize="8">${iconData.name}</text>
                        </svg>`
                        root.unmount()
                        document.body.removeChild(tempContainer)
                        resolve(fallbackSvg)
                    }
                }, 100)
            })
        } catch (error) {
            document.body.removeChild(tempContainer)
            console.error('Error generating SVG:', error)
            return `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="12" y="12" textAnchor="middle" fill="${color}" fontSize="8">${iconData.name}</text>
            </svg>`
        }
    }

    // Convert SVG to Canvas for PNG/JPG export
    const svgToCanvas = async (format: 'png' | 'jpg', iconSize = 512): Promise<string> => {
        const svgString = await generateSVG(iconSize)

        return new Promise<string>((resolve, reject) => {
            const canvas = canvasRef.current || document.createElement('canvas')
            const ctx = canvas.getContext('2d')!

            canvas.width = iconSize
            canvas.height = iconSize

            if (format === 'jpg') {
                ctx.fillStyle = 'white'
                ctx.fillRect(0, 0, iconSize, iconSize)
            }

            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.onload = () => {
                ctx.drawImage(img, 0, 0, iconSize, iconSize)
                const dataUrl = canvas.toDataURL(`image/${format}`, 0.9)
                resolve(dataUrl)
            }
            img.onerror = () => {
                reject(new Error(`Failed to load ${format} image`))
            }

            const blob = new Blob([svgString], { type: 'image/svg+xml' })
            const url = URL.createObjectURL(blob)
            img.src = url
        })
    }

    // Create animated GIF
    const createGIF = async (iconSize = 256, duration = 3000): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            try {
                const container = document.createElement('div')
                container.style.position = 'absolute'
                container.style.left = '-9999px'
                container.style.top = '-9999px'
                document.body.appendChild(container)

                const canvas = document.createElement('canvas')
                canvas.width = iconSize
                canvas.height = iconSize
                const ctx = canvas.getContext('2d')!

                const gif = new GIF({
                    workers: 2,
                    quality: gifQuality,
                    width: iconSize,
                    height: iconSize,
                })

                const root = createRoot(container)
                const Icon = (Icons as Record<string, any>)[iconData.name]

                root.render(
                    <Icon
                        size={iconSize}
                        variant={variant}
                        color={color}
                        strokeLinecap={strokeLinecap}
                        strokeLinejoin={strokeLinejoin}
                        strokeWidth={strokeWidth[0]}
                        animation={true}
                        loop={true}
                    />
                )

                setTimeout(() => {
                    const svgElement = container.querySelector('svg')
                    if (!svgElement) {
                        root.unmount()
                        document.body.removeChild(container)
                        reject(new Error('Failed to render icon'))
                        return
                    }

                    const totalFrames = Math.floor((gifFrameRate * duration) / 1000)
                    const frameDelay = 1000 / gifFrameRate
                    let framesProcessed = 0

                    const captureFrame = () => {
                        const svgData = new XMLSerializer().serializeToString(svgElement)
                        const img = new Image()
                        img.onload = () => {
                            ctx.clearRect(0, 0, iconSize, iconSize)
                            ctx.drawImage(img, 0, 0, iconSize, iconSize)
                            gif.addFrame(canvas, { copy: true, delay: frameDelay })
                            framesProcessed++

                            setExportProgress(Math.floor((framesProcessed / totalFrames) * 100))

                            if (framesProcessed < totalFrames) {
                                setTimeout(captureFrame, 10)
                            } else {
                                gif.on('finished', (blob) => {
                                    root.unmount()
                                    document.body.removeChild(container)
                                    setExportProgress(100)
                                    resolve(blob)
                                })
                                gif.render()
                            }
                        }

                        const blob = new Blob([svgData], { type: 'image/svg+xml' })
                        const url = URL.createObjectURL(blob)
                        img.src = url
                    }

                    captureFrame()
                }, 100)
            } catch (error) {
                setExportProgress(0)
                reject(error)
            }
        })
    }

    // Download functions
    const downloadSVG = async () => {
        try {
            const svgContent = await generateSVG()
            const blob = new Blob([svgContent], { type: 'image/svg+xml' })
            const url = URL.createObjectURL(blob)

            const a = document.createElement('a')
            a.href = url
            a.download = `${iconData.name}.svg`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)

            toast({
                title: 'Downloaded!',
                description: `${iconData.name}.svg has been downloaded.`,
            })
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to download SVG file.',
                variant: 'destructive',
            })
        }
    }

    const downloadPNG = async () => {
        try {
            const dataUrl = await svgToCanvas('png', 512)
            const a = document.createElement('a')
            a.href = dataUrl
            a.download = `${iconData.name}.png`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)

            toast({
                title: 'Downloaded!',
                description: `${iconData.name}.png has been downloaded.`,
            })
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to download PNG file.',
                variant: 'destructive',
            })
        }
    }

    const downloadJPG = async () => {
        try {
            const dataUrl = await svgToCanvas('jpg', 512)
            const a = document.createElement('a')
            a.href = dataUrl
            a.download = `${iconData.name}.jpg`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)

            toast({
                title: 'Downloaded!',
                description: `${iconData.name}.jpg has been downloaded.`,
            })
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to download JPG file.',
                variant: 'destructive',
            })
        }
    }

    const downloadGIF = async () => {
        try {
            setExportProgress(0)
            setShowAnimationExport(true)
            setExportFormat('gif')

            const wasAnimated = animation
            const wasLooped = loop
            setAnimation(true)
            setLoop(true)

            const gifBlob = await createGIF(256, 3000)

            if (!wasAnimated) setAnimation(false)
            if (!wasLooped) setLoop(false)

            const url = URL.createObjectURL(gifBlob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${iconData.name}-animated.gif`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)

            toast({
                title: 'Downloaded!',
                description: `${iconData.name}-animated.gif has been downloaded.`,
            })

            setShowAnimationExport(false)
        } catch (error) {
            console.error('GIF export error:', error)
            toast({
                title: 'Error',
                description: 'Failed to create animated GIF.',
                variant: 'destructive',
            })
            setShowAnimationExport(false)
        }
    }

    // Copy functions
    const copySVG = async () => {
        try {
            const svgContent = await generateSVG()
            await navigator.clipboard.writeText(svgContent)
            toast({
                title: 'Copied!',
                description: 'SVG code copied to clipboard.',
            })
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to copy SVG code.',
                variant: 'destructive',
            })
        }
    }

    const copyPNG = async () => {
        try {
            const dataUrl = await svgToCanvas('png', 512)
            const response = await fetch(dataUrl)
            const blob = await response.blob()
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])

            toast({
                title: 'Copied!',
                description: 'PNG image copied to clipboard.',
            })
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to copy PNG image.',
                variant: 'destructive',
            })
        }
    }

    const handleCopyCode = async () => {
        const isDefaultSize = size[0] === 48
        const isDefaultStroke = strokeWidth[0] === 1.5
        const isDefaultColor = color === 'currentColor'

        const importCode = `import { ${iconData.name} } from 'dalim-icons'

<${iconData.name}${!isDefaultSize ? `\n  size={${size[0]}}` : ''}${!isDefaultColor ? `\n  color="${color}"` : ''}${!isDefaultStroke ? `\n  strokeWidth={${strokeWidth[0]}}` : ''}${animation ? '\n  animation' : ''}${loop ? '\n  loop' : ''}${variant !== 'stroke' ? `\n  variant="${variant}"` : ''} 
/>`

        await navigator.clipboard.writeText(importCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)

        toast({
            title: 'Copied!',
            description: 'React code copied to clipboard.',
        })
    }

    const isDefaultSize = size[0] === 92
    const isDefaultStroke = strokeWidth[0] === 2
    const isDefaultColor = color === 'currentColor'

    return (
        <div className="mt-6">
            <Dialog
                open={showAnimationExport}
                onOpenChange={setShowAnimationExport}>
                <DialogContent className="sm:max-w-md">
                    <DialogTitle>Exporting {exportFormat === 'gif' ? 'GIF' : 'Video'}</DialogTitle>
                    <div className="space-y-4">
                        <div className="flex items-center justify-center p-4">
                            <div className="flex h-32 w-32 items-center justify-center">
                                {(() => {
                                    const Icon = (Icons as Record<string, any>)[iconData.name]
                                    return Icon ? (
                                        <Icon
                                            size={128}
                                            variant={variant}
                                            color={color}
                                            strokeLinecap={strokeLinecap}
                                            strokeLinejoin={strokeLinejoin}
                                            strokeWidth={strokeWidth[0]}
                                            animation={true}
                                            loop={true}
                                        />
                                    ) : null
                                })()}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Export Progress</Label>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                <div
                                    className="h-full bg-purple-600 transition-all duration-300"
                                    style={{ width: `${exportProgress}%` }}
                                />
                            </div>
                            <p className="text-center text-sm">{exportProgress}%</p>
                        </div>

                        <p className="text-muted-foreground text-center text-sm">{exportFormat === 'gif' ? 'Creating animated GIF. This may take a moment...' : 'Recording animation. This may take a moment...'}</p>
                    </div>
                </DialogContent>
            </Dialog>
            <div className="">
                <div className="grid gap-3 md:grid-cols-[20%_60%_20%] lg:grid-cols-[15%_70%_15%] xl:grid-cols-[12%_76%_12%]">
                    <div className="-mt-6 border-r pr-6">
                        <div className="my-6 flex items-center gap-2">
                            <Button
                                onClick={() => router.push('/')}
                                variant="outline"
                                className="">
                                <ArrowLeft className="h-4 w-4" />
                                All Icons
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleReset}>
                                <RotateCw className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="mb-6">
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium">Size: {size[0]}px</Label>
                                    <Slider
                                        value={size}
                                        onValueChange={setSize}
                                        max={150}
                                        min={18}
                                        step={4}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Color</Label>
                                    <div className="mt-2 flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                            className="absolute h-8 w-8 rounded-full border p-3"
                                        />
                                        <div
                                            className="h-8 w-8 rounded-full border"
                                            style={{ backgroundColor: color }}
                                        />
                                        <Input
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                            className="flex-1"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium">Stroke Width: {strokeWidth[0]}</Label>
                                    <Slider
                                        value={strokeWidth}
                                        onValueChange={setStrokeWidth}
                                        max={3}
                                        min={0.5}
                                        step={0.1}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label className="text-primary/60 text-xs font-medium">Stroke Linecap</Label>
                                    <ToggleGroup
                                        type="single"
                                        value={strokeLinecap}
                                        onValueChange={(value) => {
                                            if (value === 'butt' || value === 'round' || value === 'square') {
                                                setStrokeLinecap(value)
                                            }
                                        }}
                                        className="mt-1 rounded-lg border">
                                        <ToggleGroupItem
                                            value="butt"
                                            className="border-r capitalize">
                                            butt
                                        </ToggleGroupItem>

                                        <ToggleGroupItem
                                            value="round"
                                            className="capitalize">
                                            round
                                        </ToggleGroupItem>
                                        <ToggleGroupItem
                                            value="square"
                                            className="border-l capitalize">
                                            square
                                        </ToggleGroupItem>
                                    </ToggleGroup>
                                </div>

                                <div>
                                    <Label className="text-primary/60 text-xs font-medium">Stroke Linejoin</Label>
                                    <ToggleGroup
                                        type="single"
                                        value={strokeLinejoin}
                                        onValueChange={(value) => {
                                            if (value === 'round' || value === 'miter' || value === 'bevel') {
                                                setStrokeLinejoin(value)
                                            }
                                        }}
                                        className="mt-1 rounded-lg border">
                                        <ToggleGroupItem
                                            value="round"
                                            className="border-r capitalize">
                                            round
                                        </ToggleGroupItem>
                                        <ToggleGroupItem
                                            value="miter"
                                            className="capitalize">
                                            miter
                                        </ToggleGroupItem>
                                        <ToggleGroupItem
                                            value="bevel"
                                            className="border-l capitalize">
                                            bevel
                                        </ToggleGroupItem>
                                    </ToggleGroup>
                                </div>

                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="animation-detail"
                                        className="text-sm font-medium">
                                        Animation
                                    </Label>
                                    <Switch
                                        id="animation-detail"
                                        checked={animation}
                                        onCheckedChange={setAnimation}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="loop"
                                        className="text-sm font-medium">
                                        Loop
                                    </Label>
                                    <Switch
                                        id="loop"
                                        checked={loop}
                                        onCheckedChange={setLoop}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium">GIF Quality: {gifQuality}</Label>
                                    <Slider
                                        value={[gifQuality]}
                                        onValueChange={(value) => setGifQuality(value[0])}
                                        max={30}
                                        min={1}
                                        step={1}
                                        className="mt-2"
                                    />
                                    <p className="text-muted-foreground mt-1 text-xs">Lower values = better quality, larger file</p>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium">Frame Rate: {gifFrameRate} fps</Label>
                                    <Slider
                                        value={[gifFrameRate]}
                                        onValueChange={(value) => setGifFrameRate(value[0])}
                                        max={60}
                                        min={10}
                                        step={5}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relative pb-10 before:absolute before:-inset-x-6 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>
                    </div>

                    <div className="h-[950px] overflow-auto">
                        <div className="px-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-1 text-3xl font-semibold">
                                        {iconData.name}
                                        <CopyButton componentSource={iconData.name} />
                                    </div>
                                    <div className="mt-2 opacity-60">{iconData.description}</div>
                                    <div className="mt-3 flex items-center gap-1">
                                        <Link href={`/`}>
                                            <Badge
                                                variant="outline"
                                                className="hover:bg-primary hover:text-primary-foreground text-xs">
                                                {iconData.category}
                                            </Badge>
                                        </Link>
                                        <div>
                                            <div className="flex flex-wrap gap-1">
                                                {iconData.tags.map((tag) => (
                                                    <Link
                                                        key={tag}
                                                        href={`/`}>
                                                        <Badge
                                                            key={tag}
                                                            variant="outline"
                                                            className="hover:bg-primary hover:text-primary-foreground text-xs">
                                                            {tag}
                                                        </Badge>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-1 flex items-center justify-between gap-2">
                                    <Button
                                        size={'icon'}
                                        variant={'outline'}
                                        onClick={goToPrevious}
                                        disabled={currentIndex <= 0}>
                                        <ChevronLeft />
                                    </Button>
                                    <Button
                                        size={'icon'}
                                        variant={'outline'}
                                        onClick={goToNext}
                                        disabled={currentIndex >= allIcons.length - 1}>
                                        <ChevronRight />
                                    </Button>
                                </div>
                            </div>

                            <div className="relative pb-6 before:absolute before:-inset-x-6 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>

                            <div className="mt-6 grid gap-3 pr-3">
                                <div className="grid gap-3 md:grid-cols-[38%_62%]">
                                    <div>
                                        <div className="relative flex aspect-square h-auto w-full items-center justify-center rounded-xl border shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] transition-all dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]">
                                            <GridPattern
                                                width={5}
                                                height={5}
                                                className="w-full rounded-xl opacity-30"
                                            />
                                            <div ref={iconRef}>
                                                {(() => {
                                                    const Icon = (Icons as Record<string, any>)[iconData.name]
                                                    return Icon ? (
                                                        <Icon
                                                            size={size[0] * 2} // Display larger in preview
                                                            variant={variant}
                                                            color={color}
                                                            strokeLinecap={strokeLinecap}
                                                            strokeLinejoin={strokeLinejoin}
                                                            strokeWidth={strokeWidth[0]}
                                                            animation={animation}
                                                            loop={loop}
                                                        />
                                                    ) : (
                                                        <div className="flex h-24 w-24 items-center justify-center text-gray-400">Icon not found</div>
                                                    )
                                                })()}
                                            </div>
                                        </div>
                                        <div className="mt-3 flex h-auto flex-wrap justify-center gap-3">
                                            {iconData.variants.map((v) => (
                                                <div
                                                    className="text-center"
                                                    key={v}>
                                                    <div
                                                        key={v}
                                                        className={`flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-xl ${variant === v ? 'ring-brand border ring-2' : ''}`}
                                                        onClick={() => setVariant(v as any)}>
                                                        <div className="flex h-16 w-16 items-center justify-center rounded-xl border">
                                                            {(() => {
                                                                const Icon = (Icons as Record<string, any>)[iconData.name]
                                                                return Icon ? (
                                                                    <Icon
                                                                        size={24}
                                                                        variant={v as any}
                                                                        color={color}
                                                                        strokeWidth={strokeWidth[0]}
                                                                    />
                                                                ) : (
                                                                    <div className="flex h-10 w-10 items-center justify-center text-xs text-gray-400">?</div>
                                                                )
                                                            })()}
                                                        </div>
                                                    </div>
                                                    <p className="mt-2 text-xs font-medium capitalize">{v}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex flex-wrap gap-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className={buttonVariants({ size: 'sm' })}>
                                                    <Download className="h-4 w-4" />
                                                    Download
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start">
                                                    <DropdownMenuItem
                                                        onClick={downloadSVG}
                                                        className="flex cursor-pointer justify-between">
                                                        SVG <Download className="h-4 w-4" />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={downloadPNG}
                                                        className="flex cursor-pointer justify-between">
                                                        PNG <Download className="h-4 w-4" />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={downloadJPG}
                                                        className="flex cursor-pointer justify-between">
                                                        JPG <Download className="h-4 w-4" />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={downloadGIF}
                                                        className="flex cursor-pointer justify-between">
                                                        Animated GIF <Film className="h-4 w-4" />
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                                                    <Copy className="h-4 w-4" />
                                                    Copy
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start">
                                                    <DropdownMenuItem
                                                        onClick={copySVG}
                                                        className="flex cursor-pointer justify-between">
                                                        SVG <Copy className="h-4 w-4" />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={copyPNG}
                                                        className="flex cursor-pointer justify-between">
                                                        PNG <Copy className="h-4 w-4" />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(`<${iconName} />`)
                                                            toast({
                                                                title: 'Copied!',
                                                                description: 'TSX code copied to clipboard.',
                                                            })
                                                        }}
                                                        className="flex cursor-pointer justify-between">
                                                        TSX <Copy className="h-4 w-4" />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={handleCopyCode}
                                                        className="flex cursor-pointer justify-between">
                                                        React Code <Copy className="h-4 w-4" />
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>

                                            <ShareButton
                                                url={`/${iconData.name}`}
                                                title={iconData.name}
                                                description={iconData.name || `Check out this ${iconData.name.toLowerCase().replace('_', ' ')} graphic!`}
                                                image={iconData.name}
                                                type="graphic"
                                                variant="outline"
                                                size="sm"
                                            />
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleReset}>
                                                <RotateCw className="h-4 w-4" />
                                                Reset
                                            </Button>
                                        </div>
                                        <Tabs
                                            defaultValue="react"
                                            className="w-full">
                                            <TabsList>
                                                <TabsTrigger value="react">React</TabsTrigger>
                                                <TabsTrigger value="vue">Vue</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="react">
                                                <div className="relative overflow-x-auto">
                                                    <CodeBlock
                                                        code={`import { ${iconData.name} } from 'dalim-icons';
    
const App = () => {
  return (
    <${iconData.name}  ${!isDefaultSize ? `\n      size={${size[0]}}` : ''}${!isDefaultColor ? `\n      color="${color}"` : ''}${!isDefaultStroke ? `\n      strokeWidth={${strokeWidth[0]}}` : ''}${animation ? '\n      animation' : ''}${loop ? '\n      loop' : ''}
    />
  );
}

export default App;`}
                                                        lang="tsx"
                                                        preHighlighted={highlightedCode}
                                                    />

                                                    <Button
                                                        size="icon"
                                                        variant={'ghost'}
                                                        className="absolute right-2 top-2 z-10 text-white"
                                                        onClick={handleCopyCode}>
                                                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                    </Button>
                                                </div>
                                            </TabsContent>
                                            <TabsContent value="vue">
                                                <div className="relative overflow-x-auto">
                                                    <CodeBlock
                                                        code={`Coming Soon!`}
                                                        lang="tsx"
                                                        preHighlighted={highlightedCode}
                                                    />

                                                    <Button
                                                        size="icon"
                                                        className="absolute right-2 top-2 z-10"
                                                        onClick={handleCopyCode}>
                                                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                    </Button>
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative pb-6 before:absolute before:-inset-x-3 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>
                        <div className="my-3 overflow-hidden px-3">
                            <div className="flex justify-between gap-3">
                                {iconData.author && (
                                    <div>
                                        <Label className="text-muted-foreground text-xs">Author</Label>
                                        <p className="font-medium">{iconData.author}</p>
                                    </div>
                                )}

                                {iconData.created && (
                                    <div>
                                        <Label className="text-muted-foreground text-xs">Created</Label>
                                        <p className="font-medium">{iconData.created}</p>
                                    </div>
                                )}

                                <div>
                                    <Label className="text-muted-foreground text-xs">Variants</Label>
                                    <p className="font-medium">{iconData.variants.length} available</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative before:absolute before:-inset-x-3 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>
                        <h1 className="py-6 text-center text-xl font-semibold">More Icons Like This</h1>
                        <div className="relative before:absolute before:-inset-x-3 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>
                        <Features />
                        <div className="px-3">
                            <AdBanner
                                dataAdFormat="auto"
                                dataFullWidthResponsive={true}
                                dataAdSlot="2443172762"
                            />
                        </div>
                    </div>
                    <div className="-mt-6">
                        <IconCategory
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
