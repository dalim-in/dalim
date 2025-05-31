'use client'

import { useState, useEffect } from 'react' 
import { Loader2 } from 'lucide-react'
import { fetchPopularTags } from '@/src/lib/get-tags'
import { useDebounce } from '@/src/hooks/use-debounce'

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@dalim/core/ui/select'

interface TagSelectorProps {
    selectedTags: string[]
    onTagsChange: (tags: string[]) => void
}

interface TagWithCount {
    tag: string
    count: number
}

export function TagSelector({ selectedTags, onTagsChange }: TagSelectorProps) {
    const [allTags, setAllTags] = useState<TagWithCount[]>([])
    const [search, ] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const debouncedSearch = useDebounce(search, 300)

    useEffect(() => {
        const loadTags = async () => {
            setIsLoading(true)
            const result = await fetchPopularTags()
            if (result.success) {
                setAllTags(result.tags)
            }
            setIsLoading(false)
        }

        loadTags()
    }, [])

    const filteredTags = debouncedSearch ? allTags.filter((t) => t.tag.toLowerCase().includes(debouncedSearch.toLowerCase())) : allTags

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            onTagsChange(selectedTags.filter((t) => t !== tag))
        } else {
            onTagsChange([...selectedTags, tag])
        }
    }
 

    return (
        <div className="space-y-4">
            {/* Custom Select UI */}
            <div className="space-y-2">
                <Select onValueChange={toggleTag}>
                    <SelectTrigger className='w-full lg:w-60'>
                        <SelectValue placeholder="Select tag" />
                    </SelectTrigger>

                    <SelectContent className="max-h-60 overflow-y-auto">
                         
                        {isLoading ? (
                            <div className="text-muted-foreground flex items-center justify-center p-4 text-sm">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading tags...
                            </div>
                        ) : filteredTags.length > 0 ? (
                            filteredTags.map(({ tag, count }) => (
                                <SelectItem
                                    key={tag}
                                    value={tag}>
                                    {tag} <span className="text-muted-foreground text-xs">({count})</span>
                                </SelectItem>
                            ))
                        ) : (
                            <div className="text-muted-foreground p-2 text-center text-sm">No tags found</div>
                        )}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
