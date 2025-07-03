/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from '@dalim/core/ui/button'
import CopyToClipboard from '@/src/hooks/copy-to-clipboard'

import { cn } from '@dalim/core/lib/utils'

import { Input } from '@dalim/core/ui/input'
import { Label } from '@dalim/core/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@dalim/core/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
import { Switch } from '@dalim/core/ui/switch'
import { Slider } from '@dalim/core/ui/slider'
import { ScrollArea } from '@dalim/core/ui/scroll-area'
import { HexColorPicker } from 'react-colorful'
import { SavedEditedPathsTab } from './edited-paths'
import { ExamplePaths } from './example-paths'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@dalim/core/ui/accordion'

import { SavedPathsTab } from './saved-draw-paths'

import { Copy, Edit2, GripVertical, PenTool, RefreshCcw, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { toast } from 'sonner'
import { AnimateSvg } from './animate-svg'
import { compoentCode } from './data'
import { DrawingCanvas } from './drawing-canvas'

import { SavePathDialog } from './save-path-dialog'
import { SvgEditor } from './svg-editor' 

type AnimationSettings = {
    width: string
    height: string
    viewBox: string
    strokeColor: string
    strokeWidth: number
    strokeLinecap: 'butt' | 'round' | 'square'
    animationDuration: number
    animationDelay: number
    animationBounce: number
    reverseAnimation: boolean
    enableHoverAnimation: boolean
    hoverAnimationType: 'float' | 'pulse' | 'redraw' | 'color' | 'sequential'
}

function SVGLineDrawGenerator() {
    const { theme } = useTheme()
    const [activePresets, setActivePresets] = useQueryState('presets')
    const [exampleViewBox] = useQueryState('viewBox', {
        defaultValue: '0 0 250 100',
    })
    const [editPath, setEditPath] = useQueryState('editPath', parseAsBoolean.withDefault(false))
    const [customDrawLine, setCustomDrawLine] = useQueryState('customDrawLine', parseAsBoolean.withDefault(false))
    const [strokeColorPickerOpen, setStrokeColorPickerOpen] = useState(false)
    const [currentPath, setCurrentPath] = useState<string>('')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [savedPaths, _setSavedPaths] = useState<string[]>([])
    const [previewKey, setPreviewKey] = useState(0)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_showEditor, setShowEditor] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_editorViewBox, _setEditorViewBox] = useState('0 0 100 100')
    const [showSaveDialog, setShowSaveDialog] = useState(false)
    // Update the default smoothing value to be more appropriate
    const [settings, setSettings] = useState<AnimationSettings>({
        width: '100%',
        height: '100%',
        viewBox: '0 0 250 100',
        strokeColor: '#000000',
        strokeWidth: 2,
        strokeLinecap: 'round',
        animationDuration: 1.5,
        animationDelay: 0,
        animationBounce: 0.3,
        reverseAnimation: false,
        enableHoverAnimation: false,
        hoverAnimationType: 'redraw',
    })

    useEffect(() => {
        setSettings((prev) => ({
            ...prev,
            viewBox: exampleViewBox,
            strokeColor: theme === 'dark' ? '#ffffff' : '#000000',
        }))
    }, [theme, exampleViewBox])

    // Save current path
    const savePath = () => {
        if (!currentPath) {
            toast.success('No path to save', {
                description: 'Draw something first before saving',
            })
            return
        }
        setShowSaveDialog(true)
        console.log(currentPath)

        // setSavedPaths((prev) => [...prev, currentPath]);
        // toast.success("Path saved", {
        //   description: "Your path has been added to the collection",
        // });
    }

    const updateSetting = <K extends keyof AnimationSettings>(key: K, value: AnimationSettings[K]) => {
        setSettings((prev) => ({ ...prev, [key]: value }))
        setPreviewKey((prev) => prev + 1)
    }

    // Copy generated code
    const copyCode = () => {
        const code = generateCode()
        navigator.clipboard.writeText(code)
        toast.success('code copied', {
            description: 'The code has been copied to your clipboard',
        })
    }

    // Generate code for the current animation
    const generateCode = () => {
        const pathsCode = savedPaths.length > 0 ? `paths={[${savedPaths.map((p) => `{ d: "${p}" }`).join(', ')}]}` : `path="${currentPath}"`

        return `<AnimateSvg
  width="${settings.width}"
  height="${settings.height}"
  viewBox="${settings.viewBox}"
  className="my-svg-animation"
  ${pathsCode}
  strokeColor="${settings.strokeColor}"
  strokeWidth={${settings.strokeWidth}}
  strokeLinecap="${settings.strokeLinecap}"
  animationDuration={${settings.animationDuration}}
  animationDelay={${settings.animationDelay}}
  animationBounce={${settings.animationBounce}}
  reverseAnimation={${settings.reverseAnimation}}
  enableHoverAnimation={${settings.enableHoverAnimation}}
  ${settings.enableHoverAnimation ? `hoverAnimationType="${settings.hoverAnimationType}"` : ''}
/>`
    }

    const handleLineDraw = () => {
        if (activePresets) {
            setActivePresets(null)
            setEditPath(false)
            setCustomDrawLine(true)
        } else {
            setCustomDrawLine(!customDrawLine)
        }
    }
    const handleEditPath = () => {
        if (activePresets) {
            setEditPath(!editPath)
        } else {
            setEditPath(!editPath)
        }
    }

    return (
        <div className="-mx-6 -mt-14 px-3">
            <div className="mt-3 grid w-full md:flex">
                <Accordion
                    defaultValue="1"
                    className="w-80"
                    type="single"
                    collapsible>
                    <AccordionItem value="1">
                        <AccordionTrigger>Presets</AccordionTrigger>
                        <AccordionContent className="h-[40vh]">
                            <ScrollArea className="bg-main h-[79vh] space-y-3 overflow-auto">
                              
							    <ExamplePaths
                                    onSelectPath={setCurrentPath}
                                    // onEditPath={openEditorForExample}
                                    setActivePresets={setActivePresets}
                                    activePresets={activePresets}
                                />
                            </ScrollArea>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="3">
                        <AccordionTrigger>Edited</AccordionTrigger>
                        <AccordionContent className="h-[40vh]">
                            <SavedEditedPathsTab
                                activePresets={activePresets}
                                setActivePresets={setActivePresets}
                                onSelectPath={(path, viewBox) => {
                                    setCurrentPath(path)
                                    updateSetting('viewBox', viewBox)
                                    setPreviewKey((prev) => prev + 1)
                                }}
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="4">
                        <AccordionTrigger>Edited</AccordionTrigger>
                        <AccordionContent className="h-[40vh]">
                            <SavedPathsTab
                                activePresets={activePresets}
                                setActivePresets={setActivePresets}
                                onSelectPath={(path, viewBox) => {
                                    setCurrentPath(path)
                                    updateSetting('viewBox', viewBox)
                                    setPreviewKey((prev) => prev + 1)
                                }}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div className={cn('w-full px-3', customDrawLine || editPath ? ' ' : ' ')}>
                    <div className="mb-6 h-[90vh] w-full">
                        <div className="h-[85%] w-full 2xl:h-[90%]">
                            <PanelGroup direction="horizontal">
                                <Panel
                                    defaultSize={customDrawLine ? 50 : 100}
                                    minSize={20}>
                                    <div className={cn('relative flex w-full items-center justify-center rounded-xl', editPath ? 'h-[95%] p-0' : 'bg-main h-[95%] border p-4', customDrawLine && 'h-full')}>
                                        {/* SVG Editor Modal */}
                                        {editPath ? (
                                            <>
                                                <PanelGroup direction="horizontal">
                                                    <Panel
                                                        defaultSize={30}
                                                        minSize={10}
                                                        className="relative rounded-xl border">
                                                        <div className="absolute bottom-0 left-0 right-0 top-0 z-0 rounded-xl bg-[radial-gradient(#79797960_1px,#f3f4f6_1px)] bg-[size:20px_20px] dark:bg-[radial-gradient(#ffffff33_1px,#000000_1px)]" />

                                                        <div
                                                            key={previewKey}
                                                            className="relative z-10 h-full w-full">
                                                            <AnimateSvg
                                                                width="100%"
                                                                height="100%"
                                                                viewBox={settings.viewBox}
                                                                className="h-full w-full"
                                                                path={currentPath}
                                                                strokeColor={settings.strokeColor}
                                                                strokeWidth={settings.strokeWidth}
                                                                strokeLinecap={settings.strokeLinecap as any}
                                                                animationDuration={settings.animationDuration}
                                                                animationDelay={settings.animationDelay}
                                                                animationBounce={settings.animationBounce}
                                                                reverseAnimation={settings.reverseAnimation}
                                                                enableHoverAnimation={settings.enableHoverAnimation}
                                                                hoverAnimationType={settings.hoverAnimationType}
                                                            />
                                                        </div>
                                                    </Panel>
                                                    <PanelResizeHandle className="grid w-5 place-items-center rounded-xl p-0">
                                                        <GripVertical className="w-5 text-neutral-400" />
                                                    </PanelResizeHandle>
                                                    <Panel
                                                        defaultSize={70}
                                                        minSize={60}>
                                                        <SvgEditor
                                                            setShowSaveDialog={setShowSaveDialog}
                                                            path={currentPath}
                                                            onPathChange={(newPath) => {
                                                                setCurrentPath(newPath)
                                                                // setPreviewKey((prev) => prev + 1);
                                                            }}
                                                            onClose={() => setEditPath(false)}
                                                            strokeColor={settings.strokeColor}
                                                            strokeWidth={settings.strokeWidth}
                                                        />
                                                    </Panel>
                                                </PanelGroup>
                                            </>
                                        ) : (
                                            <>
                                                <div className="absolute bottom-0 left-0 right-0 top-0 z-0 rounded-xl bg-[radial-gradient(#79797960_1px,#f3f4f6_1px)] bg-[size:20px_20px] dark:bg-[radial-gradient(#ffffff33_1px,#000000_1px)]" />

                                                {currentPath || savedPaths.length > 0 ? (
                                                    <div
                                                        key={previewKey}
                                                        className="relative z-10 h-full w-full">
                                                        {/* {savedPaths.length > 0 ? (
                              <AnimateSvg
                                width="100%"
                                height="100%"
                                viewBox={settings.viewBox}
                                className="w-full h-full"
                                paths={savedPaths.map((p) => ({ d: p }))}
                                strokeColor={settings.strokeColor}
                                strokeWidth={settings.strokeWidth}
                                strokeLinecap={settings.strokeLinecap as any}
                                animationDuration={settings.animationDuration}
                                animationDelay={settings.animationDelay}
                                animationBounce={settings.animationBounce}
                                reverseAnimation={settings.reverseAnimation}
                                enableHoverAnimation={
                                  settings.enableHoverAnimation
                                }
                                hoverAnimationType={settings.hoverAnimationType}
                              />
                            ) : ( */}
                                                        <AnimateSvg
                                                            width="100%"
                                                            height="100%"
                                                            viewBox={settings.viewBox}
                                                            className="h-full w-full"
                                                            path={currentPath}
                                                            strokeColor={settings.strokeColor}
                                                            strokeWidth={settings.strokeWidth}
                                                            strokeLinecap={settings.strokeLinecap as any}
                                                            animationDuration={settings.animationDuration}
                                                            animationDelay={settings.animationDelay}
                                                            animationBounce={settings.animationBounce}
                                                            reverseAnimation={settings.reverseAnimation}
                                                            enableHoverAnimation={settings.enableHoverAnimation}
                                                            hoverAnimationType={settings.hoverAnimationType}
                                                        />
                                                        {/* )} */}
                                                    </div>
                                                ) : (
                                                    <div className="text-center text-gray-400">
                                                        <p>Draw or select a path to preview</p>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </Panel>
                                {customDrawLine && (
                                    <>
                                        <PanelResizeHandle className="grid w-5 place-items-center rounded-xl p-0">
                                            <GripVertical className="w-5 text-neutral-400" />
                                        </PanelResizeHandle>
                                        <Panel
                                            defaultSize={customDrawLine ? 50 : 0}
                                            minSize={40}>
                                            <div className="bg-main h-full rounded-lg border p-4">
                                                <DrawingCanvas
                                                    width={400}
                                                    height={300}
                                                    onPathChange={setCurrentPath}
                                                    currentPath={currentPath}
                                                    strokeWidth={settings.strokeWidth}
                                                    strokeColor={settings.strokeColor}
                                                    savePath={savePath}
                                                />
                                            </div>
                                        </Panel>
                                    </>
                                )}
                            </PanelGroup>
                        </div>
                    </div>

                    {/* Save Path Dialog */}
                    {showSaveDialog && (
                        <SavePathDialog
                            setEditPath={setEditPath}
                            editPath={editPath}
                            path={currentPath}
                            viewBox={settings.viewBox}
                            onClose={() => setShowSaveDialog(false)}
                        />
                    )}
                </div>
                <div className="w-80">
                    <div className={cn('items-center gap-3 py-1', customDrawLine || editPath ? 'justify-between' : 'justify-between')}>
                        <div className="pb-4">{customDrawLine ? 'Drawing' : editPath ? 'Editing' : 'Preview'}</div>

                        <div className="space-y-2">
                            <Button
                                variant={customDrawLine ? 'destructive' : 'outline'}
                                size="sm"
                                className="w-full"
                                onClick={handleLineDraw}
                                disabled={editPath}>
                                {customDrawLine ? <X /> : <PenTool />}
                                {customDrawLine ? 'Cancel' : 'Draw Line'}
                            </Button>
                            <Button
                                variant={editPath ? 'destructive' : 'outline'}
                                size="sm"
                                className="w-full"
                                onClick={handleEditPath}
                                disabled={!activePresets}>
                                {editPath ? <X /> : <Edit2 />}
                                {editPath ? 'Close Edit' : 'Edit Path'}
                            </Button>
                            <CopyToClipboard
                                classname="relative w-full flex items-center gap-2 h-8 top-0 px-2 ml-2"
                                text={compoentCode}>
                                Component Code
                            </CopyToClipboard>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setPreviewKey((prev) => prev + 1)}>
                                    <RefreshCcw />
                                </Button>
                                <Button
                                    size="icon"
                                    onClick={copyCode}>
                                    <Copy />
                                </Button>
                            </div>
                        </div>
                    </div>
                    {!customDrawLine && !editPath && <p className="text-primary/60 text-xs">See your animation in action</p>}
                    <div className="mt-3 space-y-4 border-t pt-2">
                        <div className="space-y-2">
                            <Label htmlFor="viewBox">ViewBox</Label>
                            <Input
                                id="viewBox"
                                value={settings.viewBox}
                                onChange={(e) => updateSetting('viewBox', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="strokeColor">Stroke Color</Label>
                            <div className="flex gap-2">
                                <Popover
                                    open={strokeColorPickerOpen}
                                    onOpenChange={setStrokeColorPickerOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="h-9 w-9 border-2 p-0"
                                            style={{ backgroundColor: settings.strokeColor }}>
                                            <span className="sr-only">Pick a color</span>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-3">
                                        <HexColorPicker
                                            color={settings.strokeColor}
                                            onChange={(color) => updateSetting('strokeColor', color)}
                                        />
                                        <div className="mt-2 flex">
                                            <Input
                                                value={settings.strokeColor}
                                                onChange={(e) => updateSetting('strokeColor', e.target.value)}
                                                className="flex-1"
                                            />
                                        </div>
                                    </PopoverContent>
                                </Popover>
                                <Input
                                    value={settings.strokeColor}
                                    onChange={(e) => updateSetting('strokeColor', e.target.value)}
                                    className="flex-1"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="strokeWidth">Stroke Width: {settings.strokeWidth}</Label>
                            <Slider
                                id="strokeWidth"
                                className="mt-2"
                                min={1}
                                max={10}
                                step={0.5}
                                value={[settings.strokeWidth]}
                                onValueChange={(value) => updateSetting('strokeWidth', value[0])}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="strokeLinecap">Stroke Linecap</Label>
                            <Select
                                value={settings.strokeLinecap}
                                onValueChange={(value) => updateSetting('strokeLinecap', value as any)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select linecap style" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="butt">Butt</SelectItem>
                                    <SelectItem value="round">Round</SelectItem>
                                    <SelectItem value="square">Square</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="animationDuration">Animation Duration: {settings.animationDuration}s</Label>
                            <Slider
                                id="animationDuration"
                                className="mt-2"
                                min={0.5}
                                max={5}
                                step={0.1}
                                value={[settings.animationDuration]}
                                onValueChange={(value) => updateSetting('animationDuration', value[0])}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="animationDelay">Animation Delay: {settings.animationDelay}s</Label>
                            <Slider
                                id="animationDelay"
                                className="mt-2"
                                min={0}
                                max={2}
                                step={0.1}
                                value={[settings.animationDelay]}
                                onValueChange={(value) => updateSetting('animationDelay', value[0])}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="animationBounce">Animation Bounce: {settings.animationBounce}</Label>
                            <Slider
                                id="animationBounce"
                                className="mt-2"
                                min={0}
                                max={1}
                                step={0.05}
                                value={[settings.animationBounce]}
                                onValueChange={(value) => updateSetting('animationBounce', value[0])}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="reverseAnimation"
                                checked={settings.reverseAnimation}
                                onCheckedChange={(checked) => updateSetting('reverseAnimation', checked)}
                            />
                            <Label htmlFor="reverseAnimation">Reverse Animation</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="enableHoverAnimation"
                                checked={settings.enableHoverAnimation}
                                onCheckedChange={(checked) => updateSetting('enableHoverAnimation', checked)}
                            />
                            <Label htmlFor="enableHoverAnimation">Enable Hover Animation</Label>
                        </div>

                        {settings.enableHoverAnimation && (
                            <div className="space-y-2">
                                <Label htmlFor="hoverAnimationType">Hover Animation Type</Label>
                                <Select
                                    value={settings.hoverAnimationType}
                                    onValueChange={(value) => updateSetting('hoverAnimationType', value as any)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select animation type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="float">Float</SelectItem>
                                        <SelectItem value="pulse">Pulse</SelectItem>
                                        <SelectItem value="redraw">Redraw</SelectItem>
                                        <SelectItem value="color">Color</SelectItem>
                                        <SelectItem value="sequential">Sequential</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SVGLineDrawGenerator
