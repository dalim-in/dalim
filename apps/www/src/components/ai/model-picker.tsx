'use client'
import { MODELS, type modelID } from '@/src/actions/providers'
import { Button } from '@dalim/core/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
import { Mic, Paperclip } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@dalim/core/ui/tooltip'

interface ModelPickerProps {
    selectedModel: modelID
    setSelectedModel: (model: modelID) => void
}

export const ModelPicker = ({ selectedModel, setSelectedModel }: ModelPickerProps) => {
    return (
        <div className="absolute bottom-2 left-2 flex gap-2">
            <Select
                value={selectedModel}
                onValueChange={setSelectedModel}>
                <SelectTrigger className="w-24">
                    <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {MODELS.map((modelId) => (
                            <SelectItem
                                key={modelId}
                                value={modelId}>
                                {modelId}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Tooltip>
                <TooltipTrigger asChild>
            <Button
                disabled
                size={'icon'}
                variant={'ghost'}>
                <Paperclip />
            </Button>
                </TooltipTrigger >
                <TooltipContent side='bottom'>
                    <p>Attact Images, PDF, etc.</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        disabled
                        size={'icon'}
                        variant={'ghost'}>
                        <Mic />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side='bottom'>
                    <p>Use Voice Mode</p>
                </TooltipContent>
            </Tooltip>
        </div>
    )
}
