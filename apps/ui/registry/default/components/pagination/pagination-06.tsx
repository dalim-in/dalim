"use client"
import { useId } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { usePagination } from "@/registry/default/hooks/use-pagination"
import { Input } from "@/registry/default/ui/input"
import { Label } from "@/registry/default/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/registry/default/ui/pagination"

type PaginationProps = {
  currentpage: number
  totalpages: number
  paginationItemsToDisplay?: number
}

export default function Component({
  currentpage,
  totalpages,
  paginationItemsToDisplay = 5,
}: PaginationProps) {
  const id = useId()

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentpage,
    totalpages,
    paginationItemsToDisplay,
  })

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Pagination */}
      <div>
        <Pagination>
          <PaginationContent>
            {/* Previous page button */}
            <PaginationItem>
              <PaginationLink
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                href={
                  currentpage === 1 ? undefined : `#/page/${currentpage - 1}`
                }
                aria-label="Go to previous page"
                aria-disabled={currentpage === 1 ? true : undefined}
                role={currentpage === 1 ? "link" : undefined}
              >
                <ChevronLeftIcon size={16} aria-hidden="true" />
              </PaginationLink>
            </PaginationItem>

            {/* Left ellipsis (...) */}
            {showLeftEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Page number links */}
            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`#/page/${page}`}
                  isActive={page === currentpage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Right ellipsis (...) */}
            {showRightEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Next page button */}
            <PaginationItem>
              <PaginationLink
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                href={
                  currentpage === totalpages
                    ? undefined
                    : `#/page/${currentpage + 1}`
                }
                aria-label="Go to next page"
                aria-disabled={currentpage === totalpages ? true : undefined}
                role={currentpage === totalpages ? "link" : undefined}
              >
                <ChevronRightIcon size={16} aria-hidden="true" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Go to page input */}
      <div className="flex items-center gap-3">
        <Label htmlFor={id} className="whitespace-nowrap">
          Go to page
        </Label>
        <Input
          id={id}
          type="text"
          className="w-14"
          defaultValue={String(currentpage)}
        />
      </div>
    </div>
  )
}
