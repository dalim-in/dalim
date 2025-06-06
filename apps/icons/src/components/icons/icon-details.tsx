/* eslint-disable @typescript-eslint/no-explicit-any */
'use client' 
import * as Icons from 'dalim-icons'
import { getAllIcons } from 'dalim-icons' 

export function IconDetails({ iconSize, iconVariant, iconColor, strokeWidth, animation, loop, selectedIcon }: { iconSize: number[]; iconVariant: 'stroke' | 'solid' | 'duotone' | 'twotone' | 'bulk'; iconColor: string; strokeWidth: number[]; animation: boolean; loop: boolean; selectedIcon: string }) {
    const allIcons = getAllIcons()

    const IconComponent = ({ iconName }: { iconName: string }) => {
        const Icon = (Icons as Record<string, any>)[iconName]
        if (!Icon) return null

        return (
            <Icon
                size={iconSize[0]}
                variant={iconVariant}
                color={iconColor}
                strokeWidth={strokeWidth[0]}
                animation={animation}
                loop={loop}
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
                            <div className="bg-muted/20 mt-3 flex aspect-square items-center justify-center border p-8">
                                <div className="scale-150">
                                    <IconComponent iconName={selectedIconData.name} />
                                </div>
                            </div>
                            <h1 className="text-brand text-center">{selectedIconData?.name || ''}</h1>
                            
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
