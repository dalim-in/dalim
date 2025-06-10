/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { JSX, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Copy, Check, Download, RotateCw, Share2, Film, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button, buttonVariants } from '@dalim/core/ui/button'
import { Badge } from '@dalim/core/ui/badge'
import { ShareButton } from '@dalim/core/components/common/share-button'
import { Slider } from '@dalim/core/ui/slider'
import { GridPattern } from '@dalim/core/components/backgrunds/grid'
import { Label } from '@dalim/core/ui/label'
import { Input } from '@dalim/core/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@dalim/core/ui/dropdown-menu'
import { toast } from '@dalim/core/hooks/use-toast'
import { getAllLogos, getLogoByName } from 'dalim-icons'
import * as Logos from 'dalim-icons'
import { createRoot } from 'react-dom/client'
import { CodeBlock } from '@dalim/core/components/common/code-block'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dalim/core/ui/tabs'

export function LogoDetailed() {
    const router = useRouter()
    const params = useParams()
    const iconName = params.name as string
    const [highlightedCode] = useState<JSX.Element | null>(null)

    // Icon customization controls
    const [size, setSize] = useState([92])
    const [variant, setVariant] = useState<'icon' | 'wordmark'>('icon')
    const [color, setColor] = useState('currentColor')
    const [copied, setCopied] = useState(false)

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const iconRef = useRef<HTMLDivElement>(null)

    const allIcons = getAllLogos()
    const currentIndex = allIcons.findIndex((icon) => icon.name.toLowerCase() === iconName.toLowerCase())

    function goToPrevious() {
        if (currentIndex > 0) {
            const prevIcon = allIcons[currentIndex - 1]
            router.push(`/logos/${prevIcon.name}`)
        }
    }

    function goToNext() {
        if (currentIndex < allIcons.length - 1) {
            const nextIcon = allIcons[currentIndex + 1]
            router.push(`/logos/${nextIcon.name}`)
        }
    }

    // Get icon metadata
    const iconData = getLogoByName(iconName.charAt(0).toUpperCase() + iconName.slice(1))

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
    }

    // Generate SVG string for the selected icon
    const generateSVG = async (iconSize: number = size[0]): Promise<string> => {
        const Icon = (Logos as Record<string, any>)[iconData.name]
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
        const isDefaultColor = color === 'currentColor'

        const importCode = `import { ${iconData.name} } from 'dalim-icons'

<${iconData.name}${!isDefaultSize ? `\n  size={${size[0]}}` : ''}${!isDefaultColor ? `\n  color="${color}"` : ''}  ''} 
/>`

        await navigator.clipboard.writeText(importCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)

        toast({
            title: 'Copied!',
            description: 'React code copied to clipboard.',
        })
    }

    const shareIcon = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${iconData.name} Icon`,
                    text: `Check out this ${iconData.name} icon from Dalim Icons`,
                    url: window.location.href,
                })
            } catch (error) {
                // Fallback to clipboard
                await navigator.clipboard.writeText(window.location.href)
                toast({
                    title: 'Link copied!',
                    description: 'Icon link copied to clipboard.',
                })
            }
        } else {
            await navigator.clipboard.writeText(window.location.href)
            toast({
                title: 'Link copied!',
                description: 'Icon link copied to clipboard.',
            })
        }
    }

    const isDefaultSize = size[0] === 48
    const isDefaultColor = color === 'currentColor'

    return (
        <div className="mt-6">
            <div className="">
                <div className="grid gap-3 md:grid-cols-[20%_80%] lg:grid-cols-[17%_83%]">
                    <div className="-mt-6 border-r pr-6">
                        <div className="my-6 flex items-center gap-2">
                            <Button
                                onClick={() => router.push('/logos')}
                                variant="outline"
                                className="">
                                <ArrowLeft className="h-4 w-4" />
                                All Logos
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
                            </div>
                        </div>

                        <div className="relative pb-6 before:absolute before:-inset-x-6 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>
                        <h1 className="mt-4 text-xs opacity-60">All Categories</h1>
                        <p className="text-md mt-2 opacity-80">Coming Soon!</p>
                    </div>

                    <div className="">
                        <div className="px-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="text-3xl font-semibold">{iconData.name}</div>
                                    <div className="mt-2 opacity-60">{iconData.description}</div>
                                    <div className="mt-3 flex items-center gap-1">
                                        <Badge
                                            variant="outline"
                                            className="text-sm">
                                            {iconData.category}
                                        </Badge>
                                        <div>
                                            <div className="flex flex-wrap gap-1">
                                                {iconData.tags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="secondary"
                                                        className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-2">
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
                                        <div className="relative flex aspect-square h-auto w-full items-center justify-center rounded-xl border">
                                            <GridPattern
                                                width={5}
                                                height={5}
                                                className="w-full rounded-xl opacity-30"
                                            />
                                            <div ref={iconRef}>
                                                {(() => {
                                                    const Icon = (Logos as Record<string, any>)[iconData.name]
                                                    return Icon ? (
                                                        <Icon
                                                            size={size[0] * 2} // Display larger in preview
                                                            variant={variant}
                                                            color={color}
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
                                                                const Icon = (Logos as Record<string, any>)[iconData.name]
                                                                return Icon ? (
                                                                    <Icon
                                                                        size={24}
                                                                        variant={v as any}
                                                                        color={color}
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
    <${iconData.name}${!isDefaultSize ? `\n      size={${iconData.name[0]}}` : ''}${!isDefaultColor ? `\n      color="${iconData.name}"` : ''}  ''}
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
                        <div className="bg-primary/10 my-3 h-[400px] rounded-xl py-20 text-center">More Coming Soon</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
