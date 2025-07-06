'use client'

import { Label } from '@dalim/core/ui/label'
import { Slider } from '@dalim/core/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
import { Switch } from '@dalim/core/ui/switch'

interface MaskControlsProps {
    useMask: boolean
    setUseMask: (use: boolean) => void
    customMaskPosition: boolean
    setCustomMaskPosition: (custom: boolean) => void
    maskType: string
    setMaskType: (type: string) => void
    maskPositionX: number
    setMaskPositionX: (position: number) => void
    maskPositionY: number
    setMaskPositionY: (position: number) => void
    maskWidth: number
    setMaskWidth: (width: number) => void
    maskHeight: number
    setMaskHeight: (height: number) => void
    maskOpacity: number
    setMaskOpacity: (opacity: number) => void
    maskFade: number
    setMaskFade: (fade: number) => void
}

export function MaskControls({ useMask, setUseMask, customMaskPosition, setCustomMaskPosition, maskType, setMaskType, maskPositionX, setMaskPositionX, maskPositionY, setMaskPositionY, maskWidth, setMaskWidth, maskHeight, setMaskHeight, maskOpacity, setMaskOpacity, maskFade, setMaskFade }: MaskControlsProps) {
    return (
        <div className={`relative mt-4 ${!useMask && 'h-full'}`}>
            {!useMask && <div className="bg-linear-to-t/srgb from-background absolute -bottom-5 left-0 h-[6.5rem] w-full dark:from-black" />}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Switch
                        id="useMask"
                        checked={useMask}
                        onCheckedChange={setUseMask}
                    />
                    <Label htmlFor="useMask">Use Mask</Label>
                </div>
            </div>

            <div className="my-3 flex items-center space-x-2">
                <Switch
                    id="customMaskPosition"
                    checked={customMaskPosition}
                    onCheckedChange={setCustomMaskPosition}
                />
                <Label htmlFor="customMaskPosition">Use Custom Position</Label>
            </div>

            {!customMaskPosition && (
                <div className="mb-2 space-y-2">
                    <Label htmlFor="maskType">Mask Position</Label>
                    <Select
                        value={maskType}
                        onValueChange={setMaskType}>
                        <SelectTrigger id="maskType">
                            <SelectValue placeholder="Select mask position" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="top">Top</SelectItem>
                            <SelectItem value="bottom">Bottom</SelectItem>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                            <SelectItem value="topLeft">Top Left</SelectItem>
                            <SelectItem value="topRight">Top Right</SelectItem>
                            <SelectItem value="bottomLeft">Bottom Left</SelectItem>
                            <SelectItem value="bottomRight">Bottom Right</SelectItem>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="circle">Circle</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            )}

            {customMaskPosition && (
                <div className="space-y-2 rounded-lg border p-4">
                    <div className="space-y-2">
                        <Label>Position X: {maskPositionX}%</Label>
                        <Slider
                            value={[maskPositionX]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={(value) => setMaskPositionX(value[0])}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Position Y: {maskPositionY}%</Label>
                        <Slider
                            value={[maskPositionY]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={(value) => setMaskPositionY(value[0])}
                        />
                    </div>
                </div>
            )}

            <div className="space-y-3">
                <div className="space-y-2">
                    <Label>Mask Width: {maskWidth}%</Label>
                    <Slider
                        value={[maskWidth]}
                        min={10}
                        max={150}
                        step={5}
                        onValueChange={(value) => setMaskWidth(value[0])}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Mask Height: {maskHeight}%</Label>
                    <Slider
                        value={[maskHeight]}
                        min={10}
                        max={150}
                        step={5}
                        onValueChange={(value) => setMaskHeight(value[0])}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Mask Opacity: {maskOpacity}%</Label>
                    <Slider
                        value={[maskOpacity]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(value) => setMaskOpacity(value[0])}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Mask Fade: {maskFade}%</Label>
                    <Slider
                        value={[maskFade]}
                        min={maskOpacity + 5}
                        max={200}
                        step={5}
                        onValueChange={(value) => setMaskFade(value[0])}
                    />
                </div>
            </div>
        </div>
    )
}
