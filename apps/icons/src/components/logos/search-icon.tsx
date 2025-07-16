/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Search } from 'lucide-react'
import { Input } from '@dalim/core/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
import { getAllLogoCategories, getAllLogos, getAllLogoTags } from 'dalim-icons'
import { CopyButton } from '@dalim/core/components/common/copy-button'
import Link from 'next/link'
import { Button } from '@dalim/core/ui/button'

export function SearchIcon({ searchTerm, setSearchTerm, selectedIcon, selectedCategory, setSelectedCategory, selectedTag, setSelectedTag, iconVariant, setIconVariant }: { searchTerm: string; setSearchTerm: (val: string) => void; selectedCategory: string; setSelectedCategory: (val: string) => void; selectedTag: string; setSelectedTag: (val: string) => void; iconVariant: 'icon' | 'wordmark'; selectedIcon: string; setIconVariant: (val: any) => void }) {
    const allCategories = getAllLogoCategories()
    const allTags = getAllLogoTags()
    const Icons = getAllLogos()
 
    return (
        <div className="sticky top-20 z-10 -mx-6 flex justify-center border bg-neutral-100/60 py-3 backdrop-blur-lg backdrop-filter dark:bg-neutral-900/60">
            <div className="flex w-full flex-wrap justify-center gap-2 px-6">
                <div className="relative">
                    <Input
                         placeholder={`Search ${Icons.length} logos...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10"
                    />
                    <Search className="text-muted-foreground top-4.5 absolute left-3 h-4 w-4 -translate-y-1/2 transform" />
                </div>
                <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {allCategories.map((category) => (
                            <SelectItem
                                key={category}
                                value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
                        <SelectItem value="icon">Icon</SelectItem>
                        <SelectItem value="wordmark">Wordmark</SelectItem> 
                    </SelectContent>
                </Select>
                {selectedIcon && (
                    <div>
                        <h1 className="flex h-9  justify-between items-center text-nowrap rounded-md border font-mono">
                            <span className="px-4 overflow-hidden w-40">{`<${selectedIcon} />`}</span>
                            <CopyButton componentSource={`<${selectedIcon} />`} />
                        </h1>
                    </div>
                )}
                <Link  href="mailto:contact@dalim.in">
                    <Button>Submit a Logo</Button>
                </Link>
            </div>
        </div>
    )
}
