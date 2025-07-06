'use client'

import type React from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'

import { ScrollArea, ScrollBar } from '@dalim/core/ui/scroll-area'
import { cn } from '@/src/lib/utils'
import { useState } from 'react'
import { type IPreset, presets } from './data'

interface PresetGalleryProps {
    onSelectPreset: (preset: IPreset) => void
    activePresetId?: string
}

export function PresetGallery({ onSelectPreset, activePresetId }: PresetGalleryProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    const filteredPresets = selectedCategory === 'all' ? presets : presets.filter((preset) => preset.category === selectedCategory)

    return (
        <div className="w-full">
            <div className="mb-2 flex items-center gap-1">
                <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pattern">Patterns</SelectItem>
                        <SelectItem value="gradient">Gradients</SelectItem>
                        <SelectItem value="combination">Combinations</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <ScrollArea className="h-[80vh] w-full whitespace-nowrap">
                <div className="grid gap-2">
                    {filteredPresets.map((preset) => (
                        <PresetCard
                            key={preset.id}
                            preset={preset}
                            onSelect={onSelectPreset}
                            isActive={preset.id === activePresetId}
                        />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

interface PresetCardProps {
    preset: IPreset
    onSelect?: (preset: IPreset) => void
    isActive: boolean
    className?: string
    cardClassName?: string
    hideName?: boolean
}

export function PresetCard({ preset, onSelect, isActive, className, cardClassName, hideName }: PresetCardProps) {
    return (
        <div
            className={cn('group relative cursor-pointer transition-colors', isActive && 'border-3 rounded-lg border-purple-600', className)}
            onClick={() => onSelect?.(preset)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onSelect?.(preset)
                }
            }}>
            <div className={cn('h-30 relative w-full overflow-hidden rounded-md border', cardClassName)}>
                {/* Base background */}
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: preset.config.bgColor }}
                />

                {/* Pattern layer */}
                {preset.config.patternType !== 'none' && (
                    <div
                        className="absolute inset-0"
                        style={getPatternStyle(preset.config)}
                    />
                )}

                {/* Gradient layer */}
                {preset.config.useGradient && (
                    <div
                        className="absolute inset-0"
                        style={getGradientStyle(preset.config)}
                    />
                )}

                {/* Mask layer - simplified for preview */}
                {preset.config.useMask && (
                    <div
                        className="absolute inset-0"
                        style={getMaskStyle(preset.config)}
                    />
                )}
            </div>
            {!hideName && <p className="absolute left-2 top-2 rounded-md bg-[#fff000] px-1.5 py-0.5 text-xs font-normal leading-none text-[#000000] no-underline group-hover:no-underline">{preset.name}</p>}
        </div>
    )
}
// Add these helper functions for pattern, gradient, and mask styles
function getPatternStyle(config: IPreset['config']): React.CSSProperties {
    if (config.patternType === 'none') return {}

    let patternStyle: React.CSSProperties = {}

    switch (config.patternType) {
        case 'grid':
            patternStyle = {
                backgroundImage: `linear-gradient(to right, ${config.gridLineColor} 1px, transparent 1px), linear-gradient(to bottom, ${config.gridLineColor} 1px, transparent 1px)`,
                backgroundSize: `${config.gridSizeX}px ${config.gridSizeY}px`,
            }
            break
        case 'dots':
            patternStyle = {
                backgroundImage: `radial-gradient(${config.dotColor} 1px, transparent 1px)`,
                backgroundSize: `${config.dotSize}px ${config.dotSize}px`,
            }
            break
        case 'lineGrid':
            patternStyle = {
                backgroundImage: `linear-gradient(to right, ${config.lineGridColor} 1px, transparent 1px), linear-gradient(to bottom, ${config.lineGridColor} 1px, transparent 1px)`,
                backgroundSize: `${config.lineGridSizeX}rem ${config.lineGridSizeY}rem`,
            }
            break
        case 'dotGrid':
            patternStyle = {
                backgroundImage: `radial-gradient(${config.dotGridColor} 1px, transparent 1px)`,
                backgroundSize: `${config.dotGridSize}px ${config.dotGridSize}px`,
            }
            break
        case 'repeatingLinear':
            patternStyle = {
                backgroundImage: `repeating-linear-gradient(${config.repeatingLinearAngle}deg, ${config.repeatingLinearColor} 0px 1px, transparent 1px ${config.repeatingLinearSize}px)`,
            }
            break
    }

    return patternStyle
}

function getGradientStyle(config: IPreset['config']): React.CSSProperties {
    if (!config.useGradient) return {}

    const gradientStyle: React.CSSProperties = {}

    if (config.gradientType === 'radial' && config.gradientStops) {
        // Format color stops for radial gradient
        const colorStops = config.gradientStops
            .map((stop) => {
                const rgba = `rgba(${hexToRgb(stop.color)}, ${stop.alpha})`
                return `${rgba} ${stop.position}%`
            })
            .join(', ')

        gradientStyle.background = `radial-gradient(${config.gradientSizeX || 125}% ${config.gradientSizeY || 125}% at ${config.gradientPositionX || 50}% ${config.gradientPositionY || 50}%, ${colorStops})`
    } else if (config.gradientType === 'linear' && config.gradientStops) {
        const colorStops = config.gradientStops
            .map((stop) => {
                const rgba = `rgba(${hexToRgb(stop.color)}, ${stop.alpha})`
                return `${rgba} ${stop.position}%`
            })
            .join(', ')

        gradientStyle.background = `linear-gradient(${config.linearGradientAngle || 90}deg, ${colorStops})`
    }

    return gradientStyle
}

function getMaskStyle(config: IPreset['config']): React.CSSProperties {
    if (!config.useMask) return {}

    let maskPosition = '50% 50%'
    let maskShape = 'ellipse'
    let maskSize = `${config.maskWidth || 80}% ${config.maskHeight || 50}%`

    if (config.customMaskPosition) {
        maskPosition = `${config.maskPositionX || 50}% ${config.maskPositionY || 50}%`
    } else if (config.maskType) {
        switch (config.maskType) {
            case 'top':
                maskPosition = '50% 0%'
                break
            case 'bottom':
                maskPosition = '50% 100%'
                break
            case 'left':
                maskPosition = '0% 50%'
                break
            case 'right':
                maskPosition = '100% 50%'
                break
            case 'topLeft':
                maskPosition = '0% 0%'
                break
            case 'topRight':
                maskPosition = '100% 0%'
                break
            case 'bottomLeft':
                maskPosition = '0% 100%'
                break
            case 'bottomRight':
                maskPosition = '100% 100%'
                break
            case 'circle':
                maskShape = 'circle'
                maskSize = `${config.maskWidth || 80}%`
                break
        }
    }

    return {
        maskImage: `radial-gradient(${maskShape} ${maskSize} at ${maskPosition}, black ${config.maskOpacity || 70}%, transparent ${config.maskFade || 110}%)`,
        WebkitMaskImage: `radial-gradient(${maskShape} ${maskSize} at ${maskPosition}, black ${config.maskOpacity || 70}%, transparent ${config.maskFade || 110}%)`,
    }
}

function hexToRgb(hex: string): string {
    const cleanedHex = hex.replace('#', '')

    let r: number
    let g: number
    let b: number

    if (cleanedHex.length === 3) {
        r = Number.parseInt(cleanedHex[0] + cleanedHex[0], 16)
        g = Number.parseInt(cleanedHex[1] + cleanedHex[1], 16)
        b = Number.parseInt(cleanedHex[2] + cleanedHex[2], 16)
    } else {
        r = Number.parseInt(cleanedHex.substring(0, 2), 16)
        g = Number.parseInt(cleanedHex.substring(2, 4), 16)
        b = Number.parseInt(cleanedHex.substring(4, 6), 16)
    }

    return `${r}, ${g}, ${b}`
}
