'use client'
import { Input } from '@dalim/core/ui/input'
import { Slider } from '@dalim/core/ui/slider'
import { Switch } from '@dalim/core/ui/switch'
import { Label } from '@dalim/core/ui/label'
import { CodeIconDetails, IconDetails } from './icon-details'
import { Button, buttonVariants } from '@dalim/core/ui/button'
import { Copy, Download, RotateCw, Code, Expand } from 'lucide-react'
import { ShareButton } from '@dalim/core/components/common/share-button'
import { CodeBlock } from '@dalim/core/components/common/code-block'
import Link from 'next/link'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@dalim/core/ui/dialog'
import { JSX, useState } from 'react'
import { CopyButton } from '@dalim/core/components/common/copy-button'
import { CliCommands } from '@dalim/core/components/common/cli-commands'
import { Badge } from '@dalim/core/ui/badge'
import { getAllIcons } from 'dalim-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@dalim/core/ui/dropdown-menu'

export function ControlIcon({
    iconSize,
    iconVariant,
    setIconSize,
    iconColor,
    setIconColor,
    strokeWidth,
    setStrokeWidth,
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
    strokeWidth: number[]
    setStrokeWidth: (val: number[]) => void
    animation: boolean
    setAnimation: (val: boolean) => void
    loop: boolean
    setLoop: (val: boolean) => void
    selectedIcon: string
}) {
    const [highlightedCode] = useState<JSX.Element | null>(null)
    const handleReset = () => {
        setIconSize([24]) // 🎯 default size
        setIconColor('currentColor') // 🎯 default color
        setStrokeWidth([1]) // 🎯 default stroke
        setAnimation(false) // 🎯 default animation
        setLoop(false) // 🎯 default loop
    }

    const allIcons = getAllIcons()
    const icon = allIcons.find((i) => i.name === selectedIcon)
    const isDefaultSize = iconSize[0] === 24
    const isDefaultStroke = strokeWidth[0] === 1
    const isDefaultColor = iconColor === 'currentColor'

    return (
        <div className="top-35 sticky border-b pb-6 md:h-screen md:border-b-0 md:border-r md:pr-6">
            <div className="-mt-3 space-y-4">
                <IconDetails
                    iconSize={iconSize}
                    iconVariant={iconVariant}
                    iconColor={iconColor}
                    strokeWidth={strokeWidth}
                    animation={animation}
                    loop={loop}
                    selectedIcon={selectedIcon}
                />
                <Dialog>
                    {selectedIcon && (
                        <div className="grid grid-cols-4 justify-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger className={buttonVariants({ size: 'icon', className: 'h-9 w-9' })}>
                                    {' '}
                                    <Download />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuItem className="flex justify-between">
                                        SVG <Download />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex justify-between">
                                        PNG <Download />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex justify-between">
                                        JPG <Download />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger className={buttonVariants({ variant: 'outline', size: 'icon', className: 'h-9 w-9' })}>
                                    <Copy />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuItem className="flex justify-between">
                                        SVG <Copy />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex justify-between">
                                        PNG <Copy />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex justify-between">
                                        React <Copy />
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
                        <DialogTitle className='hidden'></DialogTitle>
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
