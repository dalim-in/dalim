/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Input } from '@dalim/core/ui/input'
import { Slider } from '@dalim/core/ui/slider'
import { Label } from '@dalim/core/ui/label'
import { CodeIconDetails, IconDetails } from './icon-details'
import { Button, buttonVariants } from '@dalim/core/ui/button'
import { Copy, Download, RotateCw, Code, Expand, Film } from 'lucide-react'
import { ShareButton } from '@dalim/core/components/common/share-button'
import { CodeBlock } from '@dalim/core/components/common/code-block'
import Link from 'next/link'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@dalim/core/ui/dialog'
import { type JSX, useState, useRef } from 'react'
import { CopyButton } from '@dalim/core/components/common/copy-button'
import { CliCommands } from '@dalim/core/components/common/cli-commands'
import { Badge } from '@dalim/core/ui/badge'
import { getAllLogos } from 'dalim-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@dalim/core/ui/dropdown-menu'
import * as Flags from 'dalim-icons'
import { toast } from '@dalim/core/hooks/use-toast'
import { createRoot } from 'react-dom/client'

import React from 'react'

export function ControlIcon({
    iconSize,
    iconVariant,
    setIconSize,
    iconColor,
    setIconColor, 
    selectedIcon,
}: {
    iconSize: number[]
    iconVariant: 'icon' | 'wordmark'
    setIconSize: (val: number[]) => void
    iconColor: string
    setIconColor: (val: string) => void 
    selectedIcon: string
}) {
    const [highlightedCode] = useState<JSX.Element | null>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    

    const handleReset = () => {
        setIconSize([24])
        setIconColor('currentColor')
    }

    // Generate SVG string for the selected icon
    const generateSVG = async (size: number = iconSize[0]): Promise<string> => {
        if (!selectedIcon) return ''

        const Icon = (Flags as Record<string, any>)[selectedIcon]
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
        const isDefaultColor = iconColor === 'currentColor' 

        const reactCode = `import { ${selectedIcon} } from 'dalim-icons';

const App = () => {
  return (
    <${selectedIcon}${!isDefaultSize ? `\n      size={${iconSize[0]}}` : ''}${!isDefaultColor ? `\n      color="${iconColor}"` : ''} : ''} 
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

    const allIcons = getAllLogos()
    const icon = allIcons.find((i) => i.name === selectedIcon)
    const isDefaultSize = iconSize[0] === 24 
    const isDefaultColor = iconColor === 'currentColor'

    return (
        <div className="top-35 sticky border-b pb-6 md:h-screen md:border-b-0 md:border-r md:pr-6">
            

             
             

            <div className="-mt-3 space-y-4">
                <IconDetails
                    iconSize={iconSize}
                    iconVariant={iconVariant}
                    iconColor={iconColor}  
                    selectedIcon={selectedIcon} 
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
                            <Link href={`/flags/${selectedIcon}`}>
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
                                    <Link href={`/flags/${selectedIcon}`}>
                                        <Button className="w-40">
                                            See in Action <Expand />
                                        </Button>
                                    </Link>
                                </div>
                                <CodeIconDetails
                                    iconSize={iconSize}
                                    iconVariant={iconVariant}
                                    iconColor={iconColor} 
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
    <${selectedIcon}${!isDefaultSize ? `\n      size={${iconSize[0]}}` : ''}${!isDefaultColor ? `\n      color="${iconColor}"` : ''} ''} 
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
            </div>
            <div className="relative pb-6 before:absolute before:-inset-x-6 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>
            <h1 className="mt-4 text-xs opacity-60">All Categories</h1>
            <p className="text-md mt-2 opacity-80">Coming Soon!</p>
        </div>
    )
}
