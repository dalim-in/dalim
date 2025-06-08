'use client'
import { useState } from 'react'
import { IconShowcase } from './icon-showcase'
import { SearchIcon } from './search-icon'
import { ControlIcon } from './control-icon'

export function MainIcons() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedTag, setSelectedTag] = useState('all')
    const [selectedIcon, setSelectedIcon] = useState<string>('')

    const [strokeLinecap, setStrokeLinecap] = useState<'butt' | 'round' | 'square'>('round')
    const [strokeLinejoin, setStrokeLinejoin] = useState<'round' | 'miter' | 'bevel'>('round')

    const [iconSize, setIconSize] = useState([32])
    const [iconVariant, setIconVariant] = useState<'stroke' | 'solid' | 'duotone' | 'twotone' | 'bulk'>('stroke')
    const [iconColor, setIconColor] = useState('currentColor')
    const [strokeWidth, setStrokeWidth] = useState([1.5])
    const [animation, setAnimation] = useState(false)
    const [loop, setLoop] = useState(false)
    return (
        <div className="mt-2">
            <div className="">
                <SearchIcon
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedTag={selectedTag}
                    setSelectedTag={setSelectedTag}
                    iconVariant={iconVariant}
                    setIconVariant={setIconVariant}
                    selectedIcon={selectedIcon}
                />
                <div className="grid gap-3 md:grid-cols-[20%_80%] lg:grid-cols-[17%_83%]">
                    <div className="">
                        <ControlIcon
                            iconSize={iconSize}
                            iconVariant={iconVariant}
                            setIconSize={setIconSize}
                            iconColor={iconColor}
                            setIconColor={setIconColor}
                            strokeWidth={strokeWidth}
                            setStrokeWidth={setStrokeWidth}
                            animation={animation}
                            setAnimation={setAnimation}
                            loop={loop}
                            setLoop={setLoop}
                            selectedIcon={selectedIcon}
                            strokeLinecap={strokeLinecap}
                            setStrokeLinecap={setStrokeLinecap}
                            strokeLinejoin={strokeLinejoin}
                            setStrokeLinejoin={setStrokeLinejoin}
                        />
                    </div>

                    <IconShowcase
                        searchTerm={searchTerm}
                        selectedCategory={selectedCategory}
                        selectedTag={selectedTag}
                        iconVariant={iconVariant}
                        iconColor={iconColor}
                        strokeWidth={strokeWidth}
                        animation={animation}
                        strokeLinecap={strokeLinecap} 
                        strokeLinejoin={strokeLinejoin} 
                        loop={loop}
                        selectedIcon={selectedIcon}
                        setSelectedIcon={setSelectedIcon}
                    />
                </div>
            </div>
        </div>
    )
}
