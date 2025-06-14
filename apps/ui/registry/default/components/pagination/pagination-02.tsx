import { usePagination } from "@/registry/default/hooks/use-pagination"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
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
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentpage,
    totalpages,
    paginationItemsToDisplay,
  })

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous page button */}
        <PaginationItem>
          <PaginationPrevious
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            href={currentpage === 1 ? undefined : `#/page/${currentpage - 1}`}
            aria-disabled={currentpage === 1 ? true : undefined}
            role={currentpage === 1 ? "link" : undefined}
          />
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
          <PaginationNext
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            href={
              currentpage === totalpages
                ? undefined
                : `#/page/${currentpage + 1}`
            }
            aria-disabled={currentpage === totalpages ? true : undefined}
            role={currentpage === totalpages ? "link" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
