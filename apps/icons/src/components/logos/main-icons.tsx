'use client'
import { useState } from 'react'
import { IconShowcase } from './icon-showcase'
import { SearchIcon } from './search-icon'
import { ControlIcon } from './control-icon' 

export function MainLogos() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedTag, setSelectedTag] = useState('all')
    const [selectedIcon, setSelectedIcon] = useState<string>('')

    const [iconSize, setIconSize] = useState([24])
    const [iconVariant, setIconVariant] = useState<'icon' | 'wordmark'>('icon')
    const [iconColor, setIconColor] = useState('currentColor')

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
                <div className="grid gap-3 md:grid-cols-[20%_80%] lg:grid-cols-[15%_85%] xl:grid-cols-[12%_88%]">
                    <div className="">
                        <ControlIcon
                            iconSize={iconSize}
                            iconVariant={iconVariant}
                            setIconSize={setIconSize}
                            iconColor={iconColor}
                            setIconColor={setIconColor}
                            selectedIcon={selectedIcon}
                        />
                    </div>

                    <IconShowcase
                        searchTerm={searchTerm}
                        selectedCategory={selectedCategory}
                        selectedTag={selectedTag}
                        iconVariant={iconVariant}
                        iconColor={iconColor}
                        selectedIcon={selectedIcon}
                        setSelectedIcon={setSelectedIcon}
                    /> 
                </div>
            </div>
        </div>
    )
}
