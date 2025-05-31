'use client'

import { useState, useEffect } from 'react'
import { Search,   X,   SlidersHorizontal } from 'lucide-react'
import { Button } from '@dalim/core/ui/button'
import { Input } from '@dalim/core/ui/input'
import { Badge } from '@dalim/core/ui/badge'
import { Checkbox } from '@dalim/core/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@dalim/core/ui/popover'
import { Separator } from '@dalim/core/ui/separator'
import { Label } from '@dalim/core/ui/label'
import { Slider } from '@dalim/core/ui/slider'

export interface FilterOptions {
  searchText: string
  fontTypes: string[]
  tags: string[]
  featured: boolean | null
  sortBy: 'name' | 'downloads' | 'views' | 'date'
  sortOrder: 'asc' | 'desc'
  minDownloads: number
  minViews: number
}

interface AdvancedFilterBarProps {
  onFiltersChange: (filters: FilterOptions) => void
  availableTags: string[]
  availableTypes: string[]
  totalResults: number
}

export function AdvancedFilterBar({ 
  onFiltersChange, 
  availableTags, 
  availableTypes,
  totalResults 
}: AdvancedFilterBarProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    searchText: '',
    fontTypes: [],
    tags: [],
    featured: null,
    sortBy: 'name',
    sortOrder: 'asc',
    minDownloads: 0,
    minViews: 0
  })

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  useEffect(() => {
    onFiltersChange(filters)
    
    // Count active filters
    let count = 0
    if (filters.searchText) count++
    if (filters.fontTypes.length > 0) count++
    if (filters.tags.length > 0) count++
    if (filters.featured !== null) count++
    if (filters.minDownloads > 0) count++
    if (filters.minViews > 0) count++
    
    setActiveFiltersCount(count)
  }, [filters, onFiltersChange])

  const updateFilters = (updates: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...updates }))
  }

  const clearAllFilters = () => {
    setFilters({
      searchText: '',
      fontTypes: [],
      tags: [],
      featured: null,
      sortBy: 'name',
      sortOrder: 'asc',
      minDownloads: 0,
      minViews: 0
    })
  }

  const toggleFontType = (type: string) => {
    updateFilters({
      fontTypes: filters.fontTypes.includes(type)
        ? filters.fontTypes.filter(t => t !== type)
        : [...filters.fontTypes, type]
    })
  }

  const toggleTag = (tag: string) => {
    updateFilters({
      tags: filters.tags.includes(tag)
        ? filters.tags.filter(t => t !== tag)
        : [...filters.tags, tag]
    })
  }

  const removeFilter = (type: string, value?: string) => {
    switch (type) {
      case 'search':
        updateFilters({ searchText: '' })
        break
      case 'type':
        updateFilters({ fontTypes: filters.fontTypes.filter(t => t !== value) })
        break
      case 'tag':
        updateFilters({ tags: filters.tags.filter(t => t !== value) })
        break
      case 'featured':
        updateFilters({ featured: null })
        break
      case 'downloads':
        updateFilters({ minDownloads: 0 })
        break
      case 'views':
        updateFilters({ minViews: 0 })
        break
    }
  }

  return (
    <div className="my-3">
      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search fonts"
            value={filters.searchText}
            onChange={(e) => updateFilters({ searchText: e.target.value })}
            className="pl-9"
          />
          <div className="text-sm top-2 right-3 absolute text-muted-foreground">
        {totalResults} {totalResults === 1 ? 'font' : 'fonts'} found
      </div>
        </div>
        
        <div className="flex justify-center gap-2">
          <Select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onValueChange={(value) => {
              const [sortBy, sortOrder] = value.split('-') as [FilterOptions['sortBy'], FilterOptions['sortOrder']]
              updateFilters({ sortBy, sortOrder })
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name A-Z</SelectItem>
              <SelectItem value="name-desc">Name Z-A</SelectItem>
              <SelectItem value="downloads-desc">Most Downloads</SelectItem>
              <SelectItem value="downloads-asc">Least Downloads</SelectItem>
              <SelectItem value="views-desc">Most Views</SelectItem>
              <SelectItem value="views-asc">Least Views</SelectItem>
              <SelectItem value="date-desc">Newest First</SelectItem>
              <SelectItem value="date-asc">Oldest First</SelectItem>
            </SelectContent>
          </Select>

          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Advanced Filters</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear all
                  </Button>
                </div>

                <Separator />

                {/* Font Types */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Font Types</Label>
                  <div className="space-y-2">
                    {availableTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={filters.fontTypes.includes(type)}
                          onCheckedChange={() => toggleFontType(type)}
                        />
                        <Label htmlFor={`type-${type}`} className="text-sm capitalize">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Featured */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Featured</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured-only"
                        checked={filters.featured === true}
                        onCheckedChange={(checked) => 
                          updateFilters({ featured: checked ? true : null })
                        }
                      />
                      <Label htmlFor="featured-only" className="text-sm">
                        Featured fonts only
                      </Label>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Tags */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Tags</Label>
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {availableTags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tag-${tag}`}
                          checked={filters.tags.includes(tag)}
                          onCheckedChange={() => toggleTag(tag)}
                        />
                        <Label htmlFor={`tag-${tag}`} className="text-sm">
                          {tag}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Download Count Range */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Minimum Downloads: {filters.minDownloads}
                  </Label>
                  <Slider
                    value={[filters.minDownloads]}
                    onValueChange={([value]) => updateFilters({ minDownloads: value })}
                    max={1000}
                    step={10}
                    className="w-full"
                  />
                </div>

                <Separator />

                {/* View Count Range */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Minimum Views: {filters.minViews}
                  </Label>
                  <Slider
                    value={[filters.minViews]}
                    onValueChange={([value]) => updateFilters({ minViews: value })}
                    max={5000}
                    step={50}
                    className="w-full"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {filters.searchText && (
            <Badge variant="secondary" className="gap-1">
              Search: {filters.searchText}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('search')}
              />
            </Badge>
          )}
          
          {filters.fontTypes.map((type) => (
            <Badge key={type} variant="secondary" className="gap-1">
              Type: {type}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('type', type)}
              />
            </Badge>
          ))}
          
          {filters.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              Tag: {tag}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('tag', tag)}
              />
            </Badge>
          ))}
          
          {filters.featured && (
            <Badge variant="secondary" className="gap-1">
              Featured only
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('featured')}
              />
            </Badge>
          )}
          
          {filters.minDownloads > 0 && (
            <Badge variant="secondary" className="gap-1">
              Min downloads: {filters.minDownloads}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('downloads')}
              />
            </Badge>
          )}
          
          {filters.minViews > 0 && (
            <Badge variant="secondary" className="gap-1">
              Min views: {filters.minViews}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('views')}
              />
            </Badge>
          )}
        </div>
      )}

      
      
    </div>
  )
}
