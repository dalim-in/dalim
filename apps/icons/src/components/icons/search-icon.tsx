/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Search } from 'lucide-react'
import { Input } from '@dalim/core/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
import { getAllTags, getAllIcons } from 'dalim-icons'
import { CopyButton } from '@dalim/core/components/common/copy-button'

export function SearchIcon({ searchTerm, setSearchTerm, selectedIcon, selectedTag, setSelectedTag, iconVariant, setIconVariant }: { searchTerm: string; setSearchTerm: (val: string) => void; selectedCategory: string; setSelectedCategory: (val: string) => void; selectedTag: string; setSelectedTag: (val: string) => void; iconVariant: 'stroke' | 'solid' | 'duotone' | 'twotone' | 'bulk'; selectedIcon: string; setIconVariant: (val: any) => void }) {
     
    const allTags = getAllTags()
    const Icons = getAllIcons()

    return (
        <div className="-mx-3 flex justify-center border-b py-3">
            <div className="flex w-full flex-wrap justify-center gap-2 px-6">
                <div className="relative">
                    <Input
                        placeholder={`Search ${Icons.length} icons...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10"
                    />

                    <Search className="text-muted-foreground top-4.5 absolute left-3 h-4 w-4 -translate-y-1/2 transform" />
                </div> 
                <Select
                    value={selectedTag}
                    onValueChange={setSelectedTag}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select tag" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Tags</SelectItem>
                        {allTags.map((tag) => (
                            <SelectItem
                                key={tag}
                                value={tag}>
                                {tag}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    value={iconVariant}
                    onValueChange={(value: any) => setIconVariant(value)}>
                    <SelectTrigger className="w-40">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="stroke">Stroke</SelectItem>
                        <SelectItem value="solid">Solid</SelectItem>
                        <SelectItem value="duotone">Duotone</SelectItem>
                        <SelectItem value="twotone">Twotone</SelectItem>
                        <SelectItem value="bulk">Bulk</SelectItem>
                    </SelectContent>
                </Select>
                {selectedIcon && (
                    <div>
                        <h1 className="flex h-9 items-center justify-between text-nowrap rounded-md border font-mono">
                            <span className="w-40 overflow-hidden px-4">{`<${selectedIcon} />`}</span>
                            <CopyButton componentSource={`<${selectedIcon} />`} />
                        </h1>
                    </div>
                )}
            </div>
        </div>
    )
}
