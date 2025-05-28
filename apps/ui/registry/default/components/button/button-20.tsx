"use client"

import { Button } from "@/registry/default/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip"

export default function Component() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" aria-label="Tooltip">
            {" "}
            Tooltip
          </Button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">Tooltip</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
