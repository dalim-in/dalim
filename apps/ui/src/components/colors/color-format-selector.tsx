"use client"

import * as React from "react"
import { useColors } from "@/src/hooks/use-colors"
import { getColorFormat, type Color } from "@/src/lib/colors"
import { cn } from "@dalim/core/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dalim/core/ui/select"
import { Skeleton } from "@dalim/core/ui/skeleton"

export function ColorFormatSelector({
  color,
  className,
  ...props
}: Omit<React.ComponentProps<typeof SelectTrigger>, "color"> & {
  color: Color
}) {
  const { format, setFormat, isLoading } = useColors()
  const formats = React.useMemo(() => getColorFormat(color), [color])

  if (isLoading) {
    return <ColorFormatSelectorSkeleton />
  }

  return (
    <Select value={format} onValueChange={setFormat}>
      <SelectTrigger
        className={cn("h-7 w-auto gap-1.5 rounded-lg pr-2 text-xs", className)}
        {...props}
      >
        <span className="font-medium">Format: </span>
        <span className="text-muted-foreground font-mono text-xs">
          {format}
        </span>
      </SelectTrigger>
      <SelectContent align="end" className="rounded-xl">
        {Object.entries(formats).map(([format, value]) => (
          <SelectItem
            key={format}
            value={format}
            className="gap-2 rounded-lg [&>span]:flex [&>span]:items-center [&>span]:gap-2"
          >
            <span className="font-medium">{format}</span>
            <span className="text-muted-foreground font-mono text-xs">
              {value}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function ColorFormatSelectorSkeleton({
  className,
  ...props
}: React.ComponentProps<typeof Skeleton>) {
  return (
    <Skeleton
      className={cn("h-7 w-[116px] gap-1.5 rounded-lg", className)}
      {...props}
    />
  )
}
