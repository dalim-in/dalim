"use client"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { usePagination } from "@/registry/default/hooks/use-pagination"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/registry/default/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select"

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
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentpage,
    totalpages,
    paginationItemsToDisplay,
  })

  return (
    <div className="flex items-center justify-between gap-3">
      {/* Page number information */}
      <p
        className="text-muted-foreground flex-1 text-sm whitespace-nowrap"
        aria-live="polite"
      >
        Page <span className="text-foreground">{currentpage}</span> of{" "}
        <span className="text-foreground">{totalpages}</span>
      </p>

      {/* Pagination */}
      <div className="grow">
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

      {/* Results per page */}
      <div className="flex flex-1 justify-end">
        <Select defaultValue="10" aria-label="Results per page">
          <SelectTrigger
            id="results-per-page"
            className="w-fit whitespace-nowrap"
          >
            <SelectValue placeholder="Select number of results" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 / page</SelectItem>
            <SelectItem value="20">20 / page</SelectItem>
            <SelectItem value="50">50 / page</SelectItem>
            <SelectItem value="100">100 / page</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
