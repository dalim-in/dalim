'use client'

import { Button } from '@dalim/core/ui/button'
import { Input } from '@dalim/core/ui/input'
import { Label } from '@dalim/core/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@dalim/core/ui/popover'
import { Copy, Pipette } from 'lucide-react'
import { HexColorPicker } from 'react-colorful'
import { toast } from 'sonner'

interface ColorPickerPopoverProps {
    color: string
    onChange: (color: string) => void
    label: string
    isEyeDroppper?: boolean
}

export function ColorPickerPopover({ color, onChange, label, isEyeDroppper = false }: ColorPickerPopoverProps) {
    function copyToClipboard() {
        navigator.clipboard.writeText(color)
        toast('Copied!', {
            description: `${color} copied to clipboard`,
            duration: 2000,
        })
    }

    async function useEyeDropper() {
        if (!('EyeDropper' in window)) {
            toast.error('Not supported', {
                description: 'Eyedropper is not supported in your browser',
                duration: 3000,
            })
            return
        }

        try {
            const eyeDropper = new window.EyeDropper()
            const result = await eyeDropper.open()
            onChange(result.sRGBHex)
        } catch (e) {
            console.error('Error using eyedropper', e)
        }
    }

    return (
        <div className="flex items-center gap-2">
            <Label>{label}</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        size={'sm'}
                        className="w-8"
                        variant="outline"
                        style={{ backgroundColor: color }}>
                        <span className="sr-only">Pick a color</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-3">
                    <HexColorPicker
                        color={color}
                        onChange={onChange}
                        className="!w-full"
                    />
                    <div className="mt-2 flex w-full gap-2">
                        <Input
                            value={color}
                            onChange={(e) => onChange(e.target.value)}
                            className="h-10 w-full"
                        />
                        <Button
                            variant="outline"
                            onClick={copyToClipboard}
                            size={'sm'}
                            className="w-8"
                            style={{ borderRadius: '6px' }}>
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Copy color</span>
                        </Button>
                    </div>

                    {isEyeDroppper && (
                        <div className="mt-2 flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={useEyeDropper}
                                className="h-10 w-10 border-gray-300 bg-gray-100 text-gray-900 hover:bg-gray-200"
                                style={{ borderRadius: '6px' }}>
                                <Pipette className="h-4 w-4" />
                                <span className="sr-only">Pick color</span>
                            </Button>

                            <div
                                className="h-10 flex-1"
                                style={{ backgroundColor: color, borderRadius: '6px' }}
                            />
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    )
}
