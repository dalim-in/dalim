/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useMemo } from 'react'
import * as Icons from 'dalim-icons'
import { getAllIcons } from 'dalim-icons'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@dalim/core/ui/tooltip'

import { Label } from '@dalim/core/ui/label'
import { RadioGroup, RadioGroupItem } from '@dalim/core/ui/radio-group'
import Link from 'next/link'
import { Button } from '@dalim/core/ui/button'

export function IconShowcase({
    searchTerm,
    selectedIcon,
    setSelectedIcon,
    selectedCategory,
    selectedTag,
    strokeLinecap,
    strokeLinejoin,
    iconVariant,
    iconColor,
    strokeWidth,
    animation,
    loop,
}: {
    searchTerm: string
    selectedCategory: string
    selectedTag: string
    iconVariant: 'stroke' | 'solid' | 'duotone' | 'twotone' | 'bulk'
    iconColor: string
    strokeWidth: number[]
    animation: boolean
    strokeLinecap: 'butt' | 'round' | 'square'
    strokeLinejoin: 'round' | 'miter' | 'bevel'
    loop: boolean
    selectedIcon: string
    setSelectedIcon: any
}) {
    const allIcons = getAllIcons()

    const filteredIcons = useMemo(() => {
        return allIcons.filter((icon) => {
            const matchesSearch = searchTerm === '' || icon.name.toLowerCase().includes(searchTerm.toLowerCase()) || icon.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

            const matchesCategory = selectedCategory === 'all' || icon.category === selectedCategory
            const matchesTag = selectedTag === 'all' || icon.tags.includes(selectedTag)

            return matchesSearch && matchesCategory && matchesTag
        })
    }, [allIcons, searchTerm, selectedCategory, selectedTag])

    const IconComponent = ({ iconName }: { iconName: string }) => {
        const Icon = (Icons as Record<string, any>)[iconName]
        if (!Icon) return null

        return (
            <Icon
                size={32}
                variant={iconVariant}
                color={iconColor}
                strokeLinecap={strokeLinecap}
                strokeLinejoin={strokeLinejoin}
                strokeWidth={strokeWidth[0]}
                animation={animation}
                loop={loop}
            />
        )
    }

    const handleIconClick = (iconName: string) => {
        setSelectedIcon(iconName)
    }

    return (
        <div className="mx-1 my-4 h-[868px] overflow-auto">
            {filteredIcons.length === 0 && (
                <div className="text-muted-foreground grid gap-3 py-40 text-center text-sm">
                    No icons found for this search.
                    <Link href="mailto:contact@dalim.in">
                        <Button>Request an Icon</Button>
                    </Link>
                </div>
            )}

            <RadioGroup
                value={selectedIcon}
                className=""
                onValueChange={setSelectedIcon}>
                <div className="flex flex-wrap gap-2">
                    {filteredIcons.map((icon) => (
                        <div
                            key={icon.name}
                            className="flex items-center">
                            <RadioGroupItem
                                value={icon.name}
                                id={icon.name}
                                className="sr-only"
                            />
                            <Label
                                htmlFor={icon.name}
                                className="cursor-pointer">
                                <TooltipProvider delayDuration={0}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div
                                                className={`hover:bg-muted/60 dark:hover:bg-muted/20 bg-muted dark:bg-muted/20 flex h-20 w-20 cursor-pointer items-center justify-center rounded-md transition ${selectedIcon === icon.name ? 'ring-primary bg-muted/40 border' : ''}`}
                                                onClick={() => handleIconClick(icon.name)}>
                                                <IconComponent iconName={icon.name} />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            className="-mt-2"
                                            side="bottom">
                                            {icon.name}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </Label>
                        </div>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
}

export function IconShowcaseWWW({
    searchTerm,
    selectedIcon,
    setSelectedIcon,
    iconColor,
    strokeWidth,
    animation,
    loop,
}: {
    searchTerm: string

    iconColor: string
    strokeWidth: number[]
    animation: boolean
    loop: boolean
    selectedIcon: string
    setSelectedIcon: any
}) {
    const allIcons = getAllIcons()

    const filteredIcons = useMemo(() => {
        return allIcons.filter((icon) => {
            const matchesSearch = searchTerm === '' || icon.name.toLowerCase().includes(searchTerm.toLowerCase()) || icon.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

            return matchesSearch
        })
    }, [allIcons, searchTerm])

    const IconComponent = ({ iconName }: { iconName: string }) => {
        const Icon = (Icons as Record<string, any>)[iconName]
        if (!Icon) return null

        return (
            <Icon
                size={32}
                color={iconColor}
                strokeWidth={strokeWidth[0]}
                animation={animation}
                loop={loop}
            />
        )
    }

    const handleIconClick = (iconName: string) => {
        setSelectedIcon(iconName)
    }

    return (
        <div className="h-[400px] overflow-auto">
            <RadioGroup
                value={selectedIcon}
                className=""
                onValueChange={setSelectedIcon}>
                <div className="flex flex-wrap justify-center gap-1">
                    {filteredIcons.slice(0, 100).map((icon) => (
                        <div
                            key={icon.name}
                            className="flex items-center">
                            <RadioGroupItem
                                value={icon.name}
                                id={icon.name}
                                className="sr-only"
                            />
                            <Label
                                htmlFor={icon.name}
                                className="cursor-pointer">
                                <TooltipProvider delayDuration={0}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div
                                                className={`hover:bg-muted/60 dark:hover:bg-muted/20 bg-muted dark:bg-muted/20 flex h-20 w-20 cursor-pointer items-center justify-center rounded-md transition ${selectedIcon === icon.name ? 'ring-primary bg-muted/40 border' : ''}`}
                                                onClick={() => handleIconClick(icon.name)}>
                                                <IconComponent iconName={icon.name} />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            className="-mt-3"
                                            side="bottom">
                                            {icon.name}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </Label>
                        </div>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
}
