'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@dalim/core/ui/input'
import { Badge } from '@dalim/core/ui/badge'
import { Button } from '@dalim/core/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { DALIM_URL } from '@dalim/auth'

export function FontsFilterBar() {
    const [activeFilters, setActiveFilters] = useState<string[]>([])
    const { data: session } = useSession()

    const toggleFilter = (filter: string) => {
        if (activeFilters.includes(filter)) {
            setActiveFilters(activeFilters.filter((f) => f !== filter))
        } else {
            setActiveFilters([...activeFilters, filter])
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                    <Search className="text-muted-foreground absolute left-3 top-2.5 h-4 w-4" />
                    <Input
                        placeholder="Search fonts..."
                        className="pl-9"
                    />
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Font type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All types</SelectItem>
                            <SelectItem value="ttf">TTF</SelectItem>
                            <SelectItem value="otf">OTF</SelectItem>
                            <SelectItem value="woff">WOFF</SelectItem>
                            <SelectItem value="woff2">WOFF2</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="popular">Most popular</SelectItem>
                            <SelectItem value="name">Name (A-Z)</SelectItem>
                            <SelectItem value="downloads">Most downloads</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Link href={session ? '/upload' : `${DALIM_URL}/login`}>
                    <Button>{session ? 'Submit Your Font' : 'Login'}</Button>
                </Link>
            </div>

            <div className="flex flex-wrap gap-2">
                <Badge
                    variant={activeFilters.includes('featured') ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleFilter('featured')}>
                    Featured
                </Badge>
                <Badge
                    variant={activeFilters.includes('serif') ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleFilter('serif')}>
                    Serif
                </Badge>
                <Badge
                    variant={activeFilters.includes('sans-serif') ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleFilter('sans-serif')}>
                    Sans-serif
                </Badge>
                <Badge
                    variant={activeFilters.includes('monospace') ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleFilter('monospace')}>
                    Monospace
                </Badge>
                <Badge
                    variant={activeFilters.includes('display') ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleFilter('display')}>
                    Display
                </Badge>
                <Badge
                    variant={activeFilters.includes('handwriting') ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleFilter('handwriting')}>
                    Handwriting
                </Badge>

                {activeFilters.length > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveFilters([])}
                        className="ml-2 h-6">
                        Clear all
                    </Button>
                )}
            </div>
        </div>
    )
}
