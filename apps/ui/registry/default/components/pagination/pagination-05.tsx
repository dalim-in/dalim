"use client"
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"

import {
  Pagination,
  PaginationContent,
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
}: PaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        {/* First page button */}
        <PaginationItem>
          <PaginationLink
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            href={currentpage === 1 ? undefined : `#/page/${currentpage - 1}`}
            aria-label="Go to first page"
            aria-disabled={currentpage === 1 ? true : undefined}
            role={currentpage === 1 ? "link" : undefined}
          >
            <ChevronFirstIcon size={16} aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>

        {/* Previous page button */}
        <PaginationItem>
          <PaginationLink
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            href={currentpage === 1 ? undefined : `#/page/${currentpage - 1}`}
            aria-label="Go to previous page"
            aria-disabled={currentpage === 1 ? true : undefined}
            role={currentpage === 1 ? "link" : undefined}
          >
            <ChevronLeftIcon size={16} aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>

        {/* Page number select */}
        <PaginationItem>
          <Select defaultValue={String(currentpage)} aria-label="Select page">
            <SelectTrigger id="select-page" className="w-fit whitespace-nowrap">
              <SelectValue placeholder="Select page" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: totalpages }, (_, i) => i + 1).map(
                (page) => (
                  <SelectItem key={page} value={String(page)}>
                    Page {page}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </PaginationItem>

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

        {/* Last page button */}
        <PaginationItem>
          <PaginationLink
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            href={
              currentpage === totalpages ? undefined : `#/page/${totalpages}`
            }
            aria-label="Go to last page"
            aria-disabled={currentpage === totalpages ? true : undefined}
            role={currentpage === totalpages ? "link" : undefined}
          >
            <ChevronLastIcon size={16} aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
