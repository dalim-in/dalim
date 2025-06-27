'use client'
import { useState } from 'react'
import { IconShowcase, IconShowcaseWWW } from './icon-showcase'
import { SearchIcon } from './search-icon'
import { ControlIcon, ControlIconWWW } from './control-icon'
import { IconCategory } from './icon-categories'

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
        <div className="">
            <div className="">
                <div className="grid gap-3 md:grid-cols-[20%_60%_20%] lg:grid-cols-[15%_70%_15%] xl:grid-cols-[12%_76%_12%]">
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
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    </div>
                    <div>
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
                    <div className="">
                         <IconCategory
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export function MainIconsWWW() {
    const [searchTerm] = useState('')
    const [selectedIcon, setSelectedIcon] = useState<string>('')

    const [strokeLinecap, setStrokeLinecap] = useState<'butt' | 'round' | 'square'>('round')
    const [strokeLinejoin, setStrokeLinejoin] = useState<'round' | 'miter' | 'bevel'>('round')

    const [iconSize, setIconSize] = useState([32])
    const [iconColor, setIconColor] = useState('currentColor')
    const [strokeWidth, setStrokeWidth] = useState([1.5])
    const [animation, setAnimation] = useState(true)
    const [loop, setLoop] = useState(false)
    return (
        <div className="mb-6 mt-12">
            <div className="grid gap-3 md:flex">
                    <div className="my-3 md:col-span-1">
                        <ControlIconWWW
                            iconSize={iconSize}
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
                    <div className="mb-3 md:col-span-4">
                        <IconShowcaseWWW
                            searchTerm={searchTerm}
                            iconColor={iconColor}
                            strokeWidth={strokeWidth}
                            animation={animation}
                            loop={loop}
                            selectedIcon={selectedIcon}
                            setSelectedIcon={setSelectedIcon}
                        />
                    </div>
                </div>
        </div>
    )
}
