'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@dalim/core/ui/button'
import { Input } from '@dalim/core/ui/input'
import { Label } from '@dalim/core/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
import { Badge } from '@dalim/core/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@dalim/core/ui/card'
import { Search, X } from 'lucide-react'

const categories = [
    { value: '', label: 'All Categories' },
    { value: 'LOGO', label: 'Logo' },
    { value: 'ILLUSTRATION', label: 'Illustration' },
    { value: 'ICON', label: 'Icon' },
    { value: 'BANNER', label: 'Banner' },
    { value: 'POSTER', label: 'Poster' },
    { value: 'INFOGRAPHIC', label: 'Infographic' },
    { value: 'TEMPLATE', label: 'Template' },
    { value: 'MOCKUP', label: 'Mockup' },
    { value: 'PATTERN', label: 'Pattern' },
    { value: 'TEXTURE', label: 'Texture' },
    { value: 'OTHER', label: 'Other' },
]

export function GraphicsFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [search, setSearch] = useState(searchParams.get('search') || '')
    const [category, setCategory] = useState(searchParams.get('category') || '')
    const [tags, setTags] = useState<string[]>(searchParams.get('tags')?.split(',').filter(Boolean) || [])
    const [currentTag, setCurrentTag] = useState('')

    const updateURL = (newParams: Record<string, string | string[]>) => {
        const params = new URLSearchParams()

        Object.entries(newParams).forEach(([key, value]) => {
            if (value) {
                if (Array.isArray(value)) {
                    if (value.length > 0) {
                        params.set(key, value.join(','))
                    }
                } else {
                    params.set(key, value)
                }
            }
        })

        router.push(`/graphics?${params.toString()}`)
    }

    const handleSearch = () => {
        updateURL({ search, category, tags })
    }

    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory)
        updateURL({ search, category: newCategory, tags })
    }

    const addTag = () => {
        if (currentTag.trim() && !tags.includes(currentTag.trim())) {
            const newTags = [...tags, currentTag.trim()]
            setTags(newTags)
            setCurrentTag('')
            updateURL({ search, category, tags: newTags })
        }
    }

    const removeTag = (tagToRemove: string) => {
        const newTags = tags.filter((tag) => tag !== tagToRemove)
        setTags(newTags)
        updateURL({ search, category, tags: newTags })
    }

    const clearFilters = () => {
        setSearch('')
        setCategory('')
        setTags([])
        router.push('/graphics')
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                    <Label>Search</Label>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Search graphics..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Button
                            size="icon"
                            onClick={handleSearch}>
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                        value={category}
                        onValueChange={handleCategoryChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories
                                .filter((cat) => cat.value !== '')
                                .map((cat) => (
                                    <SelectItem
                                        key={cat.value}
                                        value={cat.value}>
                                        {cat.label}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Add tag..."
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        />
                        <Button
                            size="icon"
                            onClick={addTag}
                            variant="outline">
                            +
                        </Button>
                    </div>
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="cursor-pointer">
                                    {tag}
                                    <X
                                        className="ml-1 h-3 w-3"
                                        onClick={() => removeTag(tag)}
                                    />
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

                {/* Clear Filters */}
                <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full">
                    Clear All Filters
                </Button>
            </CardContent>
        </Card>
    )
}
