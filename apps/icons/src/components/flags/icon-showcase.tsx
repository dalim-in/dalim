/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useMemo } from 'react'
import * as Flags from 'dalim-icons'
import { getAllFlags } from 'dalim-icons'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@dalim/core/ui/tooltip'

import { Label } from '@dalim/core/ui/label'
import { RadioGroup, RadioGroupItem } from '@dalim/core/ui/radio-group'

export function IconShowcase({ searchTerm, selectedIcon, setSelectedIcon, selectedCategory, selectedTag, iconVariant, iconColor }: { searchTerm: string; selectedCategory: string; selectedTag: string; iconVariant: 'icon' | 'wordmark'; iconColor: string; selectedIcon: string; setSelectedIcon: any }) {
    const allLogos = getAllFlags()

    const filteredIcons = useMemo(() => {
        return allLogos.filter((logo) => {
            const matchesSearch = searchTerm === '' || logo.name.toLowerCase().includes(searchTerm.toLowerCase()) || logo.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

            const matchesCategory = selectedCategory === 'all' || logo.category === selectedCategory
            const matchesTag = selectedTag === 'all' || logo.tags.includes(selectedTag)

            return matchesSearch && matchesCategory && matchesTag
        })
    }, [allLogos, searchTerm, selectedCategory, selectedTag])

    const IconComponent = ({ iconName }: { iconName: string }) => {
        const Logo = (Flags as Record<string, any>)[iconName]
        if (!Logo) return null

        return (
            <Logo
                size={60}  
                variant={iconVariant}
                color={iconColor}
            />
        )
    }

    const handleIconClick = (logoName: string) => {
        setSelectedIcon(logoName)
    }

    return (
        <div className="mx-1 my-4">
            <RadioGroup
                value={selectedIcon}
                className=""
                onValueChange={setSelectedIcon}>
                <div className="flex mb-100 flex-wrap justify-center gap-2 md:justify-start">
                    {filteredIcons.map((logo) => (
                        <div
                            key={logo.name}
                            className="flex h-40 w-40 items-center">
                            <RadioGroupItem
                                value={logo.name}
                                id={logo.name}
                                className="sr-only"
                            />
                            <Label
                                htmlFor={logo.name}
                                className="cursor-pointer">
                                <TooltipProvider delayDuration={0}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div
                                                className={`hover:bg-muted/60 dark:hover:bg-muted/20 bg-muted dark:bg-muted/20 flex h-40 w-40 cursor-pointer items-center justify-center rounded-[40px] transition ${selectedIcon === logo.name ? 'ring-primary bg-muted/40 border' : ''}`}
                                                onClick={() => handleIconClick(logo.name)}>
                                                <IconComponent iconName={logo.name} />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            className="-mt-4"
                                            side="bottom">
                                            {logo.name}
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
