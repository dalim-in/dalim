/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { GridPattern } from '@dalim/core/components/backgrunds/grid'
import * as Logos from 'dalim-icons'
import { getAllLogos } from 'dalim-icons'

export function IconDetails({ iconSize, iconVariant, iconColor, selectedIcon }: { iconSize: number[]; iconVariant: 'icon' | 'wordmark'; iconColor: string;   selectedIcon: string }) {
    const allIcons = getAllLogos()

    const IconComponent = ({ iconName }: { iconName: string }) => {
        const Icon = (Logos as Record<string, any>)[iconName]
        if (!Icon) return null

        return (
            <Icon
                size={iconSize[0]}
                variant={iconVariant}
                color={iconColor} 
            />
        )
    }

    const selectedIconData = allIcons.find((icon) => icon.name === selectedIcon)

    return (
        <div className="">
            <div className="">
                <div className="pt-6">
                    {selectedIconData && (
                        <div className="space-y-4">
                            <div className="bg-muted/20 relative mt-3 flex aspect-square items-center justify-center border p-8">
                                <GridPattern
                                    width={5}
                                    height={5}
                                    className="w-full opacity-30"
                                />
                                <div className="scale-150 cursor-pointer">
                                    <IconComponent iconName={selectedIconData.name} />
                                </div>
                            </div>
                            <h1 className="text-brand">{selectedIconData?.name || ''}</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export function CodeIconDetails({ iconSize, iconVariant, iconColor,   selectedIcon }: { iconSize: number[]; iconVariant: 'icon' | 'wordmark'; iconColor: string;  selectedIcon: string }) {
    const allIcons = getAllLogos()

    const IconComponent = ({ iconName }: { iconName: string }) => {
        const Icon = (Logos as Record<string, any>)[iconName]
        if (!Icon) return null

        return (
            <Icon
                size={iconSize[0]}
                variant={iconVariant}
                color={iconColor} 
            />
        )
    }

    const selectedIconData = allIcons.find((icon) => icon.name === selectedIcon)

    return (
        <div className="">
            {selectedIconData && (
                <div className="bg-muted/20 flex aspect-square w-40 items-center justify-center rounded-lg border p-8">
                    <IconComponent iconName={selectedIconData.name} />
                </div>
            )}
        </div>
    )
}
