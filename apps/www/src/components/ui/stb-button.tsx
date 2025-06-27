"use client"

import { Button } from "@dalim/core/ui/button"
import { ChevronDown } from "lucide-react"
import { cn } from "@dalim/core/lib/utils"

interface ScrollToBottomButtonProps {
  isAtBottom: boolean
  autoScrollEnabled: boolean
  onScrollToBottom: () => void
  onToggleAutoScroll: (enabled: boolean) => void
}

export function ScrollToBottomButton({
  isAtBottom,
  autoScrollEnabled,
  onScrollToBottom,
  onToggleAutoScroll,
}: ScrollToBottomButtonProps) {
  if (isAtBottom) return null

  return (
    <div className="fixed bottom-20 right-4 flex flex-col gap-2">
      <Button size="sm" variant="outline" onClick={onScrollToBottom} className="rounded-full shadow-lg bg-transparent">
        <ChevronDown className="h-4 w-4" />
        Scroll to bottom
      </Button>

      <Button
        size="sm"
        variant="ghost"
        onClick={() => onToggleAutoScroll(!autoScrollEnabled)}
        className={cn(
          "rounded-full text-xs shadow-lg",
          autoScrollEnabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700",
        )}
      >
        Auto-scroll: {autoScrollEnabled ? "ON" : "OFF"}
      </Button>
    </div>
  )
}
