type UsePaginationProps = {
  currentpage: number
  totalpages: number
  paginationItemsToDisplay: number
}

type UsePaginationReturn = {
  pages: number[]
  showLeftEllipsis: boolean
  showRightEllipsis: boolean
}

export function usePagination({
  currentpage,
  totalpages,
  paginationItemsToDisplay,
}: UsePaginationProps): UsePaginationReturn {
  const showLeftEllipsis = currentpage - 1 > paginationItemsToDisplay / 2
  const showRightEllipsis =
    totalpages - currentpage + 1 > paginationItemsToDisplay / 2

  function calculatePaginationRange(): number[] {
    if (totalpages <= paginationItemsToDisplay) {
      return Array.from({ length: totalpages }, (_, i) => i + 1)
    }

    const halfDisplay = Math.floor(paginationItemsToDisplay / 2)
    const initialRange = {
      start: currentpage - halfDisplay,
      end: currentpage + halfDisplay,
    }

    const adjustedRange = {
      start: Math.max(1, initialRange.start),
      end: Math.min(totalpages, initialRange.end),
    }

    if (adjustedRange.start === 1) {
      adjustedRange.end = paginationItemsToDisplay
    }
    if (adjustedRange.end === totalpages) {
      adjustedRange.start = totalpages - paginationItemsToDisplay + 1
    }

    if (showLeftEllipsis) adjustedRange.start++
    if (showRightEllipsis) adjustedRange.end--

    return Array.from(
      { length: adjustedRange.end - adjustedRange.start + 1 },
      (_, i) => adjustedRange.start + i
    )
  }

  const pages = calculatePaginationRange()

  return {
    pages,
    showLeftEllipsis,
    showRightEllipsis,
  }
}
