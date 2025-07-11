"use client"

import { useCallback, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import ComponentCard from "@/src/components/component-card"
import ComponentDetails from "@/src/components/component-details"
import ComponentLoader from "@/src/components/component-loader-client"
import { PageGrid } from "@/src/components/page-grid"
import { getComponents } from "@/src/lib/utils"
import type { RegistryItem } from "shadcn/registry"

import type { RegistryTag } from "@/registry/registry-tags"

import SearchField from "./search-field"

export default function ComponentsContainer() {
  const searchParams = useSearchParams()
  const tags = useMemo(() => {
    return (searchParams
      ?.get("tags")
      ?.split(",")
      .filter(Boolean)
      .map((tag) => tag.replace(/\+/g, " ")) || []) as RegistryTag[]
  }, [searchParams])

  const filtered = useMemo(() => {
    if (!tags.length) return []
    return getComponents(tags)
  }, [tags])

  const updateTags = useCallback((newTags: string[]) => {
    const url = new URL(window.location.href)
    if (newTags.length > 0) {
      const formattedTags = newTags
        .map((tag) => tag.replace(/\s+/g, "+"))
        .join(",")
      url.searchParams.set("tags", formattedTags)
    } else {
      url.searchParams.delete("tags")
    }
    window.history.replaceState({}, "", url.toString())
  }, [])

  return (
    <div className="-mx-6 mb-6 space-y-4">
      <SearchField selectedTags={tags} onTagChange={updateTags} />
      <PageGrid>
        {filtered.map((component: RegistryItem) => (
          <ComponentCard
            key={component.name}
            component={component}
            isSearchPage
          >
            <ComponentLoader component={component} />
            <div className="right-10 top-0 absolute">
              <ComponentDetails component={component} />
            </div>
          </ComponentCard>
        ))}
        {tags.length > 0 && filtered.length === 0 && (
          <div className="col-span-full py-8 text-center">
            <p className="text-muted-foreground">
              No components found for the selected tags.
            </p>
          </div>
        )}
      </PageGrid>
    </div>
  )
}
