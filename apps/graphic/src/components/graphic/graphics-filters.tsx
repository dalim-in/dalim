'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useCallback, useEffect } from 'react'
import { Button } from '@dalim/core/ui/button'
import { Input } from '@dalim/core/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
 
import { Search,  Loader2 } from 'lucide-react'
import Link from 'next/link'
import { DALIM_URL } from '@dalim/auth'
import { useSession } from 'next-auth/react'

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'ILLUSTRATION', label: 'Illustration' },
  { value: 'ICON', label: 'Icon' },
  { value: 'TEMPLATE', label: 'Template' },
  { value: 'MOCKUP', label: 'Mockup' },
  { value: 'MODEL', label: 'Model' },
  { value: 'BACKGROUND', label: 'Background' },
  { value: 'OTHER', label: 'Other' },
]


export function GraphicsFilters() {
    const session = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()

    const [search, setSearch] = useState(searchParams.get('search') || '')
    const [category, setCategory] = useState(searchParams.get('category') || '')
    const [tags, setTags] = useState<string[]>(searchParams.get('tags')?.split(',').filter(Boolean) || [])
     
    const [isSearching, setIsSearching] = useState(false)

    

    const updateURL = useCallback(
        (newParams: Record<string, string | string[]>) => {
            const params = new URLSearchParams()

            // Add existing search params first, then override with new ones
            searchParams.forEach((value, key) => {
                if (key !== 'page') {
                    // Always reset page when filters change
                    params.set(key, value)
                }
            })

            // Update with new params
            Object.entries(newParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (Array.isArray(value)) {
                        if (value.length > 0) {
                            params.set(key, value.join(','))
                        } else {
                            params.delete(key)
                        }
                    } else if (value.toString().trim()) {
                        params.set(key, value.toString())
                    } else {
                        params.delete(key)
                    }
                } else {
                    params.delete(key)
                }
            })

            const queryString = params.toString()
            const url = queryString ? `/graphic?${queryString}` : '/'

            setIsSearching(true)
            router.push(url)

            // Reset searching state after a short delay
            setTimeout(() => setIsSearching(false), 500)
        },
        [router, searchParams]
    )

    // Auto search with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            updateURL({ search, category, tags })
        }, 300) // 300ms delay

        return () => clearTimeout(timeoutId)
    }, [search, updateURL, category, tags])

    const handleCategoryChange = (newCategory: string) => {
        const categoryValue = newCategory === '' ? '' : newCategory
        setCategory(categoryValue)
        // Category change is immediate, no debounce needed
    }
 

    const clearFilters = () => {
        setSearch('')
        setCategory('')
        setTags([])
        router.push('/graphics')
    }

    const hasActiveFilters = search || category || tags.length > 0

    return (
        <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-2">
                <div className="space-y-2">
                    <div className="relative">
                        <Input
                            id="search"
                            placeholder="Search graphics..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pr-10"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">{isSearching ? <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" /> : <Search className="text-muted-foreground h-4 w-4" />}</div>
                    </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <Select
                        value={category}
                        onValueChange={handleCategoryChange}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem
                                    key={cat.value || 'all'}
                                    value={cat.value || 'all'} // Ensure fallback is a non-empty string
                                >
                                    {cat.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                 
                {hasActiveFilters && (
                    <Button
                        variant="outline"
                        onClick={clearFilters}>
                        Clear All Filters
                    </Button>
                )}
                <Link href={session ? '/upload' : `${DALIM_URL}/login`}>
                    <Button>{session ? 'Submit a graphic' : 'Submit a graphic'}</Button>
                </Link>
            </div>
        </div>
    )
}
