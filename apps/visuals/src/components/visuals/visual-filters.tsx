"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@dalim/core/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@dalim/core/ui/select"
import { Button } from "@dalim/core/ui/button"
import { Search, X } from "lucide-react"
import { useState } from "react"
import { UploadVisualButton } from "./upload-visual-button"

const categories = [
  { value: "PORTFOLIO", label: "Portfolio" },
  { value: "BRANDING", label: "Branding" },
  { value: "TOOLS", label: "Tools" },
  { value: "AI", label: "AI" },
]

type VisualFiltersProps = {
  isAdmin: boolean;
};

export function VisualFilters({ isAdmin }: VisualFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("search") || "")

  const currentCategory = searchParams.get("category")
  const currentSearch = searchParams.get("search")

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`/?${params.toString()}`)
  }

  const handleSearch = () => {
    updateFilters("search", search || null)
  }

  const clearFilters = () => {
    setSearch("")
    router.push("/")
  }

  const hasFilters = currentCategory || currentSearch

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex-1 flex gap-2">
        <Input
          placeholder="Search visuals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1"
        />
        <Button onClick={handleSearch} size="icon" variant="outline">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <Select value={currentCategory || ""} onValueChange={(value) => updateFilters("category", value || null)}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button onClick={clearFilters} variant="outline" size="sm">
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}

      {isAdmin && <UploadVisualButton />}
      
    </div>
  )
}
