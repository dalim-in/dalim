/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Input } from '@dalim/core/ui/input'
import { Slider } from '@dalim/core/ui/slider'
import { Switch } from '@dalim/core/ui/switch'
import { Label } from '@dalim/core/ui/label'
import { CodeIconDetails, IconDetails } from './icon-details'
import { Button, buttonVariants } from '@dalim/core/ui/button'
import { Copy, Download, RotateCw, Code, Expand, Film, Play, ChevronDown } from 'lucide-react'
import { ShareButton } from '@dalim/core/components/common/share-button'
import { CodeBlock } from '@dalim/core/components/common/code-block'
import Link from 'next/link'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@dalim/core/ui/dialog'
import { type JSX, useState, useRef } from 'react'
import { CopyButton } from '@dalim/core/components/common/copy-button'
import { CliCommands } from '@dalim/core/components/common/cli-commands'
import { Badge } from '@dalim/core/ui/badge'
import { getAllIcons } from 'dalim-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@dalim/core/ui/dropdown-menu'
import * as Icons from 'dalim-icons'
import { toast } from '@dalim/core/hooks/use-toast'
import { createRoot } from 'react-dom/client'

// Import GIF.js for GIF creation
// Note: You'll need to install this package: npm install gif.js
import GIF from 'gif.js'
import React from 'react'
import { ToggleGroup, ToggleGroupItem } from '@dalim/core/ui/toggle-group'

export function ControlIcon({
    iconSize,
    iconVariant,
    setIconSize,
    iconColor,
    setIconColor,
    strokeWidth,
    setStrokeWidth,
    strokeLinecap,
    setStrokeLinecap,
    strokeLinejoin,
    setStrokeLinejoin,
    animation,
    setAnimation,
    loop,
    setLoop,
    selectedIcon,
}: {
    iconSize: number[]
    iconVariant: 'stroke' | 'solid' | 'duotone' | 'twotone' | 'bulk'
    setIconSize: (val: number[]) => void
    iconColor: string
    setIconColor: (val: string) => void
    strokeLinecap: 'butt' | 'round' | 'square'
    setStrokeLinecap: (val: 'butt' | 'round' | 'square') => void
    strokeLinejoin: 'round' | 'miter' | 'bevel'
    setStrokeLinejoin: (val: 'round' | 'miter' | 'bevel') => void
    strokeWidth: number[]
    setStrokeWidth: (val: number[]) => void
    animation: boolean
    setAnimation: (val: boolean) => void
    loop: boolean
    setLoop: (val: boolean) => void
    selectedIcon: string
}) {
    const [highlightedCode] = useState<JSX.Element | null>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const animationContainerRef = useRef<HTMLDivElement>(null)
    const [showAnimationExport, setShowAnimationExport] = useState(false)
    const [gifQuality, setGifQuality] = useState(10) // 1-30, lower is better quality but larger file
    const [gifFrameRate, setGifFrameRate] = useState(30) // Frames per second
    const [exportProgress, setExportProgress] = useState(0)
    const [exportFormat, setExportFormat] = useState<'gif' | 'mp4'>('gif')

    const handleReset = () => {
        setIconSize([24])
        setIconColor('currentColor')
        setStrokeWidth([1])
        setStrokeLinecap('round')
        setStrokeLinejoin('round')
        setAnimation(false)
        setLoop(false)
    }

    // Generate SVG string for the selected icon
    const generateSVG = async (size: number = iconSize[0]): Promise<string> => {
        if (!selectedIcon) return ''

        const Icon = (Icons as Record<string, any>)[selectedIcon]
        if (!Icon) return ''

        // Create a temporary container
        const tempContainer = document.createElement('div')
        tempContainer.style.position = 'absolute'
        tempContainer.style.left = '-9999px'
        tempContainer.style.top = '-9999px'
        document.body.appendChild(tempContainer)

        try {
            // Create root and render the icon
            const root = createRoot(tempContainer)

            return new Promise((resolve) => {
                root.render(
                    <Icon
                        size={size}
                        variant={iconVariant}
                        color={iconColor}
                        strokeWidth={strokeWidth[0]}
                        strokeLinecap={strokeLinecap}
                        strokeLinejoin={strokeLinejoin}
                        animation={false} // Disable animation for static export
                        loop={false}
                    />
                )

                // Wait for render to complete
                setTimeout(() => {
                    const svgElement = tempContainer.querySelector('svg')
                    if (svgElement) {
                        // Clone and clean up the SVG
                        const clonedSvg = svgElement.cloneNode(true) as SVGElement

                        // Remove any motion-specific attributes
                        const removeMotionAttributes = (element: Element) => {
                            const motionAttrs = ['data-framer-motion', 'style']
                            motionAttrs.forEach((attr) => {
                                if (element.hasAttribute(attr)) {
                                    element.removeAttribute(attr)
                                }
                            })

                            // Recursively clean child elements
                            Array.from(element.children).forEach(removeMotionAttributes)
                        }

                        removeMotionAttributes(clonedSvg)

                        // Get the outer HTML
                        const svgString = clonedSvg.outerHTML

                        // Cleanup
                        root.unmount()
                        document.body.removeChild(tempContainer)

                        resolve(svgString)
                    } else {
                        // Fallback: create a basic SVG structure
                        const fallbackSvg = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- ${selectedIcon} icon -->
              <text x="12" y="12" textAnchor="middle" fill="${iconColor}" fontSize="8">${selectedIcon}</text>
            </svg>`

                        root.unmount()
                        document.body.removeChild(tempContainer)
                        resolve(fallbackSvg)
                    }
                }, 100)
            })
        } catch (error) {
            // Cleanup on error
            document.body.removeChild(tempContainer)
            console.error('Error generating SVG:', error)

            // Return fallback SVG
            return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- ${selectedIcon} icon -->
        <text x="12" y="12" textAnchor="middle" fill="${iconColor}" fontSize="8">${selectedIcon}</text>
      </svg>`
        }
    }

    // Convert SVG to Canvas for PNG/JPG export
    const svgToCanvas = async (format: 'png' | 'jpg', size: number = iconSize[0]): Promise<string> => {
        const svgString = await generateSVG(size)

        return new Promise<string>((resolve, reject) => {
            const canvas = canvasRef.current || document.createElement('canvas')
            const ctx = canvas.getContext('2d')!

            canvas.width = size
            canvas.height = size

            // Clear canvas with white background for JPG
            if (format === 'jpg') {
                ctx.fillStyle = 'white'
                ctx.fillRect(0, 0, size, size)
            }

            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.onload = () => {
                ctx.drawImage(img, 0, 0, size, size)
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

    // Create an animated GIF from the icon
    const createGIF = async (size: number = 128, duration: number = 2000): Promise<Blob> => {
        if (!selectedIcon) throw new Error('No icon selected')

        return new Promise((resolve, reject) => {
            try {
                // Create a container for the animated icon
                const container = document.createElement('div')
                container.style.position = 'absolute'
                container.style.left = '-9999px'
                container.style.top = '-9999px'
                document.body.appendChild(container)

                // Create a canvas for capturing frames
                const canvas = document.createElement('canvas')
                canvas.width = size
                canvas.height = size
                const ctx = canvas.getContext('2d')!

                // Create GIF encoder
                const gif = new GIF({
                    workers: 2,
                    quality: gifQuality,
                    width: size,
                    height: size,
                    workerScript: '/gif.worker.js', // You'll need to host this file
                })

                // Render the icon with animation
                const root = createRoot(container)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const Icon = (Icons as Record<string, any>)[selectedIcon]

                root.render(
                    <Icon
                        size={size}
                        variant={iconVariant}
                        color={iconColor}
                        strokeWidth={strokeWidth[0]}
                        animation={true}
                        loop={true}
                    />
                )

                // Wait for the component to render
                setTimeout(() => {
                    const svgElement = container.querySelector('svg')
                    if (!svgElement) {
                        root.unmount()
                        document.body.removeChild(container)
                        reject(new Error('Failed to render icon'))
                        return
                    }

                    // Calculate frames based on duration and frame rate
                    const totalFrames = Math.floor((gifFrameRate * duration) / 1000)
                    const frameDelay = 1000 / gifFrameRate
                    let framesProcessed = 0

                    // Function to capture a frame
                    const captureFrame = () => {
                        // Draw SVG to canvas
                        const svgData = new XMLSerializer().serializeToString(svgElement)
                        const img = new Image()
                        img.onload = () => {
                            // Clear canvas
                            ctx.clearRect(0, 0, size, size)

                            // Draw image to canvas
                            ctx.drawImage(img, 0, 0, size, size)

                            // Add frame to GIF
                            gif.addFrame(canvas, { copy: true, delay: frameDelay })
                            framesProcessed++

                            // Update progress
                            setExportProgress(Math.floor((framesProcessed / totalFrames) * 100))

                            if (framesProcessed < totalFrames) {
                                // Capture next frame after a delay
                                setTimeout(captureFrame, 10) // Small delay to allow animation to progress
                            } else {
                                // Finish GIF creation
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

                    // Start capturing frames
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
        if (!selectedIcon) return

        try {
            const svgContent = await generateSVG()
            const blob = new Blob([svgContent], { type: 'image/svg+xml' })
            const url = URL.createObjectURL(blob)

            const a = document.createElement('a')
            a.href = url
            a.download = `${selectedIcon}.svg`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)

            toast({
                title: 'Downloaded!',
                description: `${selectedIcon}.svg has been downloaded.`,
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
        if (!selectedIcon) return

        try {
            const dataUrl = await svgToCanvas('png', 512)

            const a = document.createElement('a')
            a.href = dataUrl
            a.download = `${selectedIcon}.png`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)

            toast({
                title: 'Downloaded!',
                description: `${selectedIcon}.png has been downloaded.`,
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
        if (!selectedIcon) return

        try {
            const dataUrl = await svgToCanvas('jpg', 512)

            const a = document.createElement('a')
            a.href = dataUrl
            a.download = `${selectedIcon}.jpg`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)

            toast({
                title: 'Downloaded!',
                description: `${selectedIcon}.jpg has been downloaded.`,
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
        if (!selectedIcon) return

        try {
            setExportProgress(0)
            setShowAnimationExport(true)
            setExportFormat('gif')

            // Force animation and loop to be enabled for GIF export
            const wasAnimated = animation
            const wasLooped = loop
            setAnimation(true)
            setLoop(true)

            const gifBlob = await createGIF(256, 3000) // 3 second animation at 256px

            // Reset animation settings if they were changed
            if (!wasAnimated) setAnimation(false)
            if (!wasLooped) setLoop(false)

            const url = URL.createObjectURL(gifBlob)

            const a = document.createElement('a')
            a.href = url
            a.download = `${selectedIcon}-animated.gif`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)

            toast({
                title: 'Downloaded!',
                description: `${selectedIcon}-animated.gif has been downloaded.`,
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
        if (!selectedIcon) return

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
        if (!selectedIcon) return

        try {
            const dataUrl = await svgToCanvas('png', 512)

            // Convert data URL to blob
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

    const copyReactCode = async () => {
        if (!selectedIcon) return

        const isDefaultSize = iconSize[0] === 24
        const isDefaultStroke = strokeWidth[0] === 1
        const isDefaultColor = iconColor === 'currentColor'
        const isDefaultLinecap = strokeLinecap === 'round'
        const isDefaultLinejoin = strokeLinejoin === 'round'

        const reactCode = `import { ${selectedIcon} } from 'dalim-icons';

const App = () => {
  return (
    <${selectedIcon}${!isDefaultSize ? `\n      size={${iconSize[0]}}` : ''}${!isDefaultColor ? `\n      color="${iconColor}"` : ''}${!isDefaultStroke ? `\n      strokeWidth={${strokeWidth[0]}}` : ''}${!isDefaultLinecap ? `\n      strokeLinecap="${strokeLinecap}"` : ''}${!isDefaultLinejoin ? `\n      strokeLinejoin="${strokeLinejoin}"` : ''}${animation ? '\n      animation' : ''}${loop ? '\n      loop' : ''} 
    />
  );
}

export default App;`

        try {
            await navigator.clipboard.writeText(reactCode)
            toast({
                title: 'Copied!',
                description: 'React code copied to clipboard.',
            })
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to copy React code.',
                variant: 'destructive',
            })
        }
    }

    const allIcons = getAllIcons()
    const icon = allIcons.find((i) => i.name === selectedIcon)
    const isDefaultSize = iconSize[0] === 24
    const isDefaultStroke = strokeWidth[0] === 1
    const isDefaultColor = iconColor === 'currentColor'

    return (
        <div className="top-35 sticky border-b pb-6 md:h-screen md:border-b-0 md:border-r md:pr-6">
            <canvas
                ref={canvasRef}
                className="hidden"
            />
            <video
                ref={videoRef}
                className="hidden"
            />
            <div
                ref={animationContainerRef}
                className="hidden"
            />

            {/* Animation Export Dialog */}
            <Dialog
                open={showAnimationExport}
                onOpenChange={setShowAnimationExport}>
                <DialogContent className="sm:max-w-md">
                    <DialogTitle>Exporting {exportFormat === 'gif' ? 'GIF' : 'Video'}</DialogTitle>
                    <div className="space-y-4">
                        <div className="flex items-center justify-center p-4">
                            {selectedIcon && (Icons as Record<string, any>)[selectedIcon] && (
                                <div className="flex h-32 w-32 items-center justify-center">
                                    {React.createElement((Icons as Record<string, any>)[selectedIcon], {
                                        size: 128,
                                        variant: iconVariant,
                                        color: iconColor,
                                        strokeWidth: strokeWidth[0],
                                        animation: true,
                                        loop: true,
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Export Progress</Label>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                <div
                                    className="h-full bg-blue-600 transition-all duration-300"
                                    style={{ width: `${exportProgress}%` }}
                                />
                            </div>
                            <p className="text-center text-sm">{exportProgress}%</p>
                        </div>

                        <p className="text-muted-foreground text-center text-sm">{exportFormat === 'gif' ? 'Creating animated GIF. This may take a moment...' : 'Recording animation. This may take a moment...'}</p>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="-mt-3 space-y-4">
                <IconDetails
                    iconSize={iconSize}
                    iconVariant={iconVariant}
                    iconColor={iconColor}
                    strokeWidth={strokeWidth}
                    animation={animation}
                    loop={loop}
                    selectedIcon={selectedIcon}
                    strokeLinecap={strokeLinecap}
                    strokeLinejoin={strokeLinejoin}
                />
                <Dialog>
                    {selectedIcon && (
                        <div className="flex flex-wrap gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger className={buttonVariants({ size: 'icon', className: 'h-9 w-9' })}>
                                    <Download />
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
                                        GIF <Film className="h-4 w-4" />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger className={buttonVariants({ variant: 'outline', size: 'icon', className: 'h-9 w-9' })}>
                                    <Copy />
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
                                        onClick={copyReactCode}
                                        className="flex cursor-pointer justify-between">
                                        React <Copy className="h-4 w-4" />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DialogTrigger className={buttonVariants({ variant: 'outline', size: 'icon', className: 'h-9 w-9' })}>
                                <Code className="h-4 w-4" />
                            </DialogTrigger>
                            <Link href={`/${selectedIcon}`}>
                                <Button
                                    variant={'outline'}
                                    size={'icon'}>
                                    <Expand />
                                </Button>
                            </Link>
                            <ShareButton
                                url={`/${selectedIcon}`}
                                title={selectedIcon}
                                description={selectedIcon || `Check out this ${selectedIcon.toLowerCase().replace('_', ' ')} graphic!`}
                                image={selectedIcon}
                                type="graphic"
                                variant="outline"
                                size="icon"
                                showText={false}
                            />
                            <Button
                                variant="outline"
                                onClick={handleReset}
                                size="icon"
                                className="group cursor-pointer transition-transform duration-300">
                                <RotateCw className="transition-transform duration-300 group-hover:rotate-45" />
                            </Button>
                        </div>
                    )}

                    <DialogContent className="hidden w-auto max-w-[80vw] justify-center p-6 md:grid md:max-w-[1400px]">
                        <DialogTitle className="hidden"></DialogTitle>
                        <div className="relative flex gap-3">
                            <div className="space-y-3">
                                <div className="flex justify-center">
                                    <Link href={`/${selectedIcon}`}>
                                        <Button className="w-40">
                                            See in Action <Expand />
                                        </Button>
                                    </Link>
                                </div>
                                <CodeIconDetails
                                    iconSize={iconSize}
                                    iconVariant={iconVariant}
                                    iconColor={iconColor}
                                    strokeWidth={strokeWidth}
                                    animation={animation}
                                    loop={loop}
                                    selectedIcon={selectedIcon}
                                />
                                <div className="bg-muted/20 h-35 flex w-40 rounded-lg p-3">
                                    <div className="space-y-2">
                                        <Badge
                                            variant="secondary"
                                            className="text-xs">
                                            {icon?.category || 'Uncategorized'}
                                        </Badge>
                                        <div className="flex flex-wrap gap-1">
                                            {icon?.tags?.slice(0, 2).map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="outline"
                                                    className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <CodeBlock
                                    code={`import { ${selectedIcon} } from 'dalim-icons';

const App = () => {
  return (
    <${selectedIcon}${!isDefaultSize ? `\n      size={${iconSize[0]}}` : ''}${!isDefaultColor ? `\n      color="${iconColor}"` : ''}${!isDefaultStroke ? `\n      strokeWidth={${strokeWidth[0]}}` : ''}${animation ? '\n      animation' : ''}${loop ? '\n      loop' : ''} 
    />
  );
}
  
export default App;`}
                                    lang="tsx"
                                    preHighlighted={highlightedCode}
                                />

                                <CopyButton
                                    className="absolute right-2 top-2"
                                    componentSource={`import { ${selectedIcon} } from 'dalim-icons';

const App = () => {
  return (
    <${selectedIcon} 
      size={128}
      color="#000000"
      strokeWidth={0.5}
    />
  );
}
  
export default App;`}
                                />
                            </div>
                        </div>
                        <div className="-mt-1">
                            <CliCommands name={'dalim-icons'} />
                        </div>
                    </DialogContent>
                </Dialog>
                {selectedIcon && (
                    <div>
                        <Label className="text-xs font-medium">Size: {iconSize[0]}px</Label>
                        <Slider
                            value={iconSize}
                            onValueChange={setIconSize}
                            max={72}
                            min={8}
                            step={4}
                            className="mt-2"
                        />
                    </div>
                )}
                <div>
                    <Label className="text-sm font-medium">Color</Label>
                    <div className="mt-2 flex items-center gap-2">
                        <input
                            type="color"
                            value={iconColor}
                            onChange={(e) => setIconColor(e.target.value)}
                            className="absolute h-8 w-8 rounded-full border p-3"
                        />
                        <div
                            className="h-8 w-8 rounded-full border"
                            style={{ backgroundColor: iconColor }}
                        />
                        <Input
                            value={iconColor}
                            onChange={(e) => setIconColor(e.target.value)}
                            className="flex-1"
                        />
                    </div>
                </div>

                <div>
                    <Label className="text-xs font-medium">Stroke Width: {strokeWidth[0]}</Label>
                    <Slider
                        value={strokeWidth}
                        onValueChange={setStrokeWidth}
                        max={3}
                        min={0.1}
                        step={0.1}
                        className="mt-2"
                    />
                </div>

               <div>
                                    <Label className="text-xs text-primary/60 font-medium">Stroke Linecap</Label>
                                    <ToggleGroup
                                        type="single"
                                        value={strokeLinecap}
                                        onValueChange={(value) => {
                                            if (value === 'butt' || value === 'round' || value === 'square') {
                                                setStrokeLinecap(value)
                                            }
                                        }}
                                        className="mt-1 border rounded-lg">
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
                                    <Label className="text-xs text-primary/60 font-medium">Stroke Linejoin</Label>
                                    <ToggleGroup
                                        type="single"
                                        value={strokeLinejoin}
                                        onValueChange={(value) => {
                                            if (value === 'round' || value === 'miter' || value === 'bevel') {
                                                setStrokeLinejoin(value)
                                            }
                                        }}
                                        className="mt-1 border rounded-lg"> 
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
                        htmlFor="animation"
                        className="text-sm font-medium">
                        Animation
                    </Label>
                    <Switch
                        id="animation"
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
            <div className="relative pb-6 before:absolute before:-inset-x-6 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>
            <h1 className="mt-4 text-xs opacity-60">All Categories</h1>
            <p className="text-md mt-2 opacity-80">Coming Soon!</p>
        </div>
    )
}
