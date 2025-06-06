'use client'
import { Input } from '@dalim/core/ui/input'
import { Slider } from '@dalim/core/ui/slider'
import { Switch } from '@dalim/core/ui/switch'
import { Label } from '@dalim/core/ui/label'
import { CodeIconDetails, IconDetails } from './icon-details'
import { Button, buttonVariants } from '@dalim/core/ui/button'
import { Copy, Download, RotateCw, Code } from 'lucide-react'
import { CodeBlock } from '@dalim/core/components/common/code-block'
import Link from 'next/link'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@dalim/core/ui/dialog'
import { JSX, useState } from 'react'
import { CopyButton } from '@dalim/core/components/common/copy-button'
import { CliCommands } from '@dalim/core/components/common/cli-commands'

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
                        <div className="flex justify-center gap-2">
                            <Button size={'icon'}>
                                <Download />
                            </Button>
                            <Link href={''}>
                                <Button
                                    variant={'outline'}
                                    size={'icon'}>
                                    <Copy />
                                </Button>
                            </Link>
                            <DialogTrigger className={buttonVariants({ variant: 'outline', size: 'icon', className: 'h-9 w-9' })}>
                                <Code className="h-4 w-4" />
                            </DialogTrigger>
                            <Button
                                variant="outline"
                                onClick={handleReset}
                                size="icon"
                                className="group cursor-pointer transition-transform duration-300">
                                <RotateCw className="transition-transform duration-300 group-hover:rotate-45" />
                            </Button>
                        </div>
                    )}

                    <DialogContent className="w-auto max-w-[95vw] p-6 md:max-w-[1200px]">
                        <DialogHeader>
                            <DialogTitle>{selectedIcon} Icon</DialogTitle>
                            <DialogDescription>Here's how to use this icon:</DialogDescription>
                        </DialogHeader> 
                        <div className="relative flex gap-3">
                            <div className="space-y-3">
                                <CodeIconDetails
                                    iconSize={iconSize}
                                    iconVariant={iconVariant}
                                    iconColor={iconColor}
                                    strokeWidth={strokeWidth}
                                    animation={animation}
                                    loop={loop}
                                    selectedIcon={selectedIcon}
                                />
                                <div className="bg-muted/20 flex h-auto w-full items-center rounded-lg p-3">
                                    <Button>Ok</Button>
                                </div>
                            </div>
                            <CodeBlock
                                code={`import { ${selectedIcon} } from 'dalim-icons';

const App = () => {
  return (
    <${selectedIcon} 
      size={${iconSize}} 
      color="${iconColor}"
      strokeWidth={${strokeWidth}} 
      loop={${loop}}
      animation={${animation}}
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
                         <CliCommands name={'dalim-icons'} />
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
