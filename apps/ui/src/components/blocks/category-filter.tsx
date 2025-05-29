"use client"

import React, { useEffect, useState } from "react"
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"
import { useDebounce } from "@/src/hooks/use-debounce"
import { Input } from "@dalim/core/ui/input" 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem, 
  SelectTrigger,
  SelectValue,
} from "@dalim/core/ui/select"
import { SearchIcon } from "lucide-react"

import { blockCategories } from "@/registry/default/blocks"

const CategoryFilter = () => {
  const { category = "all" } = useParams<{ category: string }>()
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleSelect = (value: string) => {
    if (value === "all") {
      router.push(`/blocks?${searchParams.toString()}`)
      return
    }

    router.push(`/blocks/category/${value}?${searchParams.toString()}`)
  }

  return (
    <div> 
      <Select value={category} onValueChange={handleSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup> 
            <SelectItem value="all">
              <div className="flex items-center gap-3">
                <span>All</span>
              </div>
            </SelectItem>
            {blockCategories.map((category) => (
              <SelectItem key={category.name} value={category.name}>
                <div className="flex items-center gap-3">
                  <span className="capitalize">{category.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

const PreviewListSearch = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [value, setValue] = useState(query)
  const pathname = usePathname()
  const searchParamsString = searchParams.toString()
  const router = useRouter()
  const debouncedQuery = useDebounce(value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleSearch = () => {
    const searchParams = new URLSearchParams(searchParamsString)

    if (!searchParamsString && !debouncedQuery) return

    if (!debouncedQuery) {
      searchParams.delete("q")
      router.push(`${pathname}?${searchParams.toString()}`)
      return
    }

    searchParams.set("q", debouncedQuery)
    router.push(`${pathname}?${searchParams.toString()}`)
  }

  useEffect(() => {
    handleSearch()
  }, [debouncedQuery])

  useEffect(() => {
    setValue(query)
  }, [query])

  return (
    <div className="grow"> 
      <div className="relative">
        <Input
          className=" w-full max-w-60 ps-9"
          placeholder="Search"
          value={value}
          onChange={handleChange}
        />
        <SearchIcon className="text-muted-foreground absolute inset-y-0 start-2 my-auto h-5 w-5" />
      </div>
    </div>
  )
}

const PreviewListFilter = () => {
  return (
    <div className="flex justify-center p-6">
      <div className="flex justify-center gap-2 text-center">
        <CategoryFilter />
        <PreviewListSearch />
      </div>
    </div>
  )
}

export { CategoryFilter, PreviewListSearch, PreviewListFilter }
