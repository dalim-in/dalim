// components/category/scroll-tab.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { formatCategoryName } from "@/src/lib/utils"
import { ScrollArea, ScrollBar } from "@dalim/core/ui/scroll-area"
import { TabsList, TabsTrigger } from "@dalim/core/ui/tabs"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { blockCategories } from "@/registry/default/blocks"

export function ScrollableTabs() {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const scrollableElementRef = useRef<HTMLDivElement | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollability = () => {
    if (scrollableElementRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollableElementRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableElement = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      ) as HTMLDivElement

      scrollableElementRef.current = scrollableElement

      if (scrollableElement) {
        checkScrollability()
        scrollableElement.addEventListener("scroll", checkScrollability)
        window.addEventListener("resize", checkScrollability)

        return () => {
          scrollableElement.removeEventListener("scroll", checkScrollability)
          window.removeEventListener("resize", checkScrollability)
        }
      }
    }
  }, [])

  const scroll = (offset: number) => {
    if (scrollableElementRef.current) {
      scrollableElementRef.current.scrollBy({
        left: offset,
        behavior: "smooth",
      })
    }
  }

  const getScrollAreaMargin = () => {
    const leftMargin = canScrollLeft ? "ml-8" : "-ml-7"
    const rightMargin = canScrollRight ? "mr-8" : "-mr-7"
    return `${leftMargin} ${rightMargin}`
  }

  return (
    <TabsList className="bg-background sticky top-24 z-20 flex h-12 w-auto items-center rounded-lg border px-4 shadow-xl">
      {canScrollLeft && (
        <button
          onClick={() => scroll(-150)}
          className="text-muted-foreground hover:text-foreground absolute left-2 z-30 p-1 transition-opacity duration-200"
          aria-label="Scroll left"
        >
          <ChevronLeft />
        </button>
      )}

      <ScrollArea
        ref={scrollAreaRef}
        className={`w-auto overflow-hidden transition-all duration-200 ${getScrollAreaMargin()}`}
      >
        <div className="inline-flex space-x-2 px-4">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-brand h-10 px-6 whitespace-nowrap data-[state=active]:text-white dark:data-[state=active]:text-black"
          >
            {formatCategoryName("all")}
          </TabsTrigger>

          {blockCategories.map(({ name, totalBlocks }) => (
            <TabsTrigger
              key={name}
              value={name}
              className="data-[state=active]:bg-brand h-10 px-6 whitespace-nowrap data-[state=active]:text-white dark:data-[state=active]:text-black"
            >
              {formatCategoryName(name)} ({totalBlocks})
            </TabsTrigger>
          ))}
        </div>
        <ScrollBar className="hidden" orientation="horizontal" />
      </ScrollArea>

      {canScrollRight && (
        <button
          onClick={() => scroll(150)}
          className="text-muted-foreground hover:text-foreground absolute right-2 z-30 p-1 transition-opacity duration-200"
          aria-label="Scroll right"
        >
          <ChevronRight />
        </button>
      )}
    </TabsList>
  )
}
